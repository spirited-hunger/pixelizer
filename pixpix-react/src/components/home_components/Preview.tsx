import React from "react";

export class Preview extends React.Component<{
  dragDropMessage: string;
}, {}> {
  constructor(props:{dragDropMessage:string}) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="image-area h-[400px] flex-400 flex flex-col">
        <div className="image-bar box-border flex-[0_0_30px] border-pix border-dark-line bg-light-grey">
          {this.props.dragDropMessage}
        </div>
        <div className="image-content bg-gradient-to-b from-[rgba(83,_83,_83,_0.2)] to-[rgba(52,_95,_134,_0.2)] box-border border-l-pix border-r-pix border-b-pix border-dark-line flex-[1_0_auto] flex justify-center items-center">
          {this.props.dragDropMessage}
        </div>
      </div>
    );
  }
} 