import { collection, onSnapshot, query } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig";
import DeleteArticle from "./DeleteArticle";
import { useAuthState } from "react-firebase-hooks/auth";
import UpdateArticle from "./UpdateArticle";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [user] = useAuthState(auth);
  useEffect(() => {
    const articleRef = collection(db, "Articles");
    const q = query(articleRef);
    onSnapshot(q, (snapshot) => {
      const articles = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setArticles(articles);
      console.log(articles);
    });
  }, []);
  return (
    <div>
      {articles.length === 0 ? (
        <p>No articles found!</p>
      ) : (
        articles.map(
          ({
            id,
            title,
            description,
            createdBy,
            userId,
          }) => (
            <div className="border mt-3 p-3 bg-light" key={id}>
              <div className="row">
                <div className="col-3">
                </div>
                <div className="col-9 ps-3">
                  <div className="row">
                    <div className="col-6">
                      {createdBy && (
                        <span className="badge bg-primary">{createdBy}</span>
                      )}
                    </div>
                    <div className="col-6 d-flex flex-row-reverse">
                      {user && user.uid === userId && (
                        <DeleteArticle id={id} />
                      )}
                    </div>
                  </div>
                  <h3>{title}</h3>
                  <h5>{description}</h5>
                      {user && user.uid === userId && (
                        <UpdateArticle id={id} title={title} description={description} createdBy={createdBy}/>
                      )}
                </div>
              </div>
            </div>
          )
        )
      )}
    </div>
  );
}
