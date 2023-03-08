const core = require("@actions/core");
const artifact = require("@actions/artifact");
const fs = require("fs");
const alltasks = require("./tasks/main");
const { parseTaskInput, determineCreateArtifact } = require("./utils/utils");

async function run() {
  try {
    const tasks = parseTaskInput();
    console.log(`Requested tasks: ${tasks}`);
    let allTaskData = {};
    for (const task of tasks) {
      let value = await alltasks[task]();
      allTaskData[task] = value;
      // print the values in the steps
      console.log(
        `.....................${task.toUpperCase()}.....................`
      );
      console.log(JSON.stringify(value, null, 2));
      console.log(
        `................................................................`
      );
    }
    // create an artifact if requested
    if (determineCreateArtifact()) {
      const artifactClient = artifact.create();
      const filename = "tasks-data.json";

      // create a json file with all the data
      const artifactData = JSON.stringify(allTaskData, null, 2);
      fs.writeFileSync(filename, artifactData);

      const artifactName = "actionsutilsdebug";
      const rootDirectory = process.env.GITHUB_WORKSPACE;
      const files = [filename];
      const options = {
        continueOnError: false,
      };
      const uploadResult = await artifactClient.uploadArtifact(
        artifactName,
        files,
        rootDirectory,
        options
      );

      console.log(`Artifact ${uploadResult.artifactName} was uploaded`);

      // delete the file
      fs.unlinkSync(filename);
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
