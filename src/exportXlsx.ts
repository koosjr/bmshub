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

function equipLabel(code: string, equipList: EquipEntry[]) {
  return equipList.find(e => e.code === code)?.label ?? code;
}
function medLabel(code: string, medList: MedEntry[]) {
  if (!code) return '—';
  return medList.find(m => m.code === code)?.label ?? code;
}
function qtyLabel(code: string, qtyList: QtyEntry[]) {
  return qtyList.find(q => q.code === code)?.label ?? code;
}

// ── Sheet 1: one row per variable, grouped by controller ─────────────────────

function buildSheet1(
  controllers: Controller[],
  controllerModels: ControllerModel[],
  qtyList: QtyEntry[],
  equipList: EquipEntry[],
  medList: MedEntry[],
): XLSX.WorkSheet {
  const rows: (string | number)[][] = [];

  // Header
  rows.push([
    'Controller', 'Site', 'Point Name', 'Equipment', '#',
    'Medium', 'Quantity', 'Modifier', 'IO Type', 'Description',
  ]);

  for (const ctrl of controllers) {
    const modelName = controllerModels.find(m => m.id === ctrl.modelId)?.name ?? '(no model)';

    // Controller sub-header row
    rows.push([`${ctrl.label} — ${ctrl.siteName}  [${modelName}]`, '', '', '', '', '', '', '', '', '']);

    for (const v of ctrl.variables) {
      rows.push([
        ctrl.label,
        ctrl.siteName,
        v.name,
        `${v.equip} — ${equipLabel(v.equip, equipList)}`,
        v.num,
        v.med ? `${v.med} — ${medLabel(v.med, medList)}` : '—',
        `${v.qty} — ${qtyLabel(v.qty, qtyList)}`,
        v.mod || '—',
        ioTypeOf(v.qty, qtyList, v.ioOverride),
        v.description,
      ]);
    }

    // Blank spacer between controllers
    rows.push(['', '', '', '', '', '', '', '', '', '']);
  }

  const ws = XLSX.utils.aoa_to_sheet(rows);

  // Column widths
  ws['!cols'] = [
    { wch: 32 }, { wch: 16 }, { wch: 18 }, { wch: 28 }, { wch: 5 },
    { wch: 22 }, { wch: 22 }, { wch: 8 }, { wch: 8 }, { wch: 48 },
  ];

  return ws;
}

// ── Sheet 2: project-wide totals ─────────────────────────────────────────────

function buildSheet2(
  controllers: Controller[],
  controllerModels: ControllerModel[],
  expansionModules: ExpansionModule[],
  qtyList: QtyEntry[],
): XLSX.WorkSheet {
  const rows: (string | number)[][] = [];

  // ─ Section A: Controller models used ──────────────────────────────────────
  rows.push(['CONTROLLER MODELS', '']);
  rows.push(['Model', 'Count']);

  const modelCount: Record<string, number> = {};
  for (const ctrl of controllers) {
    if (ctrl.modelId) modelCount[ctrl.modelId] = (modelCount[ctrl.modelId] ?? 0) + 1;
  }
  if (Object.keys(modelCount).length === 0) {
    rows.push(['(no models assigned)', 0]);
  } else {
    for (const [id, count] of Object.entries(modelCount)) {
      const name = controllerModels.find(m => m.id === id)?.name ?? id;
      rows.push([name, count]);
    }
  }

  rows.push(['', '']);

  // ─ Section B: Expansion modules used ──────────────────────────────────────
  rows.push(['EXPANSION MODULES', '']);
  rows.push(['Module', 'Total Qty']);

  const expCount: Record<string, number> = {};
  for (const ctrl of controllers) {
    for (const exp of ctrl.expansions ?? []) {
      expCount[exp.moduleId] = (expCount[exp.moduleId] ?? 0) + exp.quantity;
    }
  }
  if (Object.keys(expCount).length === 0) {
    rows.push(['(none)', 0]);
  } else {
    for (const [id, qty] of Object.entries(expCount)) {
      const name = expansionModules.find(m => m.id === id)?.name ?? id;
      rows.push([name, qty]);
    }
  }

  rows.push(['', '']);

  // ─ Section C: IO point totals across all controllers ─────────────────────
  rows.push(['IO POINT TOTALS', '', '', '']);
  rows.push(['IO Type', 'Description', 'Required', 'Available']);

  let totalAI = 0, totalAO = 0, totalDI = 0, totalDO = 0, totalAV = 0;
  let availAI = 0, availAO = 0, availDI = 0, availDO = 0;

  for (const ctrl of controllers) {
    for (const v of ctrl.variables) {
      const io = ioTypeOf(v.qty, qtyList, v.ioOverride);
      if (io === 'AI') totalAI++;
      else if (io === 'AO') totalAO++;
      else if (io === 'DI') totalDI++;
      else if (io === 'DO') totalDO++;
      else if (io === 'AV') totalAV++;
    }

    // Available IO from model + expansions
    const model = controllerModels.find(m => m.id === ctrl.modelId);
    if (model) {
      let ai = model.io.ai, ao = model.io.ao, di = model.io.di, _do = model.io.do;
      for (const exp of ctrl.expansions ?? []) {
        const mod = expansionModules.find(m => m.id === exp.moduleId);
        if (mod) {
          ai += mod.io.ai * exp.quantity;
          ao += mod.io.ao * exp.quantity;
          di += mod.io.di * exp.quantity;
          _do += mod.io.do * exp.quantity;
        }
      }
      availAI += ai; availAO += ao; availDI += di; availDO += _do;
    }
  }

  const hasAvail = availAI + availAO + availDI + availDO > 0;
  rows.push(['AI', 'Analogue Input',  totalAI, hasAvail ? availAI : '—']);
  rows.push(['AO', 'Analogue Output', totalAO, hasAvail ? availAO : '—']);
  rows.push(['DI', 'Digital Input',   totalDI, hasAvail ? availDI : '—']);
  rows.push(['DO', 'Digital Output',  totalDO, hasAvail ? availDO : '—']);
  rows.push(['AV', 'RS-485 / Network', totalAV, '—']);
  rows.push(['', 'TOTAL', totalAI + totalAO + totalDI + totalDO + totalAV,
    hasAvail ? availAI + availAO + availDI + availDO : '—']);

  rows.push(['', '']);

  // ─ Section D: Sensor / point counts per controller ────────────────────────
  rows.push(['POINTS PER CONTROLLER', '', '', '', '']);
  rows.push(['Controller', 'Site', 'Model', 'Points', 'AI', 'AO', 'DI', 'DO', 'AV']);

  for (const ctrl of controllers) {
    const modelName = controllerModels.find(m => m.id === ctrl.modelId)?.name ?? '—';
    let ai = 0, ao = 0, di = 0, _do = 0, av = 0;
    for (const v of ctrl.variables) {
      const io = ioTypeOf(v.qty, qtyList, v.ioOverride);
      if (io === 'AI') ai++;
      else if (io === 'AO') ao++;
      else if (io === 'DI') di++;
      else if (io === 'DO') _do++;
      else if (io === 'AV') av++;
    }
    rows.push([ctrl.label, ctrl.siteName, modelName, ctrl.variables.length, ai, ao, di, _do, av]);
  }

  const ws = XLSX.utils.aoa_to_sheet(rows);
  ws['!cols'] = [
    { wch: 28 }, { wch: 22 }, { wch: 26 }, { wch: 10 },
    { wch: 8 }, { wch: 8 }, { wch: 8 }, { wch: 8 }, { wch: 8 },
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

  const ws1 = buildSheet1(controllers, controllerModels, qtyList, equipList, medList);
  const ws2 = buildSheet2(controllers, controllerModels, expansionModules, qtyList);

  XLSX.utils.book_append_sheet(wb, ws1, 'Controllers & Points');
  XLSX.utils.book_append_sheet(wb, ws2, 'Project Summary');

  const safeProject = projectName.replace(/[/\\?*[\]:]/g, '-') || 'BMSHub-Export';
  XLSX.writeFile(wb, `${safeProject}.xlsx`);
}
