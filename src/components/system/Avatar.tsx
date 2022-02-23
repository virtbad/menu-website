import React, { forwardRef } from "react";
import style from "../../styles/modules/system/Avatar.module.scss";

interface AvatarProps {
  size?: "small" | "normal" | "big" | "text";
  src?: string;
  onClick?: () => void;
  pointer?: boolean;
  color?: string;
}

/**
 * Rounded avatar component
 */

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(({ color, size = "normal", src, onClick, pointer = false }, ref): JSX.Element => {
  return (
    <div data-size={size} className={style["avatar-container"]} style={{ cursor: pointer ? "pointer" : "default", backgroundColor: color }} onClick={onClick} ref={ref}>
      {src && <img src={src} alt={""} />}
    </div>
  );
});

export default Avatar;
