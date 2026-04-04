export function buildName(
  equip: string,
  num: string,
  med: string,
  medNum: string,
  qty: string,
  mod: string
): string {
  const equipPart = equip + num;
  const qtyPart   = mod ? qty + '_' + mod : qty;
  if (med) {
    return equipPart + '_' + med + medNum + '_' + qtyPart;
  }
  return equipPart + '_' + qtyPart;
}
