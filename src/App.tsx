import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ListingsPage from './pages/ListingsPage';
import ComparisonPage from './pages/ComparisonPage';
import FinancialCalculatorPage from './pages/FinancialCalculatorPage';
import AiAssistantPage from './pages/AiAssistantPage';
import CarDetailPage from './pages/CarDetailPage';
import { ComparisonProvider } from './contexts/ComparisonContext';

function App() {
  return (
    <Router>
      <ComparisonProvider>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/listings" element={<ListingsPage />} />
              <Route path="/listings/:id" element={<CarDetailPage />} />
              <Route path="/compare" element={<ComparisonPage />} />
              <Route path="/calculator" element={<FinancialCalculatorPage />} />
              <Route path="/assistant" element={<AiAssistantPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </ComparisonProvider>
    </Router>
  );
}

export default App;