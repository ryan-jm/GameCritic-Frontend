import type { SetStateAction } from 'react';

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

export interface ReviewAction {
  type: ReviewActionKind;
  payload?: Review;
  overwrite?: Review[];
}

export type ReviewState = Array<Review>;

export interface IReviewProps {
  data: Array<Review>;
  dispatch: React.Dispatch<ReviewAction>;
}

export interface IReviewCardProps {
  review: Review;
  dispatch: React.Dispatch<ReviewAction>;
}

export interface ICardImageProps {
  src: string;
  alt?: string;
}

export type Comment = {
  comment_id: number;
  body: string;
  author: string;
  review_id: number;
  created_at: string;
  avatar_url?: string;
};

export type Category =
  | 'push-your-luck'
  | 'dexterity'
  | 'hidden-roles'
  | 'strategy'
  | 'roll-and-write'
  | 'deck-building'
  | 'engine-building';
