import React from "react";

export class Preview extends React.Component<
  {
    dragDropMessage: string;
    handleFileUpload: (file: File) => void;
  },
  {}
> {
  inputRef: React.RefObject<HTMLInputElement>;

  constructor(props: {
    dragDropMessage: string;
    handleFileUpload: (file: File) => void;
  }) {
    super(props);
    this.state = {};

    this.inputRef = React.createRef();
  }

  handleClick() {
    this.inputRef.current?.click();
  }

  handleChange() {
    const file = this.inputRef.current?.files?.[0];
    if (file) {
      this.props.handleFileUpload(file);
    }
  }

  render() {
    return (
      <div className="image-area h-[400px] flex-400 flex flex-col cursor-copy">
        <div className="image-bar box-border flex-[0_0_30px] border-pix border-dark-line bg-light-grey">
          {this.props.dragDropMessage}
        </div>
        <div className="image-content  box-border border-l-pix border-r-pix border-b-pix border-dark-line flex-[1_0_auto] flex flex-col justify-center items-center">
          <div>DRAG AND DROP</div>
          <div>or</div>
          <div>
            <span
              className="text-blue-900 cursor-pointer hover:text-blue-700"
              onClick={() => this.handleClick()}
            >
              BROWSE
            </span>{" "}
            FILES
          </div>
          <input
            type="file"
            ref={this.inputRef}
            onChange={() => this.handleChange()}
            hidden
          ></input>
        </div>
      </div>
    );
  }
}
