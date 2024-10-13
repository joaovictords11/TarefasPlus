import Image from "next/image";
import styles from "../../styles/home.module.css";
import heroImg from "../../public/assets/hero.png";
import { Metadata } from "next";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/services/firebaseConnection";

export const metadata: Metadata = {
  title: "Tarefas+ | Organize suas tarefas de forma fácil",
};

export const revalidate = 60

export default async function Home() {
  const commentRef = collection(db, "comments");
  const postRef = collection(db, "tarefas");

  const commentSnapshot = await getDocs(commentRef);
  const postSnapshot = await getDocs(postRef);

  return (
    <main className={styles.container}>
      <section className={styles.main}>
        <div className={styles.logoContent}>
          <Image
            className={styles.hero}
            alt="Logo Tarefas +"
            src={heroImg}
            priority
          />
        </div>
        <h1 className={styles.title}>
          Sistema feito para você organizar <br /> seus estudos e tarefas
        </h1>
        <div className={styles.infoContent}>
          <section className={styles.box}>
            <span>+{postSnapshot.size || 0} posts</span>
          </section>
          <section className={styles.box}>
            <span>+{commentSnapshot.size || 0} comentários</span>
          </section>
        </div>
      </section>
    </main>
  );
}
