import {
  ValidationResult, ValidationError,
  SemanticConfig, EquipEntry, MedEntry, QtyEntry, ModEntry
} from './types';

// ── Allowlist helpers ──────────────────────────────────────────────────────────

/** Returns valid MED codes for an EQUIP, or null if unconstrained */
export function getValidMeds(equip: string, cfg: SemanticConfig): string[] | null {
  return cfg.equipMeds[equip] ?? null;
}

/** Returns valid QTY codes for a MED, or null if unconstrained */
export function getValidQtys(med: string, cfg: SemanticConfig): string[] | null {
  return cfg.medQtys[med] ?? null;
}

/** Returns valid MOD codes for a QTY, or null if unconstrained */
export function getValidMods(qty: string, cfg: SemanticConfig): string[] | null {
  return cfg.qtyMods[qty] ?? null;
}

/** True when MED is allowed for EQUIP */
export function isMedAllowed(equip: string, med: string, cfg: SemanticConfig): boolean {
  const valid = getValidMeds(equip, cfg);
  return valid === null || valid.includes(med);
}

/** True when QTY is allowed for MED */
export function isQtyAllowed(med: string, qty: string, cfg: SemanticConfig): boolean {
  const valid = getValidQtys(med, cfg);
  return valid === null || valid.includes(qty);
}

/** True when MOD is allowed for QTY */
export function isModAllowed(qty: string, mod: string, cfg: SemanticConfig): boolean {
  if (!mod) return true; // empty mod always structurally fine (validated elsewhere)
  const valid = getValidMods(qty, cfg);
  return valid === null || valid.includes(mod);
}

// ── Legacy compatibility stub ──────────────────────────────────────────────────
// AssembliesTab still uses checkSemanticBlocked; return null (no rules = not blocked)
export function checkSemanticBlocked(
  _equip: string,
  _med: string,
  _qty: string,
  _rules: unknown[]
): null {
  return null;
}

// ── Main validation ────────────────────────────────────────────────────────────

export function validateVariable(
  equip: string,
  num: string,
  med: string,
  qty: string,
  mod: string,
  existingNames: string[],
  semanticConfig: SemanticConfig,
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

  // Semantic checks — allowlist based
  if (equip && qty) {
    if (!isMedAllowed(equip, med, semanticConfig)) {
      const valid = getValidMeds(equip, semanticConfig)!.filter(m => m !== '');
      errors.push({
        layer: 'semantic',
        rule: `SEM:${equip}/MED`,
        message: `${equip} does not use "${med}" medium. Valid media: ${valid.join(', ')}`,
      });
    } else if (!isQtyAllowed(med, qty, semanticConfig)) {
      const medLabel = med || '(no medium)';
      errors.push({
        layer: 'semantic',
        rule: `SEM:${med}/QTY`,
        message: `${qty} is not valid for ${medLabel}`,
      });
    } else if (mod && !isModAllowed(qty, mod, semanticConfig)) {
      const valid = getValidMods(qty, semanticConfig)!.filter(m => m !== '');
      errors.push({
        layer: 'semantic',
        rule: `SEM:${qty}/MOD`,
        message: `"${mod}" modifier is not valid for ${qty}. Valid: ${valid.join(', ') || 'none'}`,
      });
    }
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  return { valid: true, name, description: '' };
}
