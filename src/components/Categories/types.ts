import { Review } from '../Reviews/types';

import type { IconType } from '@elastic/eui';

export interface ICategoryReviewsProps {
  reviews: Array<Review> | Array<any>;
}

interface ICategoryIcon {
  [index: string]: IconType;
}

export interface ICategoryListProps {
  data: Array<any>;
  icons: ICategoryIcon;
}
