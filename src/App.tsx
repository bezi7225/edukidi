import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { LanguageSelector } from './components/LanguageSelector';
import { LanguageProvider } from './contexts/LanguageContext';
import HomePage from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { GenerationPage } from './pages/GenerationPage';
import { PricingPage } from './pages/PricingPage';
import { SuccessPage } from './pages/SuccessPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import CookiesPage from './pages/CookiesPage';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="min-h-screen pt-20 bg-gradient-to-br from-blue-50 via-background to-pink-50">
          <Navigation />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/generation" element={<GenerationPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/cookies" element={<CookiesPage />} />
          </Routes>
          <LanguageSelector />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
