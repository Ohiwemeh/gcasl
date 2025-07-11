import React from "react";

const AdminVerification = ({ request = null, onUpdate = () => {} }) => {
  return (
    <div style={{ 
      border: "2px solid red", 
      padding: "1rem", 
      margin: "1rem",
      backgroundColor: "yellow" 
    }}>
      <h1>MOBILE TEST</h1>
      <p>If you can see this, the component is rendering.</p>
      <p>Request prop: {request ? 'EXISTS' : 'MISSING'}</p>
      <p>Screen width: {window.innerWidth}px</p>
      <p>User agent: {navigator.userAgent}</p>
      {request && (
        <div>
          <p>Request ID: {request._id}</p>
          <p>User exists: {request.user ? 'YES' : 'NO'}</p>
          {request.user && (
            <p>User name: {request.user.name}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminVerification;