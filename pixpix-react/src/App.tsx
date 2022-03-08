import React from "react";
import "./App.css";
import Home from "./components/Home";
import Editor from "./components/Editor";
// import { Test } from "./components/Test";

type MyState = {
  file: string | undefined;
};

class App extends React.Component<{}, MyState> {
  constructor(props: any) {
    super(props);
    this.state = {
      file: undefined,
    };
  }

  handleFileUpload = (file: string) => {
    this.setState({ file });
  }

  render() {
    return (
      <div>
        {this.state.file === undefined ? <Home handleFileUpload={this.handleFileUpload} /> : <Editor file={this.state.file}/> }
      </div>
    );
  }
}

export default App;
