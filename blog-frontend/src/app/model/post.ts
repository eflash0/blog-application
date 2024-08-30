import { Category } from "./category";
import { Comment } from "./comment";
import { User } from "./user";

export class Post {
    postId?: number;
    title: string;
    imagePath?: string;
    content: string;
    author?: User;
    comments?: Comment[];
    categories?: Category[];
    createAt?: Date;

    constructor(
        title: string,
        content: string,
        author?: User,
        postId?: number,
        imagePath?: string,
        comments?: Comment[],
        categories?: Category[],
        createAt?:Date
    ) {
        this.title = title;
        this.content = content;
        this.author = author;
        this.postId = postId;
        this.imagePath = imagePath;
        this.comments = comments;
        this.categories = categories;
        this.createAt = createAt;
    }
}
