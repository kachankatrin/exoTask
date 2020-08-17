const url = "/portal/rest/tipoftheday/";

/**
 * Fetch the random tip
 *
 * @customFunction
 * @return Promise
 */

export async function getRandomTip() {
  return await fetch(`${url}random/`)
    .then((res) => res.json())
    .catch((err) => console.log(err));
}

/**
 * Post the custom tip
 *
 * @customFunction
 * @return Promise
 */

export async function postTip(tip) {
  const data = new URLSearchParams();
  data.append("text", tip);
  const response = await fetch(`${url}tip/`, {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  return await response.json();
}
