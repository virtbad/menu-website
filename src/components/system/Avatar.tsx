import React, { forwardRef, useEffect, useState } from "react";
import { User } from "../../classes/User.class";
import { useUser } from "../../hooks/UserContext";
import style from "../../styles/modules/system/Avatar.module.scss";
import { hexToHsl } from "../../util/util";

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
  const [hsl, setHsl] = useState<{ h: number; s: number; l: number }>({ h: 0, s: 0, l: 0 });
  const user: User = useUser();
  let homeAccent: string = "#ffffff";
  if (typeof window === "object") homeAccent = getComputedStyle(document.documentElement).getPropertyValue("--home-accent");
  homeAccent = homeAccent.replace("#", "");
  useEffect(() => {
    setHsl(hexToHsl(color ? color : homeAccent.length > 6 ? homeAccent.substring(0, 7) : homeAccent));
  }, [color]);
  const gradient: string = `linear-gradient(204deg, hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%) 22%,  hsl(${hsl.h}, ${hsl.s}%, ${hsl.l - 20}%) 85%)`;

  return (
    <div data-size={size} className={style["avatar-container"]} style={{ cursor: pointer ? "pointer" : "default", background: hsl.h === 0 ? "transparent" : gradient }} onClick={onClick} ref={ref}>
      {src && <img src={src} alt={""} />}
      {user && <code style={{ fontSize: "1.5rem", color: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l - 30}%)` }} children={`${user.firstname.substring(0, 1).toUpperCase()}${user.lastname.substring(0, 1).toUpperCase()}`} />}
    </div>
  );
});

export default Avatar;
