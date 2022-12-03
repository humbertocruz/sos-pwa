import { useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import useSWR from "swr"
import { tokenAtom } from "../state/atoms"

const CreateOcorrency = () => {
  const [token,setToken] = useRecoilState(tokenAtom)
  const [location,setLocation] = useState(null)

  // get location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position:any)=>{
      setLocation({
        latitude:position.coords.latitude,
        longitude:position.coords.longitude
      })
    },
    ()=>{
      setLocation(null)
      console.log('erro')
    })
  },[])

  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  headers.append('Authorization', `Bearer ${token}`)
  const create = async (userId:string) => {
    return await fetch('/api/ocorrency',{
      headers:headers,
      method:'POST',
      body:JSON.stringify({
        userId: userId,
        latitude: location?.latitude,
        longitude: location?.longitude
      })
    }).then((r) => r.json())
  } 
 
  return {
    create
  }
}
export default CreateOcorrency