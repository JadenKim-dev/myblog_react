import {API_HOST} from "Constants";
import Axios from "axios";
import {makeUseAxios} from "axios-hooks"

export const axiosInstance = Axios.create({
  baseURL: API_HOST
})

export const useAxios = makeUseAxios({
  axios: axiosInstance
})