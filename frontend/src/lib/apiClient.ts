import { env } from "../config/env";

type HealthResponse = {
  status: "ok";
};

export async function getHealth(): Promise<HealthResponse> {
  const response = await fetch(`${env.apiBaseUrl}/health`);

  if (!response.ok) {
    throw new Error("Backend health check failed");
  }

  return response.json() as Promise<HealthResponse>;
}
