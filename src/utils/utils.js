const core = require("@actions/core");
const allTasks = require("../tasks/main");

function parseTaskInput() {
  const input = core.getInput("tasks") || "context";
  //
  let tasksArray = input.split(",").map((task) => task.trim());
  // validate that we support all the tasks
  for (const task of tasksArray) {
    if (!allTasks[task]) {
      throw new Error(
        `Unsupported task: ${task}, only the following tasks are supported: ${Object.keys(
          allTasks
        ).join(", ")}`
      );
    }
  }
  return tasksArray;
}

function determineCreateArtifact() {
  const input = core.getInput("create-artifact") || "false";
  return input === "true";
}

module.exports = {
  parseTaskInput,
  determineCreateArtifact,
};
