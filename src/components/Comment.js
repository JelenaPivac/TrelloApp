import classes from "./Comment.module.css";

const Comment = (props) => {
  const date = new Date(props.data.date);
  console.log(date);
  const d = date.toLocaleString();
  return (
    <div className={classes.comment}>
      {props.data.data.text} {d}
    </div>
  );
};

export default Comment;
