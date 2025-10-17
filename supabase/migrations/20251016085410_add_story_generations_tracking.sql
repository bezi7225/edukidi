/*
  # Story Generations Tracking Schema

  1. New Tables
    - `user_subscriptions`: Tracks user subscription tier and status
      - `user_id` (references auth.users) - The user
      - `tier` - Subscription tier (free, premium_monthly, premium_yearly)
      - `status` - Subscription status (active, canceled, expired)
      - `stripe_customer_id` - Link to Stripe customer
      - `stripe_subscription_id` - Link to Stripe subscription
      - `current_period_end` - When current period ends
      - `generations_used` - Number of generations used in current period
      - `generations_limit` - Maximum generations allowed (null = unlimited)
      
    - `story_generations`: Logs each story generation
      - `user_id` (references auth.users) - Who generated the story
      - `story_content` - The generated story text
      - `form_data` - JSONB with generation parameters (name, age, duration, value, situation)
      - `created_at` - When the story was generated

  2. Security
    - Enable RLS on all tables
    - Users can only view/modify their own data
    - Automatic free tier creation on user signup

  3. Functions
    - `create_free_subscription` - Trigger to create free subscription on signup
    - `reset_generations_counter` - Function to reset monthly counters
*/

-- Create enum for subscription tiers
CREATE TYPE subscription_tier AS ENUM (
  'free',
  'premium_monthly', 
  'premium_yearly'
);

-- Create enum for subscription status
CREATE TYPE subscription_status AS ENUM (
  'active',
  'canceled',
  'expired',
  'trialing'
);

-- User subscriptions table
CREATE TABLE IF NOT EXISTS user_subscriptions (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  tier subscription_tier NOT NULL DEFAULT 'free',
  status subscription_status NOT NULL DEFAULT 'active',
  stripe_customer_id text DEFAULT NULL,
  stripe_subscription_id text DEFAULT NULL,
  current_period_end timestamptz DEFAULT NULL,
  generations_used integer NOT NULL DEFAULT 0,
  generations_limit integer DEFAULT 2,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE user_subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own subscription"
  ON user_subscriptions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own subscription"
  ON user_subscriptions
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Story generations log table
CREATE TABLE IF NOT EXISTS story_generations (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  story_content text NOT NULL,
  form_data jsonb NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE story_generations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own stories"
  ON story_generations
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own stories"
  ON story_generations
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Function to automatically create a free subscription when a user signs up
CREATE OR REPLACE FUNCTION create_free_subscription()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_subscriptions (user_id, tier, status, generations_limit)
  VALUES (NEW.id, 'free', 'active', 2);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create free subscription on user signup
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'on_auth_user_created'
  ) THEN
    CREATE TRIGGER on_auth_user_created
      AFTER INSERT ON auth.users
      FOR EACH ROW
      EXECUTE FUNCTION create_free_subscription();
  END IF;
END $$;

-- Function to reset generation counter (can be called manually or via cron)
CREATE OR REPLACE FUNCTION reset_generations_counter()
RETURNS void AS $$
BEGIN
  UPDATE user_subscriptions
  SET 
    generations_used = 0,
    updated_at = now()
  WHERE 
    tier = 'premium_monthly'
    AND current_period_end IS NOT NULL
    AND current_period_end < now();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_user_id ON user_subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_story_generations_user_id ON story_generations(user_id);
CREATE INDEX IF NOT EXISTS idx_story_generations_created_at ON story_generations(created_at DESC);
