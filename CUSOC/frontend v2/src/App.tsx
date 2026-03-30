import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import EventPage from '@/pages/EventPage';
import SmoothScroll from '@/components/SmoothScroll';

// Admin components
import AdminLoginPage from '@/pages/AdminLoginPage';
import AdminPage from '@/pages/AdminPage';

function RequireAdmin({ children }: { children: React.ReactNode }) {
  const isLoggedIn = Boolean(localStorage.getItem('admin_token'));
  return isLoggedIn ? children : <Navigate to="/admin/login" replace />;
}

export default function App() {
  const [isAdmin, setIsAdmin] = useState(Boolean(localStorage.getItem('admin_token')));

  return (
    <SmoothScroll>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EventPage />} />
          
          <Route
            path="/admin/login"
            element={
              isAdmin
                ? <Navigate to="/admin" replace />
                : <AdminLoginPage onLogin={() => setIsAdmin(true)} />
            }
          />

          <Route
            path="/admin"
            element={
              <RequireAdmin>
                <AdminPage onLogout={() => setIsAdmin(false)} />
              </RequireAdmin>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </SmoothScroll>
  );
}
