export class User{
    userId?:number;
    username : string;
    constructor(username:string,userId?:number){
        this.userId = userId;
        this.username = username;
    }
}

