import React from "react";

type MyProps = {
}

export class Github extends React.Component<MyProps, {}> {
  constructor(props: MyProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="github-area flex justify-center items-center col-start-1 col-end-2 row-start-3 row-end-4 min-h-[150px]">
      Github
      </div>
    );
  }
}