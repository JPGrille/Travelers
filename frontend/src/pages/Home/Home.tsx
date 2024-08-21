import React, { useState } from "react";
import { useLocation } from "react-router-dom";

function Home() {
  const location = useLocation();
  const { user } = location.state || {};

  return (
    <div>
      <h1>Welcome {user.name}</h1>
    </div>
  );
}

export default Home;
