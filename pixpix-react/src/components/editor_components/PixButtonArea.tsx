import React from "react";

type MyProps = {
  curStage: "size" | "shape" | "palette" | "color";
  curStageHandler: (stage: "size" | "shape" | "palette" | "color") => void;
  editedStageHandler: (stage: "size" | "shape" | "palette" | "color") => void;
}

export class PixButtonArea extends React.Component<MyProps, {}> {
  constructor(props: MyProps) {
    super(props);
    this.state = {};
  }

  handleClick() {
    if(this.props.curStage === "size") {
      this.props.editedStageHandler("size");
      this.props.curStageHandler("shape");
    } else if(this.props.curStage === "shape") {
      this.props.editedStageHandler("shape");
      this.props.curStageHandler("palette");
    } else if(this.props.curStage === "palette") {
      this.props.editedStageHandler("palette");
      this.props.curStageHandler("color");
    } else if(this.props.curStage === "color") {
      this.props.editedStageHandler("color");
      console.log(" finished editing");
    }  
  }

  render() {
    return (
      <div className="pix-btn-area row-[12/13] col-[4/5] grid grid-cols-2 gap-[10px]">
        <div className="pix-preview-btn border-pix bg-dark-grey border-dark-line flex justify-center items-center">
          PREVIEW
        </div>
        <div className="pix-next-btn border-pix bg-dark-grey border-dark-line flex justify-center items-center"
          onClick={() => this.handleClick()}
        >
          NEXT
        </div>
      </div>
    );
  }
}
