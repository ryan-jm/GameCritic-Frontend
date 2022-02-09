import { EuiPage, EuiPageBody, EuiPageContentBody } from '@elastic/eui';
import React from 'react';

import * as API from '../api/Reviews';
import LoadingList from '../components/Reviews/LoadingList';
import ReviewList from '../components/Reviews/ReviewList';
import * as dataHelper from '../services/data';
import { useAuth } from '../stores/AuthContext';
import { ReviewAction, ReviewActionKind, ReviewState } from '../types/review.types';

/**
 * It takes a state and an action, and returns a new state
 * state - The current state of the review reducer.
 * action - The action that triggered the reducer.
 * returns -  The return value of the reducer is the new state of the application.
 */
const ReviewReducer = (state: ReviewState, action: ReviewAction) => {
  const { type, payload, overwrite } = action;

  switch (type) {
    case ReviewActionKind.VOTE_ADD:
    case ReviewActionKind.VOTE_REMOVE:
      const index = state?.findIndex(
        (review) => review?.review_id === payload?.review_id
      );
      return [
        ...state?.slice(0, index),
        {
          ...state[index],
          hasVoted: type === 'VOTE_ADD' ? true : false,
          votes:
            type === 'VOTE_ADD' ? (state[index].votes += 1) : (state[index].votes -= 1),
        },
        ...state.slice(index + 1),
      ];
    case ReviewActionKind.REPLACE_ALL:
      return overwrite ? [...overwrite] : [...state];
  }
};

const Reviews = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [reviewState, dispatch] = React.useReducer(ReviewReducer, []);

  /* If the user is logged in, fetch all reviews and votes from the API. Then, format the reviews and
  votes into a single object. Finally, replace the reviews in the store with the formatted reviews. */
  React.useEffect(() => {
    const fetchReviews = async () => {
      API.validate(user?.token ?? '');
      const reviews = await API.fetchAllReviews();
      const votes = await API.fetchVotes(user);
      const finalReviewData = dataHelper.formatReviews(reviews, votes);
      return finalReviewData;
    };

    if (isLoading) {
      fetchReviews().then((reviews) => {
        dispatch({ type: ReviewActionKind.REPLACE_ALL, overwrite: reviews });
        setIsLoading(() => !isLoading);
      });
    }
  }, [isLoading, user]);

  return (
    <EuiPage paddingSize="l">
      <EuiPageBody>
        <EuiPageContentBody restrictWidth={'75%'}>
          {isLoading ? (
            <LoadingList />
          ) : (
            <ReviewList data={reviewState} dispatch={dispatch} />
          )}
        </EuiPageContentBody>
      </EuiPageBody>
    </EuiPage>
  );
};

export default Reviews;
