/* eslint-disable react-hooks/exhaustive-deps */
import { EuiFlexGrid, EuiFlexGroup, EuiFlexItem, EuiPagination } from '@elastic/eui';
import React from 'react';

import { IReviewProps, Review } from '../../types/review.types';
import ReviewCard from './ReviewCard';
import ReviewFilter from './ReviewFilter';

const ReviewList = ({ data, dispatch }: IReviewProps) => {
  const [pageCount, setPageCount] = React.useState<number | undefined>();
  const [activePage, setActivePage] = React.useState<number>(0);
  const [pageData, setPageData] = React.useState<Array<any>>([]);

  /* When the data changes, set the page count and page data. */
  React.useEffect(() => {
    setPageCount(data?.length / 8);
    return setPageData(() => {
      const currentData = data.slice(0, 8);
      return currentData;
    });
  }, [data?.length]);

  const handlePageChange = (page: number) => {
    setActivePage(page);
    switch (page) {
      case 0:
        return setPageData(() => {
          const currentData = data.slice(0, 8);
          return currentData;
        });
      default:
        return setPageData(() => {
          const currentData = data.slice(page * 8, (page + 1) * 8);
          return currentData;
        });
    }
  };

  return (
    <>
      <EuiFlexGroup justifyContent="spaceAround" style={{ marginTop: '3rem' }}>
        <EuiFlexItem grow={false}>
          <ReviewFilter />
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiFlexGrid columns={4} style={{}}>
        {pageData ? (
          pageData.map((review: Review) => {
            return (
              <ReviewCard review={review} key={review.review_id} dispatch={dispatch} />
            );
          })
        ) : (
          <></>
        )}
      </EuiFlexGrid>
      <EuiFlexGroup justifyContent="spaceAround">
        <EuiFlexItem grow={false}>
          <EuiPagination
            pageCount={pageCount}
            activePage={activePage}
            onPageClick={(activePage: number) => handlePageChange(activePage)}
          />
        </EuiFlexItem>
      </EuiFlexGroup>
    </>
  );
};

export default ReviewList;
