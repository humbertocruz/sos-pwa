// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from './_prisma'
import Auth from './_token'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { headers, method } = req
  const { authorization } = headers
  const token = authorization?.split(' ')[1]
  const { getUser } = Auth()
  const user = await getUser(token?token:'')

  switch (method) {
    case 'GET':
      try {
        const programs = await prisma.program.findMany({
          orderBy: {
            name: 'asc'
          }
        })
        res.status(200).json({ programs })
      } catch (error) {
        res.status(500).json({ error })
      }
      break
    case 'POST':
      try {
        const { name } = req.body
        const program = await prisma.program.create({
          data: {
            name,
            client: {
              connect: {
                id: user?.clientId
              }
            }
          }
        })
        res.status(200).json({ program })
      }
      catch (error) {
        console.log(error)
        res.status(500).json({ error })
      }
      break
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
      break
  }
}
