import { History } from "../model/history.class";

export default async function SaveHistory (
  formData: History
): Promise<any> {
  try {
    const baseURL = `${process.env.NEXT_PUBLIC_API_URL}`;
    const response = await fetch(`${baseURL}/History`, {
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
