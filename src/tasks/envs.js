async function logEnvs() {
  let allEnvs = process.env;
  return allEnvs;
}

module.exports = {
  envs: logEnvs,
};
