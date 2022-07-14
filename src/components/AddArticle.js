import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db, auth } from "../firebaseConfig";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";

export default function AddArticle() {
  const [user] = useAuthState(auth);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    createdBy: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePublish = () => {
    if (!formData.title || !formData.description || !formData.createdBy) {
      alert("Please fill all the fields");
      return;
    } else {
      setFormData({
        title: "",
        description: "",
        createdBy: "",
      });

      const articleRef = collection(db, "Articles");
      addDoc(articleRef, {
        title: formData.title,
        description: formData.description,
        createdBy: formData.createdBy,
        userId: user.uid,
      })
        .then(() => {
          toast("Article added successfully", { type: "success" });
        })
        .catch((err) => {
          toast("Error adding article", { type: "error" });
        });
    }
  };

  return (
    <div className="border p-3 mt-3 bg-light" style={{ position: "fixed" }}>
      {!user ? (
        <>
          <h2>
            <Link to="/signin">Login to create article</Link>
          </h2>
          Don't have an account? <Link to="/register">Signup</Link>
        </>
      ) : (
        <>
          <h2>Create article</h2>
          <div className="form-group">
            <label htmlFor="">Title</label>
            <input
              type="text"
              name="title"
              className="form-control"
              value={formData.title}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <label htmlFor="">Description</label>
          <textarea
            name="description"
            className="form-control"
            value={formData.description}
            onChange={(e) => handleChange(e)}
          />
          <label htmlFor="">Created by</label>
          <input
            type="text"
            name="createdBy"
            className="form-control"
            value={formData.createdBy}
            onChange={(e) => handleChange(e)}
          />

          <button
            className="form-control btn-primary mt-2"
            onClick={handlePublish}
          >
            Publish
          </button>
        </>
      )}
    </div>
  );
}
