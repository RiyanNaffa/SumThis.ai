import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/pages/Home";
import About from "./components/pages/About";
import PdfPreview from "./components/pages/PdfPreview";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/pdf-preview" element={<PdfPreview />} />
      </Routes>
    </Router>
  );
};

export default App;