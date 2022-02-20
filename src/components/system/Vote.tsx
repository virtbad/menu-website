import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import React from "react";
import style from "../../styles/modules/system/Vote.module.scss";

interface VoteProps {
  votes: number;
  disabled?: boolean;
  onVote?: (up: boolean, votes: number) => void;
}

/**
 * Horizontal vote component
 */

const Vote: React.FC<VoteProps> = ({ votes, onVote, disabled = false }): JSX.Element => {
  const onUpvote = () => !disabled && onVote && onVote(true, votes + 1);
  const onDownvote = () => !disabled && onVote && onVote(false, votes - 1);

  return (
    <div className={style["vote-container"]}>
      <code className={style["vote-votes"]} children={votes.toLocaleString("de", { signDisplay: "always" }).replace(".", "'")} />
      <div className={style["vote-buttons"]}>
        <span className={style["vote-icon"]} children={<KeyboardArrowUpIcon fontSize={"large"} />} onClick={onUpvote} />
        <span className={style["vote-icon"]} children={<KeyboardArrowDownIcon fontSize={"large"} />} onClick={onDownvote} />
      </div>
    </div>
  );
};

/**
 * Vertical vote component
 */

export const VerticalVote: React.FC<VoteProps> = ({ votes, onVote, disabled = false }): JSX.Element => {
  const onUpvote = () => !disabled && onVote && onVote(true, votes + 1);
  const onDownvote = () => !disabled && onVote && onVote(false, votes - 1);

  return (
    <div className={style["vertical-vote-container"]}>
      <div className={style["vote-up"]} children={<ArrowIcon variant={"up"} onClick={onUpvote} />} />
      <code className={style["vote-votes"]} children={votes.toLocaleString("de", { signDisplay: "always" }).replace(".", "'")} />
      <div className={style["vote-down"]} children={<ArrowIcon variant={"down"} onClick={onDownvote} />} />
    </div>
  );
};

interface ArrowIconProps {
  variant: "up" | "down";
  disabled?: boolean;
  selected?: boolean;
  onClick?: () => void;
}

/**
 * Vote arrow component
 */

const ArrowIcon: React.FC<ArrowIconProps> = ({ variant, onClick, disabled = false, selected = false }): JSX.Element => {
  return (
    <div className={style["vote-triangle"]} data-selected={selected} data-disabled={disabled} onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="-1 0 25.17 19.38">
        {variant === "down" && <path strokeMiterlimit={10} d="M15.37,17.43,22.14,5.68a3.32,3.32,0,0,0-2.88-5H5.74a3.32,3.32,0,0,0-2.88,5L9.63,17.43A3.31,3.31,0,0,0,15.37,17.43Z" transform="translate(-1.92 -0.21)" />}
        {variant === "up" && <path strokeMiterlimit={10} d="M9.63,7.46,2.86,19.21a3.32,3.32,0,0,0,2.88,5H19.26a3.32,3.32,0,0,0,2.88-5L15.37,7.46A3.31,3.31,0,0,0,9.63,7.46Z" transform="translate(-1.92 -5.3)" />}
      </svg>
    </div>
  );
};

export default Vote;
