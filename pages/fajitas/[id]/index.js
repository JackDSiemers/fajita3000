import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { deleteFajita, getFajitaById } from "../../../lib/api";
import styles from "./index.module.css";

export default function index() {
  const router = useRouter();
  const { id } = router.query;
  const [fajita, setFajita] = useState(null);

  useEffect(async () => {
    setFajita(await getFajitaById(id));
  });

  return !fajita ? (
    <div className={styles.error_container}>
      <p className={styles.loading_error}>Problem loading Fajita</p>
      <p className={styles.loading_error}>
        Click{" "}
        <a className={styles.reload_link} onClick={() => router.reload()}>
          here
        </a>{" "}
        to reload
      </p>
    </div>
  ) : (
    <div
      key={fajita.id}
      className={styles.fajita_container}
      onClick={() => router.push(`/fajitas/${fajita.id}`)}
    >
      <p className={styles.name}>{fajita.name}</p>
      <div className={styles.info_container}>
        <p className={styles.text}>Tortilla: {fajita.tortilla}</p>
        <p className={styles.text}>Meat: {fajita.meat}</p>
        <p className={styles.text}>Vegetables:</p>
        {fajita.vegetables.map((vegetable) => {
          return <p className={styles.vegetable}>-{vegetable}</p>;
        })}
      </div>
      <img
        src="/trash.svg"
        className={styles.trash}
        onClick={() => {
          deleteFajita(fajita.id).then(() => router.push("/"));
        }}
      />
    </div>
  );
}
