import { useEffect, useState } from "react";
import { getAllBoards } from "../services/Boards";
import { BoardButton } from "../components/BoardButton";
import classes from "./HomePage.module.css";
import CreateBoardModal from "../components/CreateBoardModal";
export const HomePage = () => {
  const [boardButtons, setBoardButtons] = useState([]);
  const [needsUpdate, setNeedsUpdate] = useState(true);
  const [modalIsShown, setModalIsShown] = useState(false);

  useEffect(() => {
    if (needsUpdate) {
      getAllBoards()
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          let buttons = data.map((response) => (
            <BoardButton
              key={response.id}
              board={response}
              name={response.name}
              updateParent={() => setNeedsUpdate(true)}
            />
          ));
          setBoardButtons(buttons);
        });

      setNeedsUpdate(false);
    }
  }, [needsUpdate]);
  const createBoardHandler = () => {
    setModalIsShown(true);
  };

  const cancelBtnHandler = () => {
    setModalIsShown(false);
  };

  return (
    <div className={classes.homepage}>
      <h1>Trello</h1>
      <div className={classes.boards}>
        <h2>BOARDS</h2>
        <div className={classes.contentBtn}>
          {boardButtons}
          <button className={classes.createBtn} onClick={createBoardHandler}>
            Create new board
          </button>
          {modalIsShown && 
            <CreateBoardModal
              updateParent={() => setNeedsUpdate(true)}
              close={cancelBtnHandler}
            />
          }
        </div>
      </div>
    </div>
  );
};
