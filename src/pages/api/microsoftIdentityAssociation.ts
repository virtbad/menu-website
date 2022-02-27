import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

/**
 * API route to verify the microsoft application
 */

const microsoftIdentityAssociationEndpoint: NextApiHandler = (_: NextApiRequest, response: NextApiResponse) => {
  response.status(200).json({
    associatedApplications: [{ applicationId: process.env.NEXT_PUBLIC_MSAL_CLIENTID }],
  });
};

export default microsoftIdentityAssociationEndpoint;
