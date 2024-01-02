export interface Feed {
  createdAt: string;
  description: string;
  like: number;
  title: string;
  view: number;
  _id: string;
  commentsCount: number;
  subCommentsCount: number;
}

export interface TableHead {
  id: number;
  name: string;
}
