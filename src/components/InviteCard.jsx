import { CheckIcon, DiamondIcon } from "./icons.jsx";

export default function InviteCard({ name = "Valentina", date = "15 de noviembre · Barranquilla", confirmations = 128 }) {
  const initial = name.charAt(0).toUpperCase();
  return (
    <div className="invite-wrap">
      <div className="invite-card">
        <div className="wax-seal" aria-hidden="true">
          <DiamondIcon />
        </div>
        <div className="invite-top">
          <div className="invite-mono">{initial}</div>
        </div>
        <div className="invite-name">{name}</div>
        <div className="invite-date">{date}</div>
        <div className="invite-divider" />
        <div className="invite-row">
          <div className="invite-scan">Escanea para confirmar tu asistencia</div>
          <div className="invite-qr" aria-hidden="true" />
        </div>
      </div>
      <div className="float-card">
        <CheckIcon />
        {confirmations} confirmaron
      </div>
    </div>
  );
}
