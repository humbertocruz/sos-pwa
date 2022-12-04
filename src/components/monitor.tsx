import LayoutComponent from "./layout/main"
import { Box, Button, Center, Menu, MenuButton, MenuItem, MenuList, Portal, Table, Text, VStack } from '@chakra-ui/react'

import useOcorrency from "../hooks/useOcorrency"
import { MdArrowDropDown } from "react-icons/md"
import dayjs from "dayjs"
import { useRecoilValue } from "recoil"
import { tokenAtom } from "../state/atoms"
import { useState } from "react"

const MonitorComponent = () => {

  const { data, mutate  } = useOcorrency()
  const token = useRecoilValue(tokenAtom)
  const [loading, setLoading] = useState('')

  const isLoading = (id:string) => {
    return loading === id
  }

  const changeStatus = async (status:string, id:string) => {
    setLoading(id)
    const headers = new Headers()
    headers.append('Content-Type','application/json')
    headers.append('Authorization','Bearer '+token)

    const ocorrency = await fetch(`/api/ocorrency/${id}`,{
      headers:headers,
      method:'PUT',
      body: JSON.stringify({
        status:status
      })
    }).then(r=>r.json())
    mutate()
    setLoading('')
  }

  if (!data) return null

  console.log(data)

  return (
    <LayoutComponent>
      <Center minH={'100vh'} bg={'gray.300'}>
        <VStack gap={0} p={2} mt={'10vh'} mb={'5vh'}>
        {data?.data.map((item:any, i:number) => {
          const isOpen = item.status==='ABERTO'
          const isRoll = item.status==='EM_ANDAMENTO'
          const isClose = item.status == 'FECHADO'
          return(
            <Box key={'ocorrency_'+i} w={'md'} p={2} bg={item.status=='ABERTO'?'red.100':item.status=='EM_ANDAMENTO'?'yellow.100':'green.100'} mx={2} rounded={'md'}>
              <Text fontWeight={'bold'}>{item.user.name}</Text>
              <Text fontWeight={'bold'}>{dayjs(item.date).format('DD/MM/YY HH:mm')}</Text>
              <Text fontSize={14}>Coordenadas: {item.latitude}/{item.longitude}</Text>
              <Menu>
                <MenuButton isLoading={loading===item.id} as={Button} rightIcon={<MdArrowDropDown size={22} />} colorScheme={isOpen?'red':isRoll?'yellow':'green'} size={'sm'}>{isOpen?'Em Aberto':isRoll?'Em Atendimento':'Fechada'}</MenuButton>
                
                  <MenuList>
                    {!isOpen&&<MenuItem onClick={()=>changeStatus('ABERTO',item.id)}>Em Aberto</MenuItem>}
                    {!isRoll&&<MenuItem onClick={()=>changeStatus('EM_ANDAMENTO',item.id)}>Em Atendimento</MenuItem>}
                    {!isClose&&<MenuItem onClick={()=>changeStatus('FECHADO',item.id)}>Fechada</MenuItem>}
                  </MenuList>
                
              </Menu>
            </Box>
          )
        })}
        </VStack>
      </Center>
    </LayoutComponent>
  )
}
export default MonitorComponent
