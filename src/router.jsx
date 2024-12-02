/* eslint-disable no-unused-vars */
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Closet from "./pages/Closet";
import OutfitMaker from "./pages/OutfitMaker";
import SustainableStuff from "./pages/SustainableStuff";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Closet />} />
        <Route path="/outfit-maker" element={<OutfitMaker />} />
        <Route path="/sustainable-stuff" element={<SustainableStuff />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
