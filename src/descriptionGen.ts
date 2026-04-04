import { EquipEntry, MedEntry, QtyEntry, ModEntry } from './types';

export function generateDescription(
  equip: string,
  num: string,
  med: string,
  medNum: string,
  qty: string,
  mod: string,
  equipList: EquipEntry[],
  medList: MedEntry[],
  qtyList: QtyEntry[],
  modList: ModEntry[]
): string {
  const equipEntry = equipList.find(e => e.code === equip);
  const medEntry   = medList.find(m => m.code === med);
  const qtyEntry   = qtyList.find(q => q.code === qty);
  const modEntry   = modList.find(m => m.code === mod);

  const equipLabel = equipEntry?.label ?? equip;
  const baseMedLabel = medEntry?.label ?? (med || '');
  const medLabel   = baseMedLabel && medNum ? `${baseMedLabel} ${medNum}` : baseMedLabel;
  const qtyLabel   = qtyEntry?.label ?? qty;
  const modLabel   = modEntry?.label ?? (mod || '');

  const parts: string[] = [];

  if (equip === 'SYS') {
    parts.push('System');
  } else {
    parts.push(equipLabel);
    if (num) parts.push(num);
  }

  parts.push('—');

  if (medLabel) parts.push(medLabel);
  if (qtyLabel) parts.push(qtyLabel);
  if (modLabel) parts.push(modLabel);

  return parts.join(' ').replace(/\s+/g, ' ').trim();
}
