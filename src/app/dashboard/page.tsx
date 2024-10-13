import React from "react";
import styles from "./dashboard.module.css";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import DashboardForm from "@/components/dashboardForm";
import Tarefas from "@/components/tarefas";

export const metadata: Metadata = {
  title: "Meu painel de tarefas",
};

const Dashboard = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/");
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <section className={styles.content}>
          <div className={styles.contentForm}>
            <h1 className={styles.title}>Qual sua tarefa?</h1>
            <DashboardForm user={session.user} />
          </div>
        </section>
        <section className={styles.taskContainer}>
          <h1>Minhas tarefas</h1>

          <Tarefas user={session.user} />
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
