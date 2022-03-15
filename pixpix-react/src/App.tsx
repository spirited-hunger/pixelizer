import React from "react";
import "./App.css";
import { Home } from "./components/Home";
import Editor from "./components/Editor";
// import { Test } from "./components/Test";

// Important values
const CANVAS_MAX_WIDTH = 1080;
const CANVAS_MAX_HEIGHT = 1080;

const PIXEL_SIZE = 15;

const MAX_COLOR_DISTANCE = 60;

let pixCount = 0;

class Color {
  rgbString: string;
  constructor(public r: number, public g: number, public b: number) {
    this.rgbString = `rgb(${r}, ${g}, ${b})`;
  }
}

class PaletteColor extends Color {
  constructor(
    public r: number,
    public g: number,
    public b: number,
    public index: number
  ) {
    super(r, g, b);
  }
}

type MyState = {
  file: File | null;
  dragDropMessage: string;
};

class App extends React.Component<{}, MyState, {}> {
  onUnmount = [] as (() => void)[];

  constructor(props: any) {
    super(props);
    this.state = {
      file: null,
      dragDropMessage: "Drag and drop your image to start",
    };
  }

  componentDidMount() {
    const onDragOver = (e: DragEvent): void => {
      e.preventDefault();
      this.setState({ dragDropMessage: "Release your image to upload" });
    };

    window.addEventListener("dragover", onDragOver);
    this.onUnmount.push(() => {
      window.removeEventListener("dragover", onDragOver);
    });

    const onDragLeave = (e: DragEvent): void => {
      e.preventDefault();
      this.setState({ dragDropMessage: "Drag and drop your image to start" });
    };

    window.addEventListener("dragleave", onDragLeave);
    this.onUnmount.push(() => {
      window.removeEventListener("dragleave", onDragLeave);
    });

    const onDrop = (e: DragEvent): void => {
      e.preventDefault();
      if (e.dataTransfer) {
        const file = e.dataTransfer.files[0];
        this.setState({ file: file });
      }
    };

    window.addEventListener("drop", onDrop);
    this.onUnmount.push(() => {
      window.removeEventListener("drop", onDrop);
    });
  }

  componentWillUnmount() {
    this.onUnmount.forEach((f) => f());
  }

  handleFileUpload = (file: File) => {
    this.setState({ file: file });
  };

  render() {
    return (
      <div>
        {this.state.file === null ? (
          <Home
            handleFileUpload={this.handleFileUpload}
            dragDropMessage={this.state.dragDropMessage}
          />
        ) : (
          <Editor file={this.state.file} />
        )}
      </div>
    );
  }
}

export default App;
