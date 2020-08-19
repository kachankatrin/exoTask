export const url = "/portal/rest/tipoftheday";

/**
 * Download random tip from the specified URL.
 *
 * @async
 * @function getRandomTip
 * @param {string} url - The URL to download from.
 * @return {Promise<JSON>} The data from the URL.
 */

export async function getRandomTip(url) {
  try {
    const response = await fetch(url);
    return response.json();
  } catch (err) {
    console.log(err);
  }
}

/**
 * Post the custom tip
 *
 * @async
 * @function postTip
 * @param {string} tip the custom tip
 * @param {string} url - The URL to download from
 * @return {Promise<JSON>} 
 */

export async function postTip(url, tip) {
  try {
    const data = new URLSearchParams();
    data.append("text", tip);
    const dataRes = await fetch(url, {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return dataRes.json();
  } catch (err) {
    console.log(err);
  }
}