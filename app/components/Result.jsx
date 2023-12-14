import { cookies } from 'next/headers'
import styles from "../page.module.css";

export default function Result() {
  return (
    <section className={styles.result}>
      <p id="result">
        {
          cookies().has("result") ? 
          cookies().get("result").value : 
          "result of convertion will be here"
        }
      </p>
    </section>
  )
}