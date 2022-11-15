/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Container, Text, Box, Center, Flex, HStack, IconButton, Input, useToast, Icon, VStack } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { MdPolicy } from 'react-icons/md'
import { useRecoilState } from 'recoil'

import LayoutComponent from '../components/layout/main'
import useAuth from '../hooks/useAuth'
import { tokenAtom } from '../state/atoms'

const Login: NextPage = () => {

  const [token, setToken] = useRecoilState(tokenAtom)
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()
  const { doLogin } = useAuth()

  const handleLogin = async () => {
    setIsLoading(true)
    const secret = await doLogin(email, password)
    if (secret) {
      toast({
        title: 'Login',
        description: 'Login realizado com sucesso.',
        status: 'success',
        duration: 2000,
        isClosable: false,
      })
      setToken(secret)
    } else {
      toast({
        title: 'Login',
        description: 'Login falhou, verifique seus dados.',
        status: 'error',
        duration: 2000,
        isClosable: false,
      })
    }
    setIsLoading(false)
  }

  return (
    <LayoutComponent header={false} footer={false}>
      <Center flexDir={'column'} h={'100vh'} minW={'xs'} w={'full'} px={2}>
        <Center p={8}>
          <VStack>
            <Icon fontSize={96} color={'blackAlpha.500'} aria-label="Emergência" as={MdPolicy} />
            <Text fontWeight={'bold'} color={'blackAlpha.500'} fontSize={'md'}>SOS CIDADÃO</Text>
          </VStack>
        </Center>
        <Center w={'full'} bg={'gray.100'} p={4} rounded={'md'} shadow={'md'}>
          <VStack w={'full'}>
            <Input readOnly={isLoading} type={'email'} value={email} onChange={(e)=>setEmail(e.currentTarget.value)} my={2} variant={'flushed'} placeholder="Digite seu Email" />
            <Input readOnly={isLoading} type={'password'} value={password} onChange={(e)=>setPassword(e.currentTarget.value)} my={2} variant={'flushed'} placeholder="Digite sua Senha" />
            <Button colorScheme={'blackAlpha'} isLoading={isLoading} loadingText={'Carregando...'} onClick={handleLogin} w={'full'} my={2} >
              Entrar
            </Button>
          </VStack>
        </Center>
      </Center>
    </LayoutComponent>
  )
}

export default Login
