import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovie, getWatchlist, toggleWatchlist } from "../api";

function Movie() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [inList, setInList] = useState(false);

  const userId = localStorage.getItem("userId");

  // ✅ Fetch movie
  useEffect(() => {
    getMovie(id).then((data) => setMovie(data));
  }, [id]);

  // ✅ Check watchlist
  useEffect(() => {
    if (!userId) return;

   getWatchlist(userId).then((data) => {
  const exists = data.movies?.some((m) => m._id === id);
  setInList(exists);
});

  }, [id, userId]);

  // ✅ Toggle watchlist
  const handleWatchlist = async () => {
    await toggleWatchlist(id, userId);
    setInList(!inList);
  };

  if (!movie) {
    return (
      <div style={{ backgroundColor: "#141414", color: "white", height: "100vh" }}>
        <h2 style={{ textAlign: "center", paddingTop: "100px" }}>Loading...</h2>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #141414, #000)",
        padding: "30px",
      }}
    >
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        style={{
          backgroundColor: "#e50914",
          color: "white",
          border: "none",
          padding: "8px 18px",
          borderRadius: "20px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        ← Back
      </button>

      {/* Title */}
      <h1
        style={{
          color: "white",
          fontSize: "44px",
          fontWeight: "800",
          marginBottom: "15px",
        }}
      >
        {movie.title}
      </h1>

      {/* Watchlist Button */}
      <button
        onClick={handleWatchlist}
        style={{
          backgroundColor: inList ? "#555" : "#e50914",
          color: "white",
          border: "none",
          padding: "10px 22px",
          borderRadius: "4px",
          fontSize: "15px",
          fontWeight: "600",
          cursor: "pointer",
          marginBottom: "25px",
        }}
      >
        {inList ? "✓ Added to My List" : "+ Add to My List"}
      </button>

      {/* Trailer */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <iframe
          width="900"
          height="500"
          src={movie.trailer}
          title={movie.title}
          allowFullScreen
          style={{
            borderRadius: "12px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.8)",
          }}
        />
      </div>
    </div>
  );
}

export default Movie;

