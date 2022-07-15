import auth0 from "../auth0";
import {v4 as uuidv4} from 'uuid'
import { prisma } from "./../prisma";

export const context = async ({ req, res }) => {
  try {
    // const { user: auth0User } = await auth0.getSession(req, res);
    let user = await prisma.user.findUnique({
      where: { auth0: auth0User.sub },
    });
    if (!user) {
      const { image, nickname, sub } = auth0User;
      user = await prisma.user.create({
        data: { id: uuidv4(), auth0: sub, image, nickname },
      });
    }
    return { user, prisma };
  } catch (e) {
    return { user: {}, prisma };
  }
};
