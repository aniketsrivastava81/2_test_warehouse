import { gsap } from 'gsap';

export class TweenManager {
  async moveCrane({ world, pallet, sourcePosition, targetPosition, speed }) {
    const crane = world.crane;
    const moveDuration = (from, to) => {
      const dz = Math.abs(to.z - from.z) / speed.bridge;
      const dx = Math.abs(to.x - from.x) / speed.trolley;
      return Math.max(0.22, Math.max(dx, dz));
    };
    const hoistDown = Math.max(0.24, Math.abs(crane.pickDrop - crane.restDrop) / speed.hoist);
    const hoistUp = Math.max(0.2, Math.abs(crane.travelDrop - crane.pickDrop) / speed.hoist);
    const sourceTravel = moveDuration({ x: crane.trolley.position.x, z: crane.bridge.position.z }, sourcePosition);
    const targetTravel = moveDuration(sourcePosition, targetPosition);

    return new Promise((resolve) => {
      gsap.killTweensOf([crane.bridge.position, crane.trolley.position, crane.hookGroup.position, pallet.position]);
      const timeline = gsap.timeline({ onComplete: resolve });
      const syncCarry = () => crane.updateCarriedPallet();

      timeline.to(crane.bridge.position, { z: sourcePosition.z, duration: sourceTravel, ease: 'power1.inOut', onUpdate: syncCarry }, 0);
      timeline.to(crane.trolley.position, { x: sourcePosition.x, duration: sourceTravel, ease: 'power1.inOut', onUpdate: syncCarry }, 0);
      timeline.to(crane.hookGroup.position, { y: crane.pickDrop, duration: hoistDown, ease: 'power2.out', onUpdate: syncCarry });
      timeline.call(() => crane.attachPallet(pallet));
      timeline.to(crane.hookGroup.position, { y: crane.travelDrop, duration: hoistUp, ease: 'power2.inOut', onUpdate: syncCarry });
      timeline.to(crane.bridge.position, { z: targetPosition.z, duration: targetTravel, ease: 'power1.inOut', onUpdate: syncCarry });
      timeline.to(crane.trolley.position, { x: targetPosition.x, duration: targetTravel, ease: 'power1.inOut', onUpdate: syncCarry }, '<');
      timeline.to(crane.hookGroup.position, { y: crane.placeDrop, duration: hoistDown, ease: 'power2.out', onUpdate: syncCarry });
      timeline.call(() => crane.detachPallet(targetPosition));
      timeline.to(crane.hookGroup.position, { y: crane.restDrop, duration: hoistUp, ease: 'power2.inOut', onUpdate: syncCarry });
    });
  }

  popCombo(element) {
    if (!element) return;
    gsap.killTweensOf(element);
    gsap.fromTo(element, { y: -10, scale: 0.95 }, { y: 0, scale: 1, duration: 0.18, ease: 'back.out(2)' });
  }
}
