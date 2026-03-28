import {
  ValidationResult, ValidationError,
  SemanticRule, EquipEntry, MedEntry, QtyEntry, ModEntry
} from './types';

export function validateVariable(
  equip: string,
  num: string,
  med: string,
  qty: string,
  mod: string,
  existingNames: string[],
  rules: SemanticRule[],
  equipList: EquipEntry[],
  medList: MedEntry[],
  qtyList: QtyEntry[],
  modList: ModEntry[]
): ValidationResult {
  const errors: ValidationError[] = [];
  const name = equip + num + med + qty + mod;

  // S1: Total length <= 12
  if (name.length > 12) {
    errors.push({
      layer: 'structural',
      rule: 'S1',
      message: `Name "${name}" is ${name.length} characters — maximum is 12`,
    });
  }

  // S2: Only [A-Z0-9] characters
  if (!/^[A-Z0-9]*$/.test(name)) {
    errors.push({
      layer: 'structural',
      rule: 'S2',
      message: 'Name must contain only uppercase alphanumeric characters (A–Z, 0–9)',
    });
  }

  // S3: EQUIP is exactly 3 chars and exists in dictionary
  if (equip.length !== 3) {
    errors.push({
      layer: 'structural',
      rule: 'S3',
      message: `EQUIP must be exactly 3 characters (got "${equip}")`,
    });
  } else if (!equipList.some(e => e.code === equip)) {
    errors.push({
      layer: 'structural',
      rule: 'S3',
      message: `EQUIP code "${equip}" is not in the dictionary`,
    });
  }

  // S4: If EQUIP != SYS, NUM must be present (digit 1-9)
  if (equip !== 'SYS') {
    if (!num || !/^[1-9]$/.test(num)) {
      errors.push({
        layer: 'structural',
        rule: 'S4',
        message: `NUM must be a digit 1–9 for equipment type "${equip}"`,
      });
    }
  }

  // S5: If EQUIP == SYS, NUM must be absent
  if (equip === 'SYS' && num !== '') {
    errors.push({
      layer: 'structural',
      rule: 'S5',
      message: 'SYS equipment must not have a NUM — remove the number',
    });
  }

  // S6: QTY must exist in dictionary
  if (!qty) {
    errors.push({
      layer: 'structural',
      rule: 'S6',
      message: 'QTY is required',
    });
  } else if (!qtyList.some(q => q.code === qty)) {
    errors.push({
      layer: 'structural',
      rule: 'S6',
      message: `QTY code "${qty}" is not in the dictionary`,
    });
  }

  // S7: If MED present, must exist in dictionary
  if (med && !medList.some(m => m.code === med)) {
    errors.push({
      layer: 'structural',
      rule: 'S7',
      message: `MED code "${med}" is not in the dictionary`,
    });
  }

  // S8: If MOD present, must exist in dictionary
  if (mod && !modList.some(m => m.code === mod)) {
    errors.push({
      layer: 'structural',
      rule: 'S8',
      message: `MOD code "${mod}" is not in the dictionary`,
    });
  }

  // S9: No duplicate names
  if (name && existingNames.includes(name)) {
    errors.push({
      layer: 'structural',
      rule: 'S9',
      message: `Name "${name}" already exists in this controller`,
    });
  }

  // Semantic rules — collect all matches, then report only the most specific one
  // Specificity: fewer wildcards = more specific; ties go to first match
  function ruleSpecificity(r: SemanticRule): number {
    return (r.equip !== '*' ? 2 : 0) + (r.med !== '*' ? 1 : 0) + (r.qty !== '*' ? 2 : 0);
  }

  let bestMatch: SemanticRule | null = null;
  let bestScore = -1;

  for (const rule of rules) {
    const equipMatch = rule.equip === '*' || rule.equip === equip;
    const medMatch =
      rule.med === '*' ||
      (rule.med === '' && med === '') ||
      rule.med === med;
    const qtyMatch = rule.qty === '*' || rule.qty === qty;

    if (equipMatch && medMatch && qtyMatch) {
      const score = ruleSpecificity(rule);
      if (score > bestScore) {
        bestScore = score;
        bestMatch = rule;
      }
    }
  }

  if (bestMatch) {
    errors.push({
      layer: 'semantic',
      rule: `SEM:${bestMatch.equip}/${bestMatch.med}/${bestMatch.qty}`,
      message: bestMatch.reason,
    });
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  return { valid: true, name, description: '' };
}

export function checkSemanticBlocked(
  equip: string,
  med: string,
  qty: string,
  rules: SemanticRule[]
): SemanticRule | null {
  let best: SemanticRule | null = null;
  let bestScore = -1;

  for (const rule of rules) {
    const equipMatch = rule.equip === '*' || rule.equip === equip;
    const medMatch =
      rule.med === '*' ||
      (rule.med === '' && med === '') ||
      rule.med === med;
    const qtyMatch = rule.qty === '*' || rule.qty === qty;

    if (equipMatch && medMatch && qtyMatch) {
      const score = (rule.equip !== '*' ? 2 : 0) + (rule.med !== '*' ? 1 : 0) + (rule.qty !== '*' ? 2 : 0);
      if (score > bestScore) {
        bestScore = score;
        best = rule;
      }
    }
  }
  return best;
}
