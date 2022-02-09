import { EuiEmptyPrompt, EuiImage, EuiPage, EuiPageBody, EuiPageContent } from '@elastic/eui';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import * as API from '../api/Reviews';
import Comment from '../components/Reviews/Comment';
import { useAuth } from '../stores/AuthContext';
import { Review } from '../types/review.types';

const IndividualReview = () => {
  let { review_id } = useParams();
  const { user } = useAuth();
  const [review, setReview] = useState<Review | null>(null);

  useEffect(() => {
    const fetchReview = async () => {
      API.validate(user?.token ?? '');
      const review = await API.getSingleReview(review_id ?? '1');
      setReview(review);
    };

    fetchReview();
  }, [review_id, user?.token]);

  return (
    <EuiPage paddingSize="none" style={{ marginTop: '3rem' }}>
      <EuiPageBody paddingSize="l">
        <EuiPageContent
          verticalPosition="center"
          horizontalPosition="center"
          paddingSize="l"
        >
          <EuiEmptyPrompt
            icon={
              <EuiImage
                size="fullWidth"
                src={review?.review_img_url ?? ''}
                alt="Picture of..."
              />
            }
            title={<span>{review?.title}</span>}
            body={<span>{review?.review_body}</span>}
            actions={<span>Test</span>}
          />
        </EuiPageContent>
        <EuiPageContent
          verticalPosition="center"
          horizontalPosition="center"
          paddingSize="l"
          style={{ marginTop: '2rem' }}
        >
          <Comment reviewId={review?.review_id} />
        </EuiPageContent>
      </EuiPageBody>
    </EuiPage>
  );
};

export default IndividualReview;
