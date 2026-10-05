import { useState } from "react";
import { songLabel } from "../data/library";
import { Catalog } from "./Catalog";
import { TrackRow } from "./TrackRow";

const MAX_SONGS = 50;

function IconUp() {
  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 14l6-6 6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconDown() {
  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 10l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function SongPicker({ songs, onChange }) {
  const [custom, setCustom] = useState("");
  const [notice, setNotice] = useState("");

  function addLabel(label) {
    const trimmed = label.trim().replace(/\s+/g, " ");
    if (!trimmed) return false;
    if (trimmed.length > 120) {
      setNotice("Each song title must be 120 characters or fewer.");
      return false;
    }
    if (songs.includes(trimmed)) {
      setNotice("That song is already in this playlist.");
      return false;
    }
    if (songs.length >= MAX_SONGS) {
      setNotice("A playlist can hold 50 songs.");
      return false;
    }
    setNotice("");
    onChange([...songs, trimmed]);
    return true;
  }

  function removeAt(index) {
    setNotice("");
    onChange(songs.filter((_, itemIndex) => itemIndex !== index));
  }

  function move(index, direction) {
    const next = index + direction;
    if (next < 0 || next >= songs.length) return;
    const copy = songs.slice();
    const [item] = copy.splice(index, 1);
    copy.splice(next, 0, item);
    onChange(copy);
  }

  function onCustom() {
    if (addLabel(custom)) setCustom("");
  }

  return (
    <div className="picker">
      <section className="catalog">
        <div className="section-head">
          <h2>In this playlist</h2>
          <p className="meta">
            {songs.length} / {MAX_SONGS}
          </p>
        </div>
        {notice ? (
          <p className="banner" role="status">
            {notice}
          </p>
        ) : null}
        {songs.length === 0 ? (
          <p className="empty">Add songs from the library, or type a title that is not listed.</p>
        ) : (
          <ol className="track-list clip">
            {songs.map((label, index) => (
              <li key={label}>
                <TrackRow label={label} index={index}>
                  <button
                    type="button"
                    className="icon-button"
                    aria-label={`Move ${label} up`}
                    onClick={() => move(index, -1)}
                    disabled={index === 0}
                  >
                    <IconUp />
                  </button>
                  <button
                    type="button"
                    className="icon-button"
                    aria-label={`Move ${label} down`}
                    onClick={() => move(index, 1)}
                    disabled={index === songs.length - 1}
                  >
                    <IconDown />
                  </button>
                  <button type="button" className="icon-button" aria-label={`Remove ${label}`} onClick={() => removeAt(index)}>
                    Remove
                  </button>
                </TrackRow>
              </li>
            ))}
          </ol>
        )}
        <div className="custom-song">
          <label>
            Song not in the library
            <input
              value={custom}
              onChange={(event) => setCustom(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  onCustom();
                }
              }}
              maxLength={120}
              placeholder="Type a title"
            />
          </label>
          <button type="button" className="button ghost" onClick={onCustom}>
            Add title
          </button>
        </div>
      </section>

      <Catalog
        heading="Full library"
        renderAction={(track, label) => {
          const added = songs.includes(label);
          return (
            <button
              type="button"
              className={added ? "button ghost" : "button"}
              onClick={() => addLabel(songLabel(track))}
              disabled={added}
            >
              {added ? "Added" : "Add"}
            </button>
          );
        }}
      />
    </div>
  );
}
