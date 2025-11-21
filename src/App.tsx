import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { FilterProvider } from './context/FilterContext';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <FilterProvider>
        <Router basename={import.meta.env.BASE_URL}>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </Layout>
        </Router>
      </FilterProvider>
    </ThemeProvider>
  );
};

export default App;
