import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BoardPage from "./pages/BoardPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BoardPage />} />
        <Route path="/board" element={<BoardPage />} />
      </Routes>
    </Router>
  );
}
