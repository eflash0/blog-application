export class User{
    userId?:number;
    username : string;
    email? : string;
    password? : string;
    constructor(username:string,userId?:number,password?:string,email?:string){
        this.userId = userId;
        this.username = username;
        this.password = password;
        this.email = email;
    }
}

