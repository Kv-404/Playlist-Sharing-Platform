import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "../api";
import { useAuth } from "../auth";
import { Cover } from "../components/Cover";
import { SongPicker } from "../components/SongPicker";
import { TrackRow } from "../components/TrackRow";

export function PlaylistDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [playlist, setPlaylist] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [saving, setSaving] = useState(false);
  const [posting, setPosting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [editing, setEditing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [commentPendingDelete, setCommentPendingDelete] = useState(null);
  const [draft, setDraft] = useState({ title: "", description: "", songs: [] });

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");
    api(`/api/playlists/${id}`)
      .then((data) => {
        if (!cancelled) setPlaylist(data);
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
  }, [id]);

  const isOwner = Boolean(user && playlist && String(playlist.owner?._id) === String(user._id));

  function startEdit() {
    setDraft({
      title: playlist.title,
      description: playlist.description || "",
      songs: playlist.songs.slice(),
    });
    setEditing(true);
    setConfirmDelete(false);
    setError("");
  }

  async function onLike() {
    setError("");
    try {
      const result = await api(`/api/playlists/${id}/like`, { method: "POST" });
      setPlaylist((current) => ({
        ...current,
        likedByMe: result.liked,
        likeCount: result.likeCount,
      }));
    } catch (err) {
      setError(err.message);
    }
  }

  async function onSave(event) {
    event.preventDefault();
    if (draft.songs.length === 0) {
      setError("Add at least one song from the library or type a title.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const updated = await api(`/api/playlists/${id}`, {
        method: "PATCH",
        body: { title: draft.title, description: draft.description, songs: draft.songs },
      });
      setPlaylist((current) => ({ ...updated, comments: current.comments }));
      setEditing(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function onDelete() {
    setDeleting(true);
    setError("");
    try {
      await api(`/api/playlists/${id}`, { method: "DELETE" });
      navigate("/");
    } catch (err) {
      setError(err.message);
      setDeleting(false);
    }
  }

  async function onComment(event) {
    event.preventDefault();
    setPosting(true);
    setError("");
    try {
      const created = await api(`/api/playlists/${id}/comments`, {
        method: "POST",
        body: { text: comment },
      });
      setPlaylist((current) => ({ ...current, comments: [...current.comments, created] }));
      setComment("");
    } catch (err) {
      setError(err.message);
    } finally {
      setPosting(false);
    }
  }

  async function onDeleteComment(commentId) {
    setError("");
    try {
      await api(`/api/comments/${commentId}`, { method: "DELETE" });
      setPlaylist((current) => ({
        ...current,
        comments: current.comments.filter((item) => item._id !== commentId),
      }));
      setCommentPendingDelete(null);
    } catch (err) {
      setError(err.message);
    }
  }

  if (loading) {
    return <p className="status">Loading playlist…</p>;
  }
  if (!playlist) {
    return (
      <section className="narrow">
        <p className="banner" role="alert">
          {error || "Playlist not found"}
        </p>
        <Link to="/">Back to playlists</Link>
      </section>
    );
  }

  return (
    <section>
      <p className="meta">
        <Link to="/">All playlists</Link>
      </p>
      {error ? (
        <p className="banner" role="alert">
          {error}
        </p>
      ) : null}

      {editing ? (
        <form className="stack" onSubmit={onSave}>
          <h1>Edit playlist</h1>
          <label>
            Title
            <input
              value={draft.title}
              onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))}
              required
              minLength={2}
              maxLength={100}
            />
          </label>
          <label>
            Description
            <textarea
              value={draft.description}
              onChange={(event) => setDraft((current) => ({ ...current, description: event.target.value }))}
              maxLength={500}
              rows={3}
            />
          </label>
          <SongPicker
            songs={draft.songs}
            onChange={(songs) => setDraft((current) => ({ ...current, songs }))}
          />
          <div className="form-actions">
            <button type="submit" className="button" disabled={saving}>
              {saving ? "Saving…" : "Save changes"}
            </button>
            <button type="button" className="button ghost" onClick={() => setEditing(false)}>
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="hero">
            <Cover seed={playlist.title} size="xl" />
            <div>
              <p className="eyebrow">Playlist</p>
              <h1>{playlist.title}</h1>
              <p className="meta">By {playlist.owner?.name || "Someone"}</p>
              {playlist.description ? <p className="lede">{playlist.description}</p> : null}
              <div className="row">
                {user ? (
                  <button type="button" className="button" onClick={onLike} aria-pressed={playlist.likedByMe}>
                    {playlist.likedByMe ? "Liked" : "Like"} · {playlist.likeCount}
                  </button>
                ) : (
                  <Link to="/login" className="button" state={{ from: `/playlists/${id}` }}>
                    Log in to like · {playlist.likeCount}
                  </Link>
                )}
              </div>
            </div>
          </div>
          <section className="catalog">
            <div className="section-head">
              <h2>Songs</h2>
              <p className="meta">{playlist.songs.length}</p>
            </div>
            <ol className="track-list">
              {playlist.songs.map((label, index) => (
                <li key={`${label}-${index}`}>
                  <TrackRow label={label} index={index} />
                </li>
              ))}
            </ol>
          </section>
          {isOwner ? (
            <div className="row owner-actions">
              <button type="button" className="button ghost" onClick={startEdit}>
                Edit
              </button>
              {confirmDelete ? (
                <>
                  <span>Delete this playlist and its comments?</span>
                  <button type="button" className="button danger" onClick={onDelete} disabled={deleting}>
                    {deleting ? "Deleting…" : "Delete"}
                  </button>
                  <button type="button" className="button ghost" onClick={() => setConfirmDelete(false)}>
                    Cancel
                  </button>
                </>
              ) : (
                <button type="button" className="button danger" onClick={() => setConfirmDelete(true)}>
                  Delete
                </button>
              )}
            </div>
          ) : null}
        </>
      )}

      <section className="comments">
        <h2>Comments</h2>
        {playlist.comments.length === 0 ? <p className="meta">No comments yet.</p> : null}
        <ul className="comment-list">
          {playlist.comments.map((item) => {
            const mine = user && String(item.user?._id) === String(user._id);
            return (
              <li key={item._id}>
                <p className="meta">{item.user?.name || "Someone"}</p>
                <p>{item.text}</p>
                {mine ? (
                  commentPendingDelete === item._id ? (
                    <div className="row">
                      <button type="button" className="linkish danger-text" onClick={() => onDeleteComment(item._id)}>
                        Confirm delete
                      </button>
                      <button type="button" className="linkish" onClick={() => setCommentPendingDelete(null)}>
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button type="button" className="linkish" onClick={() => setCommentPendingDelete(item._id)}>
                      Delete
                    </button>
                  )
                ) : null}
              </li>
            );
          })}
        </ul>

        {user ? (
          <form className="stack" onSubmit={onComment}>
            <label>
              Add a comment
              <textarea
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                required
                maxLength={500}
                rows={3}
              />
            </label>
            <button type="submit" className="button" disabled={posting}>
              {posting ? "Posting…" : "Post comment"}
            </button>
          </form>
        ) : (
          <p>
            <Link to="/login" state={{ from: `/playlists/${id}` }}>
              Log in
            </Link>{" "}
            to comment.
          </p>
        )}
      </section>
    </section>
  );
}
