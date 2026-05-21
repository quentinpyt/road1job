import { FastifyInstance } from "fastify";
import jwt from "jsonwebtoken";
import { prisma } from "../../../lib/prisma";


// le profile permet de recuperer les infos de l'utilisateur connecté et de les modifier 
// ce serait bien de recuperer dans la partie profile dans le setting si on fait ca 
export default async function profileRoutes(app: FastifyInstance) {
  // Route pour récupérer les informations de l'utilisateur connecté
  app.get("/profile/me", async (request, reply) => {
    try {
      let userId: number | undefined = (request as any).user?.id;

      let token = request.headers.cookie
        ?.split("; ")
        .find((cookie) => cookie.startsWith("token="))
        ?.split("=")[1];
      if (!token && request.headers.authorization?.startsWith("Bearer ")) {
        token = request.headers.authorization.split(" ")[1];
      }  //recupere dans l'en-tête le token soit dans les cookies soit dans l'autorisation Bearer

      console.log("Token reçu :", token);

      if (!userId && token) {
        try {
          const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET || "dev_secret"
          ) as { id: number };
          userId = Number(decoded.id); // pour s'assure que l'id est un nombre 
          console.log("ID décodé :", userId);
        } catch (e) {
          console.log("Erreur de décodage du token :", e);
        }
      }

      if (!userId) {
        return reply.status(401).send({
          success: false,
          message: "Non authentifié",
        });
      }

      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          name: true,
          surname: true,
          age: true,
          address: true,
          Schools: true,
          Projects: true,
          Technologies: true,
          Skills: true,
          createdAt: true,
        },
      });

      if (!user) {
        return reply.status(404).send({
          success: false,
          message: "Utilisateur introuvable",
        });
      }
      return reply.send({
        success: true,
        user,
      });
    } catch {
      return reply.status(401).send({
        success: false,
        message: "Token invalide",
      });
    }
  });
  
  // Route pour mettre à jour les informations de l'utilisateur connecté
  app.put("/profile/me", async (request, reply) => {
    try {
      let userId: number | undefined = (request as any).user?.id;

      let token = request.headers.cookie
        ?.split("; ")
        .find((cookie) => cookie.startsWith("token="))
        ?.split("=")[1];
      if (!token && request.headers.authorization?.startsWith("Bearer ")) {
        token = request.headers.authorization.split(" ")[1];
      }

      console.log("Token reçu :", token);

      if (!userId && token) {
        try {
          const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET || "dev_secret"
          ) as { id: number };
          userId = Number(decoded.id);
          console.log("ID décodé :", userId);
        } catch (e) {
          console.log("Erreur de décodage du token :", e);
        }
      }

      if (!userId) {
        return reply.status(401).send({
          success: false,
          message: "Non authentifié",
        });
      }

      const { name, surname, age, address } = request.body as {
        name?: string;
        surname?: string;
        age?: number;
        address?: string;
      };

      const updateData: any = {};
      if (name) updateData.name = name;
      if (surname) updateData.surname = surname;
      if (age) updateData.age = age;
      if (address) updateData.address = address;

      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: updateData,
        select: {
          id: true,
          email: true,
          name: true,
          surname: true,
          age: true,
          address: true,
          Schools: true,
          Projects: true,
          Technologies: true,
          Skills: true,
          createdAt: true,
        },
      });

      return reply.send({
        success: true,
        user: updatedUser,
      });
    } catch (e: any) {
      console.log("Erreur de mise à jour de l'utilisateur :", e.message);
      return reply.status(500).send({
        success: false,
        message: "Erreur lors de la mise à jour de l'utilisateur",
      });
    }
  });     
}