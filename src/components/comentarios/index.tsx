"use client";

import { db } from "@/services/firebaseConnection";
import { Comment } from "@/types/Comment";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import styles from "./styles.module.css";
import { User } from "@/types/User";

type CommentsProps = {
  id: string;
  user: User;
};

const Comments = ({ id, user }: CommentsProps) => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const loadComments = async () => {
      const q = query(collection(db, "comments"), where("taskId", "==", id));

      onSnapshot(q, (snapshotComments) => {
        let allComments: Comment[] = [];

        snapshotComments.forEach((doc) => {
          allComments.push({
            id: doc.id,
            comment: doc.data().comment,
            user: doc.data().user,
            name: doc.data().name,
            taskId: doc.data().taskId,
          });
        });

        setComments(allComments);
      });
    };

    loadComments();
  }, [id]);

  const handleDeleteComment = async (id: string) => {
    try {
      const docRef = doc(db, "comments", id);

      await deleteDoc(docRef);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className={styles.commentsContainer}>
      <h2>Todos comentários</h2>
      {comments.length === 0 && (
        <span>Nenhum comentário foi encontrado...</span>
      )}

      {comments.map((item) => (
        <article key={item.id} className={styles.comment}>
          <div className={styles.headComment}>
            <label className={styles.commentsLabel}>{item.name}</label>
            {item.user === user?.email && (
              <button
                className={styles.buttonTrash}
                onClick={() => handleDeleteComment(item.id)}
              >
                <FaTrash size={18} color="#ea3140" />
              </button>
            )}
          </div>
          <p>{item.comment}</p>
        </article>
      ))}
    </section>
  );
};

export default Comments;
