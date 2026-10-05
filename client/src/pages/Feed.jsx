import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";
import { useAuth } from "../auth";
import { Cover } from "../components/Cover";
import { findTrack } from "../data/library";

function formatDate(value) {
  return new Date(value).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function songLine(label) {
  const track = findTrack(label);
  return track ? `${track.title} · ${track.artist}` : label;
}

export function Feed() {
  const { user, ready } = useAuth();
  const [playlists, setPlaylists] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!ready) return undefined;
    let cancelled = false;
    setLoading(true);
    api("/api/playlists")
      .then((data) => {
        if (!cancelled) setPlaylists(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [ready, user]);

  return (
    <section>
      <div className="page-head">
        <div>
          <h1>Shared playlists</h1>
          <p className="lede">Open a playlist to see every song, then like it or leave a comment.</p>
        </div>
        {user ? (
          <Link to="/playlists/new" className="button">
            New playlist
          </Link>
        ) : (
          <Link to="/library" className="button ghost">
            Browse the library
          </Link>
        )}
      </div>

      {error ? (
        <p className="banner" role="alert">
          {error}
        </p>
      ) : null}
      {loading ? <p className="status">Loading playlists…</p> : null}
      {!loading && !error && playlists.length === 0 ? (
        <p className="empty">
          No playlists yet.{" "}
          {user ? <Link to="/playlists/new">Share the first one.</Link> : <Link to="/register">Register to share one.</Link>}
        </p>
      ) : null}

      <div className="album-grid">
        {playlists.map((playlist) => (
          <article key={playlist._id} className="album">
            <Link to={`/playlists/${playlist._id}`} className="album-link">
              <Cover seed={playlist.title} size="lg" />
              <h2>{playlist.title}</h2>
              <p className="meta">
                {playlist.owner?.name || "Someone"} · {formatDate(playlist.createdAt)}
              </p>
              <p className="meta">
                {playlist.songs.length} {playlist.songs.length === 1 ? "song" : "songs"} · {playlist.likeCount}{" "}
                {playlist.likeCount === 1 ? "like" : "likes"}
              </p>
              <ul className="preview-lines">
                {playlist.songs.slice(0, 3).map((label, index) => (
                  <li key={`${label}-${index}`}>{songLine(label)}</li>
                ))}
              </ul>
              {playlist.songs.length > 3 ? <p className="meta">+ {playlist.songs.length - 3} more in the playlist</p> : null}
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
