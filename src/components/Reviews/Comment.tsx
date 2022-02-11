import {
  EuiAvatar,
  EuiButtonIcon,
  EuiCommentList,
  EuiContextMenuItem,
  EuiContextMenuPanel,
  EuiFlexGroup,
  EuiGlobalToastList,
  EuiHorizontalRule,
  EuiLoadingContent,
  EuiPanel,
  EuiPopover,
  EuiSpacer,
  EuiText,
  EuiTextArea,
} from '@elastic/eui';
import React from 'react';

import * as API from '../../api/Reviews';
import { useAuth } from '../../stores/AuthContext';
import { Comment as IComment } from '../../types/review.types';
import CommentBox from './CommentBox';

interface ICommentProps {
  reviewId: number | undefined;
}

const Comment = ({ reviewId }: ICommentProps) => {
  const { user } = useAuth();
  const [reviewComments, setReviewComments] = React.useState<Array<IComment> | null>(
    null
  );
  const [toastList, setToastList] = React.useState<Array<any>>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [commentBody, setCommentBody] = React.useState<string>('');
  const [popoverOpen, setPopoverOpen] = React.useState<string>('');
  const [editState, setEditState] = React.useState<number>(0);

  React.useEffect(() => {
    const fetchComments = async () => {
      API.validate(user?.token ?? '');
      const comments = await API.getReviewComments(reviewId);
      setReviewComments(comments);
      setIsLoading(false);
    };

    if (reviewId) {
      fetchComments();
    }
  }, [reviewId, user?.token]);

  const handleChange = (e: any) => {
    setCommentBody(() => e.target.value);
  };

  const handleDelete = (id: number) => {
    API.validate(user?.token ?? '');
    API.removeComment(id);
    setReviewComments(() =>
      reviewComments
        ? reviewComments.filter((comment) => {
            return comment?.comment_id !== id;
          })
        : reviewComments
    );
  };

  const submitComment = () => {
    const postComment = async () => {
      API.validate(user?.token ?? '');
      const comment = await API.insertComment(reviewId, user?.username, commentBody);
      setReviewComments((prev: any) => [
        ...prev,
        { ...comment, avatar_url: user?.avatar_url },
      ]);
    };

    postComment();
    setCommentBody(() => '');
  };

  const closePopover = () => {
    setPopoverOpen(() => 'none');
  };

  const handlePopoverAction = (action: string, comment: IComment) => {
    switch (action) {
      default:
        break;
      case 'edit':
        setEditState(() => comment?.comment_id);
        break;
      case 'copy':
        const newToast = {
          title: 'Copied to clipboard!',
          color: 'success',
          iconType: 'check',
        };
        setToastList((prev) => [...prev, newToast]);
        return navigator.clipboard.writeText(comment?.body);
      case 'delete':
        handleDelete(comment?.comment_id);
        const deleteToast = {
          title: 'Comment deleted!',
          color: 'danger',
          iconType: 'flag',
        };
        setToastList((prev) => [...prev, deleteToast]);
    }
  };

  const items = (comment: IComment) => [
    <EuiContextMenuItem
      key="copy"
      icon="copy"
      onClick={() => handlePopoverAction('copy', comment)}
    >
      Copy
    </EuiContextMenuItem>,
    <EuiContextMenuItem
      key="edit"
      icon="pencil"
      onClick={() => handlePopoverAction('edit', comment)}
    >
      Edit
    </EuiContextMenuItem>,
    <EuiContextMenuItem
      key="share"
      icon="eraser"
      onClick={() => handlePopoverAction('delete', comment)}
    >
      Delete
    </EuiContextMenuItem>,
  ];

  const userOwnedActions = (comment: IComment) => (
    <EuiPopover
      id={`popover-${comment?.comment_id}`}
      button={
        <EuiButtonIcon
          display="empty"
          color="ghost"
          size="s"
          iconType="boxesVertical"
          aria-label="More"
          onClick={() => setPopoverOpen(() => `popover-${comment?.comment_id}`)}
        />
      }
      isOpen={popoverOpen === `popover-${comment?.comment_id}`}
      closePopover={closePopover}
      panelPaddingSize="none"
      anchorPosition="downLeft"
    >
      <EuiContextMenuPanel size="s" items={items(comment)} />
    </EuiPopover>
  );

  return (
    <>
      <EuiPanel
        paddingSize="l"
        hasShadow={false}
        color="subdued"
        style={{ width: '100%' }}
      >
        {isLoading ? (
          <p style={{ width: '100%' }}>
            <EuiLoadingContent lines={2} />
            <EuiSpacer size="l" />
            <EuiLoadingContent lines={2} />
            <EuiSpacer size="l" />
            <EuiLoadingContent lines={2} />
          </p>
        ) : (
          <EuiCommentList
            comments={reviewComments?.map((comment) => {
              return {
                username: comment.author,
                event: 'commented',
                timestamp: `on ${new Date(comment?.created_at).toDateString()}`,
                timelineIcon: (
                  <EuiAvatar imageUrl={comment?.avatar_url ?? ''} name={comment.author} />
                ),
                children: (
                  <>
                    {comment?.author === user?.username ? (
                      <CommentBox
                        editState={editState}
                        comment={comment}
                        clear={setEditState}
                      />
                    ) : (
                      <EuiText size="s">
                        <p>{comment.body}</p>
                      </EuiText>
                    )}
                  </>
                ),
                actions:
                  comment.author === user?.username ? userOwnedActions(comment) : null,
              };
            })}
          />
        )}
        <EuiHorizontalRule size="half" />
        <EuiTextArea
          fullWidth
          placeholder="Write a comment..."
          onChange={handleChange}
          value={commentBody}
        />
        <EuiSpacer />
        <EuiFlexGroup justifyContent="flexEnd">
          <EuiButtonIcon
            iconType="arrowRight"
            display="empty"
            color="accent"
            disabled={commentBody.length === 0}
            onClick={() => submitComment()}
          />
        </EuiFlexGroup>
      </EuiPanel>
      <EuiGlobalToastList
        toasts={toastList}
        dismissToast={(removedToast) =>
          setToastList(toastList.filter((toast) => toast.id !== removedToast.id))
        }
        toastLifeTimeMs={4000}
      />
    </>
  );
};

export default Comment;
