import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import { SongPicker } from "../components/SongPicker";
import { clearDraft, useDraft } from "../draft";

export function CreatePlaylist() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [songs, setSongs] = useDraft();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    if (songs.length === 0) {
      setError("Add at least one song from the library or type a title.");
      return;
    }

    setError("");
    setPending(true);
    try {
      const playlist = await api("/api/playlists", {
        method: "POST",
        body: { title, description, songs },
      });
      clearDraft();
      navigate(`/playlists/${playlist._id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setPending(false);
    }
  }

  return (
    <section>
      <h1>New playlist</h1>
      <p className="lede">Pick songs from the full library. It is shared with everyone as soon as you save it.</p>
      <form className="stack" onSubmit={onSubmit}>
        {error ? (
          <p className="banner" role="alert">
            {error}
          </p>
        ) : null}
        <div className="form-grid">
          <label>
            Title
            <input value={title} onChange={(event) => setTitle(event.target.value)} required minLength={2} maxLength={100} />
          </label>
          <label>
            Description
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              maxLength={500}
              rows={3}
            />
          </label>
        </div>
        <SongPicker songs={songs} onChange={setSongs} />
        <div className="form-actions">
          <button type="submit" className="button" disabled={pending}>
            {pending ? "Sharing…" : "Share playlist"}
          </button>
        </div>
      </form>
    </section>
  );
}
