import React from "react";

const Comment = ({ comment }) => {
  return (
    <div>
      <h1>{comment.comment_content}</h1>
    </div>
  );
};

export default Comment;
