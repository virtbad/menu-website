import React from "react";
import style from "../../styles/modules/system/Avatar.module.scss";

interface AvatarProps {
  size?: "small" | "normal" | "big";
  src?: string;
}

/**
 * Rounded avatar component
 */

const Avatar: React.FC<AvatarProps> = ({ size = "normal", src }): JSX.Element => {
  return (
    <div data-size={size} className={style["avatar-container"]}>
      {src && <img src={src} alt={""} />}
    </div>
  );
};

export default Avatar;
