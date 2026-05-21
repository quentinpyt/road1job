import { prisma } from "../../../lib/prisma";
import { FastifyInstance } from 'fastify'

export default async function getAllJob(app: FastifyInstance) {
  app.get("/getalljob", async (request, reply) => {
    try {
      const jobs = await prisma.job.findMany({
        take: 12,
        include: {
          salary: true,
          skills: true,
          geolocation: true,
      }});
      return reply.send(jobs);
    } catch (e: any) {
      console.log("error get " + e.message);
      return reply.status(500).send({
        error: "Failed to retrieve jobs",
      });
    }
  });

  
}