import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { MovieProvider } from './contexts/MovieContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SearchPage from './pages/SearchPage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import FavoritesPage from './pages/FavoritesPage';
import NotFoundPage from './pages/NotFoundPage';

// Protected route wrapper component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

// Layout component with header and footer
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 dark:bg-gray-900">
      <Header />
      <main className="pt-16 flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <MovieProvider>
            <div className="min-h-screen dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <HomePage />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/search"
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <SearchPage />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/movie/:id"
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <MovieDetailsPage />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/favorites"
                  element={
                    <ProtectedRoute>
                      <Layout>
                        <FavoritesPage />
                      </Layout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="*"
                  element={
                    <Layout>
                      <NotFoundPage />
                    </Layout>
                  }
                />
              </Routes>
            </div>
          </MovieProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;