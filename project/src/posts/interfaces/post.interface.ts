export interface Post {
    id: number;
    title: string;
    content: string;
    authorName: string;
    createdDate: Date;
    updatedDate?: Date;
}