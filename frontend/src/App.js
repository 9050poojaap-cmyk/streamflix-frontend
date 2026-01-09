import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Movie from "./pages/Movie";
import Login from "./pages/Login";
import Watchlist from "./pages/Watchlist";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/mylist" element={<Watchlist />} />
      <Route path="/movie/:id" element={<Movie />} />
    </Routes>
  );
}

export default App;
