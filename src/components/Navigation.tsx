import React from 'react';
import { TubelightNavbar } from './ui/tubelight-navbar';
import { useAuth } from '../hooks/useAuth';
import { Home, DollarSign, Sparkles, LogIn, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Navigation() {
  const { user } = useAuth();

  const publicNavItems = [
    { name: 'Home', url: '/', icon: Home },
    { name: 'Pricing', url: '/pricing', icon: DollarSign },
    { name: 'Login', url: '/login', icon: LogIn },
    { name: 'Sign Up', url: '/signup', icon: UserPlus },
  ];

  const authenticatedNavItems = [
    { name: 'Home', url: '/', icon: Home },
    { name: 'Pricing', url: '/pricing', icon: DollarSign },
    { name: 'Generation', url: '/generation', icon: Sparkles },
  ];

  return (
    <>
      <TubelightNavbar items={user ? authenticatedNavItems : publicNavItems} />
      <div className="h-24" />
    </>
  );
}