export class Comment{
    commentId : number;
    content : string;
    parentCommentId? : number;
    postId? : number;
    constructor(commentId : number,
        content : string,
        parentCommentId? : number,
        postId? : number){
        this.commentId = commentId;
        this.content = content;
        this.parentCommentId = parentCommentId;
        this.postId = postId;
    }
}