export const exercisesFetchOptions = {
   method: "GET",
   url: "https://exercisedb.p.rapidapi.com/status",
   headers: {
      "x-rapidapi-key": import.meta.env.VITE_EXERCISES_API_KEY,
      "x-rapidapi-host": "exercisedb.p.rapidapi.com",
   },
};
