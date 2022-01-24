import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { useRouter } from "next/router";
import React from "react";
import style from "../../styles/modules/system/Link.module.scss";

interface LinkProps extends NextLinkProps {
  disabled?: boolean;
  noUnderline?: boolean;
}

const EXTERNAL_URL_PATTERN: RegExp = /^http(s)?:\/\/*/; // pattern to match whether the href is external or al

/**
 * Link component
 */

const Link: React.FC<LinkProps> = ({ disabled = false, noUnderline = false, href, ...rest }): JSX.Element => {
  const router = useRouter();
  const isExternal: boolean = !!href.toString().match(EXTERNAL_URL_PATTERN);
  const isCurrentUrl = router.pathname.toLowerCase() === href.toString().toLowerCase() && !isExternal;
  return (
    <span data-disabled={disabled} data-underline={!noUnderline} className={style["link"]}>
      {isCurrentUrl && rest.children}
      {!disabled && !isExternal && !isCurrentUrl && <NextLink href={href} {...rest} />}
      {!disabled && isExternal && <a target={"_blank"} href={href.toString()} {...rest}></a>}
    </span>
  );
};

export default Link;
