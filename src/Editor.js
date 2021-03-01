import React from 'react';
import MonacoEditor from "react-monaco-editor/lib/editor";
import Validator from "./Validator";

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spec: props.initialValue,
    }
    this.validator = new Validator();
  }

  editorDidMount(editor, monaco) {
    // noinspection JSUnusedLocalSymbols
    this.setState((state) => {
      return {
        editor,
        monaco,
      };
    });
    this.doValidation(this.state.spec);
    this.props.onChange(this.state.spec);
    editor.focus();
  }


  /*  this is a sample validation result:
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
  doValidation(value) {
    if(!value) {
      return;
    }
    this.validator.validate(value, validationResults => {
      const markers = validationResults.map(r => ({
        startLineNumber: r.range.start.line + 1,
        endLineNumber: r.range.end.line + 1,
        startColumn: r.range.start.character + 1,
        endColumn: r.range.end.character + 1,
        message: r.message,

        // TODO: map from r.severity
        severity: this.state.monaco.MarkerSeverity.Error,

        // TODO: map r.code to something.
      }));

      this.state.monaco.editor.setModelMarkers(this.state.editor.getModel(), 'jshint', markers);
    });
  }

  // noinspection JSUnusedLocalSymbols
  onChange(newValue, e) {
    this.setState((state) => {
      return {
        spec: newValue,
      };
    });

    this.props.onChange(newValue);
    this.doValidation(newValue);
  }

  render() {
    const code = this.state.spec;
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
