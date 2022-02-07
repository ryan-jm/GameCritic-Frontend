import { EuiFlexGroup } from '@elastic/eui';

import ReviewCard from './ReviewCard';

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
          return <ReviewCard review={review} />;
        })
      ) : (
        <></>
      )}
    </EuiFlexGroup>
  );
};

export default ReviewList;
