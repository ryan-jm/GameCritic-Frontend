import { EuiPage, EuiPageBody, EuiPageContentBody } from '@elastic/eui';
import axios from 'axios';
import React from 'react';

import LoadingList from '../components/LoadingList';
import ReviewList from '../components/ReviewList';

const Reviews = () => {
  const [reviewData, setReviewData] = React.useState<Array<any>>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    axios
      .get('https://gamecritic.herokuapp.com/api/reviews?limit=1000', {
        headers: {
          token:
            'eyJhbGciOiJIUzI1NiJ9.dGVzdC11c2VycGFzc3dvcmQxMjM.AZnzREXVU9h-dZMICCE594oITjj53xgnxx2L_g_XLBk',
        },
      })
      .then(({ data }) => {
        setReviewData(data?.reviews);
        setIsLoading(() => !isLoading);
      });
  }, []);

  return (
    <EuiPage paddingSize="l">
      <EuiPageBody>
        <EuiPageContentBody restrictWidth={'75%'}>
          {isLoading ? <LoadingList /> : <ReviewList data={reviewData} />}
        </EuiPageContentBody>
      </EuiPageBody>
    </EuiPage>
  );
};

export default Reviews;
