import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { FastifyReply, FastifyRequest } from "fastify";
import { createUser, findUserByEmail, type AuthUserInput } from "../../models/auth/auth.model";

type LoginBody = {
  email: string;
  password: string;
};

type GoogleUser = {
  id: number;
  name: string | null;
  surname: string | null;
};

function buildAuthToken(user: GoogleUser) {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      surname: user.surname,
    },
    process.env.JWT_SECRET || "dev_secret",
    { expiresIn: "2h" },
  );
}

export async function loginController(
  request: FastifyRequest<{ Body: LoginBody }>,
  reply: FastifyReply,
) {
  const { email, password } = request.body;

  try {
    const user = await findUserByEmail(email);

    if (!user) {
      return reply.status(404).send({
        message: "Not have this user, you must register first!!",
      });
    }

    const verifiedPassword = bcrypt.compareSync(password, user.passwordhash);

    if (!verifiedPassword) {
      return reply.status(401).send({
        message: "Incorrect Password",
      });
    }

    await request.logIn(user);

    const token = buildAuthToken(user);

    reply.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 60 * 60 * 2,
      path: "/",
    });

    return reply.send({
      token,
      messageConnect: "Welcome !!!",
    });
  } catch (error: any) {
    console.log("error get " + error.message);

    return reply.status(401).send({
      error: "Login failed",
    });
  }
}

export async function registerController(
  request: FastifyRequest<{ Body: AuthUserInput }>,
  reply: FastifyReply,
) {
  const { firstname, name, email, password } = request.body;

  try {
    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      return reply.status(409).send({
        message: "You have already created an account",
      });
    }

    const hash = bcrypt.hashSync(password, 8);

    const user = await createUser({
      email,
      passwordhash: hash,
      name: name as string,
      surname: firstname as string,
    });

    const jwtToken = buildAuthToken(user);

    return reply.send({
      messageConnect: "Inscription is correct! Go check your mail now",
      token: jwtToken,
    });
  } catch (error: any) {
    console.log("Registration error:", error.message);

    return reply.status(500).send({
      error: "Registration failed",
    });
  }
}

export async function logoutController(_request: FastifyRequest, reply: FastifyReply) {
  reply.clearCookie("token");

  return reply.send({
    success: true,
    message: "Logged out",
  });
}

export async function googleCallbackController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const user = request.user as GoogleUser | undefined;

  if (!user) {
    return reply.redirect(`${process.env.FRONTEND_URL}?error=google_auth_failed`);
  }

  const token = buildAuthToken(user);

  return reply.redirect(`${process.env.FRONTEND_URL}/?token=${token}`);
}