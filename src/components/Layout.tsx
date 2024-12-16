import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Calendar, LogOut, ClipboardList, Users, BookOpen, Map, BarChart2 } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { LanguageSelector } from './LanguageSelector';
import { useTranslation } from 'react-i18next';

export function Layout() {
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link
                to="/"
                className="flex items-center px-2 py-2 text-gray-900 hover:text-indigo-600"
              >
                <ClipboardList className="h-6 w-6 mr-2" />
                <span className="font-semibold">CLIC</span>
              </Link>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  to="/sprints"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-indigo-600"
                >
                  <ClipboardList className="h-4 w-4 mr-1" />
                  {t('sprints.title')}
                </Link>
                <Link
                  to="/epics"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-indigo-600"
                >
                  <BookOpen className="h-4 w-4 mr-1" />
                  {t('epics.title')}
                </Link>
                <Link
                  to="/roadmap"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-indigo-600"
                >
                  <Map className="h-4 w-4 mr-1" />
                  {t('roadmap.title')}
                </Link>
                <Link
                  to="/analytics"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-indigo-600"
                >
                  <BarChart2 className="h-4 w-4 mr-1" />
                  {t('analytics.title')}
                </Link>
                <Link
                  to="/calendar"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-indigo-600"
                >
                  <Calendar className="h-4 w-4 mr-1" />
                  {t('calendar.title')}
                </Link>
                <Link
                  to="/users"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-indigo-600"
                >
                  <Users className="h-4 w-4 mr-1" />
                  {t('users.title')}
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageSelector />
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 hover:text-indigo-600"
              >
                <LogOut className="h-4 w-4 mr-1" />
                {t('auth.logout')}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}