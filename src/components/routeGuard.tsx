import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { tokenAtom } from '../state/atoms'
import { useRecoilState } from 'recoil'
import Home from '../pages/login'

export { RouteGuard }

function RouteGuard(props:any) {
    const { children } = props
    const router = useRouter()
    const [token,setToken] = useRecoilState(tokenAtom)
    const [canDisplay, setCanDisplay] = useState(false)

    useEffect(()=>{
        const url = router.asPath
        const publicPaths = ['/','/login','/convite']
        const path = url.split('?')[0]
        const isPublic = publicPaths.includes(path)
        if (!isPublic && !token) {
            setCanDisplay(false)
            router.push('/login')
            setCanDisplay(true)
        } else {
            setCanDisplay(true)
        }
    },[token])

    return(canDisplay && children)
    
}
