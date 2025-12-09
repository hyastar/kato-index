import fs from "node:fs";
import path from "node:path";

const outDir = path.resolve("public/badges");
fs.mkdirSync(outDir, { recursive: true });

const FORCE = process.env.BADGE_FORCE === "1";

/**
 * 统一的 Badge 生成函数（与 app/data/badge.ts 保持一致）
 * 用于生成 shields.io badge URL
 * 
 * @param {string} label - Badge 标签文本
 * @param {string} color - Badge 背景颜色（十六进制，不含 #）
 * @param {string} [logo] - 可选的 logo 图标名称（simple-icons 格式）
 * @returns {string} shields.io badge URL
 */
const makeBadge = (label, color, logo) => {
  const q = new URLSearchParams({
    style: "flat-square",
    labelColor: "0b1220",
    cacheSeconds: "86400",
  });

  if (logo) {
    q.set("logo", logo);
    // 不设置 logoColor，让每个 logo 使用自己的原始颜色
  }

  return `https://img.shields.io/badge/${encodeURIComponent(label)}-${encodeURIComponent(color)}?${q.toString()}`;
};

const coreSkills = [
  { name: "C", url: makeBadge("C", "A8B9CC", "c") },
  { name: "C++", url: makeBadge("C++", "00599C", "cplusplus") },
  { name: "Assembly", url: makeBadge("Assembly", "E94E32", "assemblyscript") },
  { name: "Golang", url: makeBadge("Go", "00ADD8", "go") },
  { name: "Python", url: makeBadge("Python", "3776AB", "python") },

  { name: "Embedded Linux", url: makeBadge("Embedded Linux", "FCC624", "linux") },
  { name: "RT-Thread", url: makeBadge("RT-Thread", "3D739E", "c") },
  { name: "FreeRTOS", url: makeBadge("FreeRTOS", "03234B", "c") },

  { name: "STM32", url: makeBadge("STM32", "03234B", "stmicroelectronics") },
  { name: "ESP32", url: makeBadge("ESP32", "E7352C", "espressif") },
  { name: "FPGA",  url: makeBadge("FPGA",  "005696", "intel") },          

  { name: "CAN Bus",   url: makeBadge("CAN Bus",   "F7CE00", "opel") },                
  { name: "Modbus",    url: makeBadge("Modbus",    "3DCD58", "schneiderelectric") }, 
  { name: "MQTT", url: makeBadge("MQTT", "3C5280", "mqtt") },

  { name: "Bluetooth", url: makeBadge("Bluetooth", "0082FC", "bluetooth") },
  { name: "Zigbee", url: makeBadge("Zigbee", "EB8E00", "zigbee") },

  { name: "Qt", url: makeBadge("Qt", "41CD52", "qt") },
  { name: "Nuxt.js", url: makeBadge("Nuxt.js", "00DC82", "nuxt") },

  { name: "Git", url: makeBadge("Git", "F05032", "git") },
  { name: "CMake", url: makeBadge("CMake", "064F8C", "cmake") },
  { name: "KiCad", url: makeBadge("KiCad", "3145A0", "kicad") },
  { name: "OpenCV", url: makeBadge("OpenCV", "5C3EE8", "opencv") },
];

const safeFileName = (name) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const manifest = {};

for (const s of coreSkills) {
  const fileName = `${safeFileName(s.name)}.svg`;
  const filePath = path.join(outDir, fileName);
  manifest[s.name] = `/badges/${fileName}`;

  if (!FORCE && fs.existsSync(filePath)) {
    continue;
  }

  await new Promise((r) => setTimeout(r, 120));

  const res = await fetch(s.url);
  if (!res.ok) {
    console.error("Failed:", s.name, res.status, s.url);
    continue;
  }

  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(filePath, buf);
  console.log(`${FORCE ? "Refreshed" : "Saved"}:`, `/badges/${fileName}`);
}

fs.writeFileSync(
  path.resolve("public/badges/manifest.json"),
  JSON.stringify(manifest, null, 2)
);
console.log("Wrote:", "public/badges/manifest.json");

if (!FORCE) {
  console.log('Tip: 想强制重下覆盖旧 badge（恢复彩色 logo）请运行：BADGE_FORCE=1 pnpm badges:fetch');
}
