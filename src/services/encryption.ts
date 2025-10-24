import CryptoJS from "crypto-js";

// Use the same secret key that your Angular or .NET backend uses
const SECRET_KEY = "your-secret-key"; // replace with the actual key

export function encrypt(text: string): string {
  return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
}

export function decrypt(cipher: string): string {
  const bytes = CryptoJS.AES.decrypt(cipher, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
}
