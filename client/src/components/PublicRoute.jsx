// src/components/PublicRoute.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';

const PublicRoute = () => {
  return <Outlet />; // Always render the child component (login or signup)
};

export default PublicRoute;