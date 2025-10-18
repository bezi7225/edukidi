import React from 'react';
import { TubelightNavbar } from './ui/tubelight-navbar';
import { useAuth } from '../hooks/useAuth';
import { useLanguage } from '../contexts/LanguageContext';
import { Home, DollarSign, Sparkles, LogIn, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Navigation() {
  const { user } = useAuth();
  const { t } = useLanguage();

  const publicNavItems = [
    { name: t('nav.home'), url: '/', icon: Home },
    { name: t('nav.pricing'), url: '/pricing', icon: DollarSign },
    { name: t('nav.login'), url: '/login', icon: LogIn },
    { name: t('nav.signup'), url: '/signup', icon: UserPlus },
  ];

  const authenticatedNavItems = [
    { name: t('nav.home'), url: '/', icon: Home },
    { name: t('nav.pricing'), url: '/pricing', icon: DollarSign },
    { name: t('nav.generation'), url: '/generation', icon: Sparkles },
  ];

  return (
    <>
      <TubelightNavbar items={user ? authenticatedNavItems : publicNavItems} />
      <div className="h-32" />
    </>
  );
}