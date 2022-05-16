import Axios, { AxiosInstance } from 'axios'

type AxiosInstanceProps = {
  baseURL: string
  token?: string
}
export const buildAxiosInstance = (
  { baseURL , token }: AxiosInstanceProps
): AxiosInstance => {
  return Axios.create({
    baseURL: `${baseURL}`,
    headers: { ...(token &&{ Authorization: `Token ${token}` }), 'Content-Type': 'application/json', 'Cache-Control': 'no-cache', }
  })
}
