import React from "react";

// TODO : 업로드시 에디터로 이동

type MyProp = {
  file: File; // unidefined 인 경우 프롭에 오지 않음
};

type MyState = {};

class Editor extends React.Component<MyProp, MyState> {
  constructor(props: MyProp) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="m-0 grid grid-cols-2 auto-rows-[100vh]">
        {`state file : ${this.props.file}`}
      </div>
    );
  }
}

export default Editor;
