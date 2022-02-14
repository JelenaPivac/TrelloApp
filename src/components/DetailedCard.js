import ReactDOM from "react-dom";
import { Fragment } from "react";
import classes from "./DetailedCard.module.css";
import React from "react";
import { useState, useEffect } from "react";
import { getCommentsForCard } from "../services/Comments";
import { addANewComment } from "../services/Comments";
import Comment from "./Comment";
import { updateNameOnCard } from "../services/Cards";
import { updateDescOnCard } from "../services/Cards";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRemove } from "@fortawesome/free-solid-svg-icons";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.closeCard}></div>;
};
const Modal = (props) => {
  const [inputName, setInputName] = useState(props.data.name);
  const [inputDesc, setInputDesc] = useState(props.data.desc);
  const [inputComment, setInputComment] = useState("");
  const [comments, setComments] = useState([]);
  const [needsUpdate, setNeedsUpdate] = useState(true);
  useEffect(() => {
    if (needsUpdate) {
      getCommentsForCard(props.data.id)
        .then((response) => response.json())
        .then((data) => {
          let a = data.map((comment) => (
            <Comment key={comment.id} data={comment} />
          ));
          setComments(a);
        });
      setNeedsUpdate(false);
    }
  }, [needsUpdate]);

  const inputNameHandler = (event) => {
    setInputName(event.target.value);
  };
  const inputDescHandler = (event) => {
    setInputDesc(event.target.value);
  };
  const inputCommentHandler = (event) => {
    setInputComment(event.target.value);
  };
  const addANewCommentHandler = () => {
    addANewComment(props.data.id, inputComment).then((x) =>
      setNeedsUpdate(true)
    );
    setInputComment("");
  };

  const nameSubmitHandler = () => {
    updateNameOnCard(props.data.id, inputName).then((x) =>
      props.updateParent()
    );
  };
  const descSubmitHandler = () => {
    updateDescOnCard(props.data.id, inputDesc).then((x) =>
      props.updateParent()
    );
  };

  return (
    <div className={classes.modal}>
      <div className={classes.detailedTitle}>
        <input
          type="text"
          id="name"
          className={classes.inputTitle}
          onBlur={nameSubmitHandler}
          value={inputName}
          onChange={inputNameHandler}
        />
        <FontAwesomeIcon
          icon={faRemove}
          onClick={props.closeCard}
          className={classes["svg-inline--fa"]}
        />
      </div>
      <div className={classes.desc}>
        Decription
        <input
          type="text"
          id="description"
          className={classes.inputDesc}
          onBlur={descSubmitHandler}
          value={inputDesc}
          onChange={inputDescHandler}
        />
      </div>
      <h6>Comments</h6>
      {comments}
      <div className={classes.inputFieldCom}>
        <input
          type="text"
          id="comment"
          value={inputComment}
          placeholder="Write a comment..."
          className={classes.inputComment}
          onChange={inputCommentHandler}
        />
        <button onClick={addANewCommentHandler} className={classes.commentBtn}>
          Save
        </button>
      </div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");
const DetailedCard = (props) => {
  console.log(props.data);
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop closeCard={props.closeCard} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <Modal
          data={props.data}
          updateParent={props.updateParent}
          closeCard={props.closeCard}
        />,
        portalElement
      )}
    </Fragment>
  );
};

export default DetailedCard;
