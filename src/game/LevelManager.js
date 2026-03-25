export class LevelManager {
  constructor(world, state) {
    this.world = world;
    this.state = state;
  }

  load(level) {
    this.world.loadLevel(level);
    this.state.totalCount = level.pallets.length;
    this.state.placedCount = 0;
  }
}
