import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Plano from "../pages/Plano";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/plano/:slug" element={<Plano />} />
      </Routes>
    </BrowserRouter>
  );
}