import { useRecoilState } from "recoil"
import useSWR from "swr"
import { tokenAtom } from "../state/atoms"

const useAdmins = (clientId:string) => {
  const [token,setToken] = useRecoilState(tokenAtom)

  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  headers.append('Authorization', `Bearer ${token}`)
  const fetcher = (url:string) => fetch(url,{
    headers:headers
  }).then((r) => r.json())

  // valida o usuario a cada 10 segundos
  const { data, error, isValidating, mutate } = useSWR(token&&clientId?`/api/admins?id=${clientId}`:null, fetcher, {
    refreshInterval: 0
  })
  return {
    data,
    error,
    isValidating,
    mutate
  }
}
export default useAdmins