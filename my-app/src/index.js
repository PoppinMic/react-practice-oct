import React from "react";
import ReactDOM from "react-dom";
import "./style.css";

const ListItem = props => {
  return (
    props.visibleItem.map(item => {
      return(
        <li id={item.id.toString()} key={item.id.toString()}>
          <span className={item.complete ? 'text complete' : 'text'}>{item.content}</span>
          <input type="checkbox" name="done" id="checkbox" onClick={props.checkToggle} checked={item.complete} />
          <button className="delete" onClick={props.delete} />
        </li>
      );
    })
  );
}


class TodoList extends React.Component {
  constructor() {
    super();
    this.state = {
      inputValue: '',
      listItems:[],
      visibleItems: [],
      filter: 'all',
      error: ''
    };
  }


  handleUserInput = e => {
    this.setState({
      inputValue: e.target.value
    });
  }

  handleItemAdd = e => {
    e.preventDefault();
    if(this.state.inputValue.length === 0){
      this.setState({
        error: "Input should not be empty."
      });
    }else{
      this.setState({
        inputValue: '',
        listItems: this.state.listItems.concat({
          id: Date.now().toString(),
          content: this.state.inputValue,
          complete: false // complete set to true means complete, false means pending
        }),
        error: ''
      }, () => {
        this.setState({
          visibleItems: [...this.state.listItems]
        });
        this.filterListItems(this.state.filter);
      });
    }

  }
  
  handelItemDelete = e => {
    const itemId = e.target.parentNode.id; // could we use e.target.key instead of e.target.id?
    this.setState({
      listItems: this.state.listItems.filter(item => item.id !== itemId) // how to shorten this line, is destructing possible?
    }, () => {
      this.setState({
        visibleItems: [...this.state.listItems]
      });
      this.filterListItems(this.state.filter);
    });
  }

  handelItemCheckedStatus = e => {
    const itemId = e.target.parentNode.id;
    let list = [...this.state.listItems];
    // console.log(itemId);
    // console.log(list.findIndex(item => item.id === itemId));
    let currentItemIndex = list.findIndex(item => item.id === itemId);
    list[currentItemIndex].complete = !list[currentItemIndex].complete;
    this.setState({
      listItems: list
    });
    this.filterListItems(this.state.filter);
  }

  handleFilter = e => {
    const filter = e.target.value;
    // because of Virtual DOM, just very little perfomance improvement? is this 'if' necessary?
    if( filter !== this.state.fitler){
      this.setState({
        filter
      });
      this.filterListItems(filter);
    }
  }
  filterListItems = filter => {
    switch(filter){
      case 'all':
        this.setState({
          visibleItems: [...this.state.listItems]
        });
        break;
      case 'pending':
        this.setState({
          visibleItems: [...this.state.listItems].filter(item => !item.complete)
        });
        break;
      case 'complete':
        this.setState({
          visibleItems: [...this.state.listItems].filter(item => item.complete)
        });
    }
  }

  render() {
    return (
      <React.Fragment>
        <h1>Todo List</h1>
        <div className="user-input">
          <form>
            <label name="errorMessage">{this.state.error}</label>
            <input type="text" onChange={this.handleUserInput} value={this.state.inputValue} />
            <button type="submit" onClick={this.handleItemAdd}>Add Item</button>
          </form>
        </div>
        <div className="filter-wrapper">
          <div className="filters">
            <span className="filter">
              <label><input type="radio" name="filter" value="all" onClick={this.handleFilter} defaultChecked />All</label>
              <label><input type="radio" name="filter" value="pending" onClick={this.handleFilter} />Pending</label>
              <label><input type="radio" name="filter" value="complete" onClick={this.handleFilter} />Complete</label>
            </span>
          </div>
        </div>
        <div className="list-wrapper">
          <ul className="list">
            <ListItem visibleItem={this.state.visibleItems} checkToggle={this.handelItemCheckedStatus} delete={this.handelItemDelete} />
          </ul>
        </div>
      </React.Fragment>
    );
  }
}
ReactDOM.render(
  <div className="todolist-wrapper">
    <TodoList />
  </div>,
  document.getElementById("index")
);
