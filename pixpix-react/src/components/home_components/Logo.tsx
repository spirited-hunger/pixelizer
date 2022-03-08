import React from "react";

export class Logo extends React.Component<{}, {}> {
  constructor(props: {}) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="logo-container flex flex-col justify-center items-center">
        PIXPIX
        <h1 className="desc-container">An image based pixel art generator</h1>
      </div>
    );
  }
}
