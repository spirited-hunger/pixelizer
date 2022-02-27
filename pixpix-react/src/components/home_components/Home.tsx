import React from 'react';
import {
  Link
} from "react-router-dom";

function Home() {
  return <div>
    <h1>Home</h1>
    <nav>
      <Link to="/">Home</Link> |{" "}
      <Link to="editor">Editor</Link>
    </nav>
  </div>;
}


export default Home;
