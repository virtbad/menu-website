import React, {useState} from "react";
import {Comment as CommentClass} from "../classes/Comment.class"
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

  if (true) { // Use auth context to determine
    return (
      <div className={style["comments-login"]}>Log in to see what others say about this menu!</div>
    )
  }

  let reload: () => void;
  const setReload = (reloadFunction: () => void) => {
    reload = reloadFunction;
  }

  let edit: (comment: CommentClass) => void;
  const setEdit = (editFunction: (comment: CommentClass) => void) => {
    edit = editFunction;
  }

  let addElement: (comment: CommentClass) => void;
  const setAddElement = (addElementFunction: (comment: CommentClass) => void) => {
    addElement = addElementFunction;
  }

  return (
    <section className={style["comments-container"]}>
      <div className={style["comments-pane"]}>

        <CommentList edit={(c) => edit(c)} reloadTrigger={setReload} addItemTrigger={setAddElement}/>

        <CommentEditor editingTrigger={setEdit} edited={(successful, addBack) => {
          if (successful) reload();
          else if(addBack != null) addElement(addBack);
        }}/>

      </div>
    </section>
  );
};


const CommentList: React.FC<CommentListProps> = ({edit, reloadTrigger, addItemTrigger}): JSX.Element => {

  const [comments, setComments] = useState(createComments()); //TODO: Replace with request to server

  reloadTrigger(() => {setComments(createComments())});
  addItemTrigger((c) => {
    setComments([...comments, c]);
  });

  const removeElement = (id: string) => {
    setComments(comments.filter(c => id != c.id));
  }

  const deleteComment = (id: string) => {
    // TODO: Do server delete request
    removeElement(id);
  }

  const editComment = (id: string) => {
    // @ts-ignore
    edit(comments.find(c => id == c.id));
    removeElement(id);
  }

  return (
    <div className={style["comments-list"]}>
      {comments.sort((a, b) => a.created.getTime() - b.created.getTime()).map((comment) => <Comment remove={deleteComment} edit={editComment} comment={comment}/>)}
    </div>
  )
}
interface CommentListProps {
  edit: (comment: CommentClass) => void,
  reloadTrigger: (f: () => void) => void,
  addItemTrigger: (f: (comment: CommentClass) => void) => void
}



/**
 * This component is the editor, that allows one to edit comments.
 * @param edited function to call when a comment has been edited or published
 * @param editingTrigger trigger method to edit a comment
 */
const CommentEditor: React.FC<CommentEditorProps> = ({ editingTrigger, edited }): JSX.Element => {
  const [current, setCurrent] = useState({activated: false, comment: null as CommentClass | null});

  editingTrigger((comment) => setCurrent({activated: true, comment: comment}));

  return (
    <section className={style["comment-editor"]}>
      {!current.activated &&
      <div className={style["comment-editor-writer-box"]}>
          <Button theme="secondary" onClick={() => setCurrent({activated: true, comment: null})} startIcon={<AddCommentIcon/>}>Write a comment</Button>
      </div>
      }
      {current.activated &&
      <>
          <div className={style["comment-editor-spacer"]}/>
          <div className={style["comment-editor-title-box"]}>
              <Input inputProps={{maxLength: 64}} className={style["comment-editor-title"]} size="small" id="outlined-basic" label="Title" defaultValue={current.comment == null ? "" : current.comment.title}/>
              <Rating defaultValue={current.comment == null ? 3.5 : current.comment.rating} precision={0.5}/>
          </div>

          <Input inputProps={{maxLength: 256}} size="small" id="outlined-basic" multiline rows={3} defaultValue={current.comment == null ? "" : current.comment.content}/>
        {/*TODO: Add length counter in text field*/}

          <div className={style["comment-editor-submit-box"]}>
              <Button theme="primary" onClick={() => {

                // TODO: Send comment to server
                if (current.comment != null) edited(true, null);
                setCurrent({activated: false, comment: null});

              }}>{current.comment == null ? "Post" : "Edit"}</Button>

              <Button theme="secondary" onClick={() => {

                if (current.comment != null) edited(false, current.comment);
                setCurrent({activated: false, comment: null});

              }}>Cancel</Button>
          </div>
      </>
      }
    </section>
  );
}
interface CommentEditorProps {
  editingTrigger: (f: (comment: CommentClass) => void) => void,
  edited: (successful: boolean, addBack: CommentClass | null) => void
}

/**
 * This component resembles a comment
 * @param comment comment to display
 * @param user [temporary] user that is logged in
 * @param edit function to run on edit
 * @param remove function to run on delete
 */
const Comment: React.FC<CommentProps> = ({comment, edit, remove}): JSX.Element => {

  let user = createUser(); // TODO: Use user from auth context

  let editable = user.admin || user.tag == comment.user.tag;
  let date = comment.created.toLocaleDateString("de", {month: "2-digit", day: "2-digit", year: "2-digit"});

  return (
    <section className={style["comment-box"]} id={"comment-" + comment.id}>
      <div className={style["comment-title-box"]}>

        <div className={style["comment-title"]} children={comment.title}/>
        <Rating value={comment.rating} precision={0.5} readOnly/>

      </div>
      <div className={style["comment-content"]}>{comment.content}</div>
      <div className={style["comment-user-box"]}>

        {editable &&
        <div className={style["comment-user-icons"]}>
            <EditIcon onClick={() => edit(comment.id)} sx={{fontSize: "1em"}}/>
            <DeleteIcon onClick={() => remove(comment.id)} sx={{fontSize: "1em"}} className={style["comment-user-icon-urgent"]}/>
        </div>
        }

        <div className={style["flex-grow"]}/>

        <div className={style["comment-user-date"]}>{date} <span>{(comment.edited ? "(edited)" : "")}</span></div>
        <div className={style["comment-user-user-box"]}>
          <Avatar size={"text"}/>
          <div>{comment.user.firstname + " " + comment.user.lastname}</div>
        </div>

      </div>
    </section>
  );

};
interface CommentProps {
  comment: CommentClass,
  edit: (uuid: string) => void,
  remove: (uuid: string) => void,
}



const MenuDivider: React.FC = (): JSX.Element => {
  return <div className={style["menupage-divider"]}></div>;
};

export default MenuPage;
