import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const bytes = await fs.readFile(
  path.join(path.dirname(fileURLToPath(import.meta.url)), "module.wasm")
);

let hello_world = null;
const start_string_index = 100;
const memory = new WebAssembly.Memory({ initial: 1 });

const importObject = {
  env: {
    buffer: memory,
    start_string: start_string_index,
    print_string: (str_len) => {
      const bytes = new Uint8Array(memory.buffer, start_string_index, str_len);
      const decodedString = new TextDecoder("utf8").decode(bytes);
      console.log(decodedString);
    },
  },
};

const obj = await WebAssembly.instantiate(new Uint8Array(bytes), importObject);
({ hello_world } = obj.instance.exports);
hello_world();
