import { Routes, Route } from "react-router-dom";
import MapPage from "./MapPage";
import HomePage from "./HomePage";

function AuthRouter() {
  return (
    <div className="auth" >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/map" element={<MapPage />} />
      </Routes>
    </div>
  );
}

export default AuthRouter;
