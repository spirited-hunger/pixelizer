import React from "react";

// TODO : 업로드시 에디터로 이동

type MyProp = {
  file: File; // unidefined 인 경우 프롭에 오지 않음
  canvasMaxWidth: number;
  canvasMaxHeight: number;
};

type MyState = {
  imageWidth: number;
  imageHeight: number;
};

class Editor extends React.Component<MyProp, MyState> {
  imageCanvasRef: React.RefObject<HTMLCanvasElement>;
  pixCanvasRef: React.RefObject<HTMLCanvasElement>;
  resultCanvasRef: React.RefObject<HTMLCanvasElement>;
  gridCanvasRef: React.RefObject<HTMLCanvasElement>;

  constructor(props: MyProp) {
    super(props);
    this.state = {
      imageWidth: 0,
      imageHeight: 0,
    };
    this.imageCanvasRef = React.createRef();
    this.pixCanvasRef = React.createRef();
    this.resultCanvasRef = React.createRef();
    this.gridCanvasRef = React.createRef();
  }

  imageDirection: "landscape" | "portrait" = "landscape";
  onUnmount = [] as (() => void)[];

  componentDidMount() {
    const originalImage = new Image();

    const fileReader = new FileReader();

    fileReader.readAsDataURL(this.props.file);

    fileReader.onload = () => {
      originalImage.src = `${fileReader.result}` as string;

      const onImageLoad = () => {
        const originalWidth = originalImage.width;
        const originalHeight = originalImage.height;

        const whRatio = originalWidth / originalHeight;
        if (whRatio >= 1) {
          /* width is bigger */
          this.imageDirection = "landscape";

          this.setState({
            imageWidth: this.props.canvasMaxWidth,
            imageHeight: this.props.canvasMaxWidth / whRatio,
          });
        } else {
          /* height is bigger */
          this.imageDirection = "portrait";

          this.setState({
            imageWidth: this.props.canvasMaxHeight * whRatio,
            imageHeight: this.props.canvasMaxHeight,
          });
        }

        const imageCanvas = this.imageCanvasRef.current;
        const imageContext = imageCanvas?.getContext("2d");

        imageContext?.drawImage(originalImage, 0, 0, this.state.imageWidth, this.state.imageHeight);

      };

      originalImage.addEventListener("load", onImageLoad);
      this.onUnmount.push(() => {
        originalImage.removeEventListener("load", onImageLoad);
      });
    };
  }

  componentWillUnmount() {
    this.onUnmount.forEach((f) => f());
  }

  render() {
    return (
      <div className="main-area ">
        <div className="nav-area">
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
                className={`image-canvas w-${this.state.imageWidth} h-${this.state.imageHeight} border-2 border-black`}
                width={this.state.imageWidth}
                height={this.state.imageHeight}
                ref={this.imageCanvasRef}
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
