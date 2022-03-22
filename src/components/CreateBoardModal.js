import ReactDOM from "react-dom";
import { Fragment } from "react";
import classes from "./CreateBoardModal.module.css";
import { useState } from "react";
import ColorButton from "./ColorButton";
import { createBoard } from "../services/Boards";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.close}></div>;
};

const Modal = (props) => {
  const [selectedColor, setSelectedColor] = useState("blue");
  const [inputName, setInputName] = useState("");
  const colors = [
    "blue",
    "orange",
    "green",
    "red",
    "purple",
    "lime",
    "sky",
    "grey",
  ];
  const colorsHex = [
    "#0079BF",
    "#D29034",
    "#519839",
    "#B04632",
    "#89609E",
    "#4BBF6B",
    "#00AECC",
    "#838C91",
  ];

  const inputNameHandler = (event) => {
    setInputName(event.target.value);
  };

  const createBoardHandler = () => {
    createBoard(inputName, selectedColor).then(() => {
      props.updateParent();
      props.close();
    });
  };
  return (
    <div className={classes.modal}>
      <input
        className={classes.inputName}
        type="text"
        id="name"
        placeholder="Enter the board name..."
        value={inputName}
        onChange={inputNameHandler}
      />
      <div className={classes.colors}>
        {colors.map((color, index) => (
          <ColorButton
            key={index}
            selectedColor={selectedColor}
            setColor={setSelectedColor}
            colorHex={colorsHex[index]}
            color={color}
          ></ColorButton>
        ))}
      </div>
      <div className={classes.buttons}>
        <button
          disabled={inputName === ""}
          onClick={createBoardHandler}
          className={classes.btn}
        >
          Create
        </button>
        <button onClick={props.close} className={classes.btn}>
          Cancel
        </button>
      </div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const CreateBoardModal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop close={props.close} />, portalElement)}
      {ReactDOM.createPortal(
        <Modal close={props.close} updateParent={props.updateParent} />,
        portalElement
      )}
    </Fragment>
  );
};

export default CreateBoardModal;
