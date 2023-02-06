import crypto from "crypto";

function generateRandomString(length: number) {
  // x bytes will be 2x characters of hex.
  return crypto.randomBytes(length / 2).toString("hex");
}

export default generateRandomString;
