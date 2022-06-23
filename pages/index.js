import styles from "./index.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getAllFajitas } from "../lib/api";

export default function showIndex() {
  const router = useRouter();
  const [fajitas, setFajitas] = useState([]);

  useEffect(async () => {
    setFajitas(await getAllFajitas());
  }, []);

  return (
    <>
      <h1 className={styles.title}>All Fajitas</h1>
      <div className={styles.container}>
        {fajitas && (
          <>
            {fajitas.map((fajita) => {
              return (
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
                </div>
              );
            })}
          </>
        )}
      </div>
    </>
  );
}
