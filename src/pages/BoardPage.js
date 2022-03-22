import { useEffect, useState } from "react";
import { getBoard } from "../services/Boards";
import Board from "../components/Board";
import { useParams } from "react-router-dom";
import classes from "./BoardPage.module.css";

export const BoardPage = () => {
  const { boardId } = useParams();
  const [dataAvailable, setDataAvailable] = useState(false);
  const [data, setData] = useState(null);
  useEffect(() => {
    getBoard(boardId)
      .then((response) => response.json())
      .then((boardData) => {
        setData(boardData);
        setDataAvailable(true);
      });
  },[]);

  return (
    <div className={classes.boardPage}>
      {dataAvailable && <Board data={data} />}
    </div>
  );
};
