import { Text } from "@chakra-ui/react"
import useUserOcorrency from "../hooks/useOcorrencyUser"
import UserHomeComponent from "./home"
import UserOcorrencyComponent from "./ocorrency"

const UserComponent = (props:any) => {

  const {data,isValidating,mutate} = useUserOcorrency()
  
  if (!data) {
    return (
      <Text>Carregando...</Text>
    )
  }

  console.log(data)
  
  if (data.ocorrencies==null) {
    return (
      <UserHomeComponent mutate={mutate} />
    )
  } else {
    return (
      <UserOcorrencyComponent ocorrency={data} />
    )
  }

}

export default UserComponent