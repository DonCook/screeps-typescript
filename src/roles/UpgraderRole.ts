import {Roles} from "../models/creeps/Roles";
import {Skills} from "../models/creeps/Skills";
import {creepService} from "../services/index";
import CreepRole from "./CreepRole";
import RoleTask from "./RoleTask";

export default class UpgraderRole extends CreepRole {

    role = Roles.UPGRADER_ROLE;
    skills = [
        Skills.MOVE,
        Skills.MOVE,
        Skills.WORK,
        Skills.CARRY,
        Skills.CARRY,
    ];
    tasks = {
        "collect": new RoleTask("collect", "🚴‍"),
        "upgrade": new RoleTask("upgrade", "✨"),
    };

    run(creep: Creep): void {

        if (!creepService.isEmpty(creep, RESOURCE_ENERGY)) {

            this.setTask(creep, this.tasks.upgrade);

            if(creep.room.controller) {
                if(creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
            }
        } else {

            this.setTask(creep, this.tasks.collect);

            const storage = creep.pos.findClosestByRange(FIND_MY_SPAWNS);

            if (storage) {
                if (creep.withdraw(storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(storage);
                }
            }
        }
    }
}
