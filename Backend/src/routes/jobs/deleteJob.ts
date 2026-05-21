import { prisma } from "../../../lib/prisma";
import { FastifyInstance } from 'fastify'

export default async function jobRoutes(app: FastifyInstance) {
    app.delete("/jobs/:id", async (request, reply) => {
        try {
            const { id } = request.params as { id: string };

            await prisma.job.delete({
                where: {
                    id: Number(id),
                },
            });

            return reply.send({
                success: true,
                message: "Job deleted successfully",
            });
        } catch (e: any) {
            console.log("Job deletion error:", e.message);

        return reply.status(500).send({
            success: false,
            error: "Failed to delete job",
        });
        }
    });
} 