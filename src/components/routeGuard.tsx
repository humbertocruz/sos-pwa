import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { tokenAtom } from '../state/atoms'
import { useRecoilState, useRecoilValue } from 'recoil'
import Home from '../pages/login'
import LayoutComponent from './layout/main'
import { Box, Center, Icon, Text, VStack } from '@chakra-ui/react'
import { MdPolicy } from 'react-icons/md'

const RouteGuard = (props:any) => {
    const { children } = props
    const [canDisplay, setCanDisplay] = useState(false)
    const token = useRecoilValue(tokenAtom)
    const router = useRouter()

    useEffect(()=>{
        const url = router.asPath
        const publicPaths = ['/login','/convite']
        const path = url.split('?')[0]
        const isPublic = publicPaths.includes(path)
        if (!isPublic && !token) {
            setCanDisplay(false)
            router.push('/login')
            //setCanDisplay(true)
        } else if (isPublic && token) {
            router.push('/')
        } else {
            setCanDisplay(true)
        }
    },[token,router])

    if (canDisplay) {
        return children
    } else {
        return (
            <LayoutComponent header={false} footer={false} />
        )
    }    
}

export { RouteGuard }
