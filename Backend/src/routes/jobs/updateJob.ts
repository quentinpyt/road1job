import { prisma } from "../../../lib/prisma";
import { FastifyInstance } from 'fastify'

export default async function updateJob(app: FastifyInstance) {
    app.put("/jobs/:id", async (request, reply) => {
        try {
            const { id } = request.params as { id: string };
            const { title, description } = request.body as { title: string; description: string };

            const updateData: any = {
                title,
                description,
            };

            const updatedJob = await prisma.job.update({
                where: {
                    id: Number(id),
                },
                data: updateData,
            });

            return reply.send({
                success: true,
                job: updatedJob,
            });
        } catch (e: any) {
            console.log("Job update error:", e.message);

        return reply.status(500).send({
            success: false,
            error: "Failed to update job",
        });
        }
    });
}
