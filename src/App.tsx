import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Plano from "./pages/Plano";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/plano/:slug" element={<Plano />} />
    </Routes>
  );
}