import RoleTask from "../roles/RoleTask";

export default class CreepTaskService {
    protected tasks: {[taskName: string]: RoleTask} = {
        collect: new RoleTask("collect", "🚴‍"),
        build: new RoleTask("build", "🚧"),
        upgrade: new RoleTask("upgrade", "✨"),
        harvest: new RoleTask("harvest", "🛺"),
        deliver: new RoleTask("deliver", "📦"),
    };

    private setTask(creep: Creep, task: RoleTask): void {
        if (creep.memory.task !== task.name) {
            creep.say(`${task.name.charAt(0).toUpperCase() + task.name.slice(1)} ${task.icon} !`);
            creep.memory.task = task.name;
        }
    }

    public collect(creep: Creep, from: Structure | Tombstone | Ruin | null, resource: ResourceConstant): void {
        this.setTask(creep, this.tasks.collect);

        if (from) {
            if (creep.withdraw(from, resource) === ERR_NOT_IN_RANGE) {
                creep.moveTo(from);
            }
        }
    }

    public upgrade(creep: Creep, controller: StructureController | undefined) {
        this.setTask(creep, this.tasks.upgrade);

        if(controller) {
            if(creep.upgradeController(controller) === ERR_NOT_IN_RANGE) {
                creep.moveTo(controller);
            }
        }
    }

    public build(creep: Creep, site: ConstructionSite | null): void {

        this.setTask(creep, this.tasks.build);

        if(site) {
            if(creep.build(site) === ERR_NOT_IN_RANGE) {
                creep.moveTo(site);
            }
        }
    }

    public harvest(creep: Creep, source: Source | Mineral | Deposit | null): void {

        this.setTask(creep, this.tasks.harvest);

        if (source) {
            if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        }
    }

    public deliver(creep: Creep, target: AnyCreep | Structure | null, resource: ResourceConstant): void {
        this.setTask(creep, this.tasks.deliver);

        if (target && creep.transfer(target, resource) === ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }
    }
}
