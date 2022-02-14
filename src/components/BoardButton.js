import { Link } from "react-router-dom";
import { deleteABoard, getAMember } from "../services/Boards";
import classes from "./BoardButton.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export const BoardButton = (props) => {
  let isDeleting = false;
  const color = props.board.prefs.backgroundColor;
  const deleteBoardHandler = () => {
    isDeleting = true;
    deleteABoard(props.board.id).then((x) => props.updateParent());
  };
  const linkOnClickHandler = (e) => {
    if (isDeleting) {
      e.preventDefault();
    }
  };
  return (
    <Link
      to={`/boards/${props.board.id}`}
      className={classes.name}
      onClick={linkOnClickHandler}
    >
      <div className={classes.boardBtn} style={{ backgroundColor: color }}>
        {props.board.name}
        <FontAwesomeIcon
          icon={faTrash}
          className={classes["svg-inline--fa"]}
          onClick={deleteBoardHandler}
        />
      </div>
    </Link>
  );
};
