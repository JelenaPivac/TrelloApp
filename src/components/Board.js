import { useEffect, useState } from "react";
import { createANewList, getAllListsForABoard } from "../services/Lists";
import classes from "./Board.module.css";
import { Link } from "react-router-dom";
import List from "./List";
import { getAOrganization } from "../services/Boards";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faRemove } from "@fortawesome/free-solid-svg-icons";
const Board = (props) => {
  const [lists, setLists] = useState(null);
  const [isListAvailable, setIsAvailable] = useState(false);
  const [needsUpdate, setNeedsUpdate] = useState(true);
  const [AddListBtn, setAddListBtn] = useState(false);
  const [inputListName, setInputListName] = useState("");
  const [workspaceName, setWorkspaceName] = useState("");
  console.log(props.data);
  useEffect(() => {
    if (needsUpdate) {
      getAllListsForABoard(data.id)
        .then((response) => response.json())
        .then((json) => {
          let a = json.map((x) => (
            <List
              name={x.name}
              key={x.id}
              id={x.id}
              updateParent={() => setNeedsUpdate(true)}
            />
          ));
          setLists(a);
          setIsAvailable(true);
        });
      getAOrganization(data.idOrganization)
        .then((x) => x.json())
        .then((x) => setWorkspaceName(x.displayName));
      setNeedsUpdate(false);
    }
  }, [needsUpdate]);

  const data = props.data;
  const color = data.prefs.backgroundColor;
  const name = data.name;
  const createNewListHandler = () => {
    createANewList(data.id, inputListName).then((x) => {
      setNeedsUpdate(true);
      setAddListBtn(false);
      setInputListName("");
    });
  };
  const showListBtnHandler = () => {
    setAddListBtn(true);
  };
  const inputListNameHandler = (event) => {
    setInputListName(event.target.value);
  };
  return (
    <div className={classes.board} style={{ backgroundColor: color }}>
      <div className={classes.nameBack}>
        <div className={classes.nw}>
          <div className={classes.nameBoard}>{name}</div>
          <div className={classes.workSpace}>{workspaceName}</div>
        </div>
        <Link to={"/"} className={classes.back}>
          <FontAwesomeIcon icon={faRemove} />
        </Link>
      </div>

      <div className={classes.content}>
        {isListAvailable && lists}
        {AddListBtn && (
          <div className={classes.inputFieldList}>
            <input
              type="text"
              id="name"
              placeholder="Enter list title"
              className={classes.inputListName}
              value={inputListName}
              onChange={inputListNameHandler}
            />
            <div className={classes.addRemoveList}>
              <button
                onClick={createNewListHandler}
                className={classes.addListBtn}
                disabled={inputListName === ""}
              >
                Add List
              </button>
              <FontAwesomeIcon
                icon={faRemove}
                className={classes["svg-inline--fa"]}
                onClick={() => setAddListBtn(false)}
              />
            </div>
          </div>
        )}
        {!AddListBtn && (
          <button className={classes.addList} onClick={showListBtnHandler}>
            <FontAwesomeIcon
              icon={faAdd}
              className={classes["svg-inline--fa"]}
            />
            Add a new list
          </button>
        )}
      </div>
    </div>
  );
};

export default Board;
