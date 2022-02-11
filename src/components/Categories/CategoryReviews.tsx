import { EuiCard, EuiFlexGroup, EuiFlexItem, EuiIcon, EuiLink } from '@elastic/eui';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Review } from '../Reviews/types';

interface ICategoryReviewsProps {
  reviews: Array<Review> | Array<any>;
}

const CategoryReviews = ({ reviews }: ICategoryReviewsProps) => {
  const navigate = useNavigate();

  return (
    <EuiFlexGroup gutterSize="l" direction="column">
      {reviews.map((review: Review | null, index: number) => (
        <EuiFlexItem>
          <EuiCard
            display="subdued"
            layout="horizontal"
            key={review?.review_id || `review-${index}`}
            title={review?.title ?? ''}
            icon={<EuiIcon type={review?.review_img_url ?? ''} size="xxl" />}
            onClick={() => navigate(`/reviews/${review?.review_id}`)}
          >
            <EuiLink>
              <span>See review...</span>
            </EuiLink>
          </EuiCard>
        </EuiFlexItem>
      ))}
    </EuiFlexGroup>
  );
};

export default CategoryReviews;
