import React, {useState} from "react";
import { Comment as CommentClass } from "../classes/Comment.class"
import style from "../styles/modules/MenuPage.module.scss";
import {User} from "../classes/User.class";
import {Avatar, Button, Input} from "./system";
import EditIcon from '@mui/icons-material/EditRounded';
import DeleteIcon from '@mui/icons-material/DeleteRounded';
import AddCommentIcon from '@mui/icons-material/AddRounded';
import {createTheme} from "@mui/system";
import {Rating, TextField} from "@mui/material";

const MenuPage: React.FC = (): JSX.Element => {
    createTheme({palette: {mode: "dark"}})

  return (
    <section className={style["menupage-container"]}>
      <div className={style["menupage-menu-container"]}></div>
      <div className={style["menupage-comments-container"]}>
          <CommentBox/>
      </div>
    </section>
  );
};

const CommentBox: React.FC = (): JSX.Element => {

  let authenticated = false;
  return (
    <section className={style["comments-container"]}>
        <div className={style["comments-pane"]}>

            <div className={style["comments-list"]}>
                <Comment comment={comment1} />
                <Comment comment={comment2} />
                <Comment comment={comment1} />
            </div>

            <CommentEditor/>

        </div>
    </section>
  );
};

const CommentEditor: React.FC = (): JSX.Element => {
    const [current, setCurrent] = useState({activated: false, comment: null});

    return (
        <section className={style["comment-editor"]}>
            {!current.activated &&
                <div className={style["comment-editor-writer-box"]}>
                    <Button theme="secondary" onClick={() => setCurrent({activated: true, comment: null})} startIcon={<AddCommentIcon />}>Write a comment</Button>
                </div>
            }
            {current.activated &&
            <>
                <div className={style["comment-editor-spacer"]}/>
                <div className={style["comment-editor-title-box"]}>
                    <Input inputProps={{maxLength: 64}} className={style["comment-editor-title"]} size="small"
                               id="outlined-basic" label="Title" />
                    <Rating defaultValue={2.5} precision={0.5}/>
                </div>

                <Input inputProps={{maxLength: 256}} size="small" id="outlined-basic" multiline rows={3} />
                {/*TODO: Add length counter in text field*/}

                <div className={style["comment-editor-submit-box"]}>
                <Button theme="primary">{current.comment == null ? "Post" : "Edit"}</Button>
                <Button theme="secondary" onClick={() => setCurrent({activated: false, comment: null})}>Cancel</Button>
                </div>
            </>
            }
        </section>
    );
}

interface CommentProps {
    comment: CommentClass
}

const Comment: React.FC<CommentProps> = ({comment}): JSX.Element => {

    return (
        <section className={style["comment-box"]}>
            <div className={style["comment-title-box"]}>

                <div className={style["comment-title"]} children={comment.title}/>
                <Rating defaultValue={comment.rating} precision={0.5} readOnly />

            </div>
            <div className={style["comment-content"]}>{comment.content}</div>
            <div className={style["comment-user-box"]}>

                <div className={style["comment-user-icons"]}>
                    <EditIcon sx={{fontSize: "1em"}}/>
                    <DeleteIcon sx={{fontSize: "1em"}} className={style["comment-user-icon-urgent"]}/>
                </div>

                <div className={style["flex-grow"]}/>

                <div className={style["comment-user-date"]}>{comment.created.toLocaleDateString("de", {month: "2-digit", day: "2-digit", year: "2-digit"})} <span>{(comment.edited ? "(edited)" : "")}</span></div>
                <div className={style["comment-user-user-box"]}>
                    <Avatar size={"text"}/>
                    <div>{comment.user.firstname + " " + comment.user.lastname}</div>
                </div>

            </div>
        </section>
    );

};

const MenuDivider: React.FC = (): JSX.Element => {
  return <div className={style["menupage-divider"]}></div>;
};

export default MenuPage;
