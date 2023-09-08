import React, { useState, useEffect } from "react";
import UserSelect from "./ApiUser";
import { toast } from 'react-toastify';
import { ReactBingmaps } from "react-bingmaps";
import 'react-toastify/dist/ReactToastify.css';

const PostForm = ({ users, createPost }) => {
  // State to store the selected user's ID
  const [selectedUserId, setSelectedUserId] = useState("");

  // States to store the post title and body
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  // State to hold the map center coordinates
  const [mapCenter, setMapCenter] = useState([0, 0]);

  // State to hold the selected user's name
  const [selectedUserName, setSelectedUserName] = useState("");

  useEffect(() => {
    // When selectedUserId changes, update the map center coordinates and user name
    if (selectedUserId) {
      const user = users.find((user) => user.id === parseInt(selectedUserId));
      if (user && user.address && user.address.geo) {
        // Update map center with latitude and longitude from user's address
        setMapCenter([
          parseFloat(user.address.geo.lat),
          parseFloat(user.address.geo.lng),
        ]);
        // Set the selected user's name
        setSelectedUserName(user.name);
      }
    }
  }, [selectedUserId, users]);

  // Handle user selection change
  const handleUserChange = (e) => {
    setSelectedUserId(e.target.value);
  };

  // Handle post title change
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  // Handle post body change
  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if all required fields are filled
    if (!selectedUserId || !title || !body) {
      let text="Please Select a User!";
      if(!title || !body){
        text="Incomplete Form!";
      }
      toast.error(text, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
      return;
    }

    // Create post data object
    const postData = {
      title,
      body,
      userId: parseInt(selectedUserId),
    };

    // Log the new post data
    console.log("New Post Data", postData);

    // Call the createPost function to save the post
    createPost(postData);
    toast.success("Post Created!!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
    // Clear the form fields
    setTitle("");
    setBody("");
    setSelectedUserId("");
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* User selection dropdown */}
      <UserSelect
        users={users}
        selectedUserId={selectedUserId}
        handleUserChange={handleUserChange}
      />
      <div>
        {/* Post title input */}
        <label>Title:</label>
        <input type="text" value={title} onChange={handleTitleChange} />
      </div>
      <div>
        {/* Post body textarea */}
        <label>Body:</label>
        <textarea value={body} onChange={handleBodyChange} />
      </div>
      <div>
        <label>Location:</label>
        <div id="bing-map" style={{ width: "100%", height: "300px" }}>
          {/* Bing Maps component */}
          <ReactBingmaps
            bingmapKey="AkoJUS8NbKEgprXmScE_RERQd7Cp3sjwIp4mlgEfSwcV35fkikyilWAkCqlNx1nO"
            center={mapCenter}
            pushPins={[
              {
                location: mapCenter,
                option: { color: "red" },
              },
            ]}
            infoboxes={[
              {
                location: mapCenter,
                option: {
                  title: selectedUserName,
                  description: `latitude:${mapCenter[0]}, Longitude: ${mapCenter[1]}`,
                },
              },
            ]}
            mapTypeId="Aerial"
          />
        </div>
      </div>
      {/* Submit button */}
      <button type="submit">Submit</button>
    </form>
  );
};

export default PostForm;
