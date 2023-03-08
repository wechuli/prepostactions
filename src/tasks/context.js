const core = require("@actions/core");
const github = require("@actions/github");

async function context() {
  return github.context;
}

module.exports = {
  context,
};
