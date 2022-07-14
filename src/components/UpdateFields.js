import { doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { db } from '../firebaseConfig';

const UpdateFields = (props) => {
    const [title, setTitle] = useState(props.title);
    const [description, setDescription] = useState(props.description);
    const [createdBy, setCreatedBy] = useState(props.createdBy);
    const washingtonRef = doc(db, "Articles", props.id);

    const handleUpdate = async () => {
        await updateDoc(washingtonRef, {
          title: title,
          description: description,
          createdBy: createdBy
        });
        props.onUpdateFileds();
      };
  
    return (
      <div className="border p-3 bg-light " style={{ marginTop: 70, marginLeft: -60 }}>
        <h1>Update Fields</h1>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            className="form-control"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>
  
        <div className="form-group">
          <label>Created By</label>
          <input
            type="text"
            className="form-control"
            value={createdBy}
            onChange={(e) => {
              setCreatedBy(e.target.value);
            }}
          />
        </div>
        <br />
        <button className="btn btn-primary" onClick={handleUpdate}>
          Update
        </button>
      </div>
    );
}

export default UpdateFields;
