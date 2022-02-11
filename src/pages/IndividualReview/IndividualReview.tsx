import { EuiAvatar, EuiCard, EuiEmptyPrompt, EuiImage, EuiPage, EuiPageBody, EuiPageContent, EuiText } from '@elastic/eui';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import * as API from '../../api/Reviews';
import Comment from '../../components/Comments/Comment';
import { Review } from '../../components/Reviews/types';
import { useAuth } from '../../contexts/Auth/AuthContext';
import { IUser } from '../../contexts/Auth/types';

const IndividualReview = () => {
  let { review_id } = useParams();
  const { user } = useAuth();
  const [review, setReview] = useState<Review | null>(null);
  const [reviewPoster, setReviewPoster] = useState<IUser>();

  useEffect(() => {
    const fetchReview = async () => {
      API.validate(user?.token ?? '');
      const review = await API.getSingleReview(review_id ?? '1');
      const reviewPoster = await API.getUser(review.owner);
      setReview(review);
      setReviewPoster(reviewPoster);
    };

    fetchReview();
  }, [review_id, user?.token]);

  return (
    <EuiPage paddingSize="none" style={{ marginTop: '3rem' }}>
      <EuiPageBody paddingSize="l" restrictWidth={true}>
        <EuiPageContent
          verticalPosition="center"
          horizontalPosition="center"
          paddingSize="l"
          style={{ width: '100%' }}
        >
          <EuiCard
            layout="horizontal"
            icon={
              <EuiAvatar
                size="m"
                imageUrl={reviewPoster?.avatar_url ?? ''}
                name={review?.owner ?? ''}
              />
            }
            title=""
            display="plain"
            description={
              <p>
                <i>
                  Posted by {review?.owner} on{' '}
                  {new Date(review?.created_at ?? 0).toDateString()}
                </i>
              </p>
            }
          />
          <EuiEmptyPrompt
            icon={
              <EuiImage
                size="fullWidth"
                src={review?.review_img_url ?? ''}
                alt="Picture of..."
              />
            }
            title={
              <EuiText size="relative" color="ghost" textAlign="center">
                <h1>{review?.title}</h1>
              </EuiText>
            }
            body={
              <EuiText size="relative" style={{ textAlign: 'justify' }}>
                <p>{review?.review_body}</p>
              </EuiText>
            }
            style={{ marginTop: '-2rem' }}
          />
        </EuiPageContent>
        <EuiPageContent
          verticalPosition="center"
          horizontalPosition="center"
          paddingSize="l"
          style={{ marginTop: '2rem', width: '100%' }}
        >
          <Comment reviewId={review?.review_id} />
        </EuiPageContent>
      </EuiPageBody>
    </EuiPage>
  );
};

export default IndividualReview;
