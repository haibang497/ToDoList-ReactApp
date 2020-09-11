import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import "./App.css";
import ListItem from "./component/ListItem";
import SearchBox from "./component/SearchBox";

library.add(faTrash);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      currentItem: {
        text: "",
        key: "",
        checked: false,
      },
      searchItem: "",
      filterItem: [],
    };
  }

  handleInput = (e) => {
    this.setState({
      currentItem: {
        text: e.target.value,
        key: Date.now(),
      },
    });
  };

  handleSearch = (e) => {
    console.log(e.target.value);
    const { items } = this.state;
    let filterItem = items.filter((currentItem) => {
          console.log(currentItem);
          return currentItem.text.toLowerCase().includes(e.target.value.toLowerCase());
        });
    this.setState({
      filterItem,
      searchItem: e.target.value,
    });
  };

  addItem(e) {
    e.preventDefault();
    const { currentItem, items } = this.state;
    if (currentItem.text !== "") {
      items.push(currentItem);
      this.setState({
        items,
        currentItem: {
          text: "",
          key: "",
          checked: false,
        },
      });
    }
    localStorage.setItem("task", JSON.stringify(items));
  }

  deleteItem(key) {
    const filteredItems = this.state.items.filter((item) => item.key !== key);
    this.setState({
      items: filteredItems,
    });
    if(window.confirm('Are you sure?')){
    }
    localStorage.setItem("task", JSON.stringify(filteredItems));
  }

  componentDidMount() {
    const itemsSave = window.localStorage.getItem("task");
    const parseItemSave = JSON.parse(itemsSave);
    console.log("parse", parseItemSave);
    if (itemsSave == null) {
      return false;
    } else {
      this.setState({
        items: parseItemSave,
      });
      console.log(this.state.items);
    }
  }

  crossItem(key) {
    const { items } = this.state;
    const item = items.findIndex((item) => item.key === key);
    console.log(item);
    items[item].checked = !items[item].checked;
    this.setState({
      items,
    });
    localStorage.setItem("task", JSON.stringify(items));
  }


  render() {
    const { items, filterItem } = this.state;
    console.log(items);

    return (
      <div className="App">
        <header>
          <form id="to-do-form" onSubmit={(e) => this.addItem(e)}>
            <input
              type="text"
              placeholder="Enter task here"
              value={this.state.currentItem.text}
              onChange={this.handleInput}
            />
            <button type="submit" disabled={!this.state.currentItem.text}>
              Add
            </button>
          </form>
        </header>
        <SearchBox handleSearch={this.handleSearch} />
        <div className="showItem">
          <ListItem
            filterItem={filterItem.length>0?filterItem:items}
            deleteItem={(key) => this.deleteItem(key)}
            crossItem={(key) => this.crossItem(key)}
          />
        </div>
      </div>
    );
  }
}

export default App;
