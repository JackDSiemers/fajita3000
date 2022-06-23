import styles from "./Header.module.css";
import { useRouter } from "next/router";

export default function Header() {

  const router = useRouter();


  return (
    <header className={styles.header}>
      <p onClick={() => router.push("/")} className={styles.title}>Fajita3000</p>
      <p onClick={() => router.push("/fajitas/create")}> Create Fajita </p>
    </header>
  );
}
