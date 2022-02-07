import { EuiButton, EuiButtonIcon, EuiCard, EuiFlexGroup, EuiFlexItem, EuiIcon, EuiImage } from '@elastic/eui';
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

interface IReviewCardProps {
  review: Review;
}

const ReviewCard = ({ review }: IReviewCardProps) => {
  const [votes, setVotes] = React.useState<number>(0);
  const [reviewLiked, setReviewLiked] = React.useState(false);

  const handleLike = () => {
    setReviewLiked((prev) => !prev);
  };

  React.useEffect(() => {
    if (review.votes) setVotes(review.votes);
  }, []);

  React.useEffect(() => {
    if (reviewLiked) {
      setVotes((prev) => (prev += 1));
    } else {
      setVotes((prev) => (prev -= 1));
    }
  }, [reviewLiked]);

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
        description={
          <span>
            <EuiIcon type="faceHappy" /> {review.owner}
          </span>
        }
        style={{ width: '30rem' }}
        footer={
          <EuiFlexGroup justifyContent="spaceBetween">
            <EuiFlexItem>
              <span>
                <EuiButtonIcon
                  iconType={!reviewLiked ? 'starEmpty' : 'starFilled'}
                  color="accent"
                  onClick={() => handleLike()}
                />{' '}
                {votes}
              </span>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiButton>Go to review</EuiButton>
            </EuiFlexItem>
          </EuiFlexGroup>
        }
      />
    </EuiFlexItem>
  );
};

export default ReviewCard;
