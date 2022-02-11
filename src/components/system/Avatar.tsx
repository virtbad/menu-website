import React, { forwardRef } from "react";
import style from "../../styles/modules/system/Avatar.module.scss";

interface AvatarProps {
  size?: "small" | "normal" | "big";
  src?: string;
  onClick?: () => void;
}

/**
 * Rounded avatar component
 */

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(({ size = "normal", src, onClick }, ref): JSX.Element => {
  return (
    <div data-size={size} className={style["avatar-container"]} onClick={onClick} ref={ref}>
      {src && <img src={src} alt={""} />}
    </div>
  );
});

export default Avatar;
