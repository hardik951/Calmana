// src/components/ProtectedRoute.jsx

import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  // This is a placeholder for your actual authentication check.
  // In a real application, you would check a user's token, session, or global auth state.
  // For now, it's hardcoded to 'true' to allow access.
  // Set to 'false' temporarily to test redirection to /login.
  const isAuthenticated = true; // IMPORTANT: Replace with actual auth logic later!

  if (!isAuthenticated) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the children (the protected component, e.g., Dashboard)
  return children;
}