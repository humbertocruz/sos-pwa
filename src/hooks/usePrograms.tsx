import { useRecoilValue } from "recoil"
import useSWR from "swr"
import { tokenAtom } from "../state/atoms"

const usePrograms = () => {
  // token do state
  const token = useRecoilValue(tokenAtom)

  // headers e fetcher com autenticacao
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  headers.append('Authorization', `Bearer ${token}`)
  const fetcher = (url:string) => fetch(url,{
    headers:headers
  }).then((r) => r.json())

  // pega os programas
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

  // cria um programa
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

  // atualiza um programa
  const UpdateProgram = async (id:string, name:string) => {
    const response = await fetch(`/api/programs/${id}`,{
      method:'PUT',
      headers:headers,
      body:JSON.stringify({
        name
      })
    }).then((r) => r.json())
    return response
  }

  // deleta um programa
  const DeleteProgram = async (id:string) => {
    const response = await fetch(`/api/programs/${id}`,{
      method:'DELETE',
      headers:headers
    }).then((r) => r.json())
    return response
  }
  
  return {
    GetPrograms,
    CreateProgram,
    UpdateProgram,
    DeleteProgram
  }
}
export default usePrograms