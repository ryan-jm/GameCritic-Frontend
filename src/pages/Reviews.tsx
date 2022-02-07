import { EuiPage, EuiPageBody, EuiPageContentBody, EuiPagination } from '@elastic/eui';
import axios from 'axios';
import React from 'react';

import ReviewList from '../components/ReviewList';

const Reviews = () => {
  const [reviewData, setReviewData] = React.useState<Array<any>>([]);
  const [pageCount, setPageCount] = React.useState<number | undefined>();
  const [activePage, setActivePage] = React.useState<number>(0);
  const [pageData, setPageData] = React.useState<Array<any>>([]);

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
        setPageCount(data?.reviews?.length / 8);
      });
  }, []);

  React.useEffect(() => {
    if (reviewData) {
      if (activePage === 0 && reviewData?.length > 0) {
        return setPageData(() => {
          const currentData = reviewData.slice(
            activePage * 8,
            (activePage + 1) * 8
          );
          return currentData;
        });
      }
    }
  }, [reviewData, pageCount, activePage]);

  const handlePageChange = (page: number) => {
    setActivePage(page);
    switch (page) {
      case 0:
        return setPageData(() => {
          const currentData = reviewData.slice(0, 8);
          return currentData;
        });
      default:
        return setPageData(() => {
          const currentData = reviewData.slice(page * 8, (page + 1) * 8);
          return currentData;
        });
    }
  };

  return (
    <EuiPage paddingSize="l">
      <EuiPageBody>
        <EuiPageContentBody restrictWidth={'75%'}>
          <ReviewList data={pageData} />
          {pageData ? (
            <EuiPagination
              pageCount={pageCount}
              activePage={activePage}
              onPageClick={(activePage: number) => handlePageChange(activePage)}
            />
          ) : (
            <></>
          )}
        </EuiPageContentBody>
      </EuiPageBody>
    </EuiPage>
  );
};

export default Reviews;
