import React from "react";
import "./App.css";
import Home from "./components/Home";
import Editor from "./components/Editor";
import { Test } from "./components/Test";
import { BrowserRouter, Routes, Route } from "react-router-dom";

type MyState = {
  file: string | undefined; // like this
};

class App extends React.Component<{}, MyState> {
  constructor(props: any) {
    super(props);
    this.state = {
      file: undefined,
    };
  }

  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home file={this.state.file} />} />
          <Route path="/editor" element={<Editor />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
