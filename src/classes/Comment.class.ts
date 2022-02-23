import axios from "axios";
import { CommentConstructor } from "../types/Menu.types";
import { apiUrl } from "../util/global.config";
import { parseCookies } from "../util/util";
import { User } from "./User.class";

export class Comment {
  public readonly id: string;
  private _user: User;
  private _title: string;
  private _content: string;
  private _rating: number;
  private _created: Date;
  private _edited: boolean;

  constructor(ctr: CommentConstructor) {
    this.id = ctr.id;
    this._user = ctr.user instanceof User ? ctr.user : new User(ctr.user);
    this._title = ctr.title;
    this._content = ctr.content;
    this._rating = ctr.rating;
    this._created = new Date(ctr.created);
    this._edited = ctr.edited;
  }

  /**
   * Creator of the comment
   */

  public get user(): User {
    return this._user;
  }

  /**
   * Title of the comment
   */

  public get title(): string {
    return this._title;
  }

  /**
   * Content of the comment
   */

  public get content(): string {
    return this._content;
  }

  /**
   * Rating of the comment
   */

  public get rating(): number {
    return this._rating;
  }

  /**
   * Date when the comment was created
   */

  public get created(): Date {
    return this._created;
  }

  /**
   * Boolean whether the comment was edited or not
   */

  public get edited(): boolean {
    return this._edited;
  }

  /**
   * Function to update a comment
   *
   * @param data new comment data
   */

  public async update(data: { title?: string; content?: string; rating?: number }, menuId: string): Promise<void> {
    const { title = this._title, content = this._content, rating = this._rating } = data;

    await axios.put(`${apiUrl}/menu/${menuId}/comment/${this.id}`, data, { headers: { Authorization: `Bearer ${parseCookies(document.cookie).token}` } });
    this._title = title;
    this._content = content;
    this._rating = rating;
    this._edited = true;
  }
}
