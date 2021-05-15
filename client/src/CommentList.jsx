import React from 'react';

const CommentList = ({ comments }) => {
  const renderedComments = comments.map((comment) => {
    let content;

    switch (comment.status) {
      case 'approved':
        content = comment.content;
        break;

      case 'pending':
        content = <i>{'This comment is awaiting moderation'}</i>;
        break;

      case 'rejected':
        content = <i>{'This comment has been rejected'}</i>;
        break;

      default:
        break;
    }

    return <li key={comment.id}>{content}</li>;
  });

  return (
    <div>
      <ul>{renderedComments}</ul>
    </div>
  );
};

export default CommentList;
