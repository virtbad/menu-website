import { UserConstructor } from "../types/User.types";
import { colorForTag, parseCookies } from "../util/util";

export class User {
  /**
   * Tag of the user
   */

  public readonly tag: string;

  /**
   * Firstname of the user
   */

  public readonly firstname: string;

  /**
   * Lastname of the user
   */

  public readonly lastname: string;

  /**
   * Date when the user first logged into the api
   */

  public readonly joined: Date;

  private _admin: boolean;
  private _banned: boolean;

  constructor(ctr: UserConstructor) {
    this.tag = ctr.tag;
    this.firstname = ctr.firstname;
    this.lastname = ctr.lastname;
    this.joined = ctr.joined;
    this._admin = ctr.admin;
    this._banned = ctr.banned;
  }

  /**
   * Boolean whether the user is admin
   */

  public get admin(): boolean {
    return this._admin;
  }

  /**
   * Boolean whether the user is banned
   */

  public get banned(): boolean {
    return this._banned;
  }

  /**
   * Full name of the user
   */

  public get name(): string {
    return `${this.firstname} ${this.lastname}`;
  }

  /**
   * Get the hex color for the users tag
   */

  public get color(): string {
    return colorForTag(this.tag);
  }

  /**
   * Access token of the logged in user
   */

  public get token(): string {
    return parseCookies(document.cookie).token;
  }
}
