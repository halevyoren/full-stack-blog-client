import React, { useContext } from "react";

import Card from "../../shared/components/UIElements/Card";
import PostItem from "./PostItem";
import Button from "../../shared/components/FormElements/Button";
import { AuthContext } from "../../shared/context/auth-context";
import "./PostList.css";

const PostList = (props) => {
  const auth = useContext(AuthContext);
  const pageUser = auth.isLoggedIn && auth.userId === props.userId;
  if (props.items.length === 0) {
    return (
      <div className='post-list center'>
        {pageUser && (
          <Card>
            <h2>No posts found. Maybe create one?</h2>
            <Button to='/posts/new'>Share Post</Button>
          </Card>
        )}
        {!pageUser && (
          <Card>
            <h2>This user currently has no posts</h2>
          </Card>
        )}
      </div>
    );
  }

  return (
    <ul className='post-list'>
      {props.items.map((post) => (
        <PostItem
          key={post.id}
          id={post.id}
          image={post.image}
          title={post.title}
          description={post.description}
          address={post.address}
          creatorId={post.creator}
          DeletePost={props.DeletePost}
          likes={post.likes}
          disLikes={post.disLikes}
        />
      ))}
    </ul>
  );
};

export default PostList;
