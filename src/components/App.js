import React, { useState, useEffect } from "react";
import PostForm from "./PostForm";

const App = () => {
  // State to store user data
  const [users, setUsers] = useState([]);

  // State to store created posts
  const [posts, setPosts] = useState([]);

  // State to store and display any errors
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch user data from an API when the component mounts
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error(error));
  }, []);

  // Function to create a new post
  const createPost = (postData) => {
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Add the newly created post to the list of posts
        setPosts([...posts, data]);
      })
      .catch((error) => {
        console.error("Error creating post:", error);
        // Set an error message if there's an issue with post creation
        setError("Error creating post. Please try again later.");
      });
  };

  return (
    <div className="container">
      <div className="centered-heading">
        <h1>Create a New Post</h1>
      </div>
      {/* Render the PostForm component with user data and createPost function */}
      <PostForm users={users} createPost={createPost} />

      {/* Display error message if there's an error */}
      {error && <p className="error">{error}</p>}

      <div className="centered-heading">
        <h1>Created Posts</h1>
      </div>
      <div className="post-container">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <h2 className="post-title">{post.title}</h2>
            <p className="post-body">{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
