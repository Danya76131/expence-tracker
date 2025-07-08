import clsx from "clsx";
import styles from "./Button.module.css";

/**
 * Reusable Button component with support for variants, spacing, full width, and accessibility.
 *
 * @param {object} props - Component props
 * @param {string} [props.className] - Additional class for custom styling
 * @param {number|string} [props.gap] - Gap between icon and text
 * @param {string} [props.variant="accent"] - Style variant of the button
 * @param {string} [props.type="button"] - Button type (button, submit, reset)
 * @param {boolean} [props.disabled=false] - Disable button
 * @param {boolean} [props.fullWidth=false] - If true, button stretches to 100% width
 * @param {string} [props.ariaLabel] - Accessibility label (for icon-only buttons)
 * @param {React.ReactNode} props.children - Button content
 *
 * @returns {JSX.Element}
 */

const Button = ({
  type = "button",
  className,
  gap,
  variant = "accent",
  disabled = false,
  ariaLabel,
  children,
  fullWidth,
  ...props
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      aria-label={ariaLabel}
      className={clsx(
        className,
        styles.basic,
        styles[variant],
        fullWidth && styles.fullWidth
      )}
      {...props}
    >
      <span className={styles.content} style={{ gap }}>
        {children}
      </span>
    </button>
  );
};

export default Button;
