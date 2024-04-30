import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'
import { prisma } from '../database/prisma'

export const getAttendeeBadge = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/attendees/:attendeeId/badge',
    {
      schema: {
        params: z.object({
          attendeeId: z.coerce.number().int(),
        }),
        response: {},
      },
    },
    async (request, reply) => {
      const { attendeeId } = request.params

      const attendee = await prisma.attendee.findUnique({
        where: {
          id: attendeeId,
        },
        select: {
          name: true,
          email: true,
          event: {
            select: {
              title: true,
            },
          },
        },
      })

      if (!attendee) {
        throw new Error('Attendee not found')
      }

      return reply.status(200).send({ attendee })
    },
  )
}
