/*
  # Fix User Signup Trigger

  1. Changes
    - Drop and recreate the trigger function with proper error handling
    - Ensure the function has correct permissions
    - Add exception handling to prevent signup failures

  2. Security
    - Function runs with SECURITY DEFINER to have proper permissions
    - Maintains RLS policies on user_subscriptions table
*/

-- Drop existing trigger and function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS create_free_subscription();

-- Recreate function with better error handling
CREATE OR REPLACE FUNCTION create_free_subscription()
RETURNS TRIGGER 
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.user_subscriptions (
    user_id, 
    tier, 
    status, 
    generations_limit,
    generations_used
  )
  VALUES (
    NEW.id, 
    'free', 
    'active', 
    2,
    0
  );
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    RAISE WARNING 'Error creating free subscription for user %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Recreate trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION create_free_subscription();
