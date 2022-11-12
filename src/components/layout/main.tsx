import { Center, Flex, Grid, GridItem } from "@chakra-ui/react"

import FooterComponent from "./footer"
import MenuComponent from "./menu"

const LayoutComponent = (props:any) => {
  const { children, leftMenu } = props
  return (
    <Flex flexDirection={'column'}>
      <Center zIndex={1} w={'full'} position={'fixed'} top={0} justifyContent={'flex-start'} h={'10vh'} bg={'gray.500'} shadow={'md'} p={2}>
        <MenuComponent />
      </Center>
      
        {children}     
      
      <Center zIndex={1} w={'full'} position={'fixed'} bottom={0} h={'5vh'} bg={'gray.500'} shadow={'md'} p={2}>
        <FooterComponent />
      </Center>
    </Flex>
  )
}
export default LayoutComponent