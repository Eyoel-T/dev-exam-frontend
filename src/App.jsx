import { useState } from "react";
import "./app.scss";
import Display from "./components/display/Display";
import Find from "./components/find/Find";
import Insert from "./components/insert/Insert";
import Update from "./components/update/Update";

const App = () => {
  const [options, setOptions] = useState({
    insert: false,
    update: false,
    find: false,
    display: true,
  });

  /* A function that takes in a parameter called optionName. It then sets the state of options to false
for all options except the one that is passed in. */
  const displayOption = (optionName) => {
    setOptions({
      insert: false,
      update: false,
      find: false,
      display: false,
      [optionName]: !options[optionName],
    });
  };
  return (
    <div className="app">
      <div className="menu">
        <button
          className={options.insert ? "active" : undefined}
          onClick={() => displayOption("insert")}
        >
          Insert Department
        </button>
        <button
          onClick={() => displayOption("update")}
          className={options.update ? "active" : undefined}
        >
          Update Department
        </button>
        <button
          onClick={() => displayOption("find")}
          className={options.find ? "active" : undefined}
        >
          Find Department
        </button>
        <button
          onClick={() => displayOption("display")}
          className={options.display ? "active" : undefined}
        >
          Display All Department
        </button>
      </div>

      {options.insert && <Insert />}
      {options.update && <Update />}
      {options.find && <Find />}
      {options.display && <Display />}
    </div>
  );
};

export default App;
