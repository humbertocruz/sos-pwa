import { useRecoilState } from "recoil"
import useSWR from "swr"
import { tokenAtom } from "../state/atoms"

const useOcorrency = () => {
  const [token,setToken] = useRecoilState(tokenAtom)

  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  headers.append('Authorization', `Bearer ${token}`)
  const fetcher = (url:string) => fetch(url,{
    method:'GET',
    headers:headers
  }).then((r) => r.json())

  // valida o usuario a cada 10 segundos
  const { data, error, isValidating, mutate } = useSWR(token?'/api/ocorrency':null, fetcher, {
    refreshInterval: 30000
  })
  return {
    data,
    error,
    isValidating,
    mutate
  }
}
export default useOcorrency