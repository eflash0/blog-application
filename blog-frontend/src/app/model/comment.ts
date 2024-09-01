import { User } from "./user";

export class Comment{
    commentId? : number;
    content : string;
    parentCommentId? : number;
    postId? : number;
    author? : User;
    showReplies? : boolean;
    constructor(content : string,
        commentId? : number,
        author? : User,
        parentCommentId? : number,
        postId? : number
    ){
        this.commentId = commentId;
        this.content = content;
        this.parentCommentId = parentCommentId;
        this.postId = postId;
        this.author = author;
    }
}