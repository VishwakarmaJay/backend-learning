import jwt from "jsonwebtoken";
import { env } from "./config/env";

const token = jwt.sign({ id: 1 }, env.JWT_SECRET, { expiresIn: "7d" });
const [header, payload, signature] = token.split(".");

console.log("HEADER :", JSON.parse(Buffer.from(header, "base64url").toString()));
console.log("PAYLOAD:", JSON.parse(Buffer.from(payload, "base64url").toString()));
console.log("SIG    :", signature);

const forged = header + "." + Buffer.from(JSON.stringify({ id: 1 })).toString("base64url") + "." + signature;
try { jwt.verify(forged, env.JWT_SECRET); console.log("forged: ACCEPTED ❌"); }
catch (e: any) { console.log("forged: REJECTED ✅ —", e.message); }