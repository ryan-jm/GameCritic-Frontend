import { EuiFlexGrid } from '@elastic/eui';

import LoadingCard from './LoadingCard';
import { ILoadingListProps } from './types';

const LoadingList = ({ itemCount }: ILoadingListProps) => {
  const cardList: Array<any> = Array.apply(null, Array(itemCount)).map((x, i) => i);
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
