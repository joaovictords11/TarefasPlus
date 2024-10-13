"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import TextArea from "../textArea";
import styles from "./styles.module.css";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/services/firebaseConnection";
import { User } from "@/types/User";

type CommentsFormProps = {
  user: User;
  taskId: string
};

const CommentsForm = ({ user, taskId }: CommentsFormProps) => {
  const [input, setInput] = useState("");

  const handleComment = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, "comments"), {
        comment: input,
        created: new Date(),
        user: user?.email,
        name: user?.name,
        taskId: taskId
      });

      setInput("")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleComment}>
      <TextArea
        placeholder="Digite seu comentário..."
        value={input}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
          setInput(e.target.value)
        }
        required
        minLength={3}
      />
      <button className={styles.button} type="submit" disabled={!user}>
        Enviar comentário
      </button>
    </form>
  );
};

export default CommentsForm;
