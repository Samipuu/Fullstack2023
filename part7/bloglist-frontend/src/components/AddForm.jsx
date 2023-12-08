import { useState } from "react";
import { Button, TextField } from "@mui/material";

const AddForm = ({ handleNewBlog }) => {
  const [blogName, setBlogName] = useState("");
  const [blogTitle, setBlogTitle] = useState("");
  const [blogURL, setBlogURL] = useState("");

  const addBlog = (event) => {
    event.preventDefault();
    console.log(event);
    handleNewBlog({
      title: blogTitle,
      author: blogName,
      url: blogURL,
    });

    setBlogName("");
    setBlogTitle("");
    setBlogURL("");
  };

  return (
    <form onSubmit={addBlog}>
      <div>
        <h2>Create new blog</h2>
        <div>
          <TextField
            label="Title"
            type="text"
            value={blogTitle}
            name="Title"
            id="title"
            onChange={({ target }) => setBlogTitle(target.value)}
          />
        </div>
        <div>
          <TextField
            label="Author"
            type="text"
            value={blogName}
            name="Author"
            id="author"
            onChange={({ target }) => setBlogName(target.value)}
          />
        </div>
        <div>
          <TextField
            label="URL"
            type="text"
            value={blogURL}
            name="URL"
            id="url"
            onChange={({ target }) => setBlogURL(target.value)}
          />
        </div>
      </div>
      <Button
        variant="contained"
        color="primary"
        type="submit"
        id="createButton"
      >
        Create
      </Button>
    </form>
  );
};

export default AddForm;
