import React, { useRef, useState, useEffect } from "react";

import Button from "./Button";
import "./ImageUpload.css";

const ImageUpload = (props) => {
  //the selected file
  const [file, setFile] = useState();
  //the url to show as a preview
  const [previewUrl, setPreviewUrl] = useState();
  //is the selected file a valid image
  const [isValid, setIsValid] = useState(false);

  const filePickerRef = useRef();

  //generating a preview when a file is picked
  useEffect(() => {
    if (!file) {
      return;
    }
    //generating an image preview url
    const fileReader = new FileReader();
    //this fuction will execute once the reading of the file is done
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    //creating a url to output
    fileReader.readAsDataURL(file);
  }, [file]);

  //generate a preview of the image and forward the pick file
  const pickedFileHandler = (event) => {
    let pickedFile;

    // used to pass if file is valid (isValid changes only after the function is done)
    let fileIsValid = isValid;

    //if exactly 1 file was picked
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    props.onInput(props.id, pickedFile, fileIsValid);
  };

  //simulating a click in the input (instead of the button)
  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <div className='form-control'>
      {/* the file picker will start invisible so that the button will be pressed instead*/}
      <input
        id={props.id}
        ref={filePickerRef}
        style={{ display: "none" }}
        type='file'
        accept='.jpg,.png,.jpeg'
        onChange={pickedFileHandler}
      />
      <div className={`image-upload ${props.center && "center"}`}>
        <div className='image-upload__preview'>
          {/* showing a preview of the picked image */}
          {previewUrl && <img src={previewUrl} alt='preview' />}
          {!previewUrl && <p>please pick an image.</p>}
        </div>

        <Button type='button' onClick={pickImageHandler}>
          Pick Image
        </Button>
      </div>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default ImageUpload;
