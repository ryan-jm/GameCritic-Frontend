import axios from 'axios';

import { IUser } from '../../types/auth.types';
import { Comment, Review } from '../../types/review.types';

type APIUser = IUser | null | undefined;

const client = axios.create({
  baseURL: 'https://gamecritic.herokuapp.com/api/',
});

export function validate(token: string) {
  client.defaults.headers.common['token'] = token;
}

export async function fetchAllReviews(sort_by?: string) {
  let query = 'reviews?limit=1000&order=asc';

  switch (sort_by) {
    default:
      break;
    case 'votes':
      query = 'reviews?limit=1000&sort_by=votes';
      break;
    case 'created_at':
      query = 'reviews?limit=1000&sort_by=created_at';
      break;
  }

  const {
    data: { reviews },
  } = await client.get(query);
  return reviews;
}

export async function fetchVotes(user: APIUser) {
  if (user) {
    const {
      data: { votes },
    } = await client.get(`users/${user?.username}/votes`);
    return votes;
  }
}

export async function addVote(user: APIUser, review: Review) {
  await client.post(`users/${user?.username}/votes`, {
    review_id: review.review_id,
  });
}

export async function removeVote(user: APIUser, review: Review) {
  await client.delete(`users/${user?.username}/votes/${review.review_id}`);
}

export async function getSingleReview(review_id: string) {
  const {
    data: { review },
  } = await client.get(`reviews/${review_id}`);
  return review;
}

export async function getUser(username: string) {
  const {
    data: { user },
  } = await client.get(`users/${username}`);
  return user;
}

export async function getReviewComments(review_id: number | undefined) {
  const {
    data: { comments },
  } = await client.get(`reviews/${review_id}/comments`);

  const finalComments = await Promise.all(
    comments.map(async (comment: Comment) => {
      const user = await getUser(comment.author);
      return { ...comment, avatar_url: user?.avatar_url };
    })
  );

  return finalComments;
}
