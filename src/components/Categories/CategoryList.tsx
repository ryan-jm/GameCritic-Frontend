import {
    EuiButtonEmpty,
    EuiCard,
    EuiFlexItem,
    EuiIcon,
    EuiModal,
    EuiModalBody,
    EuiModalHeader,
    EuiModalHeaderTitle,
    IconType,
} from '@elastic/eui';
import { useState } from 'react';

import { Review } from '../../types/review.types';
import CategoryReviews from './CategoryReviews';

interface ICategoryIcon {
  [index: string]: IconType;
}

interface ICategoryListProps {
  data: Array<any>;
  icons: ICategoryIcon;
}

const CategoryList = ({ data, icons }: ICategoryListProps) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>('');
  const [modalData, setModalData] = useState<Array<Review> | Array<any>>([]);

  const closeModal = () => {
    setModalData(() => []);
    setModalTitle(() => '');
    setModalVisible(false);
  };

  const showModal = (data: Array<any> | Array<Review>, title: string) => {
    setModalData(() => data);
    setModalTitle(() => `Reviews for ${title}`);
    setModalVisible(true);
  };

  let modal;

  if (modalVisible) {
    modal = (
      <EuiModal onClose={closeModal} style={{ padding: '1rem' }}>
        <EuiModalHeader>
          <EuiModalHeaderTitle>
            <h1>{modalTitle}</h1>
          </EuiModalHeaderTitle>
        </EuiModalHeader>
        <EuiModalBody>
          <CategoryReviews reviews={modalData} />
        </EuiModalBody>
      </EuiModal>
    );
  }

  return (
    <>
      {data?.map((category) => {
        return (
          <EuiFlexItem>
            <EuiCard
              icon={<EuiIcon size="xxl" type={icons[category?.slug]} color="accent" />}
              title={category.title}
              description={category.description}
              onClick={() => showModal(category?.reviews, category?.title)}
              betaBadgeProps={{ label: `Total Reviews: ${category?.reviews?.length}` }}
              footer={
                <EuiButtonEmpty iconType="arrowRight" iconSide="right">
                  Show Reviews
                </EuiButtonEmpty>
              }
            />
          </EuiFlexItem>
        );
      })}
      {modal}
    </>
  );
};

export default CategoryList;
