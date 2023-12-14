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
        className={arr[1].code === selected ? styles.selected : null}
        htmlFor={arr[0] + name}
      >{arr[1].name}</label>

      <input 
        value={arr[1].code}
        id={arr[0] + name}

        // to assing name=from for selected input only
        name={arr[1].code === selected ? name : null}
        readOnly
      />
    </div>
  });

  return (
    <div className={styles.list}>
      {/* selected field */}
      <div 
        className={styles.choosen}
        onClick={() => setOpen(!open)}
      >
        <p>{selected}</p>

        <i 
          className={`fa-solid fa-caret-down ${open ? "fa-rotate-180" : ""}`} 
          style={{color: '#00494d'}}>
        </i>
      </div>

      {/* rest of options */}
      <ul className={`${styles.listUl} ${open ? styles.listOpen : ""}`}>
        {
          elems
        }
      </ul>
    </div>
  )
}