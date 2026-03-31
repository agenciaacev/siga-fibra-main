import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/index";
import Home from "./pages/Home";
import Plano from "./pages/Plano";
import "./index.css";

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/plano/:slug" element={<Plano />} />
      </Route>
    </Routes>
  );
}