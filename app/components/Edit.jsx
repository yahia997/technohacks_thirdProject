import styles from "../page.module.css";
import { convert, getAllCurrencies } from "../utils/convert";
import ListOfCurrency from "./ListOfCurrency";


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

      console.log(`${rawFormData.amount}${rawFormData.from} = ${c}${rawFormData.to}`);
    }

  }

  return (
    <form action={handleSubmit}>
      {/* Amount to be coverted */}
      <div>
        <label htmlFor="amount">Amount</label>
        <input
          type="text"
          name="amount"
          id="amount"
        />
      </div>

      {/* Types of currencies */}
      <div>
        {/* From */}
        <ListOfCurrency 
          list={list}
          name="from"
          value="USD"
        />

        {/* To */}
        <ListOfCurrency 
          list={list}
          name="to"
          value="EUR"
        />
      </div>

      <button type="submit">Convert</button>
    </form>
  )
}