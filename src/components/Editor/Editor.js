import React from 'react';

import './Editor.css';

const Editor = props => {
  return (
    <div className="editor-container">
      <div class="heading">
        <h4>Editor</h4>
      </div>
      <div className="editor">
        <textarea
          className="editor-textarea"
          name="markdown-text"
          id="editor"
          value={props.value}
          cols="30"
          rows="10"
          onChange={props.onChangeHandler}
        ></textarea>
      </div>
    </div>
  );
};

export default Editor;
