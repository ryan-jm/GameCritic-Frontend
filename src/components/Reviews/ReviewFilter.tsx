import { EuiFacetButton, EuiFacetGroup, EuiIcon } from '@elastic/eui';
import { useState } from 'react';

const ReviewFilter = () => {
  const [selectedOption, setSelectedOption] = useState<string>('all');

  return (
    <EuiFacetGroup layout="horizontal" gutterSize="l">
      <EuiFacetButton id="all" icon={<EuiIcon type="dot" color="accent" />} isSelected>
        All
      </EuiFacetButton>
      <EuiFacetButton icon={<EuiIcon type="dot" color="accent" />}>All</EuiFacetButton>
    </EuiFacetGroup>
  );
};

export default ReviewFilter;
