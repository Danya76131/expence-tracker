import icon from "../../../assets/icons/sprite.svg";
/**
 * Icon component — a universal SVG icon renderer.
 *
 * Uses the sprite from `../../assets/icons/sprite.svg` to display icons by their id.
 * Allows customization of size, fill, stroke, and additional class names.
 *
 * Props:
 * - `name` (string, default: "logo") — ID of the icon in the sprite (e.g., "burger-menu", "error", "check", etc.).
 * - `className` (string, optional) — additional CSS classes.
 * - `size` (number, default: 16) — width and height of the icon in pixels.
 * - `fill` (string, optional) — SVG fill color.
 * - `stroke` (string, optional) — SVG stroke color.
 *
 * Example usage:
 * ```jsx
 * <Icon name="calendar" size={24} fill="#333" />
 * <Icon name="chevron-down" className="rotate" stroke="#999" />
 * ```
 *
 * Available icon IDs:
 * "logo", "burger-menu", "error", "success", "arrow-down", "arrow-up", "calendar",
 * "check", "chevron-down", "chevron-up", "clock", "close", "edit", "eye", "eye-off",
 * "log-out", "user-avatar", "search", "trash", "user"
 */

const Icon = ({
  name = "logo",
  className,
  size = 16,
  fill = "currentColor",
  stroke = "currentColor",
  ...rest
}) => {
  return (
    <svg
      className=""
      e={className}
      fill={fill}
      stroke={stroke}
      width={size}
      height={size}
      {...rest}
    >
      <use href={`${icon}#${name}`} />
    </svg>
  );
};

export default Icon;
