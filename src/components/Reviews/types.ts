export enum ReviewActionKind {
  VOTE_ADD = 'VOTE_ADD',
  VOTE_REMOVE = 'VOTE_REMOVE',
  REPLACE_ALL = 'REPLACE_ALL',
  RESTORE = 'RESTORE',
}

export type Review = {
  owner: string;
  comment_count: string;
  created_at: string;
  category: Category;
  review_id: number;
  review_img_url?: string;
  review_body?: string;
  title: string;
  votes: number;
  hasVoted?: boolean;
};

export interface IReviewAction {
  type: ReviewActionKind;
  payload?: Review;
  overwrite?: Review[];
}

export type ReviewState = Array<Review>;

export interface IReviewProps {
  data: Array<Review>;
  dispatch: React.Dispatch<IReviewAction>;
}

export interface IReviewCardProps {
  review: Review;
  dispatch: React.Dispatch<IReviewAction>;
}

export interface ICardImageProps {
  src: string;
  alt?: string;
}
export type Category =
  | 'push-your-luck'
  | 'dexterity'
  | 'hidden-roles'
  | 'strategy'
  | 'roll-and-write'
  | 'deck-building'
  | 'engine-building';

export interface IReviewOption {
  id: string;
  label: string;
  icon: JSX.Element;
}

export interface IModalProps {
  visible: boolean;
  toggle: React.Dispatch<React.SetStateAction<boolean>>;
}
