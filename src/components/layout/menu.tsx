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
      <IconButton color={'gray.300'} variant={'ghost'} aria-label="Emergência" icon={<MdPolicy size={32} />} />
      {token&&<IconButton onClick={()=>goTo('/home')} color={'gray.300'} variant={'ghost'} aria-label="Home" icon={<MdHome size={32} />} />}
      {!token?<IconButton onClick={()=>goTo('/login')} color={'gray.300'} variant={'ghost'} aria-label="Emergência" icon={<MdLogin size={32} />} />:
      <IconButton onClick={logout} color={'gray.300'} variant={'ghost'} aria-label="Emergência" icon={<MdLogout size={32} />} />}
    </HStack>
    
  </>
  )
}
export default MenuComponent
