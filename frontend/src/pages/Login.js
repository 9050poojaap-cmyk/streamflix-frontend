import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      // Save login session
      localStorage.setItem("userId", data.userId);

      // Play Netflix sound
const sound = new Audio("/netflix.mp3");
sound.volume = 0.6;
sound.play();


      // Redirect to home
      navigate("/");
    } catch (err) {
      setError("Server error");
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
        <h2
          style={{
            color: "white",
            marginBottom: "30px",
            fontSize: "28px",
            fontWeight: "700",
          }}
        >
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
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            borderRadius: "4px",
            border: "none",
            outline: "none",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
            borderRadius: "4px",
            border: "none",
            outline: "none",
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#e50914",
            color: "white",
            border: "none",
            borderRadius: "4px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Sign In
        </button>
      </form>
    </div>
  );
}

export default Login;
