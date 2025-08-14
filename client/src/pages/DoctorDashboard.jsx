import React from 'react';
import { DoctorSidebar } from '../components/DoctorSidebar';
import { DoctorDashboardContent } from '../components/DoctorDashboardContent';

export default function DoctorDashboard() {
  console.log('DoctorDashboard rendered, isAuthenticated:', localStorage.getItem('isAuthenticated') === 'true');
  return (
    <div className="min-h-screen flex w-full bg-background">
      <DoctorSidebar />
      <main className="flex-1 overflow-hidden">
        <DoctorDashboardContent />
      </main>
    </div>
  );
}