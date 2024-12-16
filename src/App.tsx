import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { LoginPage } from './pages/LoginPage';
import { SprintsPage } from './pages/SprintsPage';
import { SprintReviewPage } from './pages/SprintReviewPage';
import { CalendarPage } from './pages/CalendarPage';
import { UsersPage } from './pages/UsersPage';
import { EpicsPage } from './pages/EpicsPage';
import { RoadMapPage } from './pages/RoadMapPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { useAuthStore } from './store/authStore';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/sprints" replace />} />
          <Route path="sprints" element={<SprintsPage />} />
          <Route path="sprints/:id/review" element={<SprintReviewPage />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="epics" element={<EpicsPage />} />
          <Route path="roadmap" element={<RoadMapPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}