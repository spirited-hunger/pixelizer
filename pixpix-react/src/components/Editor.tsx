import React from "react";
import { Link } from "react-router-dom";

function Editor() {
  return (
    <div>
      <h1>Editor</h1>
      <nav>
        <Link to="/">Home</Link> | <Link to="editor">Editor</Link>
      </nav>
    </div>
  );
}

export default Editor;
