import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { api } from "../api";
import { useAuth } from "../auth";
import { readDraft } from "../draft";

export function Register() {
  const { user, setSession } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const destination = location.state?.from || (readDraft().length ? "/playlists/new" : "/");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  if (user) {
    return <Navigate to={destination} replace />;
  }

  function update(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function onSubmit(event) {
    event.preventDefault();
    setError("");
    setPending(true);
    try {
      const data = await api("/api/auth/register", { method: "POST", body: form, auth: false });
      setSession(data.user, data.token);
      navigate(destination);
    } catch (err) {
      setError(err.message);
    } finally {
      setPending(false);
    }
  }

  return (
    <section className="narrow">
      <h1>Create an account</h1>
      <p className="lede">Share playlists, and like or comment on ones from other people.</p>
      <form className="stack" onSubmit={onSubmit}>
        {error ? (
          <p className="banner" role="alert">
            {error}
          </p>
        ) : null}
        <label>
          Name
          <input name="name" value={form.name} onChange={update} autoComplete="name" required minLength={2} maxLength={60} />
        </label>
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
            autoComplete="new-password"
            required
            minLength={6}
            maxLength={72}
          />
        </label>
        <button type="submit" className="button" disabled={pending}>
          {pending ? "Creating account…" : "Register"}
        </button>
      </form>
      <p className="switch">
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </section>
  );
}
