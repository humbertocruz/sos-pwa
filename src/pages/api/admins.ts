// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from './_prisma'

type Data = {
  users: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { headers } = req
  const { authorization } = headers
  const token = authorization?.split(' ')[1]

  const users = await prisma.user.findMany({
    where: {
      role: 'ADMIN'
    }
  })
    
  res.status(200).json({ users })
}
