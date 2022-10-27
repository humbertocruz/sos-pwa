/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Container, Text, Box, Center, Flex, HStack, IconButton, Input, useToast, Icon } from '@chakra-ui/react'
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

  useEffect(() => {
    if (token) {
      router.push('/home')
    }
  }, [token])

  const handleLogin = async () => {
    setIsLoading(true)
    const secret = await doLogin(email, password)
    if (secret) {
      toast({
        title: 'Login',
        description: 'Login realizado com sucesso.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      setToken(secret)
    } else {
      toast({
        title: 'Login',
        description: 'Login falhou, verifique seus dados.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
    setIsLoading(false)
  }

  return (
    <LayoutComponent>
      <Center flexDirection={'column'} px={2} pt={'10vh'} pb={'5vh'} h={'100vh'} bg={'gray.300'} gap={2}>
        <Center flexDirection={'column'} m={2} p={8} rounded={'md'}>
          <Icon my={8} fontSize={96} color={'gray.500'} aria-label="Emergência" as={MdPolicy} />
          <Text fontWeight={'bold'} color={'gray.500'} fontSize={'md'}>SOS Cidadão</Text>
        </Center>
        <Center w={'full'} flexDirection={'column'} bg={'gray.100'} p={4} rounded={'md'} shadow={'md'}>
          <Input readOnly={isLoading} type={'email'} value={email} onChange={(e)=>setEmail(e.currentTarget.value)} my={2} variant={'flushed'} placeholder="Digite seu Email" />
          <Input readOnly={isLoading} type={'password'} value={password} onChange={(e)=>setPassword(e.currentTarget.value)} my={2} variant={'flushed'} placeholder="Digite sua Senha" />
          <Button color={'gray.200'} isLoading={isLoading} loadingText={'Carregando...'} onClick={handleLogin} w={'full'} my={2} bg={'gray.500'}>
            Entrar
          </Button>
        </Center>
      </Center>
    </LayoutComponent>
  )
}

export default Login
