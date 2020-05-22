import { ErrorMapper } from "utils/ErrorMapper";
import {creepController} from "./controllers/index";

export const loop = ErrorMapper.wrapLoop(() => {
  console.log(`Current game tick is ${Game.time}`);

  creepController.clearMemory();

  creepController.populate();

  creepController.runAll();
});
