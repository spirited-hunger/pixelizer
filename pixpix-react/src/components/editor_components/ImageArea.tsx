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

export class ImageArea extends React.Component<MyProps, {}> {
  imageCanvasRef: React.RefObject<HTMLCanvasElement>;
  pixCanvasRef: React.RefObject<HTMLCanvasElement>;
  resultCanvasRef: React.RefObject<HTMLCanvasElement>;
  gridCanvasRef: React.RefObject<HTMLCanvasElement>;

  onUnmount = [] as (() => void)[];

  constructor(props: MyProps) {
    super(props);
    this.state = {};

    this.imageCanvasRef = React.createRef();
    this.pixCanvasRef = React.createRef();
    this.resultCanvasRef = React.createRef();
    this.gridCanvasRef = React.createRef();
  }

  componentDidMount() {
    const imageCanvas = this.imageCanvasRef.current;
    const imageContext = imageCanvas?.getContext("2d");

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
      <div className="image-area row-[1/13] col-[1/4] flex flex-col">
        <div className="image-bar bg-dark-grey flex-[0_0_30px] border-pix border-dark-line">
          image size: {this.props.imagePXWidth} x {this.props.imagePXHeight}
        </div>
        <div className="image-content flex-[1_0_auto] border-l-pix border-r-pix border-b-pix border-dark-line flex justify-center items-center">
          <canvas
            className={`image-canvas border-pix border-black absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-48%]`}
            ref={this.imageCanvasRef}
            width={this.props.imagePXWidth}
            height={this.props.imagePXHeight}
            style={{
              width: `${this.props.imageCSSWidth}`,
              height: `${this.props.imageCSSHeight}`,
            }}
          ></canvas>
          <canvas
            className="pix-canvas border-pix border-black absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-48%]"
            ref={this.pixCanvasRef}
            width={this.props.imagePXWidth}
            height={this.props.imagePXHeight}
            style={{
              width: `${this.props.imageCSSWidth}`,
              height: `${this.props.imageCSSHeight}`,
            }}
          ></canvas>
          <canvas
            className="result-canvas border-pix border-black absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-48%]"
            ref={this.resultCanvasRef}
            width={this.props.imagePXWidth}
            height={this.props.imagePXHeight}
            style={{
              width: `${this.props.imageCSSWidth}`,
              height: `${this.props.imageCSSHeight}`,
            }}
          ></canvas>
          <canvas
            className="grid-canvas border-pix border-black absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-48%]"
            ref={this.gridCanvasRef}
            width={this.props.imagePXWidth}
            height={this.props.imagePXHeight}
            style={{
              width: `${this.props.imageCSSWidth}`,
              height: `${this.props.imageCSSHeight}`,
            }}
          ></canvas>
        </div>
      </div>
    );
  }
}