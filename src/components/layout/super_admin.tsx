import { Button, Center, Flex, Grid, GridItem, List, ListIcon, ListItem, Text, VStack } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { MdPerson } from "react-icons/md"

import FooterComponent from "./footer"
import MenuComponent from "./menu"
import SuperAdminMenuComponent from "./superAdminMenu"

const LayoutSuperAdminComponent = (props:any) => {
  const { children, leftMenu } = props
  const router = useRouter()
  return (
    <Flex flexDirection={'column'}>
      <Center zIndex={1} w={'full'} position={'fixed'} top={0} justifyContent={'flex-start'} h={'10vh'} bg={'gray.500'} shadow={'md'} p={2}>
        <SuperAdminMenuComponent />
      </Center>
      {children}
      <Center zIndex={1} w={'full'} position={'fixed'} bottom={0} h={'5vh'} bg={'gray.500'} shadow={'md'} p={2}>
        <FooterComponent />
      </Center>
    </Flex>
  )
}
export default LayoutSuperAdminComponent