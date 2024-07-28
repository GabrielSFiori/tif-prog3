// src/App.jsx
import { Route, Routes, Navigate } from "react-router-dom";
import { AboutScreen } from "./routes/AboutScreen";
import { ContactScreen } from "./routes/ContactScreen";
import { HomeScreen } from "./routes/HomeScreen";
import { NavBar } from "./components/NavBar";
import { Articles } from "./components/Articles";
import { NewArticle } from "./components/Articles/NewArticle";
import { Login } from "./components/Login";
import { AuthProvider } from "./contexts/AuthContext";
import { ArticleDetail } from "./components/Articles/ArticleDetail";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("authToken");
  return token ? children : <Navigate to="/login" />;
};

export const App = () => {
  return (
    <AuthProvider>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/about" element={<AboutScreen />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/article/:id" element={<ArticleDetail />} />
        <Route
          path="/article/new-article"
          element={
            <ProtectedRoute>
              <NewArticle />
            </ProtectedRoute>
          }
        />
        <Route path="/contact" element={<ContactScreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AuthProvider>
  );
};
