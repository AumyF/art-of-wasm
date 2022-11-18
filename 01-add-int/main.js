import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const wasmPath = path.join(path.dirname(fileURLToPath(import.meta.url)), "AddInt.wasm");
const bytes = await fs.readFile(wasmPath);
const [value_1, value_2] = process.argv
  .slice(2, 4)
  .map((arg) => Number.parseInt(arg));

const obj = await WebAssembly.instantiate(new Uint8Array(bytes));
const result = obj.instance.exports.AddInt(value_1, value_2);
console.log(`${value_1} + ${value_2} = ${result}`);
