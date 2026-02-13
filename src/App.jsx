import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Mode from "./pages/Mode";
import Private from "./pages/Private";
import Room from "./pages/Room";
import Match from "./pages/Match";

function App() {
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";

  return (
    <BrowserRouter>
      <Routes>

        {/* If NOT logged in */}
        {!isLoggedIn && (
          <>
            <Route path="*" element={<Login />} />
          </>
        )}

        {/* If logged in */}
        {isLoggedIn && (
          <>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/mode" element={<Mode />} />
            <Route path="/private" element={<Private />} />
            <Route path="/room/:code" element={<Room />} />
            <Route path="/match" element={<Match />} />
          </>
        )}

      </Routes>
    </BrowserRouter>
  );
}

export default App;

