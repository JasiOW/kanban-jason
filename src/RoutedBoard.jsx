import React, { useEffect, useState } from "react";
import Card from "../components/Card/Card";
import "../components/Board/Board.css";
import { MoreHorizontal } from "react-feather";
import Editable from "../components/Editable/Editable";
import Dropdown from "../components/Dropdown/Dropdown";
import { Droppable } from "react-beautiful-dnd";
import { useParams } from "react-router-dom";

export default function RoutedBoard({data}) {
  const [show, setShow] = useState(false);
  const [dropdown, setDropdown] = useState(false);


  const { colTitle } = useParams();
  let colpos;   
  console.log(colTitle);
  colpos = data.findIndex(
    (column) => column.boardName.toLowerCase() === colTitle.toLowerCase()
  );

  useEffect(() => {
    document.addEventListener("keypress", (e) => {
      if (e.code === "Enter") setShow(false);
    });
    return () => {
      document.removeEventListener("keypress", (e) => {
        if (e.code === "Enter") setShow(false);
      });
    };
  });
console.log(data);
console.log(colpos);
  return (
    <div className="board">
      <div className="board__top">
        {show ? (
          <div>
            <input
              className="title__input"
              type={"text"}
              defaultValue={data[colpos].boardName}
              onChange={(e) => {
                data[colpos].setName(e.target.value, data[colpos].id);
              }}
            />
          </div>
        ) : (
          <div>
            <p
              onClick={() => {
                setShow(true);
              }}
              className="board__title"
            >
              {data[colpos].boardName}  
              {/* {props?.name || "Name of Board"} */}
              <span className="total__cards">{data[colpos].card?.length}</span>
            </p>
          </div>
        )}
        <div
          onClick={() => {
            setDropdown(true);
          }}
        >
          <MoreHorizontal />
          {dropdown && (
            <Dropdown
              class="board__dropdown"
              onClose={() => {
                setDropdown(false);
              }}
            >
              <p onClick={() => data[colpos].removeBoard(data[colpos].id)}>Delete Board</p>
            </Dropdown>
          )}
        </div>
      </div>
      <Droppable droppableId={data[colpos].id.toString()}>
        {(provided) => (
          <div
            className="board__cards"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {data[colpos].card?.map((items, index) => (
              <Card
                bid={data[colpos].id}
                id={items.id}
                index={index}
                key={items.id}
                title={items.title}
                tags={items.tags}
                updateCard={data[colpos].updateCard}
                removeCard={data[colpos].removeCard}
                card={items}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <div className="board__footer">
        <Editable
          name={"Add Card"}
          btnName={"Add Card"}
          placeholder={"Enter Card Title"}
          onSubmit={(value) => data[colpos].addCard(value, data[colpos].id)}
        />
      </div>
    </div>
  );
}