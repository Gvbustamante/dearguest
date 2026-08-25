import { Link } from "react-router-dom";

export default function Button({ href, to, variant = "primary", icon, children, external = true, ...rest }) {
  const className = `btn btn-${variant}`;
  if (to) {
    return (
      <Link className={className} to={to} {...rest}>
        {icon}
        {children}
      </Link>
    );
  }
  const target = external ? "_blank" : undefined;
  const rel = external ? "noopener" : undefined;
  return (
    <a className={className} href={href} target={target} rel={rel} {...rest}>
      {icon}
      {children}
    </a>
  );
}
