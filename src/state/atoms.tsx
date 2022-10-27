import { atom, selector } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

const tokenAtom = atom({
    key: 'tokenAtom',
    default: undefined,
    effects_UNSTABLE: [persistAtom]
})
    
export { tokenAtom }
