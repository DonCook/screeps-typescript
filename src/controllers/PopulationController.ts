import {builderRole, harvesterRole, upgraderRole} from "../roles";
import CreepRoleInterface from "../roles/CreepRoleInterface";
import {creepService, roomService} from "../services/index";

export default class PopulationController {

    private POPULATION: {[role: string]: number} = {
        [harvesterRole.getRole()]: 7,
        [upgraderRole.getRole()]: 5,
        [builderRole.getRole()]: 2,
    };

    private populateRole(spawn: StructureSpawn, creepRole: CreepRoleInterface, replacements: CreepRoleInterface[] = []) {
        if (creepService.getAllByRole(creepRole.getRole()).length < this.POPULATION[creepRole.getRole()]) {
            if (
                creepRole.create(spawn) === ERR_NOT_ENOUGH_RESOURCES
                && replacements.length
            ) {
                for (const replacement of replacements) {
                    const creepReplacement = creepService.getAllByRole(replacement.getRole())[0];

                    if (creepReplacement) creepRole.assimilateCreep(creepReplacement);
                }
            }
        }
    }

    private runSpawn(spawn: StructureSpawn, sites: ConstructionSite[]): void {

        this.populateRole(spawn, harvesterRole, [builderRole, upgraderRole]);
        this.populateRole(spawn, upgraderRole);

        if (sites.length) {
            this.populateRole(spawn, builderRole);
        }
    }

    public populateAll(): void {

        const rooms = roomService.getAll();

        rooms.forEach(room => {

            const spawns = roomService.getAvailableSpawns(room);
            const sites = roomService.getAllConstructionSite(room);

            spawns.forEach(spawn => this.runSpawn(spawn, sites));
        });
    }
}
