import React from 'react';
import {
  Link
} from "react-router-dom";

// TODO : 업로드시 에디터로 이동

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
