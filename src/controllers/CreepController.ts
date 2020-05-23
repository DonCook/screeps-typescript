import {harvesterRole, upgraderRole} from "../roles/index";
import {Roles} from "../models/creeps/Roles";
import {SpawnNames} from "../models/spawns/SpawnNames";
import {creepService} from "../services/index";
import CreepRoleInterface from "../roles/CreepRoleInterface";

const POPULATION: {[role: string]: number} = {
    [Roles.HARVESTER_ROLE]: 8,
    [Roles.UPGRADER_ROLE]: 5,
};

export class CreepController {

    private roles: CreepRoleInterface[] = [
        harvesterRole,
        upgraderRole,
    ];

    clearMemory(): void {
        // Automatically delete memory of missing creeps
        for (const name in Memory.creeps) {
            if (!(name in Game.creeps)) {
                delete Memory.creeps[name];
            }
        }
    }

    populate(): void {

        function populateRole(creepRole: CreepRoleInterface, replacements?: CreepRoleInterface[]) {
            if (creepService.getAllByRole(creepRole.getRole()).length < POPULATION[creepRole.getRole()]) {
                if (
                    creepRole.create(Game.spawns[SpawnNames.SPAWN1]) === ERR_NOT_ENOUGH_RESOURCES
                    && replacements && replacements.length
                ) {
                    for (const replacement of replacements) {
                        const creepReplacement = creepService.getAllByRole(replacement.getRole())[0];

                        if (creepReplacement) creepReplacement.memory.role = creepRole.getRole();
                    }
                }
            }
        }

        populateRole(harvesterRole, [upgraderRole]);
        populateRole(upgraderRole);
    }

    runAll(): void {
        creepService.getAll().forEach(creep => {

            for (const creepRole of this.roles) {
                if (creepService.getRole(creep) === creepRole.getRole()) creepRole.run(creep);
            }
        });
    }
}
