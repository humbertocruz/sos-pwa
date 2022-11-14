import { Box, Center, Flex, Grid, GridItem, VStack } from "@chakra-ui/react"

import FooterComponent from "./footer"
import MenuComponent from "./menu"

const LayoutComponent = (props:any) => {
  const { children, header=true, footer=true } = props
  return (
    <VStack w={'full'} minH={'100vh'} bg='red'>
      
      <VStack pt={header?'10vh':null} pb={footer?'5vh':null} minH={'100vh'} w={'full'} bg={'gray.300'}>
        {header&&<MenuComponent />}
        {children}     
        {footer&&<FooterComponent />}
      </VStack>
      
    </VStack>
  )
}
export default LayoutComponent