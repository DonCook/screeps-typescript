import RoleTask from "./RoleTask";
import {Skills} from "../models/creeps/Skills";
import {Roles} from "../models/creeps/Roles";
import {creepBuilder} from "../builders/index";

export default abstract class CreepRole {

    protected role: Roles = Roles.NONE;
    protected skills: Skills[] = [];
    protected tasks: {[taskName: string]: RoleTask} = {};

    public getRole(): Roles {
        return this.role;
    }

    public create(spawn: StructureSpawn): ScreepsReturnCode {

        console.log("Create a new Creep", {spawn, role: this.role, skills: this.skills});

        return creepBuilder.build(spawn, this.role, this.skills);
    }

    protected setTask(creep: Creep, task: RoleTask): void {
        if (creep.memory.task !== task.name) {
            creep.say(`${task.name.charAt(0).toUpperCase() + task.name.slice(1)} ${task.icon} !`);
            creep.memory.task = task.name;
        }
    }
}
