import CreepRole from "./CreepRole";
import CreepRoleInterface from "./CreepRoleInterface";
import {creepService} from "../services/index";
import {Roles} from "../models/creeps/Roles";

export default class BuilderRole extends CreepRole implements CreepRoleInterface {

    role = Roles.BUILDER_ROLE;

    run(creep: Creep): void {

        if (creepService.isEmpty(creep, RESOURCE_ENERGY)) {
            const storage = creep.pos.findClosestByRange(FIND_MY_SPAWNS);

            creepService.tasks.collect(creep, storage, RESOURCE_ENERGY);
        } else {

            creepService.tasks.build(creep, creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES));
        }
    }
}
