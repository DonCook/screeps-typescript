import {ErrorMapper} from "utils/ErrorMapper";
import {creepController, memoryController} from "./controllers/index";

export const loop = ErrorMapper.wrapLoop(() => {

    console.log(`Current game tick is ${Game.time}`);

    memoryController.clearDeadCreeps();

    creepController.populate();

    creepController.runAll();
});
