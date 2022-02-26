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
import { convertAxiosErrorString } from "../../util/util";
import Rating from "./Rating";
import { VerticalVote } from "./Vote";

interface ListProps {}

/**
 * List component
 */

const List: React.FC<ListProps> = (): JSX.Element => {
  return <div className={style["list-container"]}></div>;
};

interface ListItemProps {
  theme?: "auto" | "dark" | "light";
  background?: "auto" | "alt";
}

/**
 * List item component
 */

export const ListItem: React.FC<ListItemProps> = (): JSX.Element => {
  return <div className={style["listitem-container"]}></div>;
};

interface RatedListItemProps extends ListItemProps {
  menu: Menu;
  href?: string;
  disabled?: boolean;
}

export const RatedListItem: React.FC<RatedListItemProps> = ({ menu, disabled = false, background = "auto", theme = "auto", href }): JSX.Element => {
  const BaseRatedListItem: JSX.Element = (
    <div className={style["listitem-container"]} id={menu.uuid} data-background={background} data-theme={theme} data-rated={true}>
      <h3 className={style["item-title"]} children={menu.title} />
      <div className={style["item-description"]} children={menu.description} />
      <div className={style["item-vote"]} children={<VerticalVote disabled={disabled} menuId={menu.uuid} theme={theme} votes={menu.votes} />} />
      <div className={style["item-button"]} children={<Button forwardIcon theme={"green"} children={"Mehr"} href={`/menu/${menu.uuid}`} />} />
      <div className={style["item-date"]} children={menu.date.toLocaleDateString("de", { month: "2-digit", day: "2-digit", year: "numeric" })} />
    </div>
  );

  if (href) return <Link href={href} children={BaseRatedListItem} />;
  else return BaseRatedListItem;
};

interface CommentListItemProps extends ListItemProps {
  comment: Comment;
  editing: boolean;
  onEdit?: (start: boolean) => void;
  onDelete?: () => void;
  menuId: string;
}

export const CommentListItem: React.FC<CommentListItemProps> = ({ theme = "auto", background = "auto", comment, onEdit, onDelete, editing, menuId }): JSX.Element => {
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
      await comment.update({ title: title.replace(/(\n){2,}/g, "\n").trim(), content: content.replace(/(\n){2,}/g, "\n").trim(), rating: rating >= 1 ? rating : 1 }, menuId);
      setTitle(title.replace(/(\n){2,}/g, "\n").trim());
      setContent(content.replace(/(\n){2,}/g, "\n").trim());
      setEdited(true);
    } catch (e) {
      Logger.error(`Error whilst updating comment: ${convertAxiosErrorString(e)}`);
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
    <div className={style["listitem-container"]} id={comment.id} data-background={background} data-theme={theme} data-comment={true} data-editing={editing}>
      <h4 className={style["item-title"]} children={<ContentEditable length={64} onBlur={setTitle} onChange={(value: string) => setPending({ ...pending, title: value })} editable={editing} value={title} />} />
      <div className={style["item-content"]} ref={contentRef} children={<ContentEditable length={256} onBlur={setContent} onChange={(value: string) => setPending({ ...pending, content: value })} editable={editing} value={content} />} />
      <div className={style["item-rating"]} children={<Rating onChange={(_, value: number) => setRating(value >= 1 ? value : 1)} readOnly={!editing} value={rating} />} />
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
  length?: number;
}

/**
 * Component to edit the content inside
 *
 * Moved to separate component to enable state updates in the parent component without messing up the pointer position
 */

const ContentEditable: React.FC<ContentEditableProps> = ({ value, onChange, onBlur, editable = false, length }): JSX.Element => {
  return (
    <div
      spellCheck
      onKeyPress={(e) => {
        let text: string = (e.target as any)?.innerText || "";
        if (e.key === "Enter") text += "\n";
        else if (e.key.length === 1) text += e.key;
        if (text.length > length) e.preventDefault();
      }}
      onInput={(event: any) => {
        onChange && onChange(event.target.innerText);
      }}
      onBlur={(event) => {
        const text: string = event.target.innerText.replace(/(\n){2,}/g, "\n");
        onBlur && onBlur(text);
      }}
      contentEditable={editable}
      suppressContentEditableWarning
      children={value}
    />
  );
};

export default List;
