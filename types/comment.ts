export interface CommentType {
  id: number;
  writer: string;
  content: string;
  like: number;
}

export interface Comment extends CommentType {
  sub_comments: CommentType[];
}
