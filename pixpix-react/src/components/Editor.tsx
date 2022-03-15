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
      <div className="main-area ">
        <div className="nav-area">
          <div className="logo-area">
            PIXPIX  
          </div>
          <div className="menu-area">
            <div>
              <div>open image</div>  
            </div>
            <div>
              <div>reset image</div>  
            </div>
            <div>
              <div>save image</div>  
            </div>
            <div>
              <div>share image</div>  
            </div>
          </div>
          <div className="github-area">
            Github  
          </div>
        </div>
        <div className="editor-area">
          <div className="image-area">
            <div className="image-bar"></div>
            <div className="image-content"></div>  
          </div>
          <div className="edit-area">
            <div className="size-edit-area">
              <div className="size-edit-bar"></div>  
              <div className="size-edit-content"></div>
            </div>
            <div className="shape-edit-area">
              <div className="shape-edit-bar"></div>
              <div className="shape-edit-content"></div>  
            </div>
            <div className="palette-edit-area">
              <div className="palette-edit-bar"></div>
              <div className="palette-edit-content"></div>
            </div>
            <div className="color-edit-area">
              <div className="color-edit-bar"></div>
              <div className="color-edit-content"></div>  
            </div>
          </div>
          <div className="pix-btn-area">
            <div className="pix-preview-btn"></div>
            <div className="pix-next-btn"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Editor;
