export default function Button({ href, variant = "primary", icon, children, external = true, ...rest }) {
  const className = `btn btn-${variant}`;
  const target = external ? "_blank" : undefined;
  const rel = external ? "noopener" : undefined;
  return (
    <a className={className} href={href} target={target} rel={rel} {...rest}>
      {icon}
      {children}
    </a>
  );
}
