import {Roles} from "../models/creeps/Roles";
import {Skills} from "../models/creeps/Skills";
import RoleTask from "./RoleTask";
import {creepService} from "../services/index";
import CreepRole from "./CreepRole";
import CreepRoleInterface from "./CreepRoleInterface";

export class HarvesterRole extends CreepRole implements CreepRoleInterface {

    role = Roles.HARVESTER_ROLE;
    tasks = {
        harvest: new RoleTask("harvest", "🛺"),
        deliver: new RoleTask("deliver", "📦"),
    };
    skills = [
        Skills.MOVE,
        Skills.MOVE,
        Skills.WORK,
        Skills.CARRY,
        Skills.CARRY,
    ];

    run(creep: Creep) {

        if (!creepService.isFull(creep, RESOURCE_ENERGY)) {

            this.setTask(creep, this.tasks.harvest);

            const target = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);

            if (target) {
                if (creep.harvest(target) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
        } else {

            this.setTask(creep, this.tasks.deliver);

            const storage = creep.pos.findClosestByRange(FIND_MY_SPAWNS);

            if (storage && creep.transfer(storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(storage);
            }
        }
    }
}
