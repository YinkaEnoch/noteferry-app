let API_URL = "";

process.env.NODE_ENV === "development"
  ? (API_URL = "/noteferry/note/")
  : (API_URL = "https://noteferry.heroku.com/noteferry/note");

export { API_URL };