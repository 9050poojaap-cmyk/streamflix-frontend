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
    background: "linear-gradient(to bottom, #000000, #141414)",
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
    width: "360px",
    borderRadius: "8px",
    boxShadow: "0 0 40px rgba(0,0,0,0.9)",
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
    fontSize: "14px",
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
    marginBottom: "25px",
    borderRadius: "4px",
    border: "none",
    outline: "none",
    fontSize: "14px",
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
