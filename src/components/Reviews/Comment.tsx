import { EuiCommentList, EuiPanel, EuiText } from '@elastic/eui';
import axios from 'axios';
import React from 'react';

interface IComment {
  comment_id: number;
  author: string;
  review_id: number;
  votes: number;
  created_at: string;
  body: string;
}

interface ICommentProps {
  reviewId: number | undefined;
}

const Comment = ({ reviewId }: ICommentProps) => {
  const [reviewComments, setReviewComments] = React.useState<Array<IComment> | null>(
    null
  );

  React.useEffect(() => {
    axios
      .get(`https://gamecritic.herokuapp.com/api/reviews/${reviewId}/comments`, {
        headers: {
          token:
            'eyJhbGciOiJIUzI1NiJ9.dGVzdC11c2VycGFzc3dvcmQxMjM.AZnzREXVU9h-dZMICCE594oITjj53xgnxx2L_g_XLBk',
        },
      })
      .then(({ data }) => {
        setReviewComments(data.comments);
      });
  }, [reviewId]);

  return (
    <EuiPanel paddingSize="l" hasShadow={false} color="subdued">
      <EuiCommentList
        comments={reviewComments?.map((comment) => {
          return {
            username: comment.author,
            event: 'commented',
            timestamp: `on ${new Date(comment?.created_at).toDateString()}`,
            children: (
              <EuiText size="s">
                <p>{comment.body}</p>
              </EuiText>
            ),
          };
        })}
      />
    </EuiPanel>
  );
};

export default Comment;
