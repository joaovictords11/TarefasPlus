import React from "react";
import styles from "./styles.module.css";
import { Metadata } from "next";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/services/firebaseConnection";
import { redirect } from "next/navigation";
import CommentsForm from "@/components/commentsForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import Comments from "@/components/comentarios";

export const metadata: Metadata = {
  title: "Tarefa - Detalhes da tarefa",
};

const TaskDetail = async ({ params }: { params: { taskId: string } }) => {
  const session = await getServerSession(authOptions);

  const docRef = doc(db, "tarefas", params.taskId);

  const snapshot = await getDoc(docRef);

  if (snapshot.data() === undefined) {
    redirect("/");
  }

  if (!snapshot.data()?.public) {
    redirect("/");
  }

  const miliseconds = snapshot.data()?.created.seconds * 1000;

  const task = {
    tarefa: snapshot.data()?.tarefa,
    public: snapshot.data()?.public,
    created: new Date(miliseconds).toLocaleDateString(),
    user: snapshot.data()?.user,
    taskId: params.taskId,
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>Tarefa</h1>
        <article className={styles.task}>
          <p>{task.tarefa}</p>
        </article>
      </main>

      <section className={styles.commentsContainer}>
        <h2>Deixar comentário</h2>

        <CommentsForm user={session?.user!} taskId={params.taskId} />
      </section>

      <Comments id={params.taskId} user={session?.user!}/>
    </div>
  );
};

export default TaskDetail;
