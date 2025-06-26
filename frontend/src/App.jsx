import { Route, Routes } from "react-router";
import { useEffect, useState } from "react";

import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import NoteDetailPage from "./pages/NoteDetailPage";

const App = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "forest");

  useEffect(() => {
    const updateTheme = () => {
      const storedTheme = localStorage.getItem("theme") || "forest";
      setTheme(storedTheme);
    };

    window.addEventListener("theme-changed", updateTheme);

    return () => window.removeEventListener("theme-changed", updateTheme);
  }, []);

  return (
    <div className="relative h-full w-full">
      <div
        className={`absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 transition-all duration-500
        ${
          theme === "darth"
            ? "[background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#FF3C3C40_100%)]"
            : "[background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]"
        }`}
      />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />
      </Routes>
    </div>
  );
};

export default App;
