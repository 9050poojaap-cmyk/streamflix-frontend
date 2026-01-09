// 🔥 Production backend URL (Render)
const BASE_URL = "https://streamflix-backend-pcrr.onrender.com";

// ================= MOVIES =================

export const getMovies = async () => {
  const res = await fetch(`${BASE_URL}/movies`);
  return res.json();
};

export const getMovie = async (id) => {
  const res = await fetch(`${BASE_URL}/movies/${id}`);
  return res.json();
};

// ================= WATCHLIST =================

export const getWatchlist = async (userId) => {
  const res = await fetch(`${BASE_URL}/watchlist/${userId}`);
  return res.json();
};

export const toggleWatchlist = async (movieId, userId) => {
  const res = await fetch(`${BASE_URL}/watchlist/${movieId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId }),
  });

  return res.json();
};

// ================= AUTH =================

export const loginUser = async (email, password) => {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  return res.json();
};

export const registerUser = async (email, password) => {
  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  return res.json();
};
