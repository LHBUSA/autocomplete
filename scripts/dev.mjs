import { spawn } from "node:child_process";

const args = process.argv.slice(2);
let host = "0.0.0.0";
let port = "3000";
const previewMode = args.includes("--strictPort");

for (let index = 0; index < args.length; index += 1) {
  if ((args[index] === "--host" || args[index] === "-H") && args[index + 1]) {
    host = args[index + 1];
    index += 1;
  } else if ((args[index] === "--port" || args[index] === "-p") && args[index + 1]) {
    port = args[index + 1];
    index += 1;
  }
}

const child = spawn(
  process.execPath,
  ["node_modules/next/dist/bin/next", previewMode ? "start" : "dev", "-H", host, "-p", port],
  { stdio: "inherit" },
);

child.on("exit", (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  process.exit(code ?? 1);
});
