import { Box, Center, IconButton, Text, chakra, Button } from "@chakra-ui/react"
import { MdPolicy } from "react-icons/md"
import LayoutComponent from "./layout/main"
import CreateOcorrency from "../hooks/CreateOcorrency"
import useUser from "../hooks/useUser"


const UserHomeComponent = (props:any) => {

  const { mutate } = props

  const ChakraPolicy = chakra(MdPolicy)

  const { data:user } = useUser()
  const { create } = CreateOcorrency()

  const startOcorrency = () => {
    create(user.user.id)
    mutate()
  }


  return (
    <LayoutComponent>
      <Center minH={'91vh'} bg={'gray.300'}>
          <Button onClick={()=>startOcorrency()} dropShadow={'md'} colorScheme={'blue'} shadow={'md'} rounded={'full'} w={200} h={200}>
            <Center h={'full'}>
              <ChakraPolicy size={100} color={'white'} />
            </Center>
          </Button>
      </Center>
    </LayoutComponent>  
  )

}

export default UserHomeComponent