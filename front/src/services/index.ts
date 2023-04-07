import { Item } from "../types";

const baseUrl = "http://localhost:5000/";

export const createCheckoutSession = async (body: { items: Item[] }) => {
  const url = baseUrl + "create-checkout-session";
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((res) => {
      if (res.ok) return res.json();
      return res.json().then((json) => Promise.reject(json));
    })
    .then(({ url }) => {
      window.location = url;
    })
    .catch((error) => {
      console.error(error.message);
    });

  return response;
};
