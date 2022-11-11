import { useRecoilState } from "recoil"
import useSWR from "swr"
import { tokenAtom } from "../state/atoms"

const UpdateOcorrency = () => {
  const [token,setToken] = useRecoilState(tokenAtom)

  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  headers.append('Authorization', `Bearer ${token}`)
  
  const update = async (status:string, id:string) => {
    return await fetch('/api/ocorrency',{
      headers:headers,
      method:'PUT',
      body:JSON.stringify({
        status:status,
        id:id
      })
    }).then((r) => r.json())
  } 
 
  return {
    update
  }
}
export default UpdateOcorrency