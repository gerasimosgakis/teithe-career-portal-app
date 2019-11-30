import React, { useRef, useState } from "react";
import config from "../../config";
import { API } from "aws-amplify";
import { s3Upload } from "../../shared/functions/aws";

const CVForm = ({ user }) => {
  let file = useRef(null);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return content.length > 0;
  }

  function handleFileChange(event) {
    file.current = event.target.files[0];
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE /
          1000000} MB.`
      );
      return;
    }

    setIsLoading(true);

    try {
      await s3Upload(file.current, user);
      file = null;
    } catch (error) {
      alert(error);
      setIsLoading(false);
    }
  }

  return (
    <div>
      {user}
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          className="inputfile mr2"
          onChange={handleFileChange}
          value={file.current && file.current.name ? file.current.name : null}
        />
        <button className="button submit-btn">Submit</button>
      </form>
    </div>
  );
};

export default CVForm;
