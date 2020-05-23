import {Roles} from "../models/creeps/Roles";
import {Skills} from "../models/creeps/Skills";
import {creepService} from "../services/index";
import CreepRole from "./CreepRole";
import CreepRoleInterface from "./CreepRoleInterface";

export default class UpgraderRole extends CreepRole implements CreepRoleInterface {

    role = Roles.UPGRADER_ROLE;
    skills = [
        Skills.MOVE,
        Skills.MOVE,
        Skills.WORK,
        Skills.CARRY,
        Skills.CARRY,
    ];

    run(creep: Creep): void {

        if (!creepService.isEmpty(creep, RESOURCE_ENERGY)) {

            creepService.tasks.upgrade(creep, creep.room.controller);

        } else {

            const storage = creep.pos.findClosestByRange(FIND_MY_SPAWNS);

            creepService.tasks.collect(creep, storage, RESOURCE_ENERGY);
        }
    }
}
