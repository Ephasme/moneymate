import crypto from "crypto";
export const createSalt = (): string => {
  const salt = crypto.createHash("sha256");
  return salt.update(Math.random().toString()).digest("base64");
};
