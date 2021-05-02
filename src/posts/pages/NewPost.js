import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import "./PostForm.css";

const NewPost = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  const history = useHistory();

  const postSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      //adding the parameters to the formData
      formData.append("title", formState.inputs.title.value);
      formData.append("description", formState.inputs.description.value);
      formData.append("image", formState.inputs.image.value);

      // send request to add the post
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/posts`,
        "POST",
        formData,
        {
          Authorization: "  Bearer " + auth.token,
        }
      );

      //redirect the user to the home page
      history.push("/");
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className='post-form' onSubmit={postSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id='title'
          element='input'
          type='text'
          label='Title'
          validators={[VALIDATOR_REQUIRE()]}
          errorText='Please enter a valid title.'
          onInput={inputHandler}
        />
        <Input
          id='description'
          element='textarea'
          label='Description'
          validators={[VALIDATOR_MINLENGTH(4)]}
          errorText='Please enter a valid title (At least 5 characters).'
          onInput={inputHandler}
        />
        <ImageUpload
          id='image'
          center
          onInput={inputHandler}
          errorText='Please provide an image.'
        />
        <Button type='Submit' disabled={!formState.isValid}>
          ADD POST
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewPost;
