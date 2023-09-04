import axios from "axios";

const domain = "http://localhost:3001";

export const fetcher = async (url, method = "GET", body) => {
  const token = localStorage.getItem("jwt");

  let res;
  try {
    res = await axios({
      url: domain + url,
      method,
      data: body,
      headers: {
        Accept: "application/json",
        ...(body ? { "Content-Type": "application/json" } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    return res.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    throw new Error(message);
  }
};
