import styles from "../page.module.css";
import { convert, getAllCurrencies } from "../utils/convert";
import ListOfCurrency from "./ListOfCurrency";

import { cookies } from 'next/headers'


export default async function Edit() {
  // List of currencies
  const list = await getAllCurrencies();
    
  async function handleSubmit(formData) {
    'use server'

    // Get all form data
    const rawFormData = {
      amount: formData.get('amount') || 1,
      from: formData.get('from'),
      to: formData.get('to'),
    }

    // Check if it is no a number
    if(!isNaN(rawFormData.amount)) {
      const c = await convert(
        rawFormData.from,
        rawFormData.to,
        rawFormData.amount
      );

      // update the cookies
      cookies().set("result", `${rawFormData.amount} ${rawFormData.from} = ${c} ${rawFormData.to}`);
    }

  }

  return (
    <form action={handleSubmit} className={styles.form}>
      <div>
        {/* Amount to be coverted */}
        <div className={styles.amount}>
          <label htmlFor="amount">Amount</label>
          <input
            type="text"
            name="amount"
            id="amount"
            autoComplete="off"
          />
        </div>

        {/* Types of currencies */}
        <div className={styles.fromTo}>
          {/* From */}
          <div>
            <label htmlFor="from">From</label>
            <ListOfCurrency 
              list={list}
              name="from"
              value="USD"
              />
          </div>

          {/* To */}
          <div>
          <label htmlFor="to">To</label>
            <ListOfCurrency 
              list={list}
              name="to"
              value="EUR"
            />
          </div>
        </div>
      </div>

      <button type="submit">Convert</button>
    </form>
  )
}