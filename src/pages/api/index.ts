import { readFileSync } from "fs";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const startedRuntime: number = Date.now();

/**
 * API route to get the current version of the website
 */

const versionEndpoint: NextApiHandler = (request: NextApiRequest, response: NextApiResponse) => {
  const packageJson: Buffer = readFileSync(process.cwd() + "/package.json");
  const json: { [key: string]: any } = JSON.parse(packageJson.toString());

  response.status(200).json({
    version: json.version,
    description: json.description,
    onlineSince: startedRuntime,
  });
};

export default versionEndpoint;
