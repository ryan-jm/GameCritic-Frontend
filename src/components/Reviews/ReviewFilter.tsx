import { EuiFacetButton, EuiFacetGroup, EuiIcon } from '@elastic/eui';
import { useState } from 'react';

interface IOption {
  id: string;
  label: string;
  icon: JSX.Element;
}

const ReviewFilter = () => {
  const [selectedOption, setSelectedOption] = useState<string>('all');

  const handleSelect = (id: string) => {
    setSelectedOption(() => id);
  };

  const options = [
    {
      id: 'all',
      label: 'All reviews',
      icon: <EuiIcon type="dot" color="accent" />,
    },
    {
      id: 'votes',
      label: 'Hottest reviews',
      icon: <EuiIcon type="dot" color="accent" />,
    },
    {
      id: 'created_at',
      label: 'Newest reviews',
      icon: <EuiIcon type="dot" color="accent" />,
    },
  ];

  const OptionList = (align: string) => {
    return (
      <>
        {options.map((option: IOption) => {
          return (
            <EuiFacetButton
              key={option.id}
              id={`${option.id}_${align}`}
              icon={selectedOption === option.id ? option.icon : null}
              onClick={() => handleSelect(option.id)}
              isSelected={selectedOption === option.id}
            >
              {option.label}
            </EuiFacetButton>
          );
        })}
      </>
    );
  };

  return (
    <EuiFacetGroup layout="horizontal" gutterSize="l">
      {OptionList('horizontal')}
    </EuiFacetGroup>
  );
};

export default ReviewFilter;
