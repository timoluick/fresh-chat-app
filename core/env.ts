// needed env vars
// possiblity to declare defaults
const env = {
  MONGO_URL: Deno.env.get("MONGO_URL"),
  MONGO_ROOT_USER: Deno.env.get("MONGO_ROOT_USER"),
  MONGO_ROOT_PASSWORD: Deno.env.get("MONGO_ROOT_PASSWORD"),
  MONGO_PORT: Deno.env.get("MONGO_PORT"),
};

// check if all env vars are loaded
const everyEnvVariableFilled = Object.values(env).every(
  (v) => v !== null && v !== undefined && v !== "" && !Number.isNaN(v),
);

// throw error if env vars are missing
if (!everyEnvVariableFilled) {
  console.error(
    `Not all env variables are correctly compiled, please check that each env variable has a value.`,
  );
  Deno.exit(1);
}

export default env;
