export const YoutubeVideosApi = {
   method: "GET",
   headers: {
      "x-rapidapi-key": import.meta.env.VITE_YOUTUBE_VIDEOS_API_KEY,
      "x-rapidapi-host": "youtube-search-and-download.p.rapidapi.com",
   },
};
