import React from 'react';
import marked from 'marked';
import highlight from 'highlight.js';

import './Preview.css';

const Preview = props => {
  const output = { __html: marked(props.markdown) };

  marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: function(code, language) {
      const validLanguage = highlight.getLanguage(language)
        ? language
        : 'plaintext';
      return highlight.highlight(validLanguage, code).value;
    },
    pedantic: false,
    gfm: true,
    breaks: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false
  });

  return (
    <div className="preview-container">
      <div className="heading">
        <h4>Preview</h4>
      </div>
      <div id="preview" className="markdown" dangerouslySetInnerHTML={output} />
    </div>
  );
};

export default Preview;
