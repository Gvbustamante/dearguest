import { ICONS } from "./icons.jsx";

export default function BenefitCard({ title, body, icon }) {
  const Icon = ICONS[icon];
  return (
    <div className="benefit">
      {Icon ? <Icon /> : null}
      <h3>{title}</h3>
      <p>{body}</p>
    </div>
  );
}
