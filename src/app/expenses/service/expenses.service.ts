import type { Expense } from '../model/expense.class';

export default async function SaveExpense (
  formData: Expense
): Promise<any> {
  try {
    const baseURL = `${process.env.NEXT_PUBLIC_API_URL}`;
    const response = await fetch(`${baseURL}/Expenses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    if (!response.ok) {
      throw new Error('Failed to fetch data for URL: /Expense');
    }
    return await response.json();
  } catch (e) {
    console.log(e);
    throw e;
  }
}
