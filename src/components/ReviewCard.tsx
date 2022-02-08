import { EuiButton, EuiButtonIcon, EuiCard, EuiFlexGroup, EuiFlexItem, EuiIcon, EuiImage, EuiSpacer } from '@elastic/eui';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export type Review = {
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
  const navigate = useNavigate();
  const [votes, setVotes] = React.useState<number>(0);
  const [reviewLiked, setReviewLiked] = React.useState(false);

  const handleLike = (id: number) => {
    setReviewLiked((prev) => !prev);
  };

  React.useEffect(() => {
    if (review.votes) setVotes(review.votes);
  }, [review.votes]);

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
          <p>
            <span>
              <EuiIcon type="faceHappy" /> {review.owner}
            </span>
          </p>
        }
        style={{ width: '30rem' }}
        footer={
          <>
            <p>Posted: {new Date(review.created_at).toDateString()}</p>
            <EuiSpacer size="m" />
            <EuiFlexGroup justifyContent="spaceBetween">
              <EuiFlexItem>
                <span>
                  <EuiButtonIcon
                    aria-label={`Likes for review ${review.review_id}`}
                    iconType={!reviewLiked ? 'starEmpty' : 'starFilled'}
                    color="accent"
                    onClick={() => handleLike(review.review_id)}
                  />{' '}
                  {votes}
                </span>
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiButton
                  fill
                  onClick={() => navigate(`/reviews/${review.review_id}`)}
                  iconType="sortRight"
                >
                  Go to review
                </EuiButton>
              </EuiFlexItem>
            </EuiFlexGroup>
          </>
        }
      />
    </EuiFlexItem>
  );
};

export default ReviewCard;
