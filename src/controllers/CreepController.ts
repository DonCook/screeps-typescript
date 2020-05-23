import {builderRole, harvesterRole, upgraderRole} from "../roles/index";
import {creepService} from "../services/index";
import CreepRoleInterface from "../roles/CreepRoleInterface";


export class CreepController {

    private roles: CreepRoleInterface[] = [
        harvesterRole,
        upgraderRole,
        builderRole,
    ];

    runAll(): void {
        creepService.getAll().forEach(creep => {

            for (const creepRole of this.roles) {
                if (creepService.getRole(creep) === creepRole.getRole()) creepRole.run(creep);
            }
        });
    }
}
