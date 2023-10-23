import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

export const GetContextData = async (
  token: string | null,
  user_id: string | undefined
) => {
  try {
    const cart_data = await axios.get(`${BASE_URL}/cart/${user_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const favs_data = await axios.get(`${BASE_URL}/favorites/${user_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return {
      cart_data: cart_data.data,
      favs_data: favs_data.data,
      error: null,
    };
  } catch (error) {
    return {
      favs_data: null,
      cart_data: null,
      error: error,
    };
  }
};
