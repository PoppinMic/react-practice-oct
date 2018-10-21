import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";

class TodoList extends React.Component {
  constructor() {
    super();
    this.state = {
      timeCount: 0,
      time: new Date()
    };
  }

  render() {
    return (
      <div>
        <h1>Todo List</h1>
        <div className="user-input">
          <form>
            <input type="text" />
            <button type="submit">Add Item</button>
          </form>
        </div>
        <div className="filter-wrapper">
          <div className="filters">
            <span className="filter">
              <input type="radio" />
              <input type="radio" />
              <input type="radio" />
            </span>
          </div>
        </div>
        <div className="list-wrapper">
          <ul className="list">
            <li />
          </ul>
        </div>
      </div>
    );
  }
}
ReactDOM.render(
  <div className="todolist-wrapper">
    <TodoList />
  </div>,
  document.getElementById("index")
);
