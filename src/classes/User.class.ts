export class User {

    private _tag: string;

    private _firstname: string;
    private _lastname: string;

    private _joined: Date;

    private _admin: boolean;
    private _banned: boolean;

    // Also for debugging, see commment class
    constructor(tag: string, firstname: string, lastname: string, joined: Date, admin: boolean, banned: boolean) {
        this._tag = tag;
        this._firstname = firstname;
        this._lastname = lastname;
        this._joined = joined;
        this._admin = admin;
        this._banned = banned;
    }

    public get tag(): string {
        return this._tag;
    }

    public get firstname(): string {
        return this._firstname;
    }

    public get lastname(): string {
        return this._lastname;
    }

    public get joined(): Date {
        return this._joined;
    }

    public get admin(): boolean {
        return this._admin;
    }

    public get banned(): boolean {
        return this._banned;
    }
}