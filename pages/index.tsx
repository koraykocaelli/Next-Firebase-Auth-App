import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import { auth } from "../lib/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

const inputStyle: React.CSSProperties = {
  padding: "10px",
  fontSize: "16px",
  borderRadius: "4px",
  border: "1px solid #555",
  backgroundColor: "#222",
  color: "#fff",
};

const buttonStyle: React.CSSProperties = {
  padding: "10px",
  fontSize: "16px",
  backgroundColor: "#4DA1FF",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

export default function LoginPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        if (auth.currentUser) {
          await updateProfile(auth.currentUser, {
            displayName: fullName,
          });
        }
      }

      router.push("/home");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  return (
    <>
      <Head>
        <title>{isLogin ? "Login" : "Register"}</title>
        <meta name="description" content="A simple authentication app with Firebase and Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#111",
          color: "#f0f0f0",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <h2 style={{ marginBottom: "1.5rem", fontSize: "24px" }}>
          {isLogin ? "Login" : "Register"}
        </h2>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            width: "300px",
          }}
        >
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              style={inputStyle}
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyle}
          />

          {error && (
            <p style={{ color: "red", fontSize: "14px", margin: 0 }}>{error}</p>
          )}

          <button type="submit" style={buttonStyle}>
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <p style={{ marginTop: "1rem", fontSize: "14px" }}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            style={{
              background: "none",
              border: "none",
              color: "#4DA1FF",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </>
  );
}
