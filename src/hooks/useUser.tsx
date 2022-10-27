import { useRecoilState } from "recoil"
import useSWR from "swr"
import { tokenAtom } from "../state/atoms"

const useUser = () => {
  const [token,setToken] = useRecoilState(tokenAtom)

  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  headers.append('Authorization', `Bearer ${token}`)
  const fetcher = (url:string) => fetch(url,{
    headers:headers
  }).then((r) => r.json())

  // valida o usuario a cada 10 segundos
  const { data, error } = useSWR(token?'/api/user':null, fetcher, {
    refreshInterval: 30000
  })
  return {
    data,
    error
  }
}
export default useUser