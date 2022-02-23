import DeleteIcon from "@mui/icons-material/DeleteRounded";
import EditIcon from "@mui/icons-material/EditRounded";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { Avatar, Button } from ".";
import { Comment } from "../../classes/Comment.class";
import { Logger } from "../../classes/Logger.class";
import { Menu } from "../../classes/Menu.class";
import { useUser } from "../../hooks/UserContext";
import style from "../../styles/modules/system/List.module.scss";
import Rating from "./Rating";
import { VerticalVote } from "./Vote";

interface ListProps {}

/**
 * List component
 */

const List: React.FC<ListProps> = (): JSX.Element => {
  return <div className={style["list-container"]}></div>;
};

interface ListItemProps {}

/**
 * List item component
 */

export const ListItem: React.FC<ListItemProps> = (): JSX.Element => {
  return <div className={style["listitem-container"]}></div>;
};

interface RatedListItemProps {
  menu: Menu;
  theme?: "auto" | "dark" | "light";
  href?: string;
}

export const RatedListItem: React.FC<RatedListItemProps> = ({ menu, theme = "auto", href }): JSX.Element => {
  const BaseRatedListItem: JSX.Element = (
    <div className={style["listitem-container"]} data-theme={theme} data-rated={true}>
      <h3 className={style["item-title"]} children={menu.title} />
      <div className={style["item-description"]} children={menu.description} />
      <div className={style["item-vote"]} children={<VerticalVote menuId={menu.uuid} theme={theme} votes={menu.votes} />} />
      <div className={style["item-button"]} children={<Button forwardIcon theme={"green"} children={"Mehr"} href={`/menu/${menu.uuid}`} />} />
      <div className={style["item-date"]} children={menu.date.toLocaleDateString("de", { month: "2-digit", day: "2-digit", year: "numeric" })} />
    </div>
  );

  if (href) return <Link href={href} children={BaseRatedListItem} />;
  else return BaseRatedListItem;
};

interface CommentListItemProps {
  comment: Comment;
  theme?: "auto" | "dark" | "light";
  editing: boolean;
  onEdit?: (start: boolean) => void;
  onDelete?: () => void;
  menuId: string;
}

export const CommentListItem: React.FC<CommentListItemProps> = ({ theme, comment, onEdit, onDelete, editing, menuId }): JSX.Element => {
  const [title, setTitle] = useState<string>(comment.title);
  const [content, setContent] = useState<string>(comment.content);
  const [rating, setRating] = useState<number>(comment.rating);
  const [edited, setEdited] = useState<boolean>(comment.edited);
  const [pending, setPending] = useState<{ title: string; content: string }>({ title: title, content: content });
  const contentRef = useRef<HTMLDivElement>(null);
  const user = useUser();

  useEffect(() => {
    if (editing && contentRef.current) contentRef.current.focus();
  }, [editing]);

  const canEdit: boolean = comment.user.tag === user?.tag || user?.admin;
  const canSave: boolean = title !== comment.title || content !== comment.content || rating !== comment.rating || pending.title !== comment.title || pending.content !== comment.content;

  const handleDelete = () => {
    onDelete && onDelete();
  };

  const handleSave = async () => {
    onEdit && onEdit(false);
    try {
      await comment.update({ title: title, content: content, rating: rating }, menuId);
      setEdited(true);
    } catch (e) {
      Logger.error(`Error whilst updating comment: ${e?.message || "Unknown message"}\n${e?.response?.data?.message || "No error message"}`);
      setContent(comment.content);
      setRating(comment.rating);
      setTitle(comment.title);
    }
  };

  const handleAbort = () => {
    onEdit && onEdit(false);
    setContent(comment.content);
    setRating(comment.rating);
    setTitle(comment.title);
    setPending({ title: comment.title, content: comment.content });
  };

  return (
    <div className={style["listitem-container"]} id={comment.id} data-theme={theme} data-comment={true} data-editing={editing}>
      <h4 className={style["item-title"]} children={<ContentEditable onBlur={setTitle} onChange={(value: string) => setPending({ ...pending, title: value })} editable={editing} value={title} />} />
      <div className={style["item-content"]} ref={contentRef} children={<ContentEditable onBlur={setContent} onChange={(value: string) => setPending({ ...pending, content: value })} editable={editing} value={content} />} />
      <div className={style["item-rating"]} children={<Rating onChange={(_, value: number) => setRating(value)} readOnly={!editing} value={rating} />} />
      <div className={style["item-creator"]}>
        {canEdit && (
          <div className={style["item-iconbuttons"]}>
            {!editing && <EditIcon className={style["item-icon"]} fontSize={"small"} onClick={() => onEdit && onEdit(true)} />}
            <DeleteIcon className={style["item-icon"]} fontSize={"small"} onClick={handleDelete} />
          </div>
        )}
        <Avatar size={"text"} color={comment.user.color} />
        <span children={comment.user.name} />
      </div>
      <div className={style["item-date"]} children={`${comment.created.toLocaleDateString("de", { month: "2-digit", day: "2-digit", year: "numeric" })}${edited ? ", bearbeitet" : ""}`} />
      {editing && (
        <div className={style["item-button-container"]}>
          <div className={style["item-buttons"]}>
            <Button children={"Abbrechen"} onClick={handleAbort} />
            <Button children={"Speichern"} disabled={!canSave} onClick={handleSave} />
          </div>
        </div>
      )}
    </div>
  );
};

interface ContentEditableProps {
  value: string;
  onChange?: (value: string) => void;
  onBlur?: (value: string) => void;
  editable?: boolean;
}

/**
 * Component to edit the content inside
 *
 * Moved to separate component to enable state updates in the parent component without messing up the pointer position
 */

const ContentEditable: React.FC<ContentEditableProps> = ({ value, onChange, onBlur, editable = false }): JSX.Element => {
  return <div spellCheck onInput={(event: any) => onChange && onChange(event.target.innerText)} onBlur={(event) => onBlur && onBlur(event.target.innerText)} contentEditable={editable} suppressContentEditableWarning children={value} />;
};

export default List;
