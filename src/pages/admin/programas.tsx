import { Button, Container, Text, Box, Center, Flex, HStack, IconButton, Grid, GridItem } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { MdPolicy } from 'react-icons/md'
import LayoutComponent from '../../components/layout/main'
import useUser from '../../hooks/useUser'
import MonitorComponent from '../../components/monitor'
import LayoutAdminComponent from '../../components/layout/admin'
import usePrograms from '../../hooks/usePrograms'

//@ts-ignore
const Home: NextPage = () => {

  const { data,error, isValidating, mutate } = usePrograms()
  if (!data) return (
    null
  )

  return (
    <LayoutAdminComponent leftMenu={true}>
      <HStack flexDirection={'column'} px={2} minH={'85vh'} bg={'gray.300'} gap={2}>
        <Text>Programas</Text>
        {data.programs.map((program:any) => (
          <Box w={'full'} p={2} rounded={'md'} bg={"gray.200"} key={program.id}>
            <Text>{program.name}</Text>
          </Box>
        ))}
      </HStack>
    </LayoutAdminComponent>
  )
  
}

export default Home