import { useState, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  EquipEntry, MedEntry, QtyEntry, ModEntry,
  Assembly, AssemblyPoint, ControllerModel, ExpansionModule, IOCount, SemanticConfig,
} from '../types';
import { isMedAllowed, isQtyAllowed, getValidMods } from '../validation';

interface Props {
  equip: EquipEntry[];
  med: MedEntry[];
  qty: QtyEntry[];
  mod: ModEntry[];
  semanticConfig: SemanticConfig;
  assemblies: Assembly[];
  controllerModels: ControllerModel[];
  expansionModules: ExpansionModule[];
  onUpdateAssemblies: (d: Assembly[]) => void;
  onUpdateControllerModels: (d: ControllerModel[]) => void;
  onUpdateExpansionModules: (d: ExpansionModule[]) => void;
}

const IO_COLORS: Record<string, { bg: string; text: string }> = {
  AI: { bg: '#E1F5EE', text: '#085041' },
  AO: { bg: '#FAEEDA', text: '#854F0B' },
  DI: { bg: '#FCEBEB', text: '#A32D2D' },
  DO: { bg: '#2C2C2A', text: '#F1EFE8' },
};



// ---- Assembly Point Row editor ----
function AssemblyPointRow({
  point, index, total,
  equipCode, medList, qtyList, modList, semanticConfig,
  onUpdate, onDelete, onMoveUp, onMoveDown,
}: {
  point: AssemblyPoint;
  index: number;
  total: number;
  equipCode: string;
  medList: MedEntry[];
  qtyList: QtyEntry[];
  modList: ModEntry[];
  semanticConfig: SemanticConfig;
  onUpdate: (p: AssemblyPoint) => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}) {
  const suffix = point.med + point.qty + point.mod;
  const qtyEntry = qtyList.find(q => q.code === point.qty);

  // Filter MED: only show media allowed for this EQUIP
  const filteredMeds = useMemo(() =>
    medList.filter(m => isMedAllowed(equipCode, m.code, semanticConfig)),
    [medList, equipCode, semanticConfig]
  );

  // Filter QTY: only show QTYs allowed for the selected MED
  const filteredQtys = useMemo(() =>
    qtyList.filter(q => isQtyAllowed(point.med, q.code, semanticConfig)),
    [qtyList, point.med, semanticConfig]
  );

  // Filter MOD: use semanticConfig if defined, otherwise show all
  const availableMods = useMemo(() => {
    if (!point.qty) return [];
    const valid = getValidMods(point.qty, semanticConfig);
    return valid !== null
      ? modList.filter(m => valid.includes(m.code))
      : modList;
  }, [point.qty, modList, semanticConfig]);

  function handleMedChange(code: string) {
    // Clear QTY if it's no longer valid for the new MED
    const qtyStillOk = !point.qty || isQtyAllowed(code, point.qty, semanticConfig);
    onUpdate({ ...point, med: code, qty: qtyStillOk ? point.qty : '', mod: qtyStillOk ? point.mod : '' });
  }

  function handleQtyChange(code: string) {
    const valid = getValidMods(code, semanticConfig);
    const modOk = !point.mod || (valid === null || valid.includes(point.mod));
    onUpdate({ ...point, qty: code, mod: modOk ? point.mod : '' });
  }

  const baseIOType = qtyEntry?.ioType ?? null;
  const allowedOverride = baseIOType === 'AI' || baseIOType === 'AO' ? 'AV' : 'BV';
  const ioOverride = point.ioOverride ?? null;
  const overridden = !!ioOverride;

  function toggleOverride() {
    if (!baseIOType) return;
    onUpdate({ ...point, ioOverride: ioOverride === allowedOverride ? null : allowedOverride });
  }

  return (
    <div className="flex items-center gap-2 py-1.5 border-b last:border-b-0" style={{ borderColor: '#F1EFE8' }}>
      {/* Move buttons */}
      <div className="flex flex-col gap-0.5 flex-shrink-0">
        <button
          onClick={onMoveUp}
          disabled={index === 0}
          className="text-xs leading-none px-1 py-0.5 rounded"
          style={{ color: index === 0 ? '#D3D1C7' : '#888780', background: '#F1EFE8' }}
          title="Move up"
        >▲</button>
        <button
          onClick={onMoveDown}
          disabled={index === total - 1}
          className="text-xs leading-none px-1 py-0.5 rounded"
          style={{ color: index === total - 1 ? '#D3D1C7' : '#888780', background: '#F1EFE8' }}
          title="Move down"
        >▼</button>
      </div>

      {/* MED */}
      <select
        className="border rounded px-1.5 py-1 text-xs font-mono"
        style={{ borderColor: '#D3D1C7', minWidth: '140px' }}
        value={point.med}
        onChange={e => handleMedChange(e.target.value)}
      >
        <option value="">— no medium —</option>
        {filteredMeds.map(m => (
          <option key={m.id} value={m.code}>{m.code} — {m.label}</option>
        ))}
      </select>

      {/* QTY */}
      <select
        className="border rounded px-1.5 py-1 text-xs font-mono"
        style={{ borderColor: '#D3D1C7', minWidth: '170px' }}
        value={point.qty}
        onChange={e => handleQtyChange(e.target.value)}
      >
        <option value="">— select QTY —</option>
        {filteredQtys.map(q => (
          <option key={q.id} value={q.code}>{q.code} — {q.label}</option>
        ))}
      </select>

      {/* MOD */}
      <select
        className="border rounded px-1.5 py-1 text-xs font-mono"
        style={{ borderColor: '#D3D1C7', minWidth: '130px' }}
        value={point.mod}
        onChange={e => onUpdate({ ...point, mod: e.target.value })}
        disabled={!point.qty}
      >
        <option value="">— no mod —</option>
        {availableMods.map(m => (
          <option key={m.id} value={m.code}>{m.code} — {m.label}</option>
        ))}
      </select>

      {/* Preview suffix */}
      <span className="font-mono text-xs font-bold flex-shrink-0" style={{ color: '#2C2C2A', minWidth: '90px' }}>
        {equipCode}#{suffix || '···'}
      </span>

      {/* IO type + AV/BV override */}
      <div className="flex items-center gap-1 flex-shrink-0">
        {baseIOType && (
          <>
            <span
              className="px-1.5 py-0.5 rounded text-xs font-mono font-bold border"
              style={overridden
                ? { background: '#F1EFE8', color: '#D3D1C7', borderColor: '#D3D1C7', textDecoration: 'line-through' }
                : { background: IO_COLORS[baseIOType]?.bg ?? '#F1EFE8', color: IO_COLORS[baseIOType]?.text ?? '#888780', borderColor: IO_COLORS[baseIOType]?.text ?? '#D3D1C7' }
              }
            >{baseIOType}</span>
            <span className="text-xs" style={{ color: '#D3D1C7' }}>→</span>
            <button
              type="button"
              onClick={toggleOverride}
              className="flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-mono font-bold border transition-colors"
              style={overridden
                ? { background: IO_COLORS[allowedOverride]?.bg ?? '#E1F5EE', color: IO_COLORS[allowedOverride]?.text ?? '#085041', borderColor: IO_COLORS[allowedOverride]?.text ?? '#1D9E75' }
                : { background: '#fff', color: '#2C2C2A', borderColor: '#888780', boxShadow: '0 1px 2px rgba(0,0,0,0.08)' }
              }
              title={`Override to ${allowedOverride} (soft register)`}
            >
              <span style={{
                display: 'inline-block', width: '7px', height: '7px', borderRadius: '50%', flexShrink: 0,
                border: overridden ? 'none' : '2px solid #888780',
                background: overridden ? (IO_COLORS[allowedOverride]?.text ?? '#085041') : 'transparent',
              }} />
              {allowedOverride}
            </button>
          </>
        )}
      </div>

      {/* Delete — always visible */}
      <button
        onClick={onDelete}
        className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded border text-xs font-bold transition-colors"
        style={{ color: '#E24B4A', borderColor: '#E24B4A', background: '#FCEBEB' }}
        title="Remove point"
      >✕</button>
    </div>
  );
}

// ---- Assembly Edit Modal ----
function AssemblyModal({
  assembly, equipList, medList, qtyList, modList, semanticConfig,
  onSave, onCancel,
}: {
  assembly: Assembly | null;
  equipList: EquipEntry[];
  medList: MedEntry[];
  qtyList: QtyEntry[];
  modList: ModEntry[];
  semanticConfig: SemanticConfig;
  onSave: (a: Assembly) => void;
  onCancel: () => void;
}) {
  const isNew = assembly === null;
  const [name, setName] = useState(assembly?.name ?? '');
  const [equipCode, setEquipCode] = useState(assembly?.equipCode ?? (equipList[0]?.code ?? ''));
  const [description, setDescription] = useState(assembly?.description ?? '');
  const [points, setPoints] = useState<AssemblyPoint[]>(assembly?.points ?? []);
  const [error, setError] = useState('');

  function addPoint() {
    setPoints(p => [...p, { id: uuidv4(), med: '', qty: '', mod: '' }]);
  }

  function updatePoint(index: number, updated: AssemblyPoint) {
    setPoints(p => p.map((pt, i) => i === index ? updated : pt));
  }

  function deletePoint(index: number) {
    setPoints(p => p.filter((_, i) => i !== index));
  }

  function moveUp(index: number) {
    if (index === 0) return;
    setPoints(p => {
      const arr = [...p];
      [arr[index - 1], arr[index]] = [arr[index], arr[index - 1]];
      return arr;
    });
  }

  function moveDown(index: number) {
    setPoints(p => {
      if (index >= p.length - 1) return p;
      const arr = [...p];
      [arr[index], arr[index + 1]] = [arr[index + 1], arr[index]];
      return arr;
    });
  }

  function handleSave() {
    if (!name.trim()) { setError('Name is required'); return; }
    if (!equipCode) { setError('Equipment is required'); return; }
    if (points.some(p => !p.qty)) { setError('All points must have a QTY selected'); return; }
    onSave({
      id: assembly?.id ?? uuidv4(),
      name: name.trim(),
      equipCode,
      description: description.trim(),
      points,
    });
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{ background: 'rgba(0,0,0,0.5)' }}>
      <div className="bg-white rounded-xl shadow-xl w-full flex flex-col" style={{ maxWidth: '920px', maxHeight: '90vh' }}>
        <div className="px-6 py-4 border-b" style={{ borderColor: '#D3D1C7' }}>
          <h2 className="font-bold text-lg" style={{ color: '#2C2C2A' }}>
            {isNew ? 'New Assembly' : 'Edit Assembly'}
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {/* Name */}
          <div>
            <label className="text-xs font-medium block mb-1" style={{ color: '#888780' }}>Name *</label>
            <input
              className="border rounded px-3 py-2 text-sm w-full"
              style={{ borderColor: '#D3D1C7' }}
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Chiller — Full monitoring"
            />
          </div>

          {/* Equipment */}
          <div>
            <label className="text-xs font-medium block mb-1" style={{ color: '#888780' }}>Equipment *</label>
            <select
              className="border rounded px-3 py-2 text-sm w-full font-mono"
              style={{ borderColor: '#D3D1C7' }}
              value={equipCode}
              onChange={e => { setEquipCode(e.target.value); setPoints([]); }}
            >
              {equipList.map(e => (
                <option key={e.id} value={e.code}>{e.code} — {e.label}</option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-medium block mb-1" style={{ color: '#888780' }}>Description</label>
            <input
              className="border rounded px-3 py-2 text-sm w-full"
              style={{ borderColor: '#D3D1C7' }}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Short description of this assembly"
            />
          </div>

          {/* Points */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-medium" style={{ color: '#888780' }}>
                Points ({points.length})
              </label>
              <button
                onClick={addPoint}
                className="text-xs px-2 py-1 rounded"
                style={{ background: '#1D9E75', color: '#fff' }}
              >+ Add Point</button>
            </div>

            {points.length === 0 ? (
              <p className="text-xs text-center py-4 rounded border" style={{ color: '#888780', borderColor: '#D3D1C7' }}>
                No points yet — click "Add Point" to begin
              </p>
            ) : (
              <div className="border rounded-lg p-2" style={{ borderColor: '#D3D1C7' }}>
                <div className="flex gap-2 px-1 pb-1 text-xs font-medium" style={{ color: '#888780' }}>
                  <span className="w-5 flex-shrink-0"></span>
                  <span style={{ minWidth: '140px' }}>MED</span>
                  <span style={{ minWidth: '170px' }}>QTY</span>
                  <span style={{ minWidth: '130px' }}>MOD</span>
                  <span style={{ minWidth: '90px' }}>Preview</span>
                  <span style={{ minWidth: '120px' }}>I/O type</span>
                  <span style={{ width: '24px' }}></span>
                </div>
                {points.map((pt, i) => (
                  <AssemblyPointRow
                    key={pt.id}
                    point={pt}
                    index={i}
                    total={points.length}
                    equipCode={equipCode}
                    medList={medList}
                    qtyList={qtyList}
                    modList={modList}
                    semanticConfig={semanticConfig}
                    onUpdate={updated => updatePoint(i, updated)}
                    onDelete={() => deletePoint(i)}
                    onMoveUp={() => moveUp(i)}
                    onMoveDown={() => moveDown(i)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {error && (
          <div className="px-6 pb-2">
            <p className="text-xs" style={{ color: '#E24B4A' }}>{error}</p>
          </div>
        )}

        <div className="px-6 py-4 border-t flex gap-2 justify-end" style={{ borderColor: '#D3D1C7' }}>
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded text-sm"
            style={{ background: '#D3D1C7', color: '#2C2C2A' }}
          >Cancel</button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded text-sm text-white"
            style={{ background: '#1D9E75' }}
          >{isNew ? 'Create' : 'Save'}</button>
        </div>
      </div>
    </div>
  );
}

// ---- IO Count form helper ----
function IOCountForm({
  label, io, onChange,
}: {
  label: string;
  io: IOCount;
  onChange: (io: IOCount) => void;
}) {
  function set(key: keyof IOCount, val: string) {
    const n = Math.max(0, parseInt(val) || 0);
    onChange({ ...io, [key]: n });
  }
  return (
    <div>
      <label className="text-xs font-medium block mb-2" style={{ color: '#888780' }}>{label}</label>
      <div className="flex gap-2 flex-wrap">
        {(['ai', 'ao', 'di', 'do'] as (keyof IOCount)[]).map(k => (
          <div key={k}>
            <label className="text-xs block mb-0.5 font-mono font-bold uppercase" style={{ color: '#888780' }}>{k}</label>
            <input
              type="number"
              min={0}
              className="border rounded px-2 py-1 text-sm font-mono w-16"
              style={{ borderColor: '#D3D1C7' }}
              value={io[k]}
              onChange={e => set(k, e.target.value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// ---- Controller Model Modal ----
function ControllerModelModal({
  model, onSave, onCancel,
}: {
  model: ControllerModel | null;
  onSave: (m: ControllerModel) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState(model?.name ?? '');
  const [description, setDescription] = useState(model?.description ?? '');
  const [io, setIo] = useState<IOCount>(model?.io ?? { ai: 0, ao: 0, di: 0, do: 0 });
  const [error, setError] = useState('');

  function handleSave() {
    if (!name.trim()) { setError('Name is required'); return; }
    onSave({ id: model?.id ?? uuidv4(), name: name.trim(), description: description.trim(), io });
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{ background: 'rgba(0,0,0,0.5)' }}>
      <div className="bg-white rounded-xl shadow-xl w-full" style={{ maxWidth: '460px' }}>
        <div className="px-6 py-4 border-b" style={{ borderColor: '#D3D1C7' }}>
          <h2 className="font-bold text-lg" style={{ color: '#2C2C2A' }}>
            {model === null ? 'New Controller Model' : 'Edit Controller Model'}
          </h2>
        </div>
        <div className="px-6 py-4 space-y-4">
          <div>
            <label className="text-xs font-medium block mb-1" style={{ color: '#888780' }}>Name *</label>
            <input className="border rounded px-3 py-2 text-sm w-full" style={{ borderColor: '#D3D1C7' }}
              value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Eliwell 12600" />
          </div>
          <div>
            <label className="text-xs font-medium block mb-1" style={{ color: '#888780' }}>Description</label>
            <input className="border rounded px-3 py-2 text-sm w-full" style={{ borderColor: '#D3D1C7' }}
              value={description} onChange={e => setDescription(e.target.value)} placeholder="Short description" />
          </div>
          <IOCountForm label="I/O Channels" io={io} onChange={setIo} />
        </div>
        {error && <p className="px-6 pb-2 text-xs" style={{ color: '#E24B4A' }}>{error}</p>}
        <div className="px-6 py-4 border-t flex gap-2 justify-end" style={{ borderColor: '#D3D1C7' }}>
          <button onClick={onCancel} className="px-4 py-2 rounded text-sm" style={{ background: '#D3D1C7', color: '#2C2C2A' }}>Cancel</button>
          <button onClick={handleSave} className="px-4 py-2 rounded text-sm text-white" style={{ background: '#1D9E75' }}>
            {model === null ? 'Create' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ---- Expansion Module Modal ----
function ExpansionModuleModal({
  module: mod, onSave, onCancel,
}: {
  module: ExpansionModule | null;
  onSave: (m: ExpansionModule) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState(mod?.name ?? '');
  const [description, setDescription] = useState(mod?.description ?? '');
  const [io, setIo] = useState<IOCount>(mod?.io ?? { ai: 0, ao: 0, di: 0, do: 0 });
  const [error, setError] = useState('');

  function handleSave() {
    if (!name.trim()) { setError('Name is required'); return; }
    onSave({ id: mod?.id ?? uuidv4(), name: name.trim(), description: description.trim(), io });
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{ background: 'rgba(0,0,0,0.5)' }}>
      <div className="bg-white rounded-xl shadow-xl w-full" style={{ maxWidth: '460px' }}>
        <div className="px-6 py-4 border-b" style={{ borderColor: '#D3D1C7' }}>
          <h2 className="font-bold text-lg" style={{ color: '#2C2C2A' }}>
            {mod === null ? 'New Expansion Module' : 'Edit Expansion Module'}
          </h2>
        </div>
        <div className="px-6 py-4 space-y-4">
          <div>
            <label className="text-xs font-medium block mb-1" style={{ color: '#888780' }}>Name *</label>
            <input className="border rounded px-3 py-2 text-sm w-full" style={{ borderColor: '#D3D1C7' }}
              value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Eliwell XM-8DI" />
          </div>
          <div>
            <label className="text-xs font-medium block mb-1" style={{ color: '#888780' }}>Description</label>
            <input className="border rounded px-3 py-2 text-sm w-full" style={{ borderColor: '#D3D1C7' }}
              value={description} onChange={e => setDescription(e.target.value)} placeholder="Short description" />
          </div>
          <IOCountForm label="I/O Channels" io={io} onChange={setIo} />
        </div>
        {error && <p className="px-6 pb-2 text-xs" style={{ color: '#E24B4A' }}>{error}</p>}
        <div className="px-6 py-4 border-t flex gap-2 justify-end" style={{ borderColor: '#D3D1C7' }}>
          <button onClick={onCancel} className="px-4 py-2 rounded text-sm" style={{ background: '#D3D1C7', color: '#2C2C2A' }}>Cancel</button>
          <button onClick={handleSave} className="px-4 py-2 rounded text-sm text-white" style={{ background: '#1D9E75' }}>
            {mod === null ? 'Create' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ---- Main AssembliesTab ----
export default function AssembliesTab({
  equip, med, qty, mod, semanticConfig,
  assemblies, controllerModels, expansionModules,
  onUpdateAssemblies, onUpdateControllerModels, onUpdateExpansionModules,
}: Props) {
  const [editingAssembly, setEditingAssembly] = useState<Assembly | null>(null);
  const [showAssemblyModal, setShowAssemblyModal] = useState(false);
  const [assemblyIsNew, setAssemblyIsNew] = useState(false);
  const [editingModel, setEditingModel] = useState<ControllerModel | null>(null);
  const [showModelModal, setShowModelModal] = useState(false);
  const [modelIsNew, setModelIsNew] = useState(false);
  const [editingModule, setEditingModule] = useState<ExpansionModule | null>(null);
  const [showModuleModal, setShowModuleModal] = useState(false);
  const [moduleIsNew, setModuleIsNew] = useState(false);

  // Clone state
  const [cloningAssembly, setCloningAssembly] = useState<Assembly | null>(null);
  const [cloneEquip, setCloneEquip] = useState('');

  // Assembly CRUD
  function openNewAssembly() {
    setEditingAssembly(null);
    setAssemblyIsNew(true);
    setShowAssemblyModal(true);
  }
  function openEditAssembly(a: Assembly) {
    setEditingAssembly(a);
    setAssemblyIsNew(false);
    setShowAssemblyModal(true);
  }
  function handleSaveAssembly(a: Assembly) {
    if (assemblyIsNew) {
      onUpdateAssemblies([...assemblies, a]);
    } else {
      onUpdateAssemblies(assemblies.map(x => x.id === a.id ? a : x));
    }
    setShowAssemblyModal(false);
  }
  function handleDeleteAssembly(id: string) {
    if (!confirm('Delete this assembly?')) return;
    onUpdateAssemblies(assemblies.filter(a => a.id !== id));
  }
  function openClone(a: Assembly) {
    setCloningAssembly(a);
    setCloneEquip(a.equipCode);
  }
  function handleConfirmClone() {
    if (!cloningAssembly || !cloneEquip) return;
    const clone: Assembly = {
      ...cloningAssembly,
      id: uuidv4(),
      equipCode: cloneEquip,
      name: cloningAssembly.name + ' (copy)',
    };
    onUpdateAssemblies([...assemblies, clone]);
    setCloningAssembly(null);
  }

  // Controller Model CRUD
  function openNewModel() {
    setEditingModel(null);
    setModelIsNew(true);
    setShowModelModal(true);
  }
  function openEditModel(m: ControllerModel) {
    setEditingModel(m);
    setModelIsNew(false);
    setShowModelModal(true);
  }
  function handleSaveModel(m: ControllerModel) {
    if (modelIsNew) {
      onUpdateControllerModels([...controllerModels, m]);
    } else {
      onUpdateControllerModels(controllerModels.map(x => x.id === m.id ? m : x));
    }
    setShowModelModal(false);
  }
  function handleDeleteModel(id: string) {
    if (!confirm('Delete this controller model?')) return;
    onUpdateControllerModels(controllerModels.filter(m => m.id !== id));
  }

  // Expansion Module CRUD
  function openNewModule() {
    setEditingModule(null);
    setModuleIsNew(true);
    setShowModuleModal(true);
  }
  function openEditModule(m: ExpansionModule) {
    setEditingModule(m);
    setModuleIsNew(false);
    setShowModuleModal(true);
  }
  function handleSaveModule(m: ExpansionModule) {
    if (moduleIsNew) {
      onUpdateExpansionModules([...expansionModules, m]);
    } else {
      onUpdateExpansionModules(expansionModules.map(x => x.id === m.id ? m : x));
    }
    setShowModuleModal(false);
  }
  function handleDeleteModule(id: string) {
    if (!confirm('Delete this expansion module?')) return;
    onUpdateExpansionModules(expansionModules.filter(m => m.id !== id));
  }

  return (
    <div className="space-y-6">
      {/* ---- Section 1: Assembly Library ---- */}
      <div className="bg-white rounded-xl border" style={{ borderColor: '#D3D1C7' }}>
        <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: '#D3D1C7' }}>
          <div>
            <h2 className="font-bold text-base" style={{ color: '#2C2C2A' }}>Assembly Library</h2>
            <p className="text-xs mt-0.5" style={{ color: '#888780' }}>
              Named templates of variable points for a specific equipment type
            </p>
          </div>
          <button
            onClick={openNewAssembly}
            className="text-sm px-3 py-1.5 rounded font-medium"
            style={{ background: '#1D9E75', color: '#fff' }}
          >+ New Assembly</button>
        </div>

        {assemblies.length === 0 ? (
          <p className="text-sm text-center py-8" style={{ color: '#888780' }}>No assemblies yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b" style={{ borderColor: '#D3D1C7' }}>
                  <th className="px-4 py-2 text-left text-xs font-semibold" style={{ color: '#888780' }}>Name</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold" style={{ color: '#888780' }}>Equipment</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold" style={{ color: '#888780' }}>Points</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold" style={{ color: '#888780' }}>Description</th>
                  <th className="px-4 py-2 text-right text-xs font-semibold" style={{ color: '#888780' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {assemblies.map(a => {
                  const equipEntry = equip.find(e => e.code === a.equipCode);
                  return (
                    <tr key={a.id} className="border-b last:border-b-0 hover:bg-gray-50 transition-colors" style={{ borderColor: '#F1EFE8' }}>
                      <td className="px-4 py-3 font-medium" style={{ color: '#2C2C2A' }}>{a.name}</td>
                      <td className="px-4 py-3">
                        <span className="font-mono text-xs font-bold px-2 py-0.5 rounded"
                          style={{ background: '#E1F5EE', color: '#085041' }}>
                          {a.equipCode}
                        </span>
                        {equipEntry && (
                          <span className="ml-2 text-xs" style={{ color: '#888780' }}>{equipEntry.label}</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-xs" style={{ color: '#888780' }}>
                        {a.points.length} point{a.points.length !== 1 ? 's' : ''}
                      </td>
                      <td className="px-4 py-3 text-xs" style={{ color: '#888780' }}>{a.description}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex gap-2 justify-end">
                          <button
                            onClick={() => openEditAssembly(a)}
                            className="text-xs px-2 py-1 rounded border"
                            style={{ borderColor: '#D3D1C7', color: '#888780' }}
                          >Edit</button>
                          <button
                            onClick={() => openClone(a)}
                            className="text-xs px-2 py-1 rounded border"
                            style={{ borderColor: '#1D9E75', color: '#085041' }}
                          >Clone</button>
                          <button
                            onClick={() => handleDeleteAssembly(a.id)}
                            className="text-xs px-2 py-1 rounded border"
                            style={{ borderColor: '#E24B4A', color: '#E24B4A' }}
                          >Delete</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ---- Section 2: Hardware Library ---- */}
      <div>
        <h2 className="font-bold text-base mb-3 px-1" style={{ color: '#2C2C2A' }}>Hardware Library</h2>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Controller Models */}
          <div className="bg-white rounded-xl border" style={{ borderColor: '#D3D1C7' }}>
            <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: '#D3D1C7' }}>
              <h3 className="font-semibold text-sm" style={{ color: '#2C2C2A' }}>Controller Models</h3>
              <button
                onClick={openNewModel}
                className="text-xs px-2 py-1 rounded"
                style={{ background: '#1D9E75', color: '#fff' }}
              >+ New</button>
            </div>
            {controllerModels.length === 0 ? (
              <p className="text-sm text-center py-6" style={{ color: '#888780' }}>No controller models</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b" style={{ borderColor: '#D3D1C7' }}>
                      <th className="px-3 py-2 text-left font-semibold" style={{ color: '#888780' }}>Name</th>
                      <th className="px-2 py-2 text-center font-semibold" style={{ color: '#888780' }}>AI</th>
                      <th className="px-2 py-2 text-center font-semibold" style={{ color: '#888780' }}>AO</th>
                      <th className="px-2 py-2 text-center font-semibold" style={{ color: '#888780' }}>DI</th>
                      <th className="px-2 py-2 text-center font-semibold" style={{ color: '#888780' }}>DO</th>
                      <th className="px-2 py-2 text-center font-semibold" style={{ color: '#888780' }}>Total</th>
                      <th className="px-3 py-2 text-right font-semibold" style={{ color: '#888780' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {controllerModels.map(m => (
                      <tr key={m.id} className="border-b last:border-b-0" style={{ borderColor: '#F1EFE8' }}>
                        <td className="px-3 py-2">
                          <p className="font-medium" style={{ color: '#2C2C2A' }}>{m.name}</p>
                          <p style={{ color: '#888780' }}>{m.description}</p>
                        </td>
                        <td className="px-2 py-2 text-center font-mono" style={{ color: '#085041' }}>{m.io.ai}</td>
                        <td className="px-2 py-2 text-center font-mono" style={{ color: '#854F0B' }}>{m.io.ao}</td>
                        <td className="px-2 py-2 text-center font-mono" style={{ color: '#A32D2D' }}>{m.io.di}</td>
                        <td className="px-2 py-2 text-center font-mono" style={{ color: '#2C2C2A' }}>{m.io.do}</td>
                        <td className="px-2 py-2 text-center font-mono font-bold" style={{ color: '#2C2C2A' }}>
                          {m.io.ai + m.io.ao + m.io.di + m.io.do}
                        </td>
                        <td className="px-3 py-2 text-right">
                          <div className="flex gap-1.5 justify-end">
                            <button onClick={() => openEditModel(m)} className="px-2 py-0.5 rounded border text-xs"
                              style={{ borderColor: '#D3D1C7', color: '#888780' }}>Edit</button>
                            <button onClick={() => handleDeleteModel(m.id)} className="px-2 py-0.5 rounded border text-xs"
                              style={{ borderColor: '#E24B4A', color: '#E24B4A' }}>Del</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Expansion Modules */}
          <div className="bg-white rounded-xl border" style={{ borderColor: '#D3D1C7' }}>
            <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: '#D3D1C7' }}>
              <h3 className="font-semibold text-sm" style={{ color: '#2C2C2A' }}>Expansion Modules</h3>
              <button
                onClick={openNewModule}
                className="text-xs px-2 py-1 rounded"
                style={{ background: '#1D9E75', color: '#fff' }}
              >+ New</button>
            </div>
            {expansionModules.length === 0 ? (
              <p className="text-sm text-center py-6" style={{ color: '#888780' }}>No expansion modules</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b" style={{ borderColor: '#D3D1C7' }}>
                      <th className="px-3 py-2 text-left font-semibold" style={{ color: '#888780' }}>Name</th>
                      <th className="px-2 py-2 text-center font-semibold" style={{ color: '#888780' }}>AI</th>
                      <th className="px-2 py-2 text-center font-semibold" style={{ color: '#888780' }}>AO</th>
                      <th className="px-2 py-2 text-center font-semibold" style={{ color: '#888780' }}>DI</th>
                      <th className="px-2 py-2 text-center font-semibold" style={{ color: '#888780' }}>DO</th>
                      <th className="px-2 py-2 text-center font-semibold" style={{ color: '#888780' }}>Total</th>
                      <th className="px-3 py-2 text-right font-semibold" style={{ color: '#888780' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {expansionModules.map(m => (
                      <tr key={m.id} className="border-b last:border-b-0" style={{ borderColor: '#F1EFE8' }}>
                        <td className="px-3 py-2">
                          <p className="font-medium" style={{ color: '#2C2C2A' }}>{m.name}</p>
                          <p style={{ color: '#888780' }}>{m.description}</p>
                        </td>
                        <td className="px-2 py-2 text-center font-mono" style={{ color: '#085041' }}>{m.io.ai}</td>
                        <td className="px-2 py-2 text-center font-mono" style={{ color: '#854F0B' }}>{m.io.ao}</td>
                        <td className="px-2 py-2 text-center font-mono" style={{ color: '#A32D2D' }}>{m.io.di}</td>
                        <td className="px-2 py-2 text-center font-mono" style={{ color: '#2C2C2A' }}>{m.io.do}</td>
                        <td className="px-2 py-2 text-center font-mono font-bold" style={{ color: '#2C2C2A' }}>
                          {m.io.ai + m.io.ao + m.io.di + m.io.do}
                        </td>
                        <td className="px-3 py-2 text-right">
                          <div className="flex gap-1.5 justify-end">
                            <button onClick={() => openEditModule(m)} className="px-2 py-0.5 rounded border text-xs"
                              style={{ borderColor: '#D3D1C7', color: '#888780' }}>Edit</button>
                            <button onClick={() => handleDeleteModule(m.id)} className="px-2 py-0.5 rounded border text-xs"
                              style={{ borderColor: '#E24B4A', color: '#E24B4A' }}>Del</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Clone modal */}
      {cloningAssembly && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="bg-white rounded-xl shadow-xl p-6 w-full" style={{ maxWidth: '420px' }}>
            <h3 className="font-bold text-base mb-1" style={{ color: '#2C2C2A' }}>Clone Assembly</h3>
            <p className="text-xs mb-4" style={{ color: '#888780' }}>
              Cloning <strong>{cloningAssembly.name}</strong>. All points will be copied. Select the target equipment type:
            </p>
            <select
              className="w-full border rounded px-3 py-2 text-sm font-mono mb-5"
              style={{ borderColor: '#D3D1C7' }}
              value={cloneEquip}
              onChange={e => setCloneEquip(e.target.value)}
            >
              {equip.map(e => (
                <option key={e.id} value={e.code}>{e.code} — {e.label}</option>
              ))}
            </select>
            <div className="flex gap-2 justify-end">
              <button onClick={() => setCloningAssembly(null)}
                className="px-4 py-2 rounded text-sm" style={{ background: '#D3D1C7', color: '#2C2C2A' }}>
                Cancel
              </button>
              <button onClick={handleConfirmClone}
                className="px-4 py-2 rounded text-sm text-white" style={{ background: '#1D9E75' }}>
                Clone
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      {showAssemblyModal && (
        <AssemblyModal
          assembly={assemblyIsNew ? null : editingAssembly}
          equipList={equip}
          medList={med}
          qtyList={qty}
          modList={mod}
          semanticConfig={semanticConfig}
          onSave={handleSaveAssembly}
          onCancel={() => setShowAssemblyModal(false)}
        />
      )}
      {showModelModal && (
        <ControllerModelModal
          model={modelIsNew ? null : editingModel}
          onSave={handleSaveModel}
          onCancel={() => setShowModelModal(false)}
        />
      )}
      {showModuleModal && (
        <ExpansionModuleModal
          module={moduleIsNew ? null : editingModule}
          onSave={handleSaveModule}
          onCancel={() => setShowModuleModal(false)}
        />
      )}
    </div>
  );
}
