export class DragController {
  constructor({ domElement, picker, pointer, world, onPalletTap, onBayTap, onEmptyTap, canInteract }) {
    this.domElement = domElement;
    this.picker = picker;
    this.pointer = pointer;
    this.world = world;
    this.onPalletTap = onPalletTap;
    this.onBayTap = onBayTap;
    this.onEmptyTap = onEmptyTap;
    this.canInteract = canInteract ?? (() => true);
    this.handlePointerDown = this.handlePointerDown.bind(this);
  }

  attach() {
    this.domElement.addEventListener('pointerdown', this.handlePointerDown, { passive: true });
  }

  detach() {
    this.domElement.removeEventListener('pointerdown', this.handlePointerDown);
  }

  handlePointerDown(event) {
    if (!this.canInteract()) return;
    this.pointer.updateFromEvent(event);
    this.picker.setFromPointer(this.pointer.ndc);
    const hits = this.picker.pick(this.world.getInteractiveObjects());
    const target = hits.find((hit) => this.findInteractiveRoot(hit.object));
    if (!target) {
      this.onEmptyTap?.();
      return;
    }
    const root = this.findInteractiveRoot(target.object);
    if (!root) return;
    if (root.userData.kind === 'pallet') this.onPalletTap?.(root);
    else if (root.userData.kind === 'bay') this.onBayTap?.(root.userData.instance);
  }

  findInteractiveRoot(object) {
    let current = object;
    while (current) {
      if (current.userData?.kind === 'pallet' || current.userData?.kind === 'bay') return current;
      current = current.parent;
    }
    return null;
  }
}
