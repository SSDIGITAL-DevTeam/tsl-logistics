import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './auth/ProtectedRoute';
import { DashboardLayout } from './layouts/DashboardLayout';
import { LoginPage } from './pages/Login';
import { ForgotPasswordPage } from './pages/ForgotPassword';
import { ResetPasswordPage } from './pages/ResetPassword';
import { DashboardPage } from './pages/Dashboard';
import { LeadsPage } from './pages/Leads';
import { BlogListPage } from './pages/BlogList';
import { CategoriesPage } from './pages/Categories';

export const router = createBrowserRouter([
  // Public routes
  { path: '/login', element: <LoginPage /> },
  { path: '/forgot-password', element: <ForgotPasswordPage /> },
  { path: '/reset-password', element: <ResetPasswordPage /> },

  // Protected routes
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { path: '/', element: <Navigate to="/dashboard" replace /> },
          { path: '/dashboard', element: <DashboardPage /> },
          { path: '/leads', element: <LeadsPage /> },
          { path: '/blog', element: <BlogListPage /> },
          { path: '/categories', element: <CategoriesPage /> },
        ],
      },
    ],
  },
]);
