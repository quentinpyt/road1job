import { prisma } from "../../../lib/prisma";
import { FastifyInstance } from 'fastify'


export default async function getJob(app: FastifyInstance) {
    app.get("/jobs/:id", async (request, reply) => {
        try {
            const { id } = request.params as { id: string };

            const job = await prisma.job.findUnique({
                where: {
                    id: Number(id),
                },
                include: {
                    salary: true,
                    skills: true,
                    geolocation: true,
                    analytics: true,
                },
            });

            if (!job) {
                return reply.status(404).send({
                    success: false,
                    message: "Job not found",
                });
            }

            return reply.send({
                success: true,
                job,
            });
        } catch (e: any) {
            console.log("Job detail error:", e.message);

        return reply.status(500).send({
            success: false,
            error: "Failed to retrieve job",
        });
        }
    });

    app.post("/jobs", async (request, reply) => {
        try {
            const { title, description } = request.body as { title: string; description: string };

            const createData: any = {
                title,
                description,
            };

            const newJob = await prisma.job.create({
                data: createData,
            });

            return reply.send({
                success: true,
                job: newJob,
            });
        } catch (e: any) {
            console.log("Job creation error:", e.message);

        return reply.status(500).send({
            success: false,
            error: "Failed to create job",
        });
        }
    });
    
    
}