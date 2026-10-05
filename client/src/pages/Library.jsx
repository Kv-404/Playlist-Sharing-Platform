import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth";
import { Catalog } from "../components/Catalog";
import { songLabel } from "../data/library";
import { useDraft } from "../draft";

const MAX_SONGS = 50;

export function Library() {
  const { user } = useAuth();
  const [songs, setSongs] = useDraft();
  const [notice, setNotice] = useState("");

  function toggle(label) {
    if (songs.includes(label)) {
      setNotice("");
      setSongs(songs.filter((item) => item !== label));
      return;
    }
    if (songs.length >= MAX_SONGS) {
      setNotice("A playlist can hold 50 songs.");
      return;
    }
    setNotice("");
    setSongs([...songs, label]);
  }

  const continueTo = user ? "/playlists/new" : "/register";

  return (
    <section>
      <div className="page-head">
        <div>
          <h1>Library</h1>
          <p className="lede">
            Every song in the catalog. Add the ones you want, then save them on a playlist. This app shares titles. It does not play audio.
          </p>
        </div>
        {songs.length > 0 ? (
          <Link to={continueTo} className="button">
            Continue with {songs.length} {songs.length === 1 ? "song" : "songs"}
          </Link>
        ) : (
          <Link to={user ? "/playlists/new" : "/register"} className="button">
            {user ? "New playlist" : "Register to share"}
          </Link>
        )}
      </div>
      {notice ? (
        <p className="banner" role="status">
          {notice}
        </p>
      ) : null}
      <Catalog
        heading=""
        renderAction={(track) => {
          const label = songLabel(track);
          const added = songs.includes(label);
          return (
            <button type="button" className={added ? "button ghost" : "button"} aria-pressed={added} onClick={() => toggle(label)}>
              {added ? "Added" : "Add"}
            </button>
          );
        }}
      />
    </section>
  );
}
