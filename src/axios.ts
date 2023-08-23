import Axios from "axios"

export const axios = Axios.create({
  baseURL: `http://${process.env.ENDERECO_GIT}/api/v4`,
  headers: {
    Authorization: "Bearer --token--",
    "Content-Type": "application/json",
    "Accept-Encoding": "application/json",
  },
})
