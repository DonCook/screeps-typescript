import {harvesterRole, upgraderRole} from "../roles/index";
import {Roles} from "../models/creeps/Roles";
import {SpawnNames} from "../models/spawns/SpawnNames";
import {creepService} from "../services/index";
import CreepRole from "../roles/CreepRole";

const POPULATION: {[role: string]: number} = {
    [Roles.HARVESTER_ROLE]: 1,
    [Roles.UPGRADER_ROLE]: 3,
};

export class CreepController {

    clearMemory(): void {
        // Automatically delete memory of missing creeps
        for (const name in Memory.creeps) {
            if (!(name in Game.creeps)) {
                delete Memory.creeps[name];
            }
        }
    }

    populate(): void {

        function populateRole(role: Roles, creepRole: CreepRole) {
            if (creepService.getAllByRole(role).length < POPULATION[role]) {
                creepRole.create(Game.spawns[SpawnNames.SPAWN1]);
            }
        }

        populateRole(Roles.HARVESTER_ROLE, harvesterRole);
        populateRole(Roles.UPGRADER_ROLE, upgraderRole);
    }

    runAll(): void {
        creepService.getAll().forEach(creep => {

            if (creepService.getRole(creep) === Roles.HARVESTER_ROLE) harvesterRole.run(creep);
            else if (creepService.getRole(creep) === Roles.UPGRADER_ROLE) upgraderRole.run(creep);
        });
    }
}
