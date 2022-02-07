import { EuiCard, EuiFlexGroup, EuiFlexItem, EuiImage } from '@elastic/eui';
import React from 'react';

type Review = {
  owner: string;
  comment_count: string;
  created_at: string;
  category: string;
  review_id: number;
  review_img_url?: string;
  title: string;
  votes?: number;
};

interface IReviewProps {
  data: Array<Review> | null;
}

const ReviewList = ({ data }: IReviewProps) => {
  return (
    <EuiFlexGroup wrap style={{ marginTop: '3rem' }}>
      {data ? (
        data.map((review: Review) => {
          return (
            <EuiFlexItem key={review.review_id} grow={false}>
              <EuiCard
                textAlign="left"
                image={
                  <EuiImage
                    src={review.review_img_url ? review.review_img_url : ''}
                    alt={review.title}
                    style={{ width: '100%', height: '30rem' }}
                  />
                }
                title={review.title}
                description="test"
                onClick={() => {}}
                style={{ width: '30rem' }}
              />
            </EuiFlexItem>
          );
        })
      ) : (
        <></>
      )}
    </EuiFlexGroup>
  );
};

export default ReviewList;
