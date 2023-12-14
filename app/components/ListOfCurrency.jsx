"use client"

import styles from "../page.module.css";
import { useState } from "react";

export default function ListOfCurrency({list, value, name}) {
  const [selected, setSelected] = useState(value);
  
  // for open and close list
  const [open, setOpen] = useState(false);
  
  const elems = Object.entries(list).map(arr => {

    // select item and close the list
    function choose() {
      setSelected(arr[1].code);
      setOpen(false);
    }

    return <div key={arr[0]}> 
      <label 
        onClick={choose}
        selected={arr[1].code === selected}
      >{arr[1].name}</label>

      <input 
        value={arr[1].code}

        // to assing name=from for selected input only
        name={arr[1].code === selected ? name : null}
        readOnly
      />
    </div>
  });

  return (
    <div className={styles.list}>
      {/* selected field */}
      <p 
        onClick={() => setOpen(!open)}
        className={styles.choosen}
      >{selected}</p>

      {/* rest of options */}
      <ul className={`${styles.listUl} ${open ? styles.listOpen : ""}`}>
        {
          elems
        }
      </ul>
    </div>
  )
}