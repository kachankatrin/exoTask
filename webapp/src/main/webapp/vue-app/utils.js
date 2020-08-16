const url = "/portal/rest/tipoftheday/";
export async function getRandomTip() {
  return await fetch(`${url}random/`, {
    method: "GET",
    contentType: "application/json",
  })
    .then((res) => res.json())
    .then((text) => (this._data.tip = text.text))
    .catch((err) => console.log(err));
}
