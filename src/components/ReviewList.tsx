import { EuiFlexGroup, EuiFlexItem, EuiPagination } from '@elastic/eui';
import React from 'react';

import ReviewCard from './ReviewCard';

type Review = {
  owner: string;
  comment_count: string;
  created_at: string;
  category: string;
  review_id: number;
  review_img_url?: string;
  title: string;
  votes?: number;
};

interface IReviewProps {
  data: Array<Review>;
}

const ReviewList = ({ data }: IReviewProps) => {
  const [pageCount, setPageCount] = React.useState<number | undefined>();
  const [activePage, setActivePage] = React.useState<number>(0);
  const [pageData, setPageData] = React.useState<Array<any>>([]);

  React.useEffect(() => {
    setPageCount(data?.length / 8);
    return setPageData(() => {
      const currentData = data.slice(0, 8);
      return currentData;
    });
  }, [data, data?.length]);

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
      <EuiFlexGroup wrap style={{ marginTop: '3rem' }}>
        {pageData ? (
          pageData.map((review: Review) => {
            return <ReviewCard review={review} />;
          })
        ) : (
          <></>
        )}
      </EuiFlexGroup>
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
