import React, { useState, useContext } from "react";
import { HiThumbUp, HiThumbDown } from "react-icons/hi";

import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import "./PostItem.css";

const PostItem = ({
  id,
  image,
  title,
  description,
  address,
  likes,
  disLikes,
  creatorId,
  DeletePost,
}) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteModal = async () => {
    setShowConfirmModal(false);

    try {
      // sending a delete request
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/posts/${id}`,
        "DELETE",
        null,
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      DeletePost(id);
      console.log("Deleted enemy");
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header='Are you sure?'
        footerClass='post-item__modal-actions'
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              Cancel
            </Button>
            <Button danger onClick={confirmDeleteModal}>
              Delete
            </Button>
          </React.Fragment>
        }
      >
        <p>
          Do you want to proceed and delete this post? Please note that it
          cannot be undone afterwards.
        </p>
      </Modal>
      <li className='post-item'>
        <Card className='post-item__content'>
          {isLoading && <LoadingSpinner asOverlay />}
          <div className='post-item__image'>
            <img src={`${process.env.REACT_APP_ASSET_URL}/${image}`} alt={title} />
          </div>
          <div className='post-item__info'>
            <h2>{title}</h2>
            <h3>{address}</h3>
            <p>{description}</p>
          </div>
          <div className='post-item__actions'>
            <Button inverse onClick={() => {}}>
              {likes.length} {<HiThumbUp />}
            </Button>
            <Button inverse onClick={() => {}}>
              {disLikes.length} {<HiThumbDown />}
            </Button>
          </div>
          <div className='post-item__actions'>
            {auth.userId === creatorId && (
              <Button to={`/posts/${id}`}>EDIT</Button>
            )}
            {auth.userId === creatorId && (
              <Button danger onClick={showDeleteWarningHandler}>
                DELETE
              </Button>
            )}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default PostItem;
