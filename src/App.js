import './App.css';
import Editor from './Editor';
function App() {
  return (
    <div className="App">
      <div className="api-tool">
        <div className="editor">
          <Editor/>
        </div>
        <div className="swagger-ui">
          this is the swagger ui
        </div>

      </div>

    </div>
  );
}

export default App;
