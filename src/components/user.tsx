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
  
  if (data.data==null) {  
    return (
      <UserHomeComponent mutate={mutate} />
    )
  } else {
    return (
      <UserOcorrencyComponent data={data} />
    )
  }

}

export default UserComponent