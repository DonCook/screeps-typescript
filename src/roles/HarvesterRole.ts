import {Roles} from "../models/creeps/Roles";
import {Skills} from "../models/creeps/Skills";
import {creepService} from "../services/index";
import CreepRole from "./CreepRole";
import CreepRoleInterface from "./CreepRoleInterface";

export class HarvesterRole extends CreepRole implements CreepRoleInterface {

    role = Roles.HARVESTER_ROLE;
    skills = [
        Skills.MOVE,
        Skills.MOVE,
        Skills.WORK,
        Skills.CARRY,
        Skills.CARRY,
    ];

    run(creep: Creep) {

        if (!creepService.isFull(creep, RESOURCE_ENERGY)) {

            const source = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);

            creepService.tasks.harvest(creep, source);
        } else {

            const storage = creep.pos.findClosestByRange(FIND_MY_SPAWNS);

            creepService.tasks.deliver(creep, storage, RESOURCE_ENERGY);
        }
    }
}
