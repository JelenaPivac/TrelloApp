import { useState } from "react";
import { deleteACard } from "../services/Cards";
import classes from "./Card.module.css";
import DetailedCard from "./DetailedCard";
import { useDrag } from "react-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
const Card = (props) => {
  const data = props.data;
  const [showDetailedCard, setShowDetailedCard] = useState(false);

  const deleteCardHandler = (e) => {
    e.stopPropagation();
    deleteACard(data.id).then(() => props.updateParent());
  };

  const showDetailedCardHandler = () => {
    setShowDetailedCard(true);
  };

  const closeDetailedCardHandler = (e) => {
    e.stopPropagation();
    setShowDetailedCard(false);
  };

  const [{ isDragging }, dragRef] = useDrag({
    type: "card",
    item: (
      <Card
        draggable
        onDropCard={props.onDropCard}
        index={props.index}
        key={data.id}
        data={data}
        updateParent={() => props.updateParent()}
      ></Card>
    ),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    !isDragging && (
      <div
        className={classes.card}
        ref={dragRef}
        onClick={showDetailedCardHandler}
      >
        <div className={classes.name}>{data.name}</div>
        <FontAwesomeIcon
          icon={faTrash}
          onClick={deleteCardHandler}
          className={classes["svg-inline--fa"]}
        />
        {showDetailedCard && (
          <DetailedCard
            data={props.data}
            updateParent={props.updateParent}
            closeCard={closeDetailedCardHandler}
          />
        )}
      </div>
    )
  );
};

export default Card;
