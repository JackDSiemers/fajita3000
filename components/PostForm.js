import { createFajita, getAllFajitas } from "../lib/api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "./PostForm.module.css";

const defaultModel = {
  name: "",
  tortilla: "",
  meat: "",
  vegetables: [],
};

const defaultErrors = {
  name: "",
  tortilla: "",
};

function validateModel(fajita) {
  const errors = {
    name: "",
    tortilla: "",
  };
  let isValid = true;

  if (fajita.name.trim().length === 0) {
    errors.name = "Name cant't be empty";
    isValid = false;
  }

  if (!fajita.tortilla) {
    errors.tortilla = "Fajita must be in a tortilla";
    isValid = false;
  }

  return { errors, isValid };
}

export default function PostForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(defaultErrors);
  const [fajita, setFajita] = useState(defaultModel);

  const handleChange = (e) => {
    setFajita({
      ...fajita,
      [e.target.name]: e.target.value,
    });
  };

  const handleListChange = (e) => {
    fajita.vegetables.push(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors(defaultErrors);

    const result = validateModel(fajita);

    if (!result.isValid) {
      setErrors(result.errors);
      setIsLoading(false);
      return;
    }
    const newFajita = await createFajita(fajita);
    alert("Fajita created!");
    router.push(`/fajitas/${newFajita.id}`);

    setIsLoading(false);
  };

  return (
    <div className={styles.postform}>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label className={styles.detail}> Name: </label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            value={fajita.name}
          />
          {errors.name && <div className={styles.error}> {errors.name} </div>}
        </fieldset>
        <fieldset>
          <label className={styles.detail}> Tortilla: </label>
          <div>
            <input
              onClick={handleChange}
              type="radio"
              name="tortilla"
              value="Flower"
            />
            <label> Flower </label>
            <br></br>
            <input
              onClick={handleChange}
              type="radio"
              name="tortilla"
              value="Corn"
            />
            <label> Corn </label>
            <br></br>
          </div>
          {errors.tortilla && (
            <div className={styles.error}> {errors.tortilla} </div>
          )}
        </fieldset>
        <fieldset>
          <label className={styles.detail}> Meat: </label>
          <div>
            <input
              onClick={handleChange}
              type="radio"
              name="meat"
              value="Chicken"
            />
            <label> Chicken </label>
            <br></br>
            <input
              onClick={handleChange}
              type="radio"
              name="meat"
              value="Beef"
            />
            <label> Beef </label>
            <br></br>
            <input
              onClick={handleChange}
              type="radio"
              name="meat"
              value="Pork"
            />
            <label> Pork </label>
            <br></br>
          </div>
        </fieldset>
        <fieldset>
          <label className={styles.detail}> Vegetables: </label>
          <div>
            <input
              onClick={handleListChange}
              type="checkbox"
              name="tortilla"
              value="Lettuce"
            />
            <label> Lettuce </label>
            <br></br>
            <input
              onClick={handleListChange}
              type="checkbox"
              name="tortilla"
              value="Corn"
            />
            <label> Corn </label>
            <br></br>
            <input
              onClick={handleListChange}
              type="checkbox"
              name="tortilla"
              value="Guacamole"
            />
            <label> Guacamole </label>
            <br></br>
            <input
              onClick={handleListChange}
              type="checkbox"
              name="tortilla"
              value="Sour Creme"
            />
            <label> Sour Creme </label>
            <br></br>
          </div>
        </fieldset>
        <button className={styles.button} disabled={isLoading}>
          {isLoading ? "...Loading" : "Submit"}
        </button>
      </form>
    </div>
  );
}
