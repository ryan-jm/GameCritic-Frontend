import { EuiButton, EuiButtonIcon, EuiCard, EuiFlexGroup, EuiFlexItem, EuiIcon, EuiSpacer } from '@elastic/eui';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import * as API from '../../api/Reviews';
import { useAuth } from '../../stores/AuthContext';
import { Review, ReviewAction, ReviewActionKind } from '../../types/review.types';

interface IReviewCardProps {
  review: Review;
  dispatch: React.Dispatch<ReviewAction>;
}

interface ICardImageProps {
  src: string;
  alt?: string;
}

const CardImage = ({ src, alt }: ICardImageProps) => {
  return (
    <div
      aria-label={alt}
      style={{
        width: '100%',
        height: '20rem',
        overflow: 'hidden',
        backgroundImage: `url(${src})`,
        backgroundSize: 'cover',
      }}
    />
  );
};

const ReviewCard = ({ review, dispatch }: IReviewCardProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [votes, setVotes] = React.useState<number>(review.votes);
  const [reviewLiked, setReviewLiked] = React.useState(review.hasVoted);

  const handleLike = () => {
    API.validate(user?.token ?? '');
    if (!reviewLiked) {
      dispatch({ type: ReviewActionKind.VOTE_ADD, payload: review });
      setReviewLiked(true);
      API.addVote(user, review);
    } else if (reviewLiked) {
      dispatch({ type: ReviewActionKind.VOTE_REMOVE, payload: review });
      setReviewLiked(false);
      API.removeVote(user, review);
    }
  };

  React.useEffect(() => {
    if (review.votes) setVotes(review.votes);
  }, [review.votes, review.hasVoted]);

  return (
    <EuiFlexItem key={review.review_id} grow style={{ width: '25%' }}>
      <EuiCard
        textAlign="left"
        image={<CardImage src={review.review_img_url ?? ''} />}
        title={review.title}
        description={
          <span>
            <EuiIcon type="faceHappy" /> {review.owner}
          </span>
        }
        footer={
          <>
            <span>Posted: {new Date(review.created_at).toDateString()}</span>
            <EuiSpacer size="m" />
            <EuiFlexGroup justifyContent="spaceBetween">
              <EuiFlexItem>
                <span>
                  <EuiButtonIcon
                    aria-label={`Likes for review ${review.review_id}`}
                    iconType={!reviewLiked ? 'starEmpty' : 'starFilled'}
                    color="accent"
                    onClick={() => handleLike()}
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
