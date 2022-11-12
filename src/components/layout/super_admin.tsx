import { Center, Flex, Grid, GridItem, List, ListIcon, ListItem, Text } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { MdPerson } from "react-icons/md"

import FooterComponent from "./footer"
import MenuComponent from "./menu"

const LayoutSuperAdminComponent = (props:any) => {
  const { children, leftMenu } = props
  const router = useRouter()
  return (
    <Flex flexDirection={'column'}>
      <Center zIndex={1} w={'full'} position={'fixed'} top={0} justifyContent={'flex-start'} h={'10vh'} bg={'gray.500'} shadow={'md'} p={2}>
        <MenuComponent />
      </Center>
      <Grid
        mt={'10vh'}
        mb={'5vh'}
        h='200px'
        templateRows='repeat(1, 1fr)'
        templateColumns='repeat(15, 1fr)'
        gap={4}>
        <GridItem colSpan={3} p={2} >
          <List w={'full'}>
            <ListItem _hover={{cursor:'pointer'}} onClick={()=>router.push('/admin/clientes')} mb={2} bg={'gray.300'} p={2} rounded={'md'}>
              <ListIcon as={MdPerson} />
              Clientes
            </ListItem>
          </List>
        </GridItem>
        <GridItem colSpan={12}>
          {children}     
        </GridItem>
      </Grid>
      <Center zIndex={1} w={'full'} position={'fixed'} bottom={0} h={'5vh'} bg={'gray.500'} shadow={'md'} p={2}>
        <FooterComponent />
      </Center>
    </Flex>
  )
}
export default LayoutSuperAdminComponent