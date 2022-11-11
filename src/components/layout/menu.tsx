/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, HStack, IconButton, Input, List, ListIcon, ListItem, useDisclosure } from "@chakra-ui/react"
import useSWR from "swr"
import { useRouter } from "next/router"
import { useEffect, useRef } from "react"
import { MdHome, MdLogin, MdLogout, MdMenu, MdPerson, MdPolicy } from "react-icons/md"
import { useRecoilState, useRecoilValue } from "recoil"
import { tokenAtom } from "../../state/atoms"
import useUser from "../../hooks/useUser"

const MenuComponent = () => {
  const [token,setToken] = useRecoilState(tokenAtom)
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef<HTMLButtonElement>(null)

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
    <>
    <HStack w={'full'} justifyContent={'space-between'}>
      <IconButton ref={btnRef} onClick={onOpen} color={'gray.300'} variant={'ghost'} aria-label="Emergência" icon={<MdMenu size={32} />} />
      {token&&<IconButton onClick={()=>goTo('/home')} color={'gray.300'} variant={'ghost'} aria-label="Home" icon={<MdHome size={32} />} />}
      {token&&<IconButton onClick={()=>goTo('/emergencia')} color={'gray.300'} variant={'ghost'} aria-label="Emergência" icon={<MdPolicy size={32} />} />}
      {!token?<IconButton onClick={()=>goTo('/login')} color={'gray.300'} variant={'ghost'} aria-label="Emergência" icon={<MdLogin size={32} />} />:
      <IconButton onClick={logout} color={'gray.300'} variant={'ghost'} aria-label="Emergência" icon={<MdLogout size={32} />} />}
    </HStack>
    <Drawer
    isOpen={isOpen}
    placement='left'
    onClose={onClose}
    finalFocusRef={btnRef}
  >
    <DrawerOverlay />
    <DrawerContent bg={'gray.200'}>
      <DrawerCloseButton color={'gray.500'} />
      <DrawerHeader color={'gray.500'}>Admin</DrawerHeader>

      <DrawerBody>
        <List>
        <ListItem color={'gray.500'}>
            <ListIcon as={MdPerson} />
            Usuários
          </ListItem>
          <ListItem color={'gray.500'}>
            <ListIcon as={MdHome} />
            Grupos
          </ListItem>
        </List>
      </DrawerBody>

      <DrawerFooter>
        
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
  </>
  )
}
export default MenuComponent
