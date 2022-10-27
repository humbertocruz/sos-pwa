// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import Auth from './_token'

type Data = {
  emergency: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { headers } = req
  const { authorization } = headers
  const token = authorization?.split(' ')[1]
  const { getUser } = Auth()
  //@ts-ignore
  let user = await getUser(token)
  //@ts-ignore
  if (user) delete user.password

  const emergency = await prisma?.ocorrency.findMany({
    where: {
      userId: user?.id
    }
  })
  
  res.status(200).json({ emergency })
}
