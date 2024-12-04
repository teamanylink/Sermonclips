import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { Library } from './components/library/Library';
import { SignUpPage } from './pages/SignUpPage';
import { SignInPage } from './pages/SignInPage';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { session } = useAuth();
  return session ? <>{children}</> : <Navigate to="/signin" />;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <Library />
                </DashboardLayout>
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" />
    </AuthProvider>
  );
}

export default App;