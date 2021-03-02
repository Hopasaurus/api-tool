import './App.css';
import React from 'react';
import Editor from './Editor';
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import sampleSwagger from "./SampleSwagger";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spec: '',
    }
  }

  onChange(spec) {
    console.dir("App onChange " + spec.length);
    if (spec!==this.state.spec) {
      this.setState(() => ({spec}));
    }
  }

  render() {
    return (
      <div className="App">
        <div className="api-tool">
          <div className="editor">
            <Editor onChange={this.onChange.bind(this)} initialValue={sampleSwagger} />
          </div>
          <div className="swagger-ui">
          </div>
        </div>
      </div>
    );
  }
}
// this causes lots of errors
//<SwaggerUI spec={this.state.spec} />
export default App;
