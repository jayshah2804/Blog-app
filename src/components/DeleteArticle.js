import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { db } from "../firebaseConfig";
import { toast } from "react-toastify";

export default function DeleteArticle({ id }) {
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      try {
        await deleteDoc(doc(db, "Articles", id));
        toast("Article deleted successfully", { type: "success" });
      } catch (error) {
        toast("Error deleting article", { type: "error" });
        console.log(error);
      }
    }
  };
  return (
    <div>
      <i
        className="fa fa-times"
        onClick={handleDelete}
        style={{ cursor: "pointer" }}
      />
    </div>
  );
}
