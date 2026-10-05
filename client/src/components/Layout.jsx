import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../auth";

function itemClass({ isActive }) {
  return isActive ? "side-link active" : "side-link";
}

function IconHome() {
  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1z" fill="currentColor" />
    </svg>
  );
}

function IconLibrary() {
  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 5h12a2 2 0 0 1 2 2v12H6a2 2 0 0 0-2 2V5z" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M8 5v14M18 7h2v12H8" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function IconPlus() {
  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function onLogout() {
    logout();
    navigate("/");
  }

  return (
    <div className="shell">
      <aside className="sidebar">
        <Link to="/" className="brand">
          Playlist Share
        </Link>
        <nav className="side-nav" aria-label="Primary">
          <NavLink to="/" end className={itemClass}>
            <IconHome />
            Home
          </NavLink>
          <NavLink to="/library" className={itemClass}>
            <IconLibrary />
            Library
          </NavLink>
          {user ? (
            <NavLink to="/playlists/new" className={itemClass}>
              <IconPlus />
              New playlist
            </NavLink>
          ) : (
            <Link to="/login" state={{ from: "/playlists/new" }} className="side-link">
              <IconPlus />
              New playlist
            </Link>
          )}
        </nav>
      </aside>

      <div className="workspace">
        <header className="topbar">
          <Link to="/" className="brand brand-mobile">
            Playlist Share
          </Link>
          <nav className="nav">
            {user ? (
              <>
                <span className="who">{user.name}</span>
                <button type="button" className="linkish" onClick={onLogout}>
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link to="/login">Log in</Link>
                <Link to="/register" className="button">
                  Register
                </Link>
              </>
            )}
          </nav>
        </header>
        <main className="page">
          <Outlet />
        </main>
      </div>

      <nav className="tabbar" aria-label="Primary">
        <NavLink to="/" end className={itemClass}>
          <IconHome />
          Home
        </NavLink>
        <NavLink to="/library" className={itemClass}>
          <IconLibrary />
          Library
        </NavLink>
        {user ? (
          <NavLink to="/playlists/new" className={itemClass}>
            <IconPlus />
            New
          </NavLink>
        ) : (
          <Link to="/login" state={{ from: "/playlists/new" }} className="side-link">
            <IconPlus />
            New
          </Link>
        )}
      </nav>
    </div>
  );
}
