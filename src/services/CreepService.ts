import {Roles} from "../models/creeps/Roles";

export default class CreepService {

    isFull(creep: Creep, resource: ResourceConstant): boolean {
        return creep.store[resource] >= creep.store.getCapacity()
    }
    isEmpty(creep: Creep, resource: ResourceConstant): boolean {
        return creep.store[resource] === 0
    }

    getRole(creep: Creep): Roles {
        return creep.memory.role as Roles;
    }

    getAll() {
        return Object.keys(Game.creeps).map(name => {
            return Game.creeps[name];
        });
    }

    getAllByRole(role: Roles): Creep[] {

        return Object.keys(Game.creeps).filter(name => {
            return this.getRole(Game.creeps[name]) === role;
        }).map(name => {
            return Game.creeps[name];
        });
    }
}
