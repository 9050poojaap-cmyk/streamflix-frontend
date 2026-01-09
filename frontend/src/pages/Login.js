import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api";   // ✅ USE API FILE

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(email, password); // ✅ NO localhost

      if (data.message && !data.userId) {
        setError(data.message);
        return;
      }

      // Save login session
      localStorage.setItem("userId", data.userId);

      // Play Netflix sound
      const sound = new Audio("/netflix.mp3");
      sound.volume = 0.6;
      sound.play();

      navigate("/");
    } catch (err) {
  setError(err.message);
}

  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#141414",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          backgroundColor: "#000",
          padding: "40px",
          width: "350px",
          borderRadius: "8px",
        }}
      >
        <h2 style={{ color: "white", marginBottom: "30px" }}>
          Sign In
        </h2>

        {error && (
          <p style={{ color: "#e87c03", marginBottom: "15px" }}>
            {error}
          </p>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default Login;
