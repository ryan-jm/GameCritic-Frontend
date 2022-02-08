/* eslint-disable react-hooks/exhaustive-deps */
import { EuiPage, EuiPageBody, EuiPageContentBody } from '@elastic/eui';
import axios from 'axios';
import React from 'react';

import LoadingList from '../components/Reviews/LoadingList';
import ReviewList from '../components/Reviews/ReviewList';
import { useAuth } from '../stores/AuthContext';

const Reviews = () => {
  const { token, user } = useAuth();
  const [reviewData, setReviewData] = React.useState<Array<any>>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [votedReviews, setVotedReviews] = React.useState<Array<any>>([]);

  React.useEffect(() => {
    axios
      .get('https://gamecritic.herokuapp.com/api/reviews?limit=1000', {
        headers: {
          token: token ?? '',
        },
      })
      .then(({ data }) => {
        setReviewData(data?.reviews);
      })
      .then(() => {
        axios
          .get(
            `https://gamecritic.herokuapp.com/api/users/${user?.username}/votes`,
            {
              headers: { token: token ?? '' },
            }
          )
          .then(({ data }) => {
            console.log(data);
            setVotedReviews(data?.votes);
          });
      })
      .finally(() => setIsLoading(() => !isLoading));
  }, []);

  return (
    <EuiPage paddingSize="l">
      <EuiPageBody>
        <EuiPageContentBody restrictWidth={'75%'}>
          {isLoading ? (
            <LoadingList />
          ) : (
            <ReviewList data={reviewData} favourites={votedReviews} />
          )}
        </EuiPageContentBody>
      </EuiPageBody>
    </EuiPage>
  );
};

export default Reviews;
