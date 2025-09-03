import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import Portfolio from "./components/Portfolio";
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Portfolio />} />
        </Routes>
        <Toaster />
        <Analytics />
      </BrowserRouter>
    </div>
  );
}

export default App;
