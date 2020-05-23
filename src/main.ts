import {ErrorMapper} from "utils/ErrorMapper";
import {creepController, memoryController, populationController} from "./controllers/index";
import {SpawnNames} from "./models/spawns/SpawnNames";

export const loop = ErrorMapper.wrapLoop(() => {

    memoryController.clearDeadCreeps();

    populationController.populateAll();

    creepController.runAll();
});
