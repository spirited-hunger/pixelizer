import React from "react";

export class Link extends React.Component<{}, {}> {
  constructor(props: {}) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="link-container absolute top-[4%] left-[4%] flex justify-center items-center">
        <div className="gridlines-icon-container border-2 border-dark-line h-5 w-5 inline-grid"></div>
        <div className="ml-2">gridlines</div>
      </div>
    );
  }
}
