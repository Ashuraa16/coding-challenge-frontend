import React from "react";

const UserSelect = ({ users, selectedUserId, handleUserChange }) => {
  return (
    <div>
      {/* Label for the user selection dropdown */}
      <label>Select a User:</label>
      {/* Dropdown for user selection */}
      <select value={selectedUserId} onChange={handleUserChange}>
        {/* Default option */}
        <option value="">Please select a user</option>
        {/* Map through the list of users and generate options */}
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default UserSelect;
