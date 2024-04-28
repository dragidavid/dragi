// keep this and modify it to your needs
// original: https://www.unkey.com/blog/uuid-ux
// import { customAlphabet } from "nanoid";
// export const nanoid = customAlphabet(
//   "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz",
// );

// const prefixes = {
//   key: "key",
//   api: "api",
//   policy: "pol",
//   request: "req",
//   workspace: "ws",
//   keyAuth: "key_auth", // <-- this is internal and does not need to be short or pretty
//   vercelBinding: "vb",
//   test: "test", // <-- for tests only
// } as const;

// export function newId(prefix: keyof typeof prefixes): string {
//   return [prefixes[prefix], nanoid(16)].join("_");
// }
