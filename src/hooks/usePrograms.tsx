import { useRecoilState } from "recoil"
import useSWR from "swr"
import { tokenAtom } from "../state/atoms"

const usePrograms = () => {
  const [token,setToken] = useRecoilState(tokenAtom)

  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  headers.append('Authorization', `Bearer ${token}`)
  const fetcher = (url:string) => fetch(url,{
    headers:headers
  }).then((r) => r.json())

  const GetPrograms = () => {
    // valida o usuario a cada 10 segundos
    const { data, error, isValidating, mutate } = useSWR(token?'/api/programs':null, fetcher, {
      refreshInterval: 0
    })
    return {
      data,
      error,
      isValidating,
      mutate
    }
  }

  const CreateProgram = async (name:string) => {
    const response = await fetch('/api/programs',{
      method:'POST',
      headers:headers,
      body:JSON.stringify({
        name
      })
    }).then((r) => r.json())
    return response
  }
  
  return {
    GetPrograms,
    CreateProgram
  }
}
export default usePrograms