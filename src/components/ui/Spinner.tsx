export function Spinner({
  size = 48,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <img
      src="/images/new_assets/appalam_rotation.png"
      alt="Loading"
      width={size}
      height={size}
      className={`inline-block shrink-0 ${className}`}
      style={{ animation: "appalam-spin 1s linear infinite", width: size, height: size }}
    />
  );
}
