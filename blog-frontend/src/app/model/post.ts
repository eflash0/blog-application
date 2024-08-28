import { Category } from "./category";
import { Comment } from "./comment";

export class Post {
    postId?: number;
    title: string;
    imagePath?: string;
    content: string;
    authorId: number;
    comments?: Comment[];
    categories?: Category[];
    createdAt?: Date;
    updatedAt?: Date;

    constructor(
        title: string,
        content: string,
        authorId: number,
        createdAt?: Date,
        updatedAt?: Date,
        postId?: number,
        imagePath?: string,
        comments?: Comment[],
        categories?: Category[]
    ) {
        this.title = title;
        this.content = content;
        this.authorId = authorId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.postId = postId;
        this.imagePath = imagePath;
        this.comments = comments;
        this.categories = categories;
    }
}
