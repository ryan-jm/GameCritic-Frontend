import { Review } from '../types/review.types';

export function formatReviews(reviews: Array<Review>, votes: Array<any>) {
  return reviews.map((review: Review) => {
    const voteCount = votes.filter((vote: any) => {
      return vote.review === review.review_id;
    });

    if (voteCount.length) {
      return { ...review, hasVoted: true };
    } else {
      return { ...review, hasVoted: false };
    }
  });
}
