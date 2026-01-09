import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getWatchlist } from "../api";

function Watchlist() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) return;

    getWatchlist(userId).then((data) => {
      // ✅ normalize backend response
      if (Array.isArray(data)) {
        setMovies(data);
      } else if (Array.isArray(data.movies)) {
        setMovies(data.movies);
      } else if (Array.isArray(data.watchlist)) {
        setMovies(data.watchlist);
      } else {
        setMovies([]);
      }
    });
  }, [userId]);

  return (
    <div
      style={{
        backgroundColor: "#141414",
        minHeight: "100vh",
        color: "white",
        padding: "20px",
      }}
    >
      <h1 style={{ color: "#e50914", textAlign: "center" }}>My List</h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          marginTop: "30px",
          justifyContent: "center",
        }}
      >
        {movies.length === 0 ? (
          <p>No movies in your list</p>
        ) : (
          movies.map((movie) => (
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
              <p style={{ marginTop: "8px", textAlign: "center" }}>
                {movie.title}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Watchlist;
