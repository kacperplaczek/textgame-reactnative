import chalk from "chalk";

const iconMap: Record<string, string> = {
  "{x}": chalk.red("❌"),
  "{v}": chalk.green("✅"),
  "{i}": chalk.blue("ℹ️"),
  "{!}": chalk.yellow("⚠️"),
  "{bug}": chalk.magenta("🐞"),
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
