import { EuiEmptyPrompt, EuiImage, EuiPage, EuiPageBody, EuiPageContent } from '@elastic/eui';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

type Category =
  | 'push-your-luck'
  | 'dexterity'
  | 'hidden-roles'
  | 'strategy'
  | 'roll-and-write'
  | 'deck-building'
  | 'engine-building';

interface IReview {
  owner: string;
  title: string;
  review_id: number;
  designer: string;
  review_img_url: string;
  category: Category;
  review_body: string;
  created_at: string;
  votes: number;
  commment_count: string | number;
}

const IndividualReview = () => {
  let { review_id } = useParams();
  const [review, setReview] = useState<IReview | null>(null);

  useEffect(() => {
    axios
      .get(`https://gamecritic.herokuapp.com/api/reviews/${review_id}`, {
        headers: {
          token:
            'eyJhbGciOiJIUzI1NiJ9.dGVzdC11c2VycGFzc3dvcmQxMjM.AZnzREXVU9h-dZMICCE594oITjj53xgnxx2L_g_XLBk',
        },
      })
      .then(({ data }) => {
        setReview(data.review);
      });
  }, [review_id]);

  return (
    <EuiPage paddingSize="none">
      <EuiPageBody paddingSize="l">
        <EuiPageContent
          verticalPosition="center"
          horizontalPosition="center"
          paddingSize="none"
        >
          <EuiEmptyPrompt
            icon={
              <EuiImage
                size="fullWidth"
                src={review?.review_img_url ?? ''}
                alt=""
              />
            }
            title={<span>{review?.title}</span>}
            body={<span>{review?.review_body}</span>}
            actions={<span>Test</span>}
          />
        </EuiPageContent>
      </EuiPageBody>
    </EuiPage>
  );
};

export default IndividualReview;
