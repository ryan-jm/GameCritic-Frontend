import { EuiFlexGroup, EuiFlexItem, EuiPage, EuiPageBody, EuiPageContentBody } from '@elastic/eui';
import React, { useCallback } from 'react';

import * as API from '../api/Reviews';
import LoadingList from '../components/Reviews/LoadingList';
import ReviewFilter from '../components/Reviews/ReviewFilter';
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
    case ReviewActionKind.RESTORE:
      return [];
  }
};

const Reviews = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [reviewState, dispatch] = React.useReducer(ReviewReducer, []);
  const [filter, setFilter] = React.useState<string>('');

  const fetchReviews = useCallback(
    async (filter?: string) => {
      API.validate(user?.token ?? '');
      const reviews = await API.fetchAllReviews(filter);
      const votes = await API.fetchVotes(user);
      const finalReviewData = dataHelper.formatReviews(reviews, votes);
      return finalReviewData;
    },
    [user]
  );

  React.useEffect(() => {
    if (isLoading) {
      dispatch({ type: ReviewActionKind.RESTORE });
      fetchReviews(filter).then((reviews) => {
        dispatch({ type: ReviewActionKind.REPLACE_ALL, overwrite: reviews });
        setIsLoading(() => !isLoading);
      });
    } else if (filter) {
      fetchReviews(filter).then((reviews) => {
        console.log(reviews);
        dispatch({ type: ReviewActionKind.REPLACE_ALL, overwrite: reviews });
      });
    }
  }, [fetchReviews, isLoading, user, filter]);

  React.useEffect(() => {
    console.log(filter);
    setIsLoading(true);
  }, [filter]);

  return (
    <EuiPage paddingSize="l">
      <EuiPageBody>
        <EuiPageContentBody restrictWidth={'75%'}>
          <EuiFlexGroup justifyContent="spaceAround" style={{ marginTop: '3rem' }}>
            <EuiFlexItem grow={false}>
              <ReviewFilter filter={setFilter} />
            </EuiFlexItem>
          </EuiFlexGroup>
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
