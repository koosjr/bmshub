import * as XLSX from 'xlsx';
import type {
  Controller, ControllerModel, ExpansionModule, QtyEntry, EquipEntry, MedEntry,
} from './types';

// ── helpers ──────────────────────────────────────────────────────────────────

function ioTypeOf(qty: string, qtyList: QtyEntry[], ioOverride?: string | null): string {
  if (ioOverride === 'AV') return 'AV';
  if (ioOverride === 'BV') return 'BV';
  return qtyList.find(q => q.code === qty)?.ioType ?? '';
}

function qtyLabel(code: string, qtyList: QtyEntry[]) {
  return qtyList.find(q => q.code === code)?.label ?? code;
}

// Build a human-readable device description for a variable
function deviceDesc(
  v: Controller['variables'][number],
  qtyList: QtyEntry[],
): string {
  const base = qtyLabel(v.qty, qtyList);
  const sig = v.device?.signalType;
  if (sig && sig !== '') return `${base} – ${sig}`;
  return base;
}

// ── Sheet 1: BOQ per controller ───────────────────────────────────────────────

function buildSheet1(
  controllers: Controller[],
  controllerModels: ControllerModel[],
  expansionModules: ExpansionModule[],
  qtyList: QtyEntry[],
  _equipList: EquipEntry[],
  _medList: MedEntry[],
): XLSX.WorkSheet {
  const rows: (string | number)[][] = [];

  for (const ctrl of controllers) {
    const dup = ctrl.duplicates ?? 1;
    const modelName = controllerModels.find(m => m.id === ctrl.modelId)?.name ?? '(no model)';
    const ctrlTitle = ctrl.siteName
      ? `${ctrl.label}  —  ${ctrl.siteName}`
      : ctrl.label;

    // Controller heading row
    rows.push([ctrlTitle, '', '', '']);
    // Column headers
    rows.push(['Item No', 'Item', 'Unit', 'No']);

    let item = 1;

    // Item: controller itself
    if (ctrl.modelId) {
      rows.push([item++, modelName, 'No', dup]);
    }

    // Items: expansion modules
    for (const exp of ctrl.expansions ?? []) {
      const mod = expansionModules.find(m => m.id === exp.moduleId);
      if (mod) {
        rows.push([item++, mod.name, 'No', exp.quantity * dup]);
      }
    }

    // Items: field devices — group physical IO vars by description
    const deviceTotals: Map<string, number> = new Map();
    for (const v of ctrl.variables) {
      const io = ioTypeOf(v.qty, qtyList, v.ioOverride);
      if (io === 'AV' || io === 'BV') continue; // skip RS-485 / soft points
      const desc = deviceDesc(v, qtyList);
      deviceTotals.set(desc, (deviceTotals.get(desc) ?? 0) + 1);
    }
    for (const [desc, count] of deviceTotals) {
      rows.push([item++, desc, 'No', count * dup]);
    }

    // Blank spacer
    rows.push(['', '', '', '']);
  }

  const ws = XLSX.utils.aoa_to_sheet(rows);
  ws['!cols'] = [
    { wch: 10 }, { wch: 40 }, { wch: 8 }, { wch: 8 },
  ];
  return ws;
}

// ── Sheet 2: project-wide BOQ totals ─────────────────────────────────────────

function buildSheet2(
  projectName: string,
  controllers: Controller[],
  controllerModels: ControllerModel[],
  expansionModules: ExpansionModule[],
  qtyList: QtyEntry[],
): XLSX.WorkSheet {
  const rows: (string | number)[][] = [];

  rows.push([`PROJECT SUMMARY — ${projectName}`, '', '', '']);
  rows.push(['', '', '', '']);
  rows.push(['Item No', 'Item', 'Unit', 'Total Qty']);

  let item = 1;

  // Controllers
  const modelCount: Map<string, number> = new Map();
  for (const ctrl of controllers) {
    if (!ctrl.modelId) continue;
    const dup = ctrl.duplicates ?? 1;
    modelCount.set(ctrl.modelId, (modelCount.get(ctrl.modelId) ?? 0) + dup);
  }
  for (const [id, count] of modelCount) {
    const name = controllerModels.find(m => m.id === id)?.name ?? id;
    rows.push([item++, name, 'No', count]);
  }
  if (modelCount.size === 0) rows.push([item++, '(no controller models assigned)', 'No', 0]);

  rows.push(['', '', '', '']);

  // Expansion modules
  const expCount: Map<string, number> = new Map();
  for (const ctrl of controllers) {
    const dup = ctrl.duplicates ?? 1;
    for (const exp of ctrl.expansions ?? []) {
      expCount.set(exp.moduleId, (expCount.get(exp.moduleId) ?? 0) + exp.quantity * dup);
    }
  }
  for (const [id, count] of expCount) {
    const name = expansionModules.find(m => m.id === id)?.name ?? id;
    rows.push([item++, name, 'No', count]);
  }
  if (expCount.size === 0) rows.push([item++, '(no expansion modules)', 'No', 0]);

  rows.push(['', '', '', '']);

  // Field devices — aggregate across all controllers
  const deviceTotals: Map<string, number> = new Map();
  for (const ctrl of controllers) {
    const dup = ctrl.duplicates ?? 1;
    for (const v of ctrl.variables) {
      const io = ioTypeOf(v.qty, qtyList, v.ioOverride);
      if (io === 'AV' || io === 'BV') continue;
      const desc = deviceDesc(v, qtyList);
      deviceTotals.set(desc, (deviceTotals.get(desc) ?? 0) + 1 * dup);
    }
  }
  for (const [desc, count] of deviceTotals) {
    rows.push([item++, desc, 'No', count]);
  }
  if (deviceTotals.size === 0) rows.push([item++, '(no field devices)', 'No', 0]);

  rows.push(['', '', '', '']);

  // IO totals — compute first, then push rows with correct values
  let ai = 0, ao = 0, di = 0, doCount = 0, av = 0;
  for (const ctrl of controllers) {
    const dup = ctrl.duplicates ?? 1;
    for (const v of ctrl.variables) {
      const io = ioTypeOf(v.qty, qtyList, v.ioOverride);
      if (io === 'AI') ai += dup;
      else if (io === 'AO') ao += dup;
      else if (io === 'DI') di += dup;
      else if (io === 'DO') doCount += dup;
      else if (io === 'AV') av += dup;
    }
  }

  rows.push(['', 'IO SUMMARY', '', '']);
  rows.push(['', 'AI  Analogue Input',   '', ai]);
  rows.push(['', 'AO  Analogue Output',  '', ao]);
  rows.push(['', 'DI  Digital Input',    '', di]);
  rows.push(['', 'DO  Digital Output',   '', doCount]);
  rows.push(['', 'AV  RS-485 / Network', '', av]);

  const ws = XLSX.utils.aoa_to_sheet(rows);
  ws['!cols'] = [
    { wch: 10 }, { wch: 40 }, { wch: 8 }, { wch: 12 },
  ];
  return ws;
}

// ── Main export function ─────────────────────────────────────────────────────

export function exportProjectXlsx(
  projectName: string,
  controllers: Controller[],
  controllerModels: ControllerModel[],
  expansionModules: ExpansionModule[],
  qtyList: QtyEntry[],
  equipList: EquipEntry[],
  medList: MedEntry[],
): void {
  const wb = XLSX.utils.book_new();

  const ws1 = buildSheet1(controllers, controllerModels, expansionModules, qtyList, equipList, medList);
  const ws2 = buildSheet2(projectName, controllers, controllerModels, expansionModules, qtyList);

  XLSX.utils.book_append_sheet(wb, ws1, 'BOQ per Controller');
  XLSX.utils.book_append_sheet(wb, ws2, 'Project Summary');

  const safeProject = projectName.replace(/[/\\?*[\]:]/g, '-') || 'BMSHub-Export';
  XLSX.writeFile(wb, `${safeProject}.xlsx`);
}
