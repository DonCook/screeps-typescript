export default class RoomService {

    getAll() {
        return Object.keys(Game.rooms).map(name => Game.rooms[name]);
    }

    getAllConstructionSite(room: Room) {

        return Object.keys(Game.constructionSites)
            .map(name => Game.constructionSites[name])
            .filter(site => site.room === room);
    }

    getAllSpawn(room: Room): StructureSpawn[] {
        return Object.keys(Game.spawns)
            .map(name => Game.spawns[name])
            .filter(spawn => spawn.room === room);
    }

    getAvailableSpawns(room: Room): StructureSpawn[] {

        return this.getAllSpawn(room).filter(spawn => spawn.spawning);
    }
}
