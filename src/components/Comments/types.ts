export interface ICommentProps {
  reviewId: number | undefined;
}

export type IComment = {
  comment_id: number;
  body: string;
  author: string;
  review_id: number;
  created_at: string;
  avatar_url?: string;
};

export interface ICommentBoxProps {
  editState: number;
  comment: IComment;
  clear: React.Dispatch<React.SetStateAction<number>>;
}
