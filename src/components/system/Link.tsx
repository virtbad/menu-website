import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { useRouter } from "next/router";
import React from "react";
import style from "../../styles/modules/system/Link.module.scss";

interface LinkProps extends NextLinkProps {
  disabled?: boolean;
  external?: boolean;
}

/**
 * Link component
 */

const Link: React.FC<LinkProps> = ({ disabled = false, external = false, href, ...rest }): JSX.Element => {
  const router = useRouter();
  const isCurrentUrl = router.pathname.toLowerCase() === href.toString().toLowerCase() && !external;
  return (
    <span data-disabled={disabled} className={style["link"]}>
      {isCurrentUrl && rest.children}
      {!disabled && !external && !isCurrentUrl && <NextLink href={href} {...rest} />}
      {!disabled && external && <a target={"_blank"} href={href.toString()} {...rest}></a>}
    </span>
  );
};

export default Link;
