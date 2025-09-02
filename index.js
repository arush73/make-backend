#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const args = process.argv.slice(2);
const projectName = args[0] || "my-app";
const targetPath = path.join(process.cwd(), projectName);

const boilerplatePath = path.join(__dirname, "boilerplate");

fs.cpSync(boilerplatePath, targetPath, { recursive: true });

console.log(`✅ Project ${projectName} created`);
console.log("\n\n\n\n");

try {
  execSync(`cd ${projectName}`, { stdio: "inherit" });
  execSync("git init", { stdio: "inherit" });
  execSync("git add .", { stdio: "inherit" });
  execSync('git commit -m "Initial commit -- basic server setup"', {
    stdio: "inherit",
  });
  console.log("✅ Git repo initialized and first commit made");
} catch (err) {
  console.error("❌ Git initialization failed:", err.message);
}

console.log(`cd ${projectName}`);
console.log("npm install");
console.log("npm run dev ");
console.log("\n🚀 Happy coding!");
