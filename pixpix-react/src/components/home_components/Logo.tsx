import React from "react";

export class Logo extends React.Component<{}, {}> {
  constructor(props:{}) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="logo-container flex flex-col justify-center items-center">
        PIXPIX
      </div>
    );
  }
}
