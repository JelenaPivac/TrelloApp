import React, { useEffect, useState, useRef } from "react";
import { createANewCard } from "../services/Cards";
import {
  deleteAList,
  getAllCardsForList,
  moveCardToList,
} from "../services/Lists";
import Card from "./Card";
import classes from "./List.module.css";
import { useDrop } from "react-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faTrash, faRemove } from "@fortawesome/free-solid-svg-icons";
import { updateNameOnList } from "../services/Lists";
import { updatePositionOnCard } from "../services/Cards";
const List = (props) => {
  const [cards, setCards] = useState([]);
  const [hasCards, setHasCards] = useState(false);
  const [needsUpdate, setNeedsUpdate] = useState(true);
  const [inputName, setInputName] = useState(props.name);
  const [addBtnIsShown, setAddBtnIsShown] = useState(false);
  const [inputNameCard, setInputNameCard] = useState("");
  const [isHovering, setIsHovering] = useState(false);
  let hoverDiv = (
    <div
      className={classes.card}
      key="hovering"
    ></div>
  );
  const ref = useRef(null);
  let dragIndex = -1;

  useEffect(() => {
    if (needsUpdate) {
      getAllCardsForList(props.id)
        .then((res) => res.json())
        .then((data) => {
          let a = data.map((card, index) => (
            <Card
              draggable
              onDropCard={setCards}
              index={index}
              key={card.id}
              data={card}
              updateParent={() => setNeedsUpdate(true)}
            ></Card>
          ));
          setCards(a);
          setHasCards(true);
        });
      setNeedsUpdate(false);
    }
  }, [needsUpdate]);

  const [{ isOver }, addToListRef] = useDrop({
    accept: "card",
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
    drop: (item) => {
      let c = cards.find((x) => x.key === item.key);
      if (c != null && c.length !== 0) {
        let sortedCards = [];
        for (let i = 0; i < cards.length; i++)
          if (c.key !== cards[i].key) sortedCards.push(cards[i]);

        sortedCards = sortedCards.filter((x) => x.key !== hoverDiv.key);
        sortedCards.splice(dragIndex, 0, c);
        setNewPositionOnCard(sortedCards, c.key);
        setCards(sortedCards);
        return;
      }

      item.props.onDropCard((previousCards) => {
        var filtered = previousCards.filter((x) => x.key !== item.key);
        return filtered;
      });

      let newCard = (
        <Card
          draggable
          onDropCard={setCards}
          index={dragIndex}
          key={item.key}
          data={item.props.data}
          updateParent={() => setNeedsUpdate(true)}
        ></Card>
      );

      let newCards = cards.filter((x) => x.key !== hoverDiv.key);
      newCards.splice(dragIndex, 0, newCard);
      setCards(newCards);
      setNewPositionOnCard(newCards, newCard.key);
      moveCardToList(item.key, props.id);
    },
    hover: (item, monitor) => {
      if (!ref.current) {
        var filteredCards = cards.filter((x) => x.key !== hoverDiv);
        setCards(filteredCards);
        return;
      }

      setIsHovering(true);
      const cardHeight = 100;
      const hoveredRect = ref.current.getBoundingClientRect();
      const mousePos = monitor.getClientOffset();
      const hoverY = mousePos.y - hoveredRect.top;

      dragIndex = Math.floor(hoverY / cardHeight);
      let newCards = [];
      if (cards.find((x) => x.key === hoverDiv.key)) {
        newCards = cards.filter((x) => x.key !== hoverDiv.key);
      } else {
        newCards = cards;
      }
      newCards.splice(dragIndex, 0, hoverDiv);
      setCards(newCards);
    },
  });

  if (!isOver && hasCards && isHovering) {
    var newCards = cards.filter((x) => x.key !== hoverDiv.key);
    setCards(newCards);
    setIsHovering(false);
  }

  const setNewPositionOnCard = (sortedCards, key) => {
    let lowerInd = dragIndex - 1;
    let higherInd = dragIndex + 1;
    let sum = 0;
    if (lowerInd > 0) sum += sortedCards[lowerInd].props.data.pos;
    if (higherInd < sortedCards.length)
      sum += sortedCards[higherInd].props.data.pos;
    sum /= 2;
    updatePositionOnCard(key, sum);
  };

  const createCardHandler = () => {
    createANewCard(props.id, inputNameCard).then((x) => {
      setNeedsUpdate(true);
      setAddBtnIsShown(false);
      setInputNameCard("");
    });
  };
  const deleteListHandler = () => {
    deleteAList(props.id).then(() => props.updateParent());
  };
  const changeNameHandler = (event) => {
    setInputName(event.target.value);
  };
  const nameSubmitHandler = () => {
    updateNameOnList(props.id, inputName);
  };
  const showAddBtnHandler = () => {
    setAddBtnIsShown(true);
  };
  const changeInputNameCardHandler = (event) => {
    setInputNameCard(event.target.value);
  };
  return (
    <div className={classes.list} ref={addToListRef}>
      <div className={classes.listName}>
        <input
          type="text"
          id="name"
          className={classes.inputListName}
          value={inputName}
          onBlur={nameSubmitHandler}
          onChange={changeNameHandler}
        />
        <FontAwesomeIcon icon={faTrash} onClick={deleteListHandler} />
      </div>
      <div ref={ref}>{hasCards && cards}</div>
      {addBtnIsShown && (
        <div className={classes.inputField}>
          <input
            type="text"
            id="cardName"
            placeholder="Enter a title for this card..."
            className={classes.cardName}
            value={inputNameCard}
            onChange={changeInputNameCardHandler}
          />
          <div className={classes.addRemove}>
            <button
              className={classes.addCardBtn}
              disabled={inputNameCard === ""}
              onClick={createCardHandler}
            >
              Add card
            </button>
            <FontAwesomeIcon
              icon={faRemove}
              onClick={() => setAddBtnIsShown(false)}
              className={classes["svg-inline--fa"]}
            />
          </div>
        </div>
      )}
      {!addBtnIsShown && (
        <button className={classes.addCard} onClick={showAddBtnHandler}>
          <FontAwesomeIcon icon={faAdd} className={classes["svg-inline--fa"]} />
          Add a card
        </button>
      )}
    </div>
  );
};
export default List;
