import { Routes, Route } from "react-router-dom";
import MapPage from "./MapPage";

function AuthRouter() {
  return (
    <div className="App">
      <Routes>
        <Route path="/map" element={<MapPage />} />
      </Routes>
    </div>
  );
}

export default AuthRouter;
