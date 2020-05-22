import {Roles} from "../models/creeps/Roles";
import {Skills} from "../models/creeps/Skills";

export class CreepBuilder {
  build(spawn: StructureSpawn, role: Roles, skills: Skills[]): ScreepsReturnCode {

    return spawn.spawnCreep(skills, generateName(role), {
      memory: { role, working: false },
    });
  }
}

function generateName(role: Roles) : string {
  return role + Game.time;
}
