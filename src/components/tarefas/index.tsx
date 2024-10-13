"use client";

import { db } from "@/services/firebaseConnection";
import { User } from "@/types/User";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import styles from "./tarefas.module.css";
import Link from "next/link";

type TaskProps = {
  id: string;
  created: Date;
  public: boolean;
  tarefa: string;
  user: string;
};

const Tarefas = ({ user }: { user: User }) => {
  const [tasks, setTasks] = useState<TaskProps[]>([]);

  useEffect(() => {
    const loadTasks = async () => {
      const tasksRef = collection(db, "tarefas");
      const q = query(
        tasksRef,
        orderBy("created", "desc"),
        where("user", "==", user.email)
      );

      onSnapshot(q, (snapshot) => {
        let list = [] as TaskProps[];

        snapshot.forEach((task) => {
          list.push({
            id: task.id,
            tarefa: task.data().tarefa,
            created: task.data().created,
            user: task.data().user,
            public: task.data().public,
          });
        });

        setTasks(list);
      });
    };

    loadTasks();
  }, [user.email]);

  const handleShare = async (id: string) => {
    await navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_URL}/tarefas/${id}`
    );
  };

  const handleDeleteTask = async (id: string) => {
    const docRef = doc(db, "tarefas", id);
    await deleteDoc(docRef);
  };

  return (
    <div>
      {tasks.map((item) => (
        <article key={item.id} className={styles.task}>
          {item.public && (
            <div className={styles.tagContainer}>
              <label className={styles.tag}>PÚBLICO</label>
              <button
                className={styles.shareButton}
                onClick={() => handleShare(item.id)}
              >
                <FiShare2 size={22} color="#3183ff" />
              </button>
            </div>
          )}

          <div className={styles.taskContent}>
            {item.public ? (
              <Link href={`/tarefas/${item.id}`}>
                <p>{item.tarefa}</p>
              </Link>
            ) : (
              <p>{item.tarefa}</p>
            )}

            <button
              className={styles.trashButton}
              onClick={() => handleDeleteTask(item.id)}
            >
              <FaTrash size={24} color="#ea3140" />
            </button>
          </div>
        </article>
      ))}
    </div>
  );
};

export default Tarefas;
