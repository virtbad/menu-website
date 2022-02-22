import LightModeIcon from "@mui/icons-material/LightMode";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import React, { useRef, useState } from "react";
import { useAuth } from "../hooks/AuthContext";
import { useTheme } from "../hooks/ThemeContext";
import { Avatar, Menu, MenuItem } from "./system";

/**
 * Component for the profile section in the header
 */

const QuickProfile: React.FC = (): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);
  const avatarRef = useRef<HTMLDivElement>(null);
  const { theme, switchTheme } = useTheme();
  const { token, requestToken, logout } = useAuth();
  return (
    <>
      <Avatar pointer onClick={() => setOpen(true)} ref={avatarRef} size={"small"} />
      <Menu style={{ marginTop: "0.5rem" }} open={open} anchorEl={avatarRef.current} onClose={() => setOpen(false)}>
        {theme === "light" && <MenuItem children={"Helles Design"} endIcon={<LightModeIcon />} onClick={switchTheme} />}
        {theme === "dark" && <MenuItem children={"Dunkles Design"} endIcon={<ModeNightIcon />} onClick={switchTheme} />}
        {token && <MenuItem children={"Abmelden"} onClick={logout} />}
        {!token && <MenuItem children={"Anmelden"} onClick={requestToken} />}
      </Menu>
    </>
  );
};

export default QuickProfile;
