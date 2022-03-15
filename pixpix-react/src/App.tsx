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
  file: string | undefined;
  dragDropMessage: string;
};


class App extends React.Component<{}, MyState, {}> {  
  onUnmount = [] as (() => void)[];

  constructor(props: any) {
    super(props);
    this.state = {
      file: undefined,
      dragDropMessage: 'Drag and drop your image to start',
    };
  }

  componentDidMount() {
    const onClick = (e: MouseEvent) => {
      console.log("click");
    }
    window.addEventListener("click", onClick);
  }

  componentWillUnmount() {
    this.onUnmount.forEach((f) => f());
  }

  handleFileUpload = (file: string) => {
    this.setState({ file });
  };

  render() {
    return (
      <div>
        {this.state.file === undefined ? (
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
