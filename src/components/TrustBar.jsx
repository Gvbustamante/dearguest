import { trustStats } from "../data/content.js";

export default function TrustBar() {
  return (
    <div className="trust">
      <div className="container trust-row">
        {trustStats.map((stat) => (
          <div className="trust-item" key={stat.l}>
            <div className="trust-n">{stat.n}</div>
            <div className="trust-l">{stat.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
