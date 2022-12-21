import React from "react";
import { Post } from "../../classes/Post";

const PostRow = ({ post, fetchPostsData }: { post: Post; fetchPostsData: Function }) => {

  return (
    <tr className="body">
      <td className="column0"></td>
      <td className="column1">{post.author_name}</td>
      <td className="column2">{post.title}</td>
      <td className="column3">{post.content}</td>
      <td className="column4">{post.time_date}</td>
    </tr>
  );
};

export default PostRow;
