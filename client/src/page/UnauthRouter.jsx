import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import MapPage from "./MapPage";

function UnauthRouter() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default UnauthRouter;
