import crypto from "crypto";

export const encryptPassword = (password: string, salt: string) => {
  const sha1 = crypto.createHash("sha1");
  return sha1.update(salt).update(password).digest("base64");
};
