import { Link } from "react-router-dom";
import { DiamondIcon } from "./icons.jsx";

export default function AppTop() {
  return (
    <div className="app-top">
      <Link className="brand" to="/">
        <DiamondIcon className="brand-mark" />
        <span className="brand-name">Dear Guest</span>
      </Link>
      <Link className="app-back" to="/">
        ← Volver al sitio
      </Link>
    </div>
  );
}
