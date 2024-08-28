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

    constructor(
        title: string,
        content: string,
        authorId: number,
        postId?: number,
        imagePath?: string,
        comments?: Comment[],
        categories?: Category[]
    ) {
        this.title = title;
        this.content = content;
        this.authorId = authorId;
        this.postId = postId;
        this.imagePath = imagePath;
        this.comments = comments;
        this.categories = categories;
    }
}
