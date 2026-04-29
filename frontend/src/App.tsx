import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TruckDetailsPage from "./pages/TruckDetailsPage";
import Header from "./pages/Header";
import CatalogPage from "./pages/CatalogPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AddListingPage from "./pages/AddListingPage";
import EditListingPage from "./pages/EditListingPage";
import ProfilePage from "./pages/ProfilePage";
import MyListingsPage from "./pages/MyListingsPage";
import RequestsPage from "./pages/RequestsPage";
import NotFoundPage from "./pages/NotFoundPage";
import AboutPage from "./pages/AboutPage";
import PreLoader from "./pages/PreLoader";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <PreLoader />;

  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/truck/:id" element={<TruckDetailsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/add" element={<AddListingPage />} />
        <Route path="/edit-listing/:id" element={<EditListingPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/my-listings" element={<MyListingsPage />} />
        <Route path="/requests" element={<RequestsPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}