import { Route, Routes } from 'react-router-dom';
import { ListingPage } from './pages/ListingPage.jsx'
import { LoginPage } from './pages/LoginPage.jsx'
import { WalkInDetailsPage } from './pages/WalkInDetailsPage.jsx';
import { WalkInApplicationSuccessPage } from './pages/WalkInApplicationSuccessPage.jsx';
import { FourZeroFourPage } from './pages/FourZeroFourPage.jsx';


import './App.css'
import { ProtectedRoute } from './components/ProtectedRoute.jsx';
import { SecretPage } from './pages/SecretPage.jsx';
import { AuthProvider } from './hooks/useAuth.jsx';
import { Verify2FA } from './components/Verify2FA.jsx';
import { HomeLayout } from './components/HomeLayout.jsx';
import { ProtectedLayout } from './components/ProtectedLayout.jsx';
import RegistrationPage from './pages/RegistrationPage.jsx';

function App() {

  return (
    <AuthProvider>
      <Routes>
        <Route element={<HomeLayout />}>
          <Route path="/" element={<ListingPage />} />
          <Route path="/verify-2fa" element={<Verify2FA />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="*" element={<FourZeroFourPage />} />
        </Route>
        <Route path='jobs' element={<ProtectedLayout />}>
          <Route path="" element={<ListingPage />} />
          <Route path=":id" element={<WalkInDetailsPage />} />
          <Route path=":id/applicationsuccess" element={<WalkInApplicationSuccessPage />} />
        </Route>
        <Route
            path="/secret"
            element={
              <ProtectedRoute>
                <SecretPage />
              </ProtectedRoute>
            }
          />
      </Routes>
    </AuthProvider>

  )
}

export default App
