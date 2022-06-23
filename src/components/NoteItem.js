import React, {useContext } from "react";
import NoteContext from "../context/notes/NoteContext";

function NoteItem(props) {
  const context = useContext(NoteContext);
  const { deleteNote } = context;
  const { title, description, _id, tag } = props.note;
  const { note, updateNote } = props;

  return (
    <div className="col-md-3 my-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text">Tags: {tag}</p>
          <i
            className="far fa-trash-alt mx-2"
            title="DELETE NOTE"
            onClick={() => {
              deleteNote(_id);

              props.showAlert("Deleted Successfully", "success");
            }}
          ></i>
          <i
            className="far fa-edit mx-2"
            onClick={() => {
              updateNote(note);
            }}
            title="EDIT NOTE"
          ></i>
        </div>
      </div>
    </div>
  );
}
export default NoteItem;
