import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider, RequireAuth } from "./auth";
import { Layout } from "./components/Layout";
import { CreatePlaylist } from "./pages/CreatePlaylist";
import { Feed } from "./pages/Feed";
import { Library } from "./pages/Library";
import { Login } from "./pages/Login";
import { PlaylistDetails } from "./pages/PlaylistDetails";
import { Register } from "./pages/Register";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Feed />} />
            <Route path="library" element={<Library />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route
              path="playlists/new"
              element={
                <RequireAuth>
                  <CreatePlaylist />
                </RequireAuth>
              }
            />
            <Route path="playlists/:id" element={<PlaylistDetails />} />
            <Route path="*" element={<p className="status">That page does not exist.</p>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
