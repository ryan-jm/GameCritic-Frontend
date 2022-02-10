import {
    EuiButton,
    EuiButtonEmpty,
    EuiDescribedFormGroup,
    EuiFieldText,
    EuiFilePicker,
    EuiForm,
    EuiFormRow,
    EuiModal,
    EuiModalBody,
    EuiModalFooter,
    EuiModalHeader,
    EuiModalHeaderTitle,
    EuiSelect,
    EuiTextArea,
} from '@elastic/eui';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import * as API from '../../api/Reviews';
import { useAuth } from '../../stores/AuthContext';
import { IModalProps } from '../../types/review.types';

const CreateReview = ({ visible, toggle }: IModalProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = React.useState('');
  const [imgUrl, setImgUrl] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [designer, setDesigner] = React.useState('');
  const [body, setBody] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const closeModal = () => toggle(false);

  const handleFile = (file: File) => {
    API.hostImage(file).then((url) => {
      setImgUrl(url);
    });
  };

  const handleCreate = async () => {
    setIsLoading(true);
    API.validate(user?.token ?? '');
    const review = await API.postReview(
      title,
      imgUrl,
      body,
      designer,
      category,
      user?.username ?? ''
    );
    if (review) {
      navigate(`/reviews/${review.review_id}`);
    }
  };

  return (
    <>
      {visible ? (
        <EuiModal onClose={closeModal} initialFocus="[name=title]">
          <EuiModalHeader>
            <EuiModalHeaderTitle>
              <h1>Write a Review</h1>
            </EuiModalHeaderTitle>
          </EuiModalHeader>

          <EuiModalBody>
            <EuiForm component="form">
              <EuiDescribedFormGroup
                title={<h3>Review Title</h3>}
                description="Keep it short, sweet, and descriptive."
              >
                <EuiFormRow>
                  <EuiFieldText
                    name="title"
                    aria-label="Review Title Input"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                  />
                </EuiFormRow>
              </EuiDescribedFormGroup>
              <EuiDescribedFormGroup
                title={<h3>Review Image</h3>}
                description={
                  <>
                    <p>Please upload an image to go along with your review!</p>
                    <p>This currently isn't working... (I hate CORS policies)</p>
                  </>
                }
              >
                <EuiFormRow label="Upload an image...">
                  <EuiFilePicker
                    accept="image/*"
                    onChange={(files: FileList | null) =>
                      files ? handleFile(files[0]) : null
                    }
                  />
                </EuiFormRow>
              </EuiDescribedFormGroup>
              <EuiDescribedFormGroup
                title={<h3>Category</h3>}
                description="What category does the game you're reviewing fall under?"
              >
                <EuiFormRow hasEmptyLabelSpace>
                  <EuiSelect
                    hasNoInitialSelection
                    onChange={(e) => setCategory(e.target.value)}
                    options={[
                      { value: 'strategy', text: 'Strategy' },
                      { value: 'hidden-roles', text: 'Hidden Roles' },
                      { value: 'dexterity', text: 'Dexterity' },
                      { value: 'push-your-luck', text: 'Push your Luck' },
                      { value: 'roll-and-write', text: 'Roll and Write' },
                      { value: 'deck-building', text: 'Deck Building' },
                      { value: 'engine-building', text: 'Engine Building' },
                    ]}
                    aria-label="Category selector"
                  />
                </EuiFormRow>
              </EuiDescribedFormGroup>
              <EuiDescribedFormGroup
                title={<h3>Designer</h3>}
                description="Who designed this game?"
              >
                <EuiFormRow>
                  <EuiFieldText
                    name="designer"
                    aria-label="Designer input"
                    onChange={(e) => setDesigner(e.target.value)}
                    value={designer}
                  />
                </EuiFormRow>
              </EuiDescribedFormGroup>
              <EuiDescribedFormGroup
                title={<h3>Review Body</h3>}
                description="Go on, write your heart out!"
              >
                <EuiFormRow hasEmptyLabelSpace>
                  <EuiTextArea
                    fullWidth
                    onChange={(e) => setBody(e.target.value)}
                    value={body}
                  />
                </EuiFormRow>
              </EuiDescribedFormGroup>
            </EuiForm>
          </EuiModalBody>

          <EuiModalFooter>
            <EuiButtonEmpty color="danger" onClick={closeModal} disabled={isLoading}>
              Cancel
            </EuiButtonEmpty>

            <EuiButton
              fill
              color="accent"
              onClick={() => handleCreate()}
              isLoading={isLoading}
            >
              Post
            </EuiButton>
          </EuiModalFooter>
        </EuiModal>
      ) : (
        <></>
      )}
    </>
  );
};

export default CreateReview;
