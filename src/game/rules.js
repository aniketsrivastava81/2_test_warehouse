export function canPlace(pallet, bay) {
  return Boolean(pallet && bay && !bay.occupied && pallet.userData.type === bay.type);
}
