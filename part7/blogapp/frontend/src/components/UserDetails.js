import React from 'react';

const UserDetails = ({ user }) => {
  if (!user) {
    return <div>...loading</div>;
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>
            {blog.title}, {blog.author}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserDetails;
