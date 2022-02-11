import Link from "next/link";
import React, { forwardRef } from "react";
import style from "../../styles/modules/system/Button.module.scss";

interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  href?: string;
  theme?: "white" | "green" | "primary" | "secondary";
  endIcon?: JSX.Element;
  startIcon?: JSX.Element;
}

/**
 * Button component
 */

const Button: React.FC<ButtonProps> = ({ href, ...props }): JSX.Element => {
  if (href) return <Link href={href} children={<ButtonBase {...props} />} />;
  else return <ButtonBase {...props} />;
};

/**
 * Base button component
 */

const ButtonBase: React.FC = forwardRef<ButtonProps, any>(({ href, theme = "white", className, endIcon, startIcon, children, ...props }, ref): JSX.Element => {
  return (
    <button ref={ref} className={`${style["button-root"]} ${className}`} data-theme={theme} {...props}>
      {startIcon && <span data-startadornment children={startIcon} />}
      {children}
      {endIcon && <span data-endadornment children={endIcon} />}
    </button>
  );
});

export default Button;