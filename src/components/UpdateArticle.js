import { updateDoc, doc } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../firebaseConfig";

import UpdateFields from "./UpdateFields";

const UpdateArticle = (props) => {
  const [navigate, isNavigate] = useState(false);
  const washingtonRef = doc(db, "Articles", props.id);

  const handleUpdate = async () => {
    isNavigate(true);
  };

  const closeFieldsHandler = () => {
    isNavigate(false);
  }

  return (
    <React.Fragment>
      <button onClick={handleUpdate}>Update</button>
      {navigate && 
        <UpdateFields id={props.id} onUpdateFileds={closeFieldsHandler} title={props.title} description={props.description} createdBy={props.createdBy}/>
      }
    </React.Fragment>
  );
};

export default UpdateArticle;
