import React from "react";

// TODO : 업로드시 에디터로 이동

type MyProp = {
  file: string; // unidefined 인 경우 프롭에 오지 않음
};

type MyState = {
  file: string | undefined;
};

class Editor extends React.Component<MyProp, MyState> {
  constructor(props: MyProp) {
    super(props);
    this.state = { file: undefined };
  }

  render() {
    return (
      <div className="m-0 grid grid-cols-2 auto-rows-[100vh]">
        <div className="main-container bg-dark-grey flex justify-center items-center">
          <div className="link-container absolute top-[4%] left-[4%] flex justify-center items-center">
            <div className="gridlines-icon-container border-2 border-dark-line h-5 w-5 inline-grid"></div>
            <div className="ml-2">gridlines</div>
          </div>
          <div className="logo-container flex flex-col justify-center items-center">
            PIXPIX
            <h1 className="desc-container">
              An image based pixel art generator
            </h1>
          </div>
        </div>
        <div className="preview-area bg-gradient-to-b from-blue-grey to-smooth-grey flex justify-center items-center overflow-x-auto overflow-y-auto">
          <div className="image-area h-[400px] flex-400 flex flex-col">
            <div className="image-bar box-border flex-[0_0_30px] border-lineWidth border-dark-line bg-light-grey"></div>
            <div className="image-content box-border border-l-lineWidth border-r-lineWidth border-b-lineWidth border-dark-line flex-[1_0_auto]">
              image content
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Editor;