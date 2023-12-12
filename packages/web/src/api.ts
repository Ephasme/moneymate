import { makeApi } from "@moneymate/api";
import { useStore } from "./store";

export const TOKEN_KEY = "@moneymate/app-token";

export const api = makeApi(() => {
  const token = useStore.getState().token;
  return Promise.resolve(token ?? null);
});
