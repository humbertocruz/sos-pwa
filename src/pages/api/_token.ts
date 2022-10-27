import { prisma } from './_prisma'
const Auth = () => {
  const getUser = async (token: string) => {
    const data = await prisma.token.findFirst({
      where: {
        token,
        valid: true
      },
      include: {
        user: true,
      },
    })
    return data?.user
  }

  return {
    getUser
  }
}
export default Auth