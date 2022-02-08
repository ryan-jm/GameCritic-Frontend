import { EuiFlexGrid } from '@elastic/eui';

import LoadingCard from './LoadingCard';

const LoadingList = () => {
  const cardList = new Array<any>(1, 2, 3, 4, 5, 6, 7, 8);
  cardList.fill(<LoadingCard />);

  return (
    <>
      <EuiFlexGrid columns={4} style={{ marginTop: '3rem' }}>
        {cardList.map((card) => {
          return card;
        })}
      </EuiFlexGrid>
    </>
  );
};

export default LoadingList;
