/* eslint-disable react-hooks/exhaustive-deps */
import { Text, Center, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, HStack, IconButton, Input, List, ListIcon, ListItem, useDisclosure } from "@chakra-ui/react"
import useSWR from "swr"
import { useRouter } from "next/router"
import { useEffect, useRef } from "react"
import { MdHome, MdLogin, MdLogout, MdMenu, MdPerson, MdPersonSearch, MdPolicy } from "react-icons/md"
import { useRecoilState } from "recoil"
import { tokenAtom } from "../../state/atoms"
import useUser from "../../hooks/useUser"

const MenuComponent = () => {
  const [token,setToken] = useRecoilState(tokenAtom)
  const {isOpen, onOpen, onClose} = useDisclosure()
  const router = useRouter()
  
  const { data, error} = useUser()

  useEffect(() => {
    if (error) {
      setToken(undefined)
    }
  }, [error])
    
  const goTo = (path: string) => {
    router.push(path)
  }

  const logout = () => {
    setToken(undefined)
  }

  return (
    <Center zIndex={2} w={'full'} position={'fixed'} top={0} justifyContent={'flex-start'} h={'7vh'} bg={'gray.500'} shadow={'md'} p={2}>
      <Drawer isOpen onClose={onClose} isOpen={isOpen} placement={'left'}>
        <DrawerOverlay />
        <DrawerContent bg={'gray.600'}>
          <DrawerCloseButton color={'white'} />
          <DrawerHeader color={'white'}>Menu</DrawerHeader>
          <DrawerBody>
            <List spacing={3} color={'white'}>
              <ListItem onClick={()=>goTo('/')} cursor={'pointer'}>
                <ListIcon as={MdHome} />
                Home
              </ListItem>
              <ListItem onClick={()=>goTo('/admin/clientes')} cursor={'pointer'}>
                <ListIcon as={MdPerson} />
                Clientes
              </ListItem>
              <ListItem onClick={()=>goTo('/admin/grupos')} cursor={'pointer'}>
                <ListIcon as={MdPersonSearch} />
                Grupos
              </ListItem>
              <ListItem onClick={()=>goTo('/admin/programas')} cursor={'pointer'}>
                <ListIcon as={MdPerson} />
                Programas
              </ListItem>
              <ListItem onClick={()=>goTo('/admin/usuarios')} cursor={'pointer'}>
                <ListIcon as={MdPerson} />
                Usuários
              </ListItem>
            </List>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <HStack w={'full'} justifyContent={'space-between'}>
        <IconButton onClick={onOpen} colorScheme={'whiteAlpha'} variant={'ghost'} aria-label="Emergência" icon={<MdMenu size={24} />} />
        <Text color={'whiteAlpha.800'} fontWeight='bold' fontSize={18}>SOS Cidadão</Text>
        <IconButton onClick={logout} colorScheme={'whiteAlpha'} variant={'ghost'} aria-label="Emergência" icon={<MdLogout size={24} />} />}
      </HStack>
    </Center>
  )
}
export default MenuComponent
