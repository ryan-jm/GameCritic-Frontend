import { EuiButtonIcon, EuiFieldText, EuiText } from '@elastic/eui';
import React, { useEffect, useState } from 'react';

import * as API from '../../api/Reviews';
import { useAuth } from '../../contexts/Auth/AuthContext';
import { ICommentBoxProps } from './types';

const CommentBox = ({ editState, comment, clear }: ICommentBoxProps) => {
  const { user } = useAuth();
  const [isEditting, setIsEditting] = useState<boolean>(false);
  const [commentValue, setCommentValue] = useState<string>(comment?.body);
  const [finalComment, setFinalComment] = useState<string>(comment?.body);

  useEffect(() => {
    if (editState === comment.comment_id) {
      setIsEditting(true);
    }
  }, [comment, editState]);

  const handleEdit = () => {
    const updateComment = async () => {
      API.validate(user?.token ?? '');
      API.patchComment(comment?.comment_id, commentValue);
    };
    setFinalComment(commentValue);
    setIsEditting(false);
    updateComment();
    clear(0);
  };

  return (
    <>
      {!isEditting ? (
        <EuiText size="s">
          <p>{finalComment}</p>
        </EuiText>
      ) : (
        <EuiFieldText
          value={commentValue}
          onChange={(e) => setCommentValue(e.target.value)}
          append={<EuiButtonIcon iconType="pencil" color="ghost" onClick={handleEdit} />}
        />
      )}
    </>
  );
};

export default CommentBox;
