import {User} from "./User.class";

export class Comment {

    private _id: string;

    private _user: User;

    private _title: string;
    private _content: string;
    private _rating: number;

    private _created: Date;
    private _edited: boolean;

    // I guess for debugging, later the fields from the api can directly get deserialized into here
    constructor(id: string, user: User, title: string, content: string, rating: number, created: Date, edited: boolean) {
        this._id = id;
        this._user = user;
        this._title = title;
        this._content = content;
        this._rating = rating;
        this._created = created;
        this._edited = edited;
    }

    public get id(): string {
        return this._id;
    }

    public get user(): User {
        return this._user;
    }

    public get title(): string {
        return this._title;
    }

    public get content(): string {
        return this._content;
    }

    public get rating(): number {
        return this._rating;
    }

    public get created(): Date {
        return this._created;
    }

    public get edited(): boolean {
        return this._edited;
    }
}