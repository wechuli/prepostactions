const { execSync } = require("child_process");
// check node version
console.log(process.version);
execSync('echo "Yarn version: `yarn --version`"', { stdio: "inherit" });
execSync(`yarn --cwd "${__dirname}/../" install --prod  --non-interactive --no-progress`, { stdio: "inherit" });
execSync(`yarn --cwd "${__dirname}/../" list --depth=0 --prod --non-interactive --no-progress`, { stdio: "inherit" });
