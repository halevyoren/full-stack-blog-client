import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import PostList from "../components/PostList";

const UserPosts = () => {
  const userId = useParams().userId;
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedPosts, setLoadedPosts] = useState();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/posts/user/${userId}`
        );
        setLoadedPosts(responseData.posts);
      } catch (err) {}
    };

    fetchPosts();
  }, [sendRequest, userId]);

  const DeletePostHandler = (deletedPostId) => {
    setLoadedPosts((prevPosts) =>
      prevPosts.filter((post) => post.id !== deletedPostId)
    );
  };

  // const LikesAndDislikesHandler = (likes,disLikes) => {
  //   try {
  //     await sendRequest(
  //       `${process.env.REACT_APP_BACKEND_URL}/posts/${postId}/likesAndDisLikes`,
  //       "PATCH",
  //       JSON.stringify({
  //         likes: likes,
  //         disLikes: disLikes,
  //       }),
  //       { "Content-Type": "application/json" }
  //     );
  //     history.push("/" + auth.userId + "/posts");
  //   } catch (err) {}
  // }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className='center'>
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedPosts && (
        <PostList items={loadedPosts} DeletePost={DeletePostHandler} userId={userId} />
      )}
    </React.Fragment>
  );
};

export default UserPosts;
