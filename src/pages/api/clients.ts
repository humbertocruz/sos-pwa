// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from './_prisma'

type Data = {
  clients: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { headers } = req
  const { authorization } = headers
  const token = authorization?.split(' ')[1]

  const clients = await prisma.client.findMany()
 
  res.status(200).json({ clients })
}
