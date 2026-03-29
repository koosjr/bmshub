import { useState, useMemo, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  EquipEntry, MedEntry, QtyEntry, ModEntry, SemanticConfig,
  Controller, ControllerVariable, ValidationError,
  Assembly, ControllerModel, ExpansionModule, ControllerExpansion, IOCount,
  Project, DeviceSupply,
} from '../types';
import { validateVariable, getValidMods, isMedAllowed, isQtyAllowed } from '../validation';
import { generateDescription } from '../descriptionGen';
import { exportProjectXlsx } from '../exportXlsx';

interface Props {
  equip: EquipEntry[];
  med: MedEntry[];
  qty: QtyEntry[];
  mod: ModEntry[];
  semanticConfig: SemanticConfig;
  controllers: Controller[];
  assemblies: Assembly[];
  controllerModels: ControllerModel[];
  expansionModules: ExpansionModule[];
  projects: Project[];
  onUpdateControllers: (d: Controller[]) => void;
  onUpdateProjects: (d: Project[]) => void;
}

// ---- Device supply helpers ----
const DEVICE_TYPE_OPTIONS: Record<string, string[]> = {
  AI: ['Sensor'],
  AO: ['Actuator', 'Valve', 'VSD', 'Other'],
  AV: ['Sensor', 'Valve', 'Actuator'],
  BV: ['Sensor', 'Valve', 'Actuator'],
  DI: ['Switch', 'Stat'],
  DO: ['Relay', 'Contactor'],
};

const SIGNAL_TYPE_OPTIONS: Record<string, string[]> = {
  AI: ['Passive', '0-5V', '0-10V', '4-20mA'],
  AO: ['0-10V', '4-20mA'],
  AV: ['RS-485'],
  BV: ['RS-485'],
  DI: [],
  DO: [],
};

const SIGNAL_TYPE_DEFAULT: Record<string, string> = {
  AI: '0-10V',
  AO: '0-10V',
  AV: 'RS-485',
  BV: 'RS-485',
  DI: '',
  DO: '',
};

const IO_COLORS: Record<string, { bg: string; text: string }> = {
  AI: { bg: '#E1F5EE', text: '#085041' },
  AO: { bg: '#FAEEDA', text: '#854F0B' },
  DI: { bg: '#FCEBEB', text: '#A32D2D' },
  DO: { bg: '#2C2C2A', text: '#F1EFE8' },
  AV: { bg: '#E8EFF8', text: '#1a3a6b' },
  BV: { bg: '#F0E8F8', text: '#5a1a6b' },
};

function IOBadge({ type }: { type: string }) {
  const c = IO_COLORS[type] ?? { bg: '#D3D1C7', text: '#2C2C2A' };
  return (
    <span className="px-1.5 py-0.5 rounded text-xs font-mono font-bold"
      style={{ background: c.bg, color: c.text }}>{type}</span>
  );
}

function getModsForQty(qty: string, modList: ModEntry[], semanticConfig: SemanticConfig): ModEntry[] {
  const validCodes = getValidMods(qty, semanticConfig);
  if (validCodes === null) return modList;
  return modList.filter(m => validCodes.includes(m.code));
}

// Compute required physical IO from a variable list (AV/BV soft values are excluded)
function computeRequiredIO(variables: ControllerVariable[], qtyList: QtyEntry[]): IOCount {
  const result: IOCount = { ai: 0, ao: 0, di: 0, do: 0 };
  for (const v of variables) {
    if (v.ioOverride === 'AV' || v.ioOverride === 'BV') continue;
    const q = qtyList.find(x => x.code === v.qty);
    if (!q) continue;
    const key = q.ioType.toLowerCase() as keyof IOCount;
    result[key]++;
  }
  return result;
}

// Count software values (AV/BV)
function countSoftValues(variables: ControllerVariable[]): { av: number; bv: number } {
  let av = 0, bv = 0;
  for (const v of variables) {
    if (v.ioOverride === 'AV') av++;
    else if (v.ioOverride === 'BV') bv++;
  }
  return { av, bv };
}

// Compute available IO from a controller's model + expansions
function computeAvailableIO(
  controller: Controller,
  controllerModels: ControllerModel[],
  expansionModules: ExpansionModule[]
): IOCount | null {
  if (!controller.modelId) return null;
  const model = controllerModels.find(m => m.id === controller.modelId);
  if (!model) return null;
  const result: IOCount = { ...model.io };
  for (const exp of (controller.expansions ?? [])) {
    const mod = expansionModules.find(m => m.id === exp.moduleId);
    if (!mod) continue;
    result.ai += mod.io.ai * exp.quantity;
    result.ao += mod.io.ao * exp.quantity;
    result.di += mod.io.di * exp.quantity;
    result.do += mod.io.do * exp.quantity;
  }
  return result;
}

// ---- IO Status Badge for controller list ----
function ControllerIOStatusBadge({
  controller, qtyList, controllerModels, expansionModules,
}: {
  controller: Controller;
  qtyList: QtyEntry[];
  controllerModels: ControllerModel[];
  expansionModules: ExpansionModule[];
}) {
  const required = useMemo(
    () => computeRequiredIO(controller.variables, qtyList),
    [controller.variables, qtyList]
  );
  const available = useMemo(
    () => computeAvailableIO(controller, controllerModels, expansionModules),
    [controller, controllerModels, expansionModules]
  );

  const reqTotal = required.ai + required.ao + required.di + required.do;

  if (!available) {
    // Amber: no model assigned
    return (
      <span className="text-xs px-1.5 py-0.5 rounded font-medium"
        style={{ background: '#FAEEDA', color: '#854F0B' }}>
        {reqTotal} pts — no model
      </span>
    );
  }

  const availTotal = available.ai + available.ao + available.di + available.do;
  const isOver = (required.ai > available.ai) || (required.ao > available.ao) ||
    (required.di > available.di) || (required.do > available.do);

  return (
    <span className="text-xs px-1.5 py-0.5 rounded font-medium"
      style={isOver
        ? { background: '#FCEBEB', color: '#A32D2D' }
        : { background: '#E1F5EE', color: '#085041' }
      }>
      {reqTotal} / {availTotal} pts
    </span>
  );
}

// ---- New Project Modal ----
function NewProjectModal({ onConfirm, onCancel }: {
  onConfirm: (name: string, description: string) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  function submit() {
    if (!name.trim()) { setError('Project name is required'); return; }
    onConfirm(name.trim(), description.trim());
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" style={{ background: 'rgba(0,0,0,0.4)' }}>
      <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-xl">
        <h2 className="font-bold text-base mb-4" style={{ color: '#2C2C2A' }}>New Project</h2>
        <div className="space-y-3 mb-4">
          <div>
            <label className="text-xs font-medium block mb-1" style={{ color: '#888780' }}>Name *</label>
            <input className="border rounded px-3 py-2 text-sm w-full" style={{ borderColor: '#D3D1C7' }}
              value={name} onChange={e => setName(e.target.value)} placeholder="e.g. PACOFS" autoFocus />
          </div>
          <div>
            <label className="text-xs font-medium block mb-1" style={{ color: '#888780' }}>Description</label>
            <input className="border rounded px-3 py-2 text-sm w-full" style={{ borderColor: '#D3D1C7' }}
              value={description} onChange={e => setDescription(e.target.value)} placeholder="Short description" />
          </div>
        </div>
        {error && <p className="text-xs mb-3" style={{ color: '#E24B4A' }}>{error}</p>}
        <div className="flex gap-2 justify-end">
          <button onClick={onCancel} className="px-4 py-2 rounded text-sm" style={{ background: '#D3D1C7', color: '#2C2C2A' }}>Cancel</button>
          <button onClick={submit} className="px-4 py-2 rounded text-sm text-white" style={{ background: '#1D9E75' }}>Create</button>
        </div>
      </div>
    </div>
  );
}

// ---- Controller List (left panel) ----
function ControllerList({
  controllers, selectedId, onSelect, onAdd, onDelete,
  qtyList, controllerModels, expansionModules,
  projects, activeProjectId, onSelectProject, onAddProject,
}: {
  controllers: Controller[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onAdd: () => void;
  onDelete: (id: string) => void;
  qtyList: QtyEntry[];
  controllerModels: ControllerModel[];
  expansionModules: ExpansionModule[];
  projects: Project[];
  activeProjectId: string;
  onSelectProject: (id: string) => void;
  onAddProject: () => void;
}) {
  const filtered = controllers.filter(c => c.projectId === activeProjectId);

  return (
    <div className="flex flex-col h-full">
      {/* Project selector */}
      <div className="mb-3">
        <div className="flex items-center gap-1 mb-1">
          <label className="text-xs font-semibold uppercase flex-1" style={{ color: '#888780' }}>Project</label>
          <button
            onClick={onAddProject}
            className="text-xs px-2 py-0.5 rounded border"
            style={{ borderColor: '#D3D1C7', color: '#888780' }}
            title="New project"
          >+ New</button>
        </div>
        <select
          className="border rounded px-2 py-1.5 text-sm w-full"
          style={{ borderColor: '#D3D1C7' }}
          value={activeProjectId}
          onChange={e => onSelectProject(e.target.value)}
        >
          {projects.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center justify-between mb-3 px-1">
        <span className="text-xs font-semibold uppercase" style={{ color: '#888780' }}>Controllers</span>
        <button
          onClick={onAdd}
          className="text-xs px-2 py-1 rounded"
          style={{ background: '#1D9E75', color: '#fff' }}
        >+ New</button>
      </div>
      <div className="flex-1 overflow-y-auto space-y-1">
        {filtered.length === 0 && (
          <p className="text-xs text-center py-4" style={{ color: '#888780' }}>No controllers yet</p>
        )}
        {filtered.map(ctrl => (
          <div
            key={ctrl.id}
            onClick={() => onSelect(ctrl.id)}
            className="p-3 rounded-lg cursor-pointer border transition-colors"
            style={
              selectedId === ctrl.id
                ? { background: '#E1F5EE', borderColor: '#1D9E75' }
                : { background: 'white', borderColor: '#D3D1C7' }
            }
          >
            <div className="flex items-start justify-between gap-1">
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold truncate" style={{ color: '#888780' }}>{ctrl.siteName}</p>
                <div className="flex items-center gap-1.5">
                  <p className="text-sm font-medium leading-tight truncate" style={{ color: '#2C2C2A' }}>{ctrl.label}</p>
                  {(ctrl.duplicates ?? 1) > 1 && (
                    <span className="text-xs font-mono flex-shrink-0 px-1 rounded" style={{ background: '#F1EFE8', color: '#888780' }}>
                      ×{ctrl.duplicates}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <p className="text-xs" style={{ color: '#888780' }}>
                    {ctrl.variables.length} variable{ctrl.variables.length !== 1 ? 's' : ''}
                  </p>
                  <ControllerIOStatusBadge
                    controller={ctrl}
                    qtyList={qtyList}
                    controllerModels={controllerModels}
                    expansionModules={expansionModules}
                  />
                </div>
              </div>
              <button
                onClick={e => { e.stopPropagation(); onDelete(ctrl.id); }}
                className="text-xs flex-shrink-0 mt-0.5"
                style={{ color: '#E24B4A' }}
              >✕</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---- Variable Builder Form ----
interface FormState {
  equip: string;
  num: string;
  med: string;
  qty: string;
  mod: string;
  ioOverride: 'AV' | 'BV' | null;
}

function VariableForm({
  equipList, medList, qtyList, modList, semanticConfig,
  existingNames, onAdd
}: {
  equipList: EquipEntry[];
  medList: MedEntry[];
  qtyList: QtyEntry[];
  modList: ModEntry[];
  semanticConfig: SemanticConfig;
  existingNames: string[];
  onAdd: (v: ControllerVariable) => void;
}) {
  const [form, setForm] = useState<FormState>({ equip: equipList[0]?.code ?? '', num: '1', med: '', qty: '', mod: '', ioOverride: null });

  const isSys = form.equip === 'SYS';

  // When equip changes, clear num if SYS
  function handleEquipChange(code: string) {
    const e = equipList.find(x => x.code === code);
    setForm(f => ({
      ...f,
      equip: code,
      num: e?.takesNum ? (f.num || '1') : '',
      qty: '',
      mod: '',
    }));
  }

  // Available MEDs — only those valid for selected EQUIP
  const filteredMeds = useMemo(() =>
    medList.filter(m => isMedAllowed(form.equip, m.code, semanticConfig)),
    [medList, form.equip, semanticConfig]
  );

  // Available QTYs — only those valid for selected MED
  const filteredQtys = useMemo(() =>
    qtyList.filter(q => isQtyAllowed(form.med, q.code, semanticConfig)),
    [qtyList, form.med, semanticConfig]
  );

  // Available MODs filtered by QTY
  const availableMods = useMemo(() => {
    if (!form.qty) return [];
    return getModsForQty(form.qty, modList, semanticConfig);
  }, [form.qty, modList, semanticConfig]);

  // When QTY changes, clear MOD if not valid
  function handleQtyChange(code: string) {
    const mods = getModsForQty(code, modList, semanticConfig);
    const newBaseType = qtyList.find(q => q.code === code)?.ioType;
    const allowedOverride = (newBaseType === 'AI' || newBaseType === 'AO') ? 'AV' : 'BV';
    setForm(f => ({
      ...f,
      qty: code,
      mod: mods.some(m => m.code === f.mod) ? f.mod : '',
      ioOverride: f.ioOverride === allowedOverride ? f.ioOverride : null,
    }));
  }

  // Live name
  const liveName = form.equip + (isSys ? '' : form.num) + form.med + form.qty + form.mod;

  // Validation
  const validationResult = useMemo(() => {
    if (!form.equip || !form.qty) return null;
    return validateVariable(
      form.equip,
      isSys ? '' : form.num,
      form.med,
      form.qty,
      form.mod,
      existingNames,
      semanticConfig,
      equipList,
      medList,
      qtyList,
      modList
    );
  }, [form, isSys, existingNames, semanticConfig, equipList, medList, qtyList, modList]);

  // Description
  const description = useMemo(() => {
    if (!form.equip || !form.qty) return '';
    return generateDescription(
      form.equip, isSys ? '' : form.num, form.med, form.qty, form.mod,
      equipList, medList, qtyList, modList
    );
  }, [form, isSys, equipList, medList, qtyList, modList]);

  // Warnings
  const warnings: string[] = [];
  if (form.qty === 'STG' && !['1','2','3'].includes(form.mod)) {
    warnings.push('STG quantity typically needs a stage MOD (1, 2 or 3)');
  }

  const isBlocked = validationResult && !validationResult.valid;
  const nameLen = liveName.length;

  function handleAdd() {
    if (!validationResult || !validationResult.valid) return;
    const v: ControllerVariable = {
      id: uuidv4(),
      equip: form.equip,
      num: isSys ? '' : form.num,
      med: form.med,
      qty: form.qty,
      mod: form.mod,
      name: validationResult.name,
      description,
      ioOverride: form.ioOverride ?? null,
    };
    onAdd(v);
    // Reset qty, mod and ioOverride but keep equip/num/med context
    setForm(f => ({ ...f, qty: '', mod: '', ioOverride: null }));
  }

  // Check if current MED is invalid for selected EQUIP (to show warning on MED)

  // Structural errors only for display in form
  const structuralErrors = validationResult && !validationResult.valid
    ? validationResult.errors.filter((e: ValidationError) => e.layer === 'structural')
    : [];
  const semanticErrors = validationResult && !validationResult.valid
    ? validationResult.errors.filter((e: ValidationError) => e.layer === 'semantic')
    : [];

  return (
    <div className="bg-white rounded-xl border p-5 mb-4" style={{ borderColor: '#D3D1C7' }}>
      <h3 className="font-semibold text-sm mb-4" style={{ color: '#2C2C2A' }}>Add Variable</h3>

      {/* Live preview */}
      <div
        className="rounded-lg p-4 mb-4 flex items-center justify-between"
        style={{ background: '#2C2C2A' }}
      >
        <span
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '28px',
            fontWeight: 700,
            color: liveName ? '#1D9E75' : '#888780',
            letterSpacing: '0.05em',
          }}
        >
          {liveName || '···'}
        </span>
        <div className="text-right">
          <span
            className="text-sm font-mono font-bold"
            style={{ color: nameLen === 12 ? '#EF9F27' : nameLen > 12 ? '#E24B4A' : '#888780' }}
          >
            {nameLen}/12
          </span>
          {description && (
            <p className="text-xs mt-1" style={{ color: '#D3D1C7', maxWidth: '240px' }}>{description}</p>
          )}
        </div>
      </div>

      {/* Form fields */}
      <div className="flex flex-wrap gap-3 mb-3">
        {/* EQUIP */}
        <div>
          <label className="text-xs font-medium block mb-1" style={{ color: '#888780' }}>EQUIP *</label>
          <select
            className="border rounded px-2 py-1.5 text-sm font-mono"
            style={{ borderColor: '#D3D1C7', minWidth: '140px' }}
            value={form.equip}
            onChange={e => handleEquipChange(e.target.value)}
          >
            {equipList.map(e => (
              <option key={e.id} value={e.code}>{e.code} — {e.label}</option>
            ))}
          </select>
        </div>

        {/* NUM */}
        {!isSys && (
          <div>
            <label className="text-xs font-medium block mb-1" style={{ color: '#888780' }}>NUM *</label>
            <select
              className="border rounded px-2 py-1.5 text-sm font-mono"
              style={{ borderColor: '#D3D1C7', width: '70px' }}
              value={form.num}
              onChange={e => setForm(f => ({ ...f, num: e.target.value }))}
            >
              {['1','2','3','4','5','6','7','8','9'].map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>
        )}
        {isSys && (
          <div>
            <label className="text-xs font-medium block mb-1" style={{ color: '#888780' }}>NUM</label>
            <div className="px-2 py-1.5 text-xs rounded border" style={{ borderColor: '#D3D1C7', color: '#888780', background: '#F1EFE8' }}>
              n/a (SYS)
            </div>
          </div>
        )}

        {/* MED */}
        <div>
          <label className="text-xs font-medium block mb-1" style={{ color: '#888780' }}>
            MED <span style={{ color: '#888780' }}>(optional)</span>
          </label>
          <select
            className="border rounded px-2 py-1.5 text-sm font-mono"
            style={{ borderColor: '#D3D1C7', minWidth: '140px' }}
            value={form.med}
            onChange={e => setForm(f => ({ ...f, med: e.target.value, qty: '', mod: '' }))}
          >
            <option value="">— none —</option>
            {filteredMeds.map(m => (
              <option key={m.id} value={m.code}>{m.code} — {m.label}</option>
            ))}
          </select>
        </div>

        {/* QTY */}
        <div>
          <label className="text-xs font-medium block mb-1" style={{ color: '#888780' }}>QTY *</label>
          <select
            className="border rounded px-2 py-1.5 text-sm font-mono"
            style={{ borderColor: '#D3D1C7', minWidth: '160px' }}
            value={form.qty}
            onChange={e => handleQtyChange(e.target.value)}
          >
            <option value="">— select —</option>
            {filteredQtys.map(q => (
              <option key={q.id} value={q.code}>{q.code} — {q.label}</option>
            ))}
          </select>
        </div>

        {/* MOD */}
        <div>
          <label className="text-xs font-medium block mb-1" style={{ color: '#888780' }}>
            MOD <span style={{ color: '#888780' }}>(optional)</span>
          </label>
          <select
            className="border rounded px-2 py-1.5 text-sm font-mono"
            style={{ borderColor: '#D3D1C7', minWidth: '140px' }}
            value={form.mod}
            onChange={e => setForm(f => ({ ...f, mod: e.target.value }))}
            disabled={!form.qty}
          >
            <option value="">— none —</option>
            {availableMods.map(m => (
              <option key={m.id} value={m.code}>{m.code} — {m.label}</option>
            ))}
          </select>
        </div>

        {/* IO type + soft override */}
        {form.qty && (
          <div>
            <label className="text-xs font-medium block mb-1" style={{ color: '#888780' }}>I/O type</label>
            <div className="flex items-center gap-1">
              {/* Base type badge — greyed when overridden */}
              {(() => {
                const baseType = qtyList.find(q => q.code === form.qty)?.ioType;
                if (!baseType) return null;
                const overridden = !!form.ioOverride;
                return (
                  <span
                    className="px-2.5 py-1.5 rounded text-xs font-mono font-bold border"
                    style={overridden
                      ? { background: '#F1EFE8', color: '#D3D1C7', borderColor: '#D3D1C7', textDecoration: 'line-through' }
                      : { background: IO_COLORS[baseType].bg, color: IO_COLORS[baseType].text, borderColor: IO_COLORS[baseType].text }
                    }
                    title={`Base type from QTY: ${baseType}`}
                  >
                    {baseType}
                  </span>
                );
              })()}
              <span className="text-xs px-1" style={{ color: '#D3D1C7' }}>→</span>
              {(() => {
                const baseType = qtyList.find(q => q.code === form.qty)?.ioType;
                const allowedOverride = (baseType === 'AI' || baseType === 'AO') ? 'AV' : 'BV';
                return (
                  <button
                    type="button"
                    onClick={() => setForm(f => ({ ...f, ioOverride: f.ioOverride === allowedOverride ? null : allowedOverride }))}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs font-mono font-bold border transition-colors"
                    style={
                      form.ioOverride === allowedOverride
                        ? { background: IO_COLORS[allowedOverride].bg, color: IO_COLORS[allowedOverride].text, borderColor: IO_COLORS[allowedOverride].text }
                        : { background: '#fff', color: '#2C2C2A', borderColor: '#888780', boxShadow: '0 1px 2px rgba(0,0,0,0.08)' }
                    }
                    title={allowedOverride === 'AV' ? 'Override to Analog Value — soft register (setpoints, RS-485 sensors)' : 'Override to Binary Value — soft register (BMS commands, soft flags)'}
                  >
                    <span
                      style={{
                        display: 'inline-block',
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        border: form.ioOverride === allowedOverride ? 'none' : `2px solid #888780`,
                        background: form.ioOverride === allowedOverride ? IO_COLORS[allowedOverride].text : 'transparent',
                        flexShrink: 0,
                      }}
                    />
                    {allowedOverride}
                  </button>
                );
              })()}
            </div>
          </div>
        )}
      </div>

      {/* Warnings */}
      {warnings.map((w, i) => (
        <div key={i} className="flex items-start gap-2 p-2 rounded mb-2 text-xs"
          style={{ background: '#FAEEDA', color: '#854F0B' }}>
          <span>⚠</span><span>{w}</span>
        </div>
      ))}

      {/* Structural errors */}
      {structuralErrors.map((err, i) => (
        <div key={i} className="flex items-start gap-2 p-2 rounded mb-2 text-xs"
          style={{ background: '#FCEBEB', color: '#A32D2D' }}>
          <span>✕</span><span>[{err.rule}] {err.message}</span>
        </div>
      ))}

      {/* Semantic errors */}
      {semanticErrors.map((err, i) => (
        <div key={i} className="flex items-start gap-2 p-2 rounded mb-2 text-xs"
          style={{ background: '#FAEEDA', color: '#854F0B' }}>
          <span>⊘</span><span>{err.message}</span>
        </div>
      ))}

      {/* Valid badge */}
      {validationResult && validationResult.valid && (
        <div className="flex items-center gap-2 p-2 rounded mb-2 text-xs"
          style={{ background: '#E1F5EE', color: '#085041' }}>
          <span>✓</span><span>Name is valid</span>
        </div>
      )}

      <button
        onClick={handleAdd}
        disabled={!validationResult || !validationResult.valid || isBlocked as boolean}
        className="px-4 py-2 rounded text-sm font-medium transition-opacity"
        style={{
          background: '#1D9E75', color: '#fff',
          opacity: (!validationResult || !validationResult.valid) ? 0.4 : 1,
        }}
      >
        Add Variable
      </button>
    </div>
  );
}

// ---- Variable List ----
function VariableList({
  variables, qtyList, onDelete, onUpdateVariable, duplicateName
}: {
  variables: ControllerVariable[];
  qtyList: QtyEntry[];
  onDelete: (id: string) => void;
  onUpdateVariable: (v: ControllerVariable) => void;
  duplicateName: string | null;
}) {
  const [filter, setFilter] = useState('');

  // Group by equip+num
  const groups = useMemo(() => {
    const map = new Map<string, ControllerVariable[]>();
    for (const v of variables) {
      const key = v.equip === 'SYS' ? 'SYS' : v.equip + v.num;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(v);
    }
    const entries = [...map.entries()].sort(([a], [b]) => {
      if (a === 'SYS') return 1;
      if (b === 'SYS') return -1;
      return a.localeCompare(b);
    });
    return entries;
  }, [variables]);

  const filteredGroups = useMemo(() => {
    if (!filter) return groups;
    const q = filter.toUpperCase();
    return groups.map(([key, vars]) => [key, vars.filter((v: ControllerVariable) =>
      v.name.includes(q) || v.description.toLowerCase().includes(filter.toLowerCase())
    )] as [string, ControllerVariable[]]).filter(([, vars]) => vars.length > 0);
  }, [groups, filter]);

  function handleDeviceChange(v: ControllerVariable, patch: Partial<DeviceSupply>) {
    const existing = v.device ?? { supply: false, deviceType: '', signalType: '', quantity: 1 };
    onUpdateVariable({ ...v, device: { ...existing, ...patch } });
  }

  function handleSupplyToggle(v: ControllerVariable, checked: boolean) {
    if (checked) {
      const qtyEntry = qtyList.find(q => q.code === v.qty);
      const effectiveType = (v.ioOverride ?? qtyEntry?.ioType) ?? 'AI';
      const deviceTypeOpts = DEVICE_TYPE_OPTIONS[effectiveType] ?? [];
      const signalTypeOpts = SIGNAL_TYPE_OPTIONS[effectiveType] ?? [];
      const existing = v.device;
      onUpdateVariable({
        ...v,
        device: {
          supply: true,
          deviceType: existing?.deviceType || deviceTypeOpts[0] || '',
          signalType: existing?.signalType || (signalTypeOpts[0] ?? SIGNAL_TYPE_DEFAULT[effectiveType] ?? ''),
          quantity: existing?.quantity ?? 1,
        },
      });
    } else {
      const existing = v.device;
      onUpdateVariable({ ...v, device: { ...existing!, supply: false } });
    }
  }

  return (
    <div className="bg-white rounded-xl border" style={{ borderColor: '#D3D1C7' }}>
      <div className="px-5 py-3 border-b flex items-center gap-3" style={{ borderColor: '#D3D1C7' }}>
        <span className="font-semibold text-sm" style={{ color: '#2C2C2A' }}>
          Variables ({variables.length})
        </span>
        <input
          className="ml-auto border rounded px-2 py-1 text-sm"
          style={{ borderColor: '#D3D1C7', width: '180px' }}
          placeholder="Filter..."
          value={filter}
          onChange={e => setFilter(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto">
        <div className="p-3 max-h-96 overflow-y-auto" style={{ minWidth: '820px' }}>
          {filteredGroups.length === 0 && (
            <p className="text-xs text-center py-4" style={{ color: '#888780' }}>No variables</p>
          )}
          {filteredGroups.map(([key, vars]) => (
            <div key={key} className="mb-4">
              <div className="text-xs font-semibold px-2 py-1 rounded mb-1" style={{ background: '#F1EFE8', color: '#888780' }}>
                <span className="font-mono" style={{ color: '#2C2C2A' }}>{key}</span>
                <span className="ml-2">{vars.length} point{vars.length !== 1 ? 's' : ''}</span>
              </div>
              {/* Table header */}
              <div className="flex items-center gap-1 px-2 py-1 text-xs font-semibold" style={{ color: '#888780' }}>
                <span style={{ width: '140px', flexShrink: 0 }}>Name</span>
                <span style={{ width: '40px', flexShrink: 0 }}>IO</span>
                <span className="flex-1 min-w-0">Description</span>
                <span style={{ width: '44px', flexShrink: 0, textAlign: 'center' }}>Supply</span>
                <span style={{ width: '96px', flexShrink: 0 }}>Device type</span>
                <span style={{ width: '80px', flexShrink: 0 }}>Signal</span>
                <span style={{ width: '44px', flexShrink: 0 }}>Qty</span>
                <span style={{ width: '20px', flexShrink: 0 }}></span>
              </div>
              {vars.map((v: ControllerVariable) => {
                const qtyEntry = qtyList.find(q => q.code === v.qty);
                const effectiveType = (v.ioOverride ?? qtyEntry?.ioType) ?? 'AI';
                const isDupe = duplicateName === v.name;
                const dev = v.device;
                const supplied = dev?.supply ?? false;
                const deviceTypeOpts = DEVICE_TYPE_OPTIONS[effectiveType] ?? [];
                const signalTypeOpts = SIGNAL_TYPE_OPTIONS[effectiveType] ?? [];
                const isFixed = effectiveType === 'AV' || effectiveType === 'BV';
                const noSignal = effectiveType === 'DI' || effectiveType === 'DO';
                const dimStyle: React.CSSProperties = { opacity: 0.4, pointerEvents: 'none' as const };

                return (
                  <div
                    key={v.id}
                    className="flex items-center gap-1 px-2 py-1 rounded group"
                    style={isDupe ? { background: '#FCEBEB' } : {}}
                  >
                    <span
                      className="font-mono font-bold text-xs flex-shrink-0"
                      style={{ width: '140px', color: isDupe ? '#A32D2D' : '#2C2C2A', fontFamily: 'JetBrains Mono, monospace' }}
                    >
                      {v.name}
                    </span>
                    <span style={{ width: '40px', flexShrink: 0 }}>
                      {effectiveType && <IOBadge type={effectiveType} />}
                    </span>
                    <span className="text-xs flex-1 truncate min-w-0" style={{ color: '#888780' }}>{v.description}</span>

                    {/* Supply checkbox */}
                    <span style={{ width: '44px', flexShrink: 0, textAlign: 'center' }}>
                      <input
                        type="checkbox"
                        checked={supplied}
                        onChange={e => handleSupplyToggle(v, e.target.checked)}
                        className="cursor-pointer"
                      />
                    </span>

                    {/* Device type */}
                    <span style={{ width: '96px', flexShrink: 0, ...(!supplied ? dimStyle : {}) }}>
                      <select
                        className="border rounded px-1 py-0.5 text-xs w-full"
                        style={{ borderColor: '#D3D1C7' }}
                        value={dev?.deviceType ?? ''}
                        disabled={!supplied}
                        onChange={e => handleDeviceChange(v, { deviceType: e.target.value })}
                      >
                        {deviceTypeOpts.map(o => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </span>

                    {/* Signal type */}
                    <span style={{ width: '80px', flexShrink: 0, ...(!supplied ? dimStyle : {}) }}>
                      {noSignal ? (
                        <span style={{ width: '80px' }} />
                      ) : isFixed ? (
                        <span className="text-xs px-1" style={{ color: '#888780' }}>RS-485</span>
                      ) : (
                        <select
                          className="border rounded px-1 py-0.5 text-xs w-full"
                          style={{ borderColor: '#D3D1C7' }}
                          value={dev?.signalType ?? ''}
                          disabled={!supplied}
                          onChange={e => handleDeviceChange(v, { signalType: e.target.value })}
                        >
                          {signalTypeOpts.map(o => <option key={o} value={o}>{o}</option>)}
                        </select>
                      )}
                    </span>

                    {/* Qty */}
                    <span style={{ width: '44px', flexShrink: 0, ...(!supplied ? dimStyle : {}) }}>
                      <input
                        type="number"
                        min={1}
                        max={99}
                        className="border rounded px-1 py-0.5 text-xs w-full text-center font-mono"
                        style={{ borderColor: '#D3D1C7' }}
                        value={dev?.quantity ?? 1}
                        disabled={!supplied}
                        onChange={e => handleDeviceChange(v, { quantity: Math.max(1, parseInt(e.target.value) || 1) })}
                      />
                    </span>

                    <button
                      onClick={() => onDelete(v.id)}
                      className="text-xs flex-shrink-0"
                      style={{ width: '20px', color: '#E24B4A' }}
                    >✕</button>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---- Apply Assembly Modal ----
function ApplyAssemblyModal({
  assemblies, equipList,
  equipList: allEquip,
  medList, qtyList, modList, semanticConfig,
  existingNames,
  onApply, onCancel,
}: {
  assemblies: Assembly[];
  equipList: EquipEntry[];
  medList: MedEntry[];
  qtyList: QtyEntry[];
  modList: ModEntry[];
  semanticConfig: SemanticConfig;
  existingNames: string[];
  onApply: (vars: ControllerVariable[], skipped: { name: string; reason: string }[]) => void;
  onCancel: () => void;
}) {
  const [selectedId, setSelectedId] = useState<string>(assemblies[0]?.id ?? '');
  const [num, setNum] = useState('1');

  const selectedAssembly = assemblies.find(a => a.id === selectedId) ?? null;
  const isSys = selectedAssembly?.equipCode === 'SYS';

  function handleApply() {
    if (!selectedAssembly) return;
    const equip = selectedAssembly.equipCode;
    const effectiveNum = isSys ? '' : num;
    const added: ControllerVariable[] = [];
    const skipped: { name: string; reason: string }[] = [];
    const runningNames = [...existingNames];

    for (const pt of selectedAssembly.points) {
      const result = validateVariable(
        equip, effectiveNum, pt.med, pt.qty, pt.mod,
        runningNames, semanticConfig, allEquip, medList, qtyList, modList
      );
      const varName = equip + effectiveNum + pt.med + pt.qty + pt.mod;
      if (result.valid) {
        const desc = generateDescription(equip, effectiveNum, pt.med, pt.qty, pt.mod,
          allEquip, medList, qtyList, modList);
        const v: ControllerVariable = {
          id: uuidv4(),
          equip, num: effectiveNum, med: pt.med, qty: pt.qty, mod: pt.mod,
          name: varName, description: desc,
          ioOverride: pt.ioOverride ?? null,
        };
        added.push(v);
        runningNames.push(varName);
      } else {
        const firstErr = result.errors[0];
        skipped.push({ name: varName, reason: firstErr?.message ?? 'Invalid' });
      }
    }

    onApply(added, skipped);
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{ background: 'rgba(0,0,0,0.5)' }}>
      <div className="bg-white rounded-xl shadow-xl w-full" style={{ maxWidth: '560px' }}>
        <div className="px-6 py-4 border-b" style={{ borderColor: '#D3D1C7' }}>
          <h2 className="font-bold text-lg" style={{ color: '#2C2C2A' }}>Apply Assembly</h2>
          <p className="text-xs mt-1" style={{ color: '#888780' }}>
            Select an assembly to add a standard set of points to this controller
          </p>
        </div>

        <div className="px-6 py-4 space-y-4 max-h-96 overflow-y-auto">
          {assemblies.length === 0 ? (
            <p className="text-sm text-center py-4" style={{ color: '#888780' }}>
              No assemblies yet — create them in the Assemblies tab first
            </p>
          ) : (
            <div className="space-y-2">
              {assemblies.map(a => {
                const eq = equipList.find(e => e.code === a.equipCode);
                return (
                  <div
                    key={a.id}
                    onClick={() => setSelectedId(a.id)}
                    className="p-3 rounded-lg border cursor-pointer transition-colors"
                    style={selectedId === a.id
                      ? { borderColor: '#1D9E75', background: '#E1F5EE' }
                      : { borderColor: '#D3D1C7', background: 'white' }
                    }
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm" style={{ color: '#2C2C2A' }}>{a.name}</span>
                      <span className="font-mono text-xs px-1.5 py-0.5 rounded font-bold"
                        style={{ background: '#F1EFE8', color: '#2C2C2A' }}>
                        {a.equipCode}
                      </span>
                      <span className="text-xs ml-auto" style={{ color: '#888780' }}>
                        {a.points.length} pts
                      </span>
                    </div>
                    {a.description && (
                      <p className="text-xs mt-0.5" style={{ color: '#888780' }}>{a.description}</p>
                    )}
                    {eq && (
                      <p className="text-xs mt-0.5" style={{ color: '#888780' }}>{eq.label}</p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* NUM field (if not SYS) */}
        {selectedAssembly && !isSys && (
          <div className="px-6 py-3 border-t" style={{ borderColor: '#D3D1C7' }}>
            <label className="text-xs font-medium block mb-1" style={{ color: '#888780' }}>
              NUM (equipment instance number)
            </label>
            <select
              className="border rounded px-2 py-1.5 text-sm font-mono"
              style={{ borderColor: '#D3D1C7', width: '80px' }}
              value={num}
              onChange={e => setNum(e.target.value)}
            >
              {['1','2','3','4','5','6','7','8','9'].map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>
        )}
        {selectedAssembly && isSys && (
          <div className="px-6 py-3 border-t" style={{ borderColor: '#D3D1C7' }}>
            <p className="text-xs" style={{ color: '#888780' }}>
              SYS equipment — no NUM required
            </p>
          </div>
        )}

        <div className="px-6 py-4 border-t flex gap-2 justify-end" style={{ borderColor: '#D3D1C7' }}>
          <button onClick={onCancel} className="px-4 py-2 rounded text-sm" style={{ background: '#D3D1C7', color: '#2C2C2A' }}>
            Cancel
          </button>
          <button
            onClick={handleApply}
            disabled={!selectedAssembly}
            className="px-4 py-2 rounded text-sm text-white font-medium"
            style={{ background: selectedAssembly ? '#1D9E75' : '#D3D1C7' }}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}

// ---- Apply Result Toast ----
function ApplyResultBanner({ added, skipped, onDismiss }: {
  added: number;
  skipped: { name: string; reason: string }[];
  onDismiss: () => void;
}) {
  return (
    <div className="rounded-lg p-3 mb-4 border" style={{ background: '#E1F5EE', borderColor: '#1D9E75' }}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <p className="text-sm font-medium" style={{ color: '#085041' }}>
            Applied: {added} point{added !== 1 ? 's' : ''} added.
            {skipped.length > 0 && ` Skipped: ${skipped.length} (see below)`}
          </p>
          {skipped.length > 0 && (
            <ul className="mt-1 space-y-0.5">
              {skipped.map((s, i) => (
                <li key={i} className="text-xs" style={{ color: '#A32D2D' }}>
                  <span className="font-mono font-bold">{s.name}</span> — {s.reason}
                </li>
              ))}
            </ul>
          )}
        </div>
        <button onClick={onDismiss} className="text-xs flex-shrink-0" style={{ color: '#085041' }}>✕</button>
      </div>
    </div>
  );
}

// ---- Hardware IO Panel ----
function HardwareIOPanel({
  controller, qtyList, controllerModels, expansionModules, onUpdate,
}: {
  controller: Controller;
  qtyList: QtyEntry[];
  controllerModels: ControllerModel[];
  expansionModules: ExpansionModule[];
  onUpdate: (c: Controller) => void;
}) {
  const required = useMemo(() => computeRequiredIO(controller.variables, qtyList), [controller.variables, qtyList]);
  const softValues = useMemo(() => countSoftValues(controller.variables), [controller.variables]);
  const available = useMemo(
    () => computeAvailableIO(controller, controllerModels, expansionModules),
    [controller, controllerModels, expansionModules]
  );

  const expansions: ControllerExpansion[] = controller.expansions ?? [];

  function setModelId(id: string) {
    onUpdate({ ...controller, modelId: id || undefined, updatedAt: new Date().toISOString() });
  }

  function addExpansion(moduleId: string) {
    const existing = expansions.find(e => e.moduleId === moduleId);
    let updated: ControllerExpansion[];
    if (existing) {
      updated = expansions.map(e => e.moduleId === moduleId ? { ...e, quantity: e.quantity + 1 } : e);
    } else {
      updated = [...expansions, { moduleId, quantity: 1 }];
    }
    onUpdate({ ...controller, expansions: updated, updatedAt: new Date().toISOString() });
  }

  function updateExpansionQty(moduleId: string, qty: number) {
    if (qty <= 0) {
      onUpdate({ ...controller, expansions: expansions.filter(e => e.moduleId !== moduleId), updatedAt: new Date().toISOString() });
    } else {
      onUpdate({ ...controller, expansions: expansions.map(e => e.moduleId === moduleId ? { ...e, quantity: qty } : e), updatedAt: new Date().toISOString() });
    }
  }

  function removeExpansion(moduleId: string) {
    onUpdate({ ...controller, expansions: expansions.filter(e => e.moduleId !== moduleId), updatedAt: new Date().toISOString() });
  }

  const ioKeys: (keyof IOCount)[] = ['ai', 'ao', 'di', 'do'];
  const ioLabels: Record<keyof IOCount, string> = { ai: 'AI', ao: 'AO', di: 'DI', do: 'DO' };

  function deltaColor(delta: number) {
    return delta < 0 ? '#E24B4A' : '#1D9E75';
  }

  return (
    <div className="bg-white rounded-xl border mt-4" style={{ borderColor: '#D3D1C7' }}>
      <div className="px-5 py-3 border-b" style={{ borderColor: '#D3D1C7' }}>
        <h3 className="font-semibold text-sm" style={{ color: '#2C2C2A' }}>Hardware I/O</h3>
      </div>
      <div className="p-4 space-y-4">
        {/* Model selector */}
        <div>
          <label className="text-xs font-medium block mb-1.5" style={{ color: '#888780' }}>Controller Model</label>
          <select
            className="border rounded px-2 py-1.5 text-sm w-full"
            style={{ borderColor: '#D3D1C7' }}
            value={controller.modelId ?? ''}
            onChange={e => setModelId(e.target.value)}
          >
            <option value="">— No model —</option>
            {controllerModels.map(m => (
              <option key={m.id} value={m.id}>{m.name} — {m.description}</option>
            ))}
          </select>
        </div>

        {/* Expansion modules */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-medium" style={{ color: '#888780' }}>Expansion Modules</label>
          </div>
          {expansions.length > 0 && (
            <div className="space-y-1 mb-2">
              {expansions.map(exp => {
                const mod = expansionModules.find(m => m.id === exp.moduleId);
                if (!mod) return null;
                return (
                  <div key={exp.moduleId} className="flex items-center gap-2 py-1">
                    <span className="text-xs flex-1" style={{ color: '#2C2C2A' }}>{mod.name}</span>
                    <input
                      type="number"
                      min={1}
                      max={8}
                      className="border rounded px-1.5 py-0.5 text-xs font-mono w-14 text-center"
                      style={{ borderColor: '#D3D1C7' }}
                      value={exp.quantity}
                      onChange={e => updateExpansionQty(exp.moduleId, parseInt(e.target.value) || 0)}
                    />
                    <button onClick={() => removeExpansion(exp.moduleId)} className="text-xs" style={{ color: '#E24B4A' }}>✕</button>
                  </div>
                );
              })}
            </div>
          )}
          <select
            className="border rounded px-2 py-1.5 text-xs w-full"
            style={{ borderColor: '#D3D1C7', color: '#888780' }}
            value=""
            onChange={e => { if (e.target.value) addExpansion(e.target.value); }}
          >
            <option value="">+ Add expansion module</option>
            {expansionModules.map(m => (
              <option key={m.id} value={m.id}>{m.name} — {m.description}</option>
            ))}
          </select>
        </div>

        {/* I/O Tally */}
        {!controller.modelId ? (
          <div className="rounded-lg p-3 text-center" style={{ background: '#F1EFE8' }}>
            <p className="text-xs" style={{ color: '#888780' }}>No hardware model selected</p>
            <p className="text-xs mt-0.5" style={{ color: '#888780' }}>Select a controller model above to see I/O usage</p>
          </div>
        ) : available ? (
          <div>
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b" style={{ borderColor: '#D3D1C7' }}>
                  <th className="py-1 text-left font-semibold" style={{ color: '#888780' }}></th>
                  <th className="py-1 text-center font-semibold" style={{ color: '#888780' }}>Required</th>
                  <th className="py-1 text-center font-semibold" style={{ color: '#888780' }}>Available</th>
                  <th className="py-1 text-center font-semibold" style={{ color: '#888780' }}>Δ</th>
                </tr>
              </thead>
              <tbody>
                {ioKeys.map(k => {
                  const req = required[k];
                  const avail = available[k];
                  const delta = avail - req;
                  return (
                    <tr key={k} className="border-b" style={{ borderColor: '#F1EFE8' }}>
                      <td className="py-1.5 font-mono font-bold uppercase" style={{ color: '#888780' }}>{ioLabels[k]}</td>
                      <td className="py-1.5 text-center font-mono" style={{ color: '#2C2C2A' }}>{req}</td>
                      <td className="py-1.5 text-center font-mono" style={{ color: '#2C2C2A' }}>{avail}</td>
                      <td className="py-1.5 text-center font-mono font-bold" style={{ color: deltaColor(delta) }}>
                        {delta >= 0 ? `+${delta}` : delta} {delta >= 0 ? '✓' : '✗'}
                      </td>
                    </tr>
                  );
                })}
                <tr>
                  <td className="py-1.5 font-semibold text-xs" style={{ color: '#2C2C2A' }}>Total</td>
                  <td className="py-1.5 text-center font-mono font-bold" style={{ color: '#2C2C2A' }}>
                    {required.ai + required.ao + required.di + required.do}
                  </td>
                  <td className="py-1.5 text-center font-mono font-bold" style={{ color: '#2C2C2A' }}>
                    {available.ai + available.ao + available.di + available.do}
                  </td>
                  <td className="py-1.5 text-center font-mono font-bold" style={{
                    color: deltaColor(
                      (available.ai + available.ao + available.di + available.do) -
                      (required.ai + required.ao + required.di + required.do)
                    )
                  }}>
                    {(() => {
                      const d = (available.ai + available.ao + available.di + available.do) -
                        (required.ai + required.ao + required.di + required.do);
                      return `${d >= 0 ? '+' : ''}${d} ${d >= 0 ? '✓' : '✗'}`;
                    })()}
                  </td>
                </tr>
              </tbody>
            </table>
            {(softValues.av > 0 || softValues.bv > 0) && (
              <div className="mt-3 pt-2 border-t flex gap-3" style={{ borderColor: '#D3D1C7' }}>
                <span className="text-xs font-medium" style={{ color: '#888780' }}>Soft values:</span>
                {softValues.av > 0 && (
                  <span className="text-xs font-mono font-bold px-1.5 py-0.5 rounded"
                    style={{ background: IO_COLORS.AV.bg, color: IO_COLORS.AV.text }}>
                    AV ×{softValues.av}
                  </span>
                )}
                {softValues.bv > 0 && (
                  <span className="text-xs font-mono font-bold px-1.5 py-0.5 rounded"
                    style={{ background: IO_COLORS.BV.bg, color: IO_COLORS.BV.text }}>
                    BV ×{softValues.bv}
                  </span>
                )}
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}

// ---- Controller Detail (right panel) ----
function ControllerDetail({
  controller, equipList, medList, qtyList, modList, semanticConfig,
  assemblies, controllerModels, expansionModules,
  onUpdate
}: {
  controller: Controller;
  equipList: EquipEntry[];
  medList: MedEntry[];
  qtyList: QtyEntry[];
  modList: ModEntry[];
  semanticConfig: SemanticConfig;
  assemblies: Assembly[];
  controllerModels: ControllerModel[];
  expansionModules: ExpansionModule[];
  onUpdate: (c: Controller) => void;
}) {
  const [editingMeta, setEditingMeta] = useState(false);
  const [metaForm, setMetaForm] = useState({ siteName: controller.siteName, label: controller.label, duplicates: controller.duplicates ?? 1 });
  const [duplicateName, setDuplicateName] = useState<string | null>(null);
  const [showAssemblyModal, setShowAssemblyModal] = useState(false);
  const [applyResult, setApplyResult] = useState<{ added: number; skipped: { name: string; reason: string }[] } | null>(null);

  const existingNames = controller.variables.map(v => v.name);

  function saveMeta() {
    onUpdate({ ...controller, siteName: metaForm.siteName, label: metaForm.label, duplicates: metaForm.duplicates, updatedAt: new Date().toISOString() });
    setEditingMeta(false);
  }

  function handleAdd(v: ControllerVariable) {
    setDuplicateName(null);
    onUpdate({
      ...controller,
      variables: [...controller.variables, v],
      updatedAt: new Date().toISOString(),
    });
  }

  function handleDelete(id: string) {
    setDuplicateName(null);
    onUpdate({
      ...controller,
      variables: controller.variables.filter(v => v.id !== id),
      updatedAt: new Date().toISOString(),
    });
  }

  function handleUpdateVariable(v: ControllerVariable) {
    onUpdate({
      ...controller,
      variables: controller.variables.map(x => x.id === v.id ? v : x),
      updatedAt: new Date().toISOString(),
    });
  }

  function handleApplyAssembly(vars: ControllerVariable[], skipped: { name: string; reason: string }[]) {
    onUpdate({
      ...controller,
      variables: [...controller.variables, ...vars],
      updatedAt: new Date().toISOString(),
    });
    setShowAssemblyModal(false);
    setApplyResult({ added: vars.length, skipped });
  }

  return (
    <div className="flex-1 min-w-0">
      {/* Header */}
      <div className="bg-white rounded-xl border p-4 mb-4 flex items-start justify-between" style={{ borderColor: '#D3D1C7' }}>
        {editingMeta ? (
          <div className="flex gap-3 flex-wrap items-end flex-1">
            <div>
              <label className="text-xs font-medium block mb-1" style={{ color: '#888780' }}>Site Name</label>
              <input className="border rounded px-2 py-1 text-sm" style={{ borderColor: '#D3D1C7' }}
                value={metaForm.siteName} onChange={e => setMetaForm(f => ({ ...f, siteName: e.target.value }))} />
            </div>
            <div className="flex-1 min-w-48">
              <label className="text-xs font-medium block mb-1" style={{ color: '#888780' }}>Controller Label</label>
              <input className="border rounded px-2 py-1 text-sm w-full" style={{ borderColor: '#D3D1C7' }}
                value={metaForm.label} onChange={e => setMetaForm(f => ({ ...f, label: e.target.value }))} />
            </div>
            <div>
              <label className="text-xs font-medium block mb-1" style={{ color: '#888780' }}>Duplicates</label>
              <input type="number" min={1} className="border rounded px-2 py-1 text-sm w-20 font-mono" style={{ borderColor: '#D3D1C7' }}
                value={metaForm.duplicates} onChange={e => setMetaForm(f => ({ ...f, duplicates: Math.max(1, parseInt(e.target.value) || 1) }))} />
            </div>
            <button onClick={saveMeta} className="px-3 py-1.5 rounded text-sm text-white" style={{ background: '#1D9E75' }}>Save</button>
            <button onClick={() => setEditingMeta(false)} className="px-3 py-1.5 rounded text-sm" style={{ background: '#D3D1C7', color: '#2C2C2A' }}>Cancel</button>
          </div>
        ) : (
          <div className="flex-1">
            <p className="text-xs font-semibold" style={{ color: '#888780' }}>{controller.siteName}</p>
            <p className="text-lg font-bold" style={{ color: '#2C2C2A' }}>{controller.label}</p>
            <p className="text-xs mt-1" style={{ color: '#888780' }}>
              Updated {new Date(controller.updatedAt).toLocaleDateString()}
            </p>
          </div>
        )}
        {!editingMeta && (
          <button onClick={() => { setMetaForm({ siteName: controller.siteName, label: controller.label, duplicates: controller.duplicates ?? 1 }); setEditingMeta(true); }}
            className="text-xs px-2 py-1 rounded border ml-4" style={{ borderColor: '#D3D1C7', color: '#888780' }}>
            Edit
          </button>
        )}
      </div>

      {/* Apply result banner */}
      {applyResult && (
        <ApplyResultBanner
          added={applyResult.added}
          skipped={applyResult.skipped}
          onDismiss={() => setApplyResult(null)}
        />
      )}

      {/* Apply Assembly button row */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold uppercase" style={{ color: '#888780' }}>Variables</span>
        <button
          onClick={() => setShowAssemblyModal(true)}
          className="text-sm px-3 py-1.5 rounded border font-medium flex items-center gap-1.5"
          style={{ borderColor: '#1D9E75', color: '#1D9E75', background: 'white' }}
        >
          ⊞ Apply Assembly
        </button>
      </div>

      <VariableForm
        equipList={equipList}
        medList={medList}
        qtyList={qtyList}
        modList={modList}
        semanticConfig={semanticConfig}
        existingNames={existingNames}
        onAdd={handleAdd}
      />

      <VariableList
        variables={controller.variables}
        qtyList={qtyList}
        onDelete={handleDelete}
        onUpdateVariable={handleUpdateVariable}
        duplicateName={duplicateName}
      />

      {/* Hardware I/O Panel */}
      <HardwareIOPanel
        controller={controller}
        qtyList={qtyList}
        controllerModels={controllerModels}
        expansionModules={expansionModules}
        onUpdate={onUpdate}
      />

      {/* Apply Assembly Modal */}
      {showAssemblyModal && (
        <ApplyAssemblyModal
          assemblies={assemblies}
          equipList={equipList}
          medList={medList}
          qtyList={qtyList}
          modList={modList}
          semanticConfig={semanticConfig}
          existingNames={existingNames}
          onApply={handleApplyAssembly}
          onCancel={() => setShowAssemblyModal(false)}
        />
      )}
    </div>
  );
}

// ---- New Controller Modal ----
function NewControllerModal({ onConfirm, onCancel }: {
  onConfirm: (siteName: string, label: string, duplicates: number) => void;
  onCancel: () => void;
}) {
  const [siteName, setSiteName] = useState('');
  const [label, setLabel] = useState('');
  const [duplicates, setDuplicates] = useState(1);
  const [error, setError] = useState('');

  function submit() {
    if (!siteName.trim()) { setError('Site name is required'); return; }
    if (!label.trim()) { setError('Controller label is required'); return; }
    onConfirm(siteName.trim(), label.trim(), duplicates);
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" style={{ background: 'rgba(0,0,0,0.4)' }}>
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl" style={{ borderColor: '#D3D1C7' }}>
        <h2 className="font-bold text-lg mb-4" style={{ color: '#2C2C2A' }}>New Controller</h2>
        <div className="space-y-3 mb-4">
          <div>
            <label className="text-xs font-medium block mb-1" style={{ color: '#888780' }}>Site Name</label>
            <input className="border rounded px-3 py-2 text-sm w-full" style={{ borderColor: '#D3D1C7' }}
              value={siteName} onChange={e => setSiteName(e.target.value)} placeholder="e.g. PACOFS" />
          </div>
          <div>
            <label className="text-xs font-medium block mb-1" style={{ color: '#888780' }}>Controller Label</label>
            <input className="border rounded px-3 py-2 text-sm w-full" style={{ borderColor: '#D3D1C7' }}
              value={label} onChange={e => setLabel(e.target.value)} placeholder="e.g. Basement Plant Room — Eliwell 12400" />
          </div>
          <div>
            <label className="text-xs font-medium block mb-1" style={{ color: '#888780' }}>
              Duplicates — how many identical sets
            </label>
            <input
              type="number"
              min={1}
              className="border rounded px-3 py-2 text-sm w-24 font-mono"
              style={{ borderColor: '#D3D1C7' }}
              value={duplicates}
              onChange={e => setDuplicates(Math.max(1, parseInt(e.target.value) || 1))}
            />
          </div>
        </div>
        {error && <p className="text-xs mb-3" style={{ color: '#E24B4A' }}>{error}</p>}
        <div className="flex gap-2 justify-end">
          <button onClick={onCancel} className="px-4 py-2 rounded text-sm" style={{ background: '#D3D1C7', color: '#2C2C2A' }}>Cancel</button>
          <button onClick={submit} className="px-4 py-2 rounded text-sm text-white" style={{ background: '#1D9E75' }}>Create</button>
        </div>
      </div>
    </div>
  );
}

// ---- Main ----
export default function ControllerBuilderTab({
  equip, med, qty, mod, semanticConfig, controllers,
  assemblies, controllerModels, expansionModules,
  projects, onUpdateControllers, onUpdateProjects,
}: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(
    controllers.length > 0 ? controllers[0].id : null
  );
  const [showNewModal, setShowNewModal] = useState(false);
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [activeProjectId, setActiveProjectId] = useState<string>(
    projects.length > 0 ? projects[0].id : ''
  );

  const selectedController = controllers.find(c => c.id === selectedId) ?? null;

  const handleUpdate = useCallback((updated: Controller) => {
    onUpdateControllers(controllers.map(c => c.id === updated.id ? updated : c));
  }, [controllers, onUpdateControllers]);

  function handleAdd(siteName: string, label: string, duplicates: number) {
    const now = new Date().toISOString();
    const ctrl: Controller = {
      id: uuidv4(),
      siteName,
      label,
      variables: [],
      createdAt: now,
      updatedAt: now,
      projectId: activeProjectId,
      duplicates,
    };
    const updated = [...controllers, ctrl];
    onUpdateControllers(updated);
    setSelectedId(ctrl.id);
    setShowNewModal(false);
  }

  function handleDelete(id: string) {
    if (!confirm('Delete this controller and all its variables?')) return;
    const updated = controllers.filter(c => c.id !== id);
    onUpdateControllers(updated);
    if (selectedId === id) {
      // Select first controller remaining in active project
      const remaining = updated.filter(c => c.projectId === activeProjectId);
      setSelectedId(remaining.length > 0 ? remaining[0].id : null);
    }
  }

  function handleAddProject(name: string, description: string) {
    const now = new Date().toISOString();
    const proj: Project = { id: uuidv4(), name, description, createdAt: now, updatedAt: now };
    const updated = [...projects, proj];
    onUpdateProjects(updated);
    setActiveProjectId(proj.id);
    setShowNewProjectModal(false);
  }

  function handleSelectProject(id: string) {
    setActiveProjectId(id);
    // Select first controller in the newly active project
    const first = controllers.find(c => c.projectId === id);
    setSelectedId(first?.id ?? null);
  }

  function handleExport() {
    const activeProject = projects.find(p => p.id === activeProjectId);
    const projectControllers = controllers.filter(c => c.projectId === activeProjectId);
    exportProjectXlsx(
      activeProject?.name ?? 'BMSHub Project',
      projectControllers,
      controllerModels,
      expansionModules,
      qty,
      equip,
      med,
    );
  }

  return (
    <div className="flex gap-4 h-full" style={{ minHeight: 'calc(100vh - 100px)' }}>
      {/* Left panel */}
      <div
        className="flex-shrink-0 bg-white rounded-xl border p-4 flex flex-col gap-3"
        style={{ width: '280px', borderColor: '#D3D1C7' }}
      >
        <ControllerList
          controllers={controllers}
          selectedId={selectedId}
          onSelect={setSelectedId}
          onAdd={() => setShowNewModal(true)}
          onDelete={handleDelete}
          qtyList={qty}
          controllerModels={controllerModels}
          expansionModules={expansionModules}
          projects={projects}
          activeProjectId={activeProjectId}
          onSelectProject={handleSelectProject}
          onAddProject={() => setShowNewProjectModal(true)}
        />
        {controllers.filter(c => c.projectId === activeProjectId).length > 0 && (
          <button
            onClick={handleExport}
            className="w-full text-sm py-2 rounded font-medium border"
            style={{ borderColor: '#1D9E75', color: '#085041', background: '#E1F5EE' }}
          >
            ↓ Export to Excel
          </button>
        )}
      </div>

      {/* Right panel */}
      <div className="flex-1 min-w-0">
        {selectedController ? (
          <ControllerDetail
            controller={selectedController}
            equipList={equip}
            medList={med}
            qtyList={qty}
            modList={mod}
            semanticConfig={semanticConfig}
            assemblies={assemblies}
            controllerModels={controllerModels}
            expansionModules={expansionModules}
            onUpdate={handleUpdate}
          />
        ) : (
          <div className="flex items-center justify-center h-64 bg-white rounded-xl border" style={{ borderColor: '#D3D1C7' }}>
            <div className="text-center">
              <p className="text-sm mb-3" style={{ color: '#888780' }}>No controller selected</p>
              <button
                onClick={() => setShowNewModal(true)}
                className="px-4 py-2 rounded text-sm text-white"
                style={{ background: '#1D9E75' }}
              >
                Create First Controller
              </button>
            </div>
          </div>
        )}
      </div>

      {showNewModal && (
        <NewControllerModal
          onConfirm={handleAdd}
          onCancel={() => setShowNewModal(false)}
        />
      )}
      {showNewProjectModal && (
        <NewProjectModal
          onConfirm={handleAddProject}
          onCancel={() => setShowNewProjectModal(false)}
        />
      )}
    </div>
  );
}
