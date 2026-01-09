import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Watchlist() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) return;

    fetch(`http://localhost:5000/watchlist/${userId}`)
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch((err) => console.error(err));
  }, [userId]);

  return (
    <div style={{ backgroundColor: "#141414", minHeight: "100vh", color: "white", padding: "20px" }}>
      <h1 style={{ color: "#e50914", textAlign: "center" }}>My List</h1>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginTop: "30px" }}>
        {movies.map((movie) => (
          <div
            key={movie._id}
            onClick={() => navigate(`/movie/${movie._id}`)}
            style={{ width: "180px", cursor: "pointer" }}
          >
            <img
              src={movie.poster}
              alt={movie.title}
              style={{ width: "100%", borderRadius: "6px" }}
            />
            <p style={{ marginTop: "8px" }}>{movie.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Watchlist;
