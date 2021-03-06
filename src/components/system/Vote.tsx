import axios from "axios";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { Logger } from "../../classes/Logger.class";
import { User } from "../../classes/User.class";
import { useUser } from "../../hooks/UserContext";
import style from "../../styles/modules/system/Vote.module.scss";
import { apiUrl, fetcher } from "../../util/global.config";
import { convertAxiosErrorString } from "../../util/util";

interface VoteProps {
  theme?: "auto" | "dark" | "light";
  votes: number;
  disabled?: boolean;
  menuId: string;
  sync?: boolean;
}

/**
 * Vertical vote component
 */

export const VerticalVote: React.FC<VoteProps> = ({ menuId, sync = true, disabled = false, theme = "auto", ...props }): JSX.Element => {
  const [voted, setVoted] = useState<number>(0);
  const [votes, setVotes] = useState<number>(props.votes);
  const user: User = useUser();
  const { ...totalVote } = useSWR(sync && `${apiUrl}/menu/${menuId}`, fetcher);
  const { ...serverVote } = useSWR(user && user.token && !disabled && `${apiUrl}/menu/${menuId}/vote`, (url: string) => axios.get(url, { headers: { Authorization: `Bearer ${user.token}` } }).then(({ data }) => data));
  if (!user) disabled = true;

  useEffect(() => {
    setVotes(totalVote.data?.voteBalance || votes);
  }, [totalVote.data]);

  useEffect(() => {
    setVotes(props.votes);
  }, [props.votes]);

  const onUpvote = async () => {
    if (disabled || !user) return;
    if (voted > 0) return await onUnvote();
    try {
      setVotes(voted < 0 ? votes + 2 : votes + 1);
      await axios.put(`${apiUrl}/menu/${menuId}/vote`, { direction: 1 }, { headers: { Authorization: `Bearer ${user.token}` } });
      setVoted(1);
    } catch (e) {
      setVotes(voted < 0 ? votes - 2 : votes - 1);
      Logger.error(`Error whilst upvoting a menu: ${convertAxiosErrorString(e)}`);
    }
  };

  const onDownvote = async () => {
    if (disabled || !user) return;
    if (voted < 0) return await onUnvote();
    try {
      setVotes(voted > 0 ? votes - 2 : votes - 1);
      await axios.put(`${apiUrl}/menu/${menuId}/vote`, { direction: -1 }, { headers: { Authorization: `Bearer ${user.token}` } });
      setVoted(-1);
    } catch (e) {
      setVotes(voted > 0 ? votes + 2 : votes + 1);
      Logger.error(`Error whilst downvoting a menu: ${convertAxiosErrorString(e)}`);
    }
  };

  const onUnvote = async () => {
    try {
      setVotes(voted < 0 ? votes + 1 : votes - 1);
      await axios.put(`${apiUrl}/menu/${menuId}/vote`, { direction: 0 }, { headers: { Authorization: `Bearer ${user.token}` } });
      setVoted(0);
    } catch (e) {
      setVotes(voted < 0 ? votes - 1 : votes + 1);
      Logger.error(`Error whilst downvoting a menu: ${convertAxiosErrorString(e)}`);
    }
  };

  useEffect(() => {
    if (serverVote.data) setVoted(serverVote.data.direction);
    if (serverVote.error) Logger.error(`Error whilst fetching own vote: ${convertAxiosErrorString(serverVote.error)}`);
  }, [serverVote.data, serverVote.error]);

  const voteString: string = votes.toLocaleString("de", { signDisplay: "always" }).replace(",", "'");

  return (
    <div className={style["vertical-vote-container"]} data-theme={theme}>
      <div className={style["vote-up"]} children={<ArrowIcon disabled={disabled} variant={"up"} onClick={onUpvote} selected={voted > 0} />} />
      <code className={style["vote-votes"]} children={voteString} onClick={() => navigator.clipboard.writeText(`${voteString} Votes`)} />
      <div className={style["vote-down"]} children={<ArrowIcon disabled={disabled} variant={"down"} onClick={onDownvote} selected={voted < 0} />} />
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

export default VerticalVote;
