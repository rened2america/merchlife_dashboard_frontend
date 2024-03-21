const BASE_URL = "https://politicozen-backend.onrender.com/api/1/";

export const fetchInstance = () => {
  const post = async (url: string, body: object) => {
    const result = await fetch(`${BASE_URL}${url}`, {
      method: "POST",
      body: JSON.stringify(body),
    });
    const data = await result.json();
    if (data.hasOwnProperty("status") && data.status === 401) {
    }
    return data;
  };
  const get = async (url: string) => {
    try {
      const result = await fetch(`${BASE_URL}${url}`, {
        credentials: "include",
      });
      const data = await result.json();
      console.log(result.status);
      if (result.status === 401) {
        return {
          isAuth: false,
          data: [],
        };
      }
      return {
        isAuth: true,
        data,
      };
    } catch (error) {
      console.log("error", error);
    }
  };
  const patch = async (url: string, body: object) => {
    const result = await fetch(`${BASE_URL}${url}`, {
      method: "PATCH",
      body: JSON.stringify(body),
    });
    return result.json();
  };
  const deleteById = async (url: string) => {
    const result = await fetch(`${BASE_URL}${url}`, {
      method: "DELETE",
    });
    return result.json();
  };

  return {
    post,
    get,
    patch,
    deleteById,
  };
};
