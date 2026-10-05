import { useMemo, useState } from "react";
import { GENRES, LIBRARY, songLabel } from "../data/library";
import { TrackRow } from "./TrackRow";

export function Catalog({ heading = "Songs", renderAction }) {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("All");

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return LIBRARY.filter((track) => {
      if (genre !== "All" && track.genre !== genre) return false;
      if (!needle) return true;
      return `${track.title} ${track.artist} ${track.album} ${track.genre}`.toLowerCase().includes(needle);
    });
  }, [query, genre]);

  return (
    <section className="catalog">
      {heading ? <h2>{heading}</h2> : null}
      <label>
        Search the library
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Title, artist, or album"
        />
      </label>
      <div className="chips" role="group" aria-label="Filter by genre">
        {["All", ...GENRES].map((item) => (
          <button
            key={item}
            type="button"
            className={item === genre ? "chip on" : "chip"}
            aria-pressed={item === genre}
            onClick={() => setGenre(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <p className="meta">
        {filtered.length} of {LIBRARY.length} songs
      </p>
      {filtered.length === 0 ? <p className="empty">No songs match that search.</p> : null}
      <ul className="track-list clip">
        {filtered.map((track) => (
          <li key={track.id}>
            <TrackRow track={track}>
              {renderAction ? renderAction(track, songLabel(track)) : null}
            </TrackRow>
          </li>
        ))}
      </ul>
    </section>
  );
}
