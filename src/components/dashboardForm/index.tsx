"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import TextArea from "../textArea";
import styles from "./dashboardForm.module.css";
import { db } from "@/services/firebaseConnection";
import { addDoc, collection } from "firebase/firestore";
import { User } from "@/types/User";

type DashboardFormProps = {
  user: User
}

const DashboardForm = ( {user} : DashboardFormProps ) => {
  const [publicTask, setPublicTask] = useState(false);
  const [input, setInput] = useState("");

  const handleChangePublic = (e: ChangeEvent<HTMLInputElement>) => {
    setPublicTask(e.target.checked);
  };

  const handleRegisterTask = async (event: FormEvent) => {
    event.preventDefault();

    try {
      await addDoc(collection(db, "tarefas"), {
        tarefa: input,
        created: new Date(),
        user: user.email,
        public: publicTask,
      });

      setInput("")
      setPublicTask(false)

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleRegisterTask}>
      <TextArea
        placeholder="Digite qual sua tarefa..."
        value={input}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
          setInput(e.target.value)
        }
        required
        minLength={3}
      />
      <div className={styles.checkboxArea}>
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={publicTask}
          onChange={handleChangePublic}
        />
        <label>Deixar tarefa pública?</label>
      </div>
      <button type="submit" className={styles.button}>
        Registrar
      </button>
    </form>
  );
};

export default DashboardForm;
