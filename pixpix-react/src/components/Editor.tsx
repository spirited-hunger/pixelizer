import React from "react";

type MyProps = {
  imageURL: string; // unidefined 인 경우 프롭에 오지 않음
  imageElement: HTMLImageElement;
  imagePXWidth: number;
  imagePXHeight: number;
  imageCSSWidth: string;
  imageCSSHeight: string;
  imageDirection: "landscape" | "portrait";
};

type MyState = {};

class Editor extends React.Component<MyProps, MyState> {
  imageCanvasRef: React.RefObject<HTMLCanvasElement>;
  pixCanvasRef: React.RefObject<HTMLCanvasElement>;
  resultCanvasRef: React.RefObject<HTMLCanvasElement>;
  gridCanvasRef: React.RefObject<HTMLCanvasElement>;

  constructor(props: MyProps) {
    super(props);
    this.state = {};
    this.imageCanvasRef = React.createRef();
    this.pixCanvasRef = React.createRef();
    this.resultCanvasRef = React.createRef();
    this.gridCanvasRef = React.createRef();
  }
  onUnmount = [] as (() => void)[];

  componentDidMount() {
    const imageCanvas = this.imageCanvasRef.current;
    const imageContext = imageCanvas?.getContext("2d");

    console.log(this.props);

    imageContext?.drawImage(
      this.props.imageElement,
      0,
      0,
      this.props.imagePXWidth,
      this.props.imagePXHeight
    );
  }

  componentWillUnmount() {
    this.onUnmount.forEach((f) => f());
  }

  render() {
    return (
      <div className="main-area bg-gradient-to-b from-blue-grey to-smooth-grey border-none grid grid-cols-7 auto-rows-[100vh]">
        <div className="nav-area bg-dark-grey">
          <div className="logo-area">PIXPIX</div>
          <div className="menu-area">
            <div>
              <div>open image</div>
            </div>
            <div>
              <div>reset image</div>
            </div>
            <div>
              <div>save image</div>
            </div>
            <div>
              <div>share image</div>
            </div>
          </div>
          <div className="github-area">Github</div>
        </div>
        <div className="editor-area">
          <div className="image-area">
            <div className="image-bar"></div>
            <div className="image-content">
              <canvas
                className={`image-canvas ${this.props.imageCSSWidth} ${this.props.imageCSSHeight} border-2 border-black`}
                width={this.props.imagePXWidth}
                height={this.props.imagePXHeight}
                ref={this.imageCanvasRef}
                style={{
                  width: `${this.props.imageCSSWidth}`,
                  height: `${this.props.imageCSSHeight}`,
                }}
              ></canvas>
              <canvas
                className="pix-canvas hidden"
                ref={this.pixCanvasRef}
              ></canvas>
              <canvas
                className="result-canvas"
                ref={this.resultCanvasRef}
              ></canvas>
              <canvas className="grid-canvas" ref={this.gridCanvasRef}></canvas>
            </div>
          </div>
          <div className="edit-area">
            <div className="size-edit-area">
              <div className="size-edit-bar"></div>
              <div className="size-edit-content"></div>
            </div>
            <div className="shape-edit-area">
              <div className="shape-edit-bar"></div>
              <div className="shape-edit-content"></div>
            </div>
            <div className="palette-edit-area">
              <div className="palette-edit-bar"></div>
              <div className="palette-edit-content"></div>
            </div>
            <div className="color-edit-area">
              <div className="color-edit-bar"></div>
              <div className="color-edit-content"></div>
            </div>
          </div>
          <div className="pix-btn-area">
            <div className="pix-preview-btn"></div>
            <div className="pix-next-btn"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Editor;
