export class HighlightFX {
  constructor(world) {
    this.world = world;
  }

  clearSelection() {
    this.world.pallets.forEach((pallet) => this.world.setPalletState(pallet, pallet.userData.placed ? 'placed' : 'idle'));
    this.world.bays.forEach((bay) => bay.setHighlight(bay.occupied ? 'done' : 'idle'));
  }

  showSelection(pallet) {
    this.clearSelection();
    if (!pallet) return;
    this.world.setPalletState(pallet, 'selected');
    this.world.bays.forEach((bay) => {
      if (bay.occupied) return;
      bay.setHighlight(bay.type === pallet.userData.type ? 'match' : 'idle');
    });
  }

  flashInvalid(bay) {
    if (!bay) return;
    bay.setHighlight('invalid');
    window.setTimeout(() => {
      bay.setHighlight(bay.occupied ? 'done' : 'idle');
    }, 280);
  }

  markPlaced(bay) {
    bay.setHighlight('done');
  }
}
