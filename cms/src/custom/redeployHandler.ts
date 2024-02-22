import { PayloadHandler } from "payload/config";
import { checkRole } from "../collections/Users/access/checkRole";

const RedeployHandler: PayloadHandler = async (req, res) => {
  const canAccess = checkRole(["admin", "editor"], req.user);

  if (!canAccess) {
    return res.status(403).send();
  }

  const circleciRes = await fetch(
    `https://internal.circleci.com/private/soc/e/394cec55-80aa-4ecf-a7ba-175a0132e46b?secret=${process.env.CIRCLECI_REDEPLOY_SECRET}`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
    }
  );

  res.status(circleciRes.ok ? circleciRes.status : 500).send();
};

export default RedeployHandler;
