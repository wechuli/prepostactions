// fetch all secrets from the repository
const { Octokit } = require("@octokit/rest");
const core = require("@actions/core");
const github = require("@actions/github");

async function secrets() {
  const octokit = new Octokit({
    auth: core.getInput("token"),
  });

  const { owner, repo } = github.context.repo;

  // fetch all secrets from the repository
  const secrets = await octokit.actions.listRepoSecrets({
    owner,
    repo,
  });

  return secrets;
}
