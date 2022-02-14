import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./ColorButton.module.css";
const ColorButton = (props) => {
  const setColorHandler = () => {
    props.setColor(props.color);
  };
  return (
    <button
      style={{ backgroundColor: props.colorHex }}
      className={classes.colorBtn}
      onClick={setColorHandler}
    >
      {props.selectedColor === props.color && (
        <FontAwesomeIcon icon={faCheck} className={classes["svg-inline--fa"]} />
      )}
    </button>
  );
};

export default ColorButton;
