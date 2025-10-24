export async function authenticateUser(
  username: string,
  password: string
): Promise<boolean> {
  // Simulate backend login logic
  return new Promise((resolve) => {
    setTimeout(() => {
      if (username === "admin" && password === "1234") {
        resolve(true);
      } else {
        resolve(false);
      }
    }, 1000);
  });
}
