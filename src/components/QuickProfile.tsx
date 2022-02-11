import React, { useRef, useState } from "react";
import { Avatar, Menu, MenuItem } from "./system";

/**
 * Component for the profile section in the header
 */

const QuickProfile: React.FC = (): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);
  const avatarRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <Avatar onClick={() => setOpen(true)} ref={avatarRef} size={"small"} />
      <Menu open={open} anchorEl={avatarRef.current} onClose={() => setOpen(false)}>
        <MenuItem children={"Theme"} />
      </Menu>
    </>
  );
};

export default QuickProfile;
