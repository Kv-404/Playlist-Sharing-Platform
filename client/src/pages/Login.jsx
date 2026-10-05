import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { api } from "../api";
import { useAuth } from "../auth";

export function Login() {
  const { user, setSession } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  if (user) {
    return <Navigate to={location.state?.from || "/"} replace />;
  }

  function update(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function onSubmit(event) {
    event.preventDefault();
    setError("");
    setPending(true);
    try {
      const data = await api("/api/auth/login", { method: "POST", body: form, auth: false });
      setSession(data.user, data.token);
      navigate(location.state?.from || "/");
    } catch (err) {
      setError(err.message);
    } finally {
      setPending(false);
    }
  }

  return (
    <section className="narrow">
      <h1>Log in</h1>
      <p className="lede">Pick up your playlists, likes, and comments.</p>
      <form className="stack" onSubmit={onSubmit}>
        {error ? (
          <p className="banner" role="alert">
            {error}
          </p>
        ) : null}
        <label>
          Email
          <input name="email" type="email" value={form.email} onChange={update} autoComplete="email" required />
        </label>
        <label>
          Password
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={update}
            autoComplete="current-password"
            required
          />
        </label>
        <button type="submit" className="button" disabled={pending}>
          {pending ? "Logging in…" : "Log in"}
        </button>
      </form>
      <p className="switch">
        New here? <Link to="/register">Create an account</Link>
      </p>
    </section>
  );
}
