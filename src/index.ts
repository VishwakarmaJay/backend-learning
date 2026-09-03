// const start = Date.now();

// setTimeout(() => {
//   console.log("timer fired at", Date.now() - start, "ms");   // I asked for 100ms
// }, 100);

// // pure CPU — no I/O, nothing to hand off to the "kitchen"
// const until = Date.now() + 2000;
// while (Date.now() < until) {}                                  // busy-wait ~2s

// console.log("sync loop done at", Date.now() - start, "ms");

// import fs from "fs";

// const buffer = Buffer.from("Hi");
// console.log(buffer);
// console.log(buffer.length);
// console.log(buffer.toString());


import fs from "fs";
import { once } from "node:events";

const getMemoryUsage = () => {
  const memory = process.memoryUsage();

  return `Heap: ${(memory.heapUsed / 1024 / 1024).toFixed(2)} MB | ` +
         `RSS: ${(memory.rss / 1024 / 1024).toFixed(2)} MB`;
};

const bigLine = `${"x".repeat(1000)}\n`;

const writer = fs.createWriteStream("output.txt");

async function writeAll() {
  console.log(`Before writing: ${getMemoryUsage()}`);

  for (let i = 0; i < 200000; i++) {
    const ok = writer.write(bigLine);

    if (!ok) {
      await once(writer, "drain");
    }
  }

  console.log(`RSS after fixed loop: ${getMemoryUsage()}`);

  writer.end();

  await once(writer, "finish");

  console.log("All writes are now complete.");
  console.log(`After writing completed: ${getMemoryUsage()}`);
}

async function readAll() {
  const reader = fs.createReadStream("output.txt");

  reader.on("data", (chunk) => {
    // Avoid console.log here for every chunk.
  });

  await once(reader, "end");

  console.log("No more data to read.");
  console.log(`After reading: ${getMemoryUsage()}`);
}

async function main() {
  try {
    await writeAll();
    await readAll();
  } catch (err) {
    console.error(err);
  }
}

main();