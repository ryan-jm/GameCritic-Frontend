import React from 'react';

import { Review } from '../../components/Reviews/types';

export interface IStats {
  reviewsPosted: number;
  reviewsLiked: number;
  commentsPosted: number;
  commentsLiked: number;
  favouriteReviews: Array<Review | null>;
}

export interface ILayoutStats {
  isLoading: boolean;
  title: string | number;
  description?: string;
  icon: React.ReactNode;
  color: 'accent' | 'primary';
  inDev: boolean;
}

export interface ILayoutProps {
  title: React.ReactNode;
  actions?: Array<React.ReactNode>;
  children?: Array<React.ReactChild>;
  stats: Array<ILayoutStats>;
}
