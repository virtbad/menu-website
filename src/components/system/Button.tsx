import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Link from "next/link";
import React, { forwardRef } from "react";
import style from "../../styles/modules/system/Button.module.scss";

interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  href?: string;
  theme?: "white" | "green";
  endIcon?: JSX.Element;
  forwardIcon?: boolean;
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

const ButtonBase: React.FC = forwardRef<ButtonProps, any>(({ forwardIcon, href, theme = "white", className, endIcon, children, ...props }, ref): JSX.Element => {
  return (
    <button ref={ref} className={`${style["button-root"]} ${className}`} data-theme={theme} {...props}>
      {children}
      {(endIcon || forwardIcon) && <span data-endadornment children={forwardIcon ? <ArrowForwardIcon /> : endIcon} />}
    </button>
  );
});

export default Button;
