import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMovies } from "../api";

const overlayStyle = `
  div:hover > .overlay {
    opacity: 1;
  }
`;
const clickSound = new Audio("/netflix.mp3");
clickSound.volume = 0.25;


function Home() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [hoveredId, setHoveredId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
  const fetchMovies = async () => {
    try {
      const data = await getMovies();
      setMovies(data);
    } catch (err) {
      console.error("Failed to load movies", err);
    }
  };

  fetchMovies();
}, []);


  return (
    <div style={{ backgroundColor: "#141414", minHeight: "100vh", color: "white" }}> 

      {/* Header */}
     <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 30px",
    height: "80px",
  }}
>
  <div
    style={{
      fontSize: "36px",
      fontWeight: "900",
      color: "#e50914",
      letterSpacing: "3px",
    }}
  >
    STREAMFLIX
  </div>
<div
  style={{
    display: "flex",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: "4px",
    padding: "6px 10px",
    width: "220px",
  }}
>
  <span style={{ marginRight: "8px", fontSize: "16px" }}>🔍</span>

  <input
    type="text"
    placeholder="Search"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    style={{
      border: "none",
      outline: "none",
      width: "100%",
      fontSize: "14px",
    }}
  />
</div>


  <button
    onClick={() => navigate("/mylist")}
    style={{
      background: "transparent",
      border: "1px solid white",
      color: "white",
      padding: "6px 14px",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "14px",
    }}
  >
    My List
  </button>
</div>
<button
  onClick={() => {
    localStorage.removeItem("userId");
    navigate("/login");
  }}
  style={{
    background: "transparent",
    border: "1px solid #e50914",
    color: "#e50914",
    padding: "6px 14px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    marginLeft: "12px",
  }}
>
  Logout
</button>




      {/* Movie Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: "20px",
          padding: "20px",
        }}
      >
        {movies
        .filter((movie) =>
        movie.title.toLowerCase().includes(search.toLowerCase())
        )
        .map((movie) => (
  <div
    key={movie._id}
    onMouseEnter={() => setHoveredId(movie._id)}
    onMouseLeave={() => setHoveredId(null)}
    onClick={() => {
  clickSound.currentTime = 0;
  clickSound.play();
  navigate(`/movie/${movie._id}`);
}}

    style={{
      position: "relative",
      cursor: "pointer",
      transform: hoveredId === movie._id ? "scale(1.15)" : "scale(1)",
      transition: "transform 0.3s ease",
    }}
  >
    <img
      src={movie.poster}
      alt={movie.title}
      style={{
        width: "100%",
        borderRadius: "6px",
      }}
    />

    {/* PLAY BUTTON OVERLAY */}
    {hoveredId === movie._id && (
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.6)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "6px",
        }}
      >
        <span style={{ fontSize: "48px", color: "white" }}>▶</span>
      </div>
    )}
  </div>
))}


      </div>
    </div>
  );
}

export default Home;
