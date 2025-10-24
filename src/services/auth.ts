import * as SecureStore from "expo-secure-store";

export async function setToken(token: string) {
  await SecureStore.setItemAsync("jwtToken", token);
}

export async function clearToken() {
  await SecureStore.deleteItemAsync("jwtToken");
}

export async function getToken() {
  return await SecureStore.getItemAsync("jwtToken");
}
