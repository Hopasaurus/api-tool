import React from 'react';
import MonacoEditor from "react-monaco-editor/lib/editor";
import {validate} from "./Validator";

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '{ \n"foo": \n"bar" \n}',
    }
  }

  editorDidMount(editor, monaco) {
    this.setState((state) => {
      return {
        editor,
        monaco,
      };
    });
    editor.focus();
  }


  /*
  {
  "range": {
    "start": {
      "line": 0,
      "character": 0
    },
    "end": {
      "line": 2,
      "character": 5
    }
  },
  "message": "The provided document does not match any of the registered formats [oas2]",
  "code": "unrecognized-format",
  "severity": 1,
  "path": []
}
   */
  onChange(newValue, e) {
    validate(newValue, validationResults => {
      const markers = validationResults.map(r => ({
        startLineNumber: r.range.start.line + 1,
        endLineNumber: r.range.end.line + 1,
        startColumn: r.range.start.character + 1,
        endColumn: r.range.end.character + 1,
        message: r.message,
        severity: this.state.monaco.MarkerSeverity.Error,
      }));

      this.state.monaco.editor.setModelMarkers(this.state.editor.getModel(), 'jshint', markers);
    });
    // TODO: have the validator set markers.
    //this.state.monaco.editor.setModelMarkers(this.state.editor.getModel(), 'jshint', [{
    //  startLineNumber: 2,
    //  endLineNumber: 2,
    //  startColumn: 2,
    //  endColumn: 6,
    //  message: 'hello world',
    //  severity: this.state.monaco.MarkerSeverity.Error,
    //}]);
  }

  render() {
    const code = this.state.code;
    const options = {
      selectOnLineNumbers: true,
    };
    return (
      <MonacoEditor
        width="600px"
        height="100%"
        language="json"
        theme="vs-dark"
        value={code}
        options={options}
        onChange={this.onChange.bind(this)}
        editorDidMount={this.editorDidMount.bind(this)}
      />
    );
  }
}

export default Editor;
