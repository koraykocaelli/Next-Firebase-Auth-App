import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { auth } from "../lib/firebaseConfig";
import { signOut } from "firebase/auth";

export default function HomePage() {
  const router = useRouter();
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      router.push("/");
    } else {
      setDisplayName(user.displayName);
    }
    setLoading(false);
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#111",
          color: "#f0f0f0",
          fontFamily: "Arial, sans-serif",
          fontSize: "20px",
        }}
      >
        Redirecting...
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Welcome</title>
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
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <h1 style={{ fontSize: "28px", marginBottom: "1rem" }}>
          Hey, {displayName || "there"}! You’re successfully logged in.
        </h1>
        <button
          onClick={handleLogout}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#FF4D4D",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            transition: "opacity 0.2s ease-in-out",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Logout
        </button>
      </div>
    </>
  );
}
