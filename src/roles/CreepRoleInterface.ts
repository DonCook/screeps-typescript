import {Roles} from "../models/creeps/Roles";

export default interface CreepRoleInterface {

    getRole(): Roles
    create(spawn: StructureSpawn): ScreepsReturnCode
    run(creep: Creep): void
}
