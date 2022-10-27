// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from './_prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { headers } = req
  const token = headers.authorization?.split(' ')[1]
  const user = await prisma.user.findUnique({
    where: {
      id: req.body.id
    }
  })
  res.status(200).json(user)
  return
}
