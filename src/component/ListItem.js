import React from "react";
import "../css/itemList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";

function ListItem({ filterItem, deleteItem, crossItem }) {
  //const { filterItem, deleteItem, crossItem } = props;
  console.log("filterItem", filterItem);
  const listItems = filterItem ? (
    filterItem.map((item, index) => {
      return (
        <div className="list" key={item.key}>
          <div
            style={{
              textDecoration: (item.checked? "line-through" : ""),
            }}
          >
            <span>{`${index + 1}.`}</span>
            {item.text}
          </div>
          <div className="group-icon">
            <span>
              <FontAwesomeIcon
                className="faicons"
                icon="trash"
                onClick={() => deleteItem(item.key)}
              />
            </span>
            <div className="CheckItem">
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => crossItem(item.key)}
                className="Checkbox"
              />
            </div>
          </div>
        </div>
      );
    })
  ) : (
    <div></div>
  );
  return <div>{listItems}</div>;
}
export default ListItem;
