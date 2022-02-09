import axios from 'axios';

import { IUser } from '../../types/auth.types';
import { Review } from '../../types/review.types';

type APIUser = IUser | null | undefined;

const client = axios.create({
  baseURL: 'https://gamecritic.herokuapp.com/api/',
});

export function validate(token: string) {
  client.defaults.headers.common['token'] = token;
}

export async function fetchAllReviews() {
  const {
    data: { reviews },
  } = await client.get('reviews?limit=1000');
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
  await client.post(
    `https://gamecritic.herokuapp.com/api/users/${user?.username}/votes`,
    { review_id: review.review_id }
  );
}

export async function removeVote(user: APIUser, review: Review) {
  await client.delete(
    `https://gamecritic.herokuapp.com/api/users/${user?.username}/votes/${review.review_id}`
  );
}
