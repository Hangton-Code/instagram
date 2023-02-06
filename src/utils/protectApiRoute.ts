import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Session } from "next-auth";

type handlerType = (
  req: NextApiRequest,
  res: NextApiResponse,
  session: Session
) => Promise<any>;

const ProtectApiRoute =
  (handler: handlerType) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getServerSession(req, res, authOptions);
    if (!session)
      return res.status(401).json({
        error: true,
        message: "Unauthorized",
      });

    await handler(req, res, session);
  };

export default ProtectApiRoute;
