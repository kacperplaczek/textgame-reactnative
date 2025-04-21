// lib/utils/logger.ts

const iconMap: Record<string, string> = {
  "{x}": "❌",
  "{v}": "✅",
  "{i}": "ℹ️",
  "{!}": "⚠️",
  "{bug}": "🐞",
};

export const getLogger = (...args: any[]) => {
  const parsedArgs = args.map((arg) => {
    if (typeof arg === "string") {
      return Object.entries(iconMap).reduce(
        (acc, [key, val]) => acc.split(key).join(val),
        arg
      );
    }
    return arg;
  });

  console.log(...parsedArgs);
};
