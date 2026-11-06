import { createServerClient } from "@quranjs/api/server";

const id = process.env.QF_CLIENT_ID;
const secret = process.env.QF_CLIENT_SECRET;
if (!id || !secret) throw new Error("Missing QF_CLIENT_ID or QF_CLIENT_SECRET server environment variables");
const prelive = (process.env.QF_ENV ?? "prelive") !== "production";
export const qf = createServerClient({
  clientId: id, clientSecret: secret, contentScopeMode: "granular",
  services: prelive ? { gatewayUrl: "https://apis-prelive.quran.foundation", oauth2BaseUrl: "https://prelive-oauth2.quran.foundation" } : undefined,
});
