export class CreatePostDto {
    title: string;
    content: string;
    visibility: 'public' | 'private';
}
