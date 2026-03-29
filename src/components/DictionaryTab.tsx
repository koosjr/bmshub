import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { EquipEntry, MedEntry, QtyEntry, ModEntry, SemanticConfig, Controller } from '../types';

interface Props {
  equip: EquipEntry[];
  med: MedEntry[];
  qty: QtyEntry[];
  mod: ModEntry[];
  semanticConfig: SemanticConfig;
  controllers: Controller[];
  onUpdateEquip: (d: EquipEntry[]) => void;
  onUpdateMed:   (d: MedEntry[]) => void;
  onUpdateQty:   (d: QtyEntry[]) => void;
  onUpdateMod:   (d: ModEntry[]) => void;
}

type IOType = 'AI' | 'AO' | 'DI' | 'DO';

const IO_COLORS: Record<IOType, { bg: string; text: string }> = {
  AI: { bg: '#E1F5EE', text: '#085041' },
  AO: { bg: '#FAEEDA', text: '#854F0B' },
  DI: { bg: '#FCEBEB', text: '#A32D2D' },
  DO: { bg: '#2C2C2A', text: '#F1EFE8' },
};

function Badge({ label }: { label: string }) {
  const colors = IO_COLORS[label as IOType] ?? { bg: '#D3D1C7', text: '#2C2C2A' };
  return (
    <span
      className="px-2 py-0.5 rounded text-xs font-mono font-bold"
      style={{ background: colors.bg, color: colors.text }}
    >
      {label}
    </span>
  );
}

function getEquipUsage(code: string, controllers: Controller[]): string[] {
  const names: string[] = [];
  for (const ctrl of controllers) {
    for (const v of ctrl.variables) {
      if (v.equip === code) {
        names.push(`${ctrl.siteName} / ${ctrl.label}`);
        break;
      }
    }
  }
  return [...new Set(names)];
}

function getMedUsage(code: string, controllers: Controller[]): string[] {
  const names: string[] = [];
  for (const ctrl of controllers) {
    for (const v of ctrl.variables) {
      if (v.med === code) {
        names.push(`${ctrl.siteName} / ${ctrl.label}`);
        break;
      }
    }
  }
  return [...new Set(names)];
}

function getQtyUsage(code: string, controllers: Controller[]): string[] {
  const names: string[] = [];
  for (const ctrl of controllers) {
    for (const v of ctrl.variables) {
      if (v.qty === code) {
        names.push(`${ctrl.siteName} / ${ctrl.label}`);
        break;
      }
    }
  }
  return [...new Set(names)];
}

function getModUsage(code: string, controllers: Controller[]): string[] {
  const names: string[] = [];
  for (const ctrl of controllers) {
    for (const v of ctrl.variables) {
      if (v.mod === code) {
        names.push(`${ctrl.siteName} / ${ctrl.label}`);
        break;
      }
    }
  }
  return [...new Set(names)];
}

interface SectionCardProps { title: string; children: React.ReactNode; }
function SectionCard({ title, children }: SectionCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border mb-6" style={{ borderColor: '#D3D1C7' }}>
      <div className="px-5 py-3 border-b flex items-center" style={{ borderColor: '#D3D1C7' }}>
        <h2 className="font-semibold text-base" style={{ color: '#2C2C2A' }}>{title}</h2>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

// ---- EQUIP Section ----
function EquipSection({ equip, controllers, onUpdate }: {
  equip: EquipEntry[];
  controllers: Controller[];
  onUpdate: (d: EquipEntry[]) => void;
}) {
  const [editing, setEditing] = useState<EquipEntry | null>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ code: '', label: '', takesNum: true });
  const [error, setError] = useState('');

  function startAdd() {
    setForm({ code: '', label: '', takesNum: true });
    setError('');
    setAdding(true);
    setEditing(null);
  }

  function startEdit(e: EquipEntry) {
    setForm({ code: e.code, label: e.label, takesNum: e.takesNum });
    setError('');
    setEditing(e);
    setAdding(false);
  }

  function cancel() { setAdding(false); setEditing(null); setError(''); }

  function validate(): string | null {
    const code = form.code.toUpperCase().trim();
    if (!/^[A-Z]{3}$/.test(code)) return 'Code must be exactly 3 uppercase letters';
    if (!form.label.trim()) return 'Label is required';
    const dupe = equip.find(e =>
      e.code === code && (!editing || e.id !== editing.id)
    );
    if (dupe) return `Code "${code}" already exists`;
    return null;
  }

  function save() {
    const err = validate();
    if (err) { setError(err); return; }
    const code = form.code.toUpperCase().trim();
    if (adding) {
      onUpdate([...equip, { id: uuidv4(), code, label: form.label.trim(), takesNum: form.takesNum }]);
    } else if (editing) {
      onUpdate(equip.map(e => e.id === editing.id
        ? { ...e, code, label: form.label.trim(), takesNum: form.takesNum }
        : e
      ));
    }
    cancel();
  }

  function del(e: EquipEntry) {
    const usage = getEquipUsage(e.code, controllers);
    if (usage.length > 0) {
      alert(`Cannot delete "${e.code}" — used in ${usage.length} controller(s):\n${usage.join('\n')}`);
      return;
    }
    if (!confirm(`Delete EQUIP "${e.code}"?`)) return;
    onUpdate(equip.filter(x => x.id !== e.id));
  }

  return (
    <SectionCard title="EQUIP Codes">
      <table className="w-full text-sm mb-3">
        <thead>
          <tr style={{ color: '#888780' }} className="text-xs uppercase">
            <th className="text-left pb-2 font-medium">Code</th>
            <th className="text-left pb-2 font-medium">Label</th>
            <th className="text-left pb-2 font-medium">Takes NUM</th>
            <th className="text-left pb-2 font-medium">In Use</th>
            <th className="text-left pb-2 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {equip.map(e => {
            const usage = getEquipUsage(e.code, controllers);
            return (
              <tr key={e.id} className="border-t" style={{ borderColor: '#F1EFE8' }}>
                <td className="py-2 pr-4">
                  <span className="font-mono font-bold" style={{ color: '#2C2C2A' }}>{e.code}</span>
                </td>
                <td className="py-2 pr-4" style={{ color: '#2C2C2A' }}>{e.label}</td>
                <td className="py-2 pr-4">
                  {e.takesNum
                    ? <span className="text-xs px-2 py-0.5 rounded" style={{ background: '#E1F5EE', color: '#085041' }}>Yes</span>
                    : <span className="text-xs px-2 py-0.5 rounded" style={{ background: '#F1EFE8', color: '#888780' }}>No</span>
                  }
                </td>
                <td className="py-2 pr-4">
                  <span style={{ color: usage.length > 0 ? '#1D9E75' : '#888780' }} className="text-xs">
                    {usage.length} controller{usage.length !== 1 ? 's' : ''}
                  </span>
                </td>
                <td className="py-2">
                  <button onClick={() => startEdit(e)} className="text-xs mr-2" style={{ color: '#1D9E75' }}>Edit</button>
                  <button onClick={() => del(e)} className="text-xs" style={{ color: '#E24B4A' }}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {(adding || editing) && (
        <div className="p-3 rounded-lg mb-3 border" style={{ background: '#F1EFE8', borderColor: '#D3D1C7' }}>
          <div className="flex gap-3 flex-wrap items-end">
            <div>
              <label className="text-xs font-medium block mb-1" style={{ color: '#888780' }}>Code (3 chars)</label>
              <input
                className="border rounded px-2 py-1 text-sm font-mono w-24 uppercase"
                style={{ borderColor: '#D3D1C7' }}
                maxLength={3}
                value={form.code}
                onChange={e => setForm(f => ({ ...f, code: e.target.value.toUpperCase() }))}
              />
            </div>
            <div className="flex-1 min-w-40">
              <label className="text-xs font-medium block mb-1" style={{ color: '#888780' }}>Label</label>
              <input
                className="border rounded px-2 py-1 text-sm w-full"
                style={{ borderColor: '#D3D1C7' }}
                value={form.label}
                onChange={e => setForm(f => ({ ...f, label: e.target.value }))}
              />
            </div>
            <div>
              <label className="text-xs font-medium block mb-1" style={{ color: '#888780' }}>Takes NUM</label>
              <select
                className="border rounded px-2 py-1 text-sm"
                style={{ borderColor: '#D3D1C7' }}
                value={form.takesNum ? 'yes' : 'no'}
                onChange={e => setForm(f => ({ ...f, takesNum: e.target.value === 'yes' }))}
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <button onClick={save} className="px-3 py-1.5 rounded text-sm text-white" style={{ background: '#1D9E75' }}>Save</button>
            <button onClick={cancel} className="px-3 py-1.5 rounded text-sm" style={{ background: '#D3D1C7', color: '#2C2C2A' }}>Cancel</button>
          </div>
          {error && <p className="text-xs mt-2" style={{ color: '#E24B4A' }}>{error}</p>}
        </div>
      )}

      <button onClick={startAdd} className="text-sm px-3 py-1.5 rounded border" style={{ borderColor: '#1D9E75', color: '#1D9E75' }}>
        + Add EQUIP
      </button>
    </SectionCard>
  );
}

// ---- MED Section ----
function MedSection({ med, controllers, onUpdate }: {
  med: MedEntry[];
  controllers: Controller[];
  onUpdate: (d: MedEntry[]) => void;
}) {
  const [editing, setEditing] = useState<MedEntry | null>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ code: '', label: '' });
  const [error, setError] = useState('');

  function startAdd() { setForm({ code: '', label: '' }); setError(''); setAdding(true); setEditing(null); }
  function startEdit(e: MedEntry) { setForm({ code: e.code, label: e.label }); setError(''); setEditing(e); setAdding(false); }
  function cancel() { setAdding(false); setEditing(null); setError(''); }

  function validate(): string | null {
    const code = form.code.toUpperCase().trim();
    if (!/^[A-Z]{2}$/.test(code)) return 'MED code must be exactly 2 uppercase letters';
    if (!form.label.trim()) return 'Label is required';
    const dupe = med.find(e => e.code === code && (!editing || e.id !== editing.id));
    if (dupe) return `Code "${code}" already exists`;
    return null;
  }

  function save() {
    const err = validate();
    if (err) { setError(err); return; }
    const code = form.code.toUpperCase().trim();
    if (adding) {
      onUpdate([...med, { id: uuidv4(), code, label: form.label.trim() }]);
    } else if (editing) {
      onUpdate(med.map(e => e.id === editing.id ? { ...e, code, label: form.label.trim() } : e));
    }
    cancel();
  }

  function del(e: MedEntry) {
    const usage = getMedUsage(e.code, controllers);
    if (usage.length > 0) {
      alert(`Cannot delete "${e.code}" — used in ${usage.length} controller(s):\n${usage.join('\n')}`);
      return;
    }
    if (!confirm(`Delete MED "${e.code}"?`)) return;
    onUpdate(med.filter(x => x.id !== e.id));
  }

  return (
    <SectionCard title="MED Codes">
      <table className="w-full text-sm mb-3">
        <thead>
          <tr style={{ color: '#888780' }} className="text-xs uppercase">
            <th className="text-left pb-2 font-medium">Code</th>
            <th className="text-left pb-2 font-medium">Label</th>
            <th className="text-left pb-2 font-medium">In Use</th>
            <th className="text-left pb-2 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {med.map(e => {
            const usage = getMedUsage(e.code, controllers);
            return (
              <tr key={e.id} className="border-t" style={{ borderColor: '#F1EFE8' }}>
                <td className="py-2 pr-4"><span className="font-mono font-bold">{e.code}</span></td>
                <td className="py-2 pr-4">{e.label}</td>
                <td className="py-2 pr-4"><span style={{ color: usage.length > 0 ? '#1D9E75' : '#888780' }} className="text-xs">{usage.length}</span></td>
                <td className="py-2">
                  <button onClick={() => startEdit(e)} className="text-xs mr-2" style={{ color: '#1D9E75' }}>Edit</button>
                  <button onClick={() => del(e)} className="text-xs" style={{ color: '#E24B4A' }}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {(adding || editing) && (
        <div className="p-3 rounded-lg mb-3 border" style={{ background: '#F1EFE8', borderColor: '#D3D1C7' }}>
          <div className="flex gap-3 flex-wrap items-end">
            <div>
              <label className="text-xs font-medium block mb-1" style={{ color: '#888780' }}>Code (2 chars)</label>
              <input className="border rounded px-2 py-1 text-sm font-mono w-20 uppercase" style={{ borderColor: '#D3D1C7' }}
                maxLength={2} value={form.code} onChange={e => setForm(f => ({ ...f, code: e.target.value.toUpperCase() }))} />
            </div>
            <div className="flex-1 min-w-40">
              <label className="text-xs font-medium block mb-1" style={{ color: '#888780' }}>Label</label>
              <input className="border rounded px-2 py-1 text-sm w-full" style={{ borderColor: '#D3D1C7' }}
                value={form.label} onChange={e => setForm(f => ({ ...f, label: e.target.value }))} />
            </div>
            <button onClick={save} className="px-3 py-1.5 rounded text-sm text-white" style={{ background: '#1D9E75' }}>Save</button>
            <button onClick={cancel} className="px-3 py-1.5 rounded text-sm" style={{ background: '#D3D1C7', color: '#2C2C2A' }}>Cancel</button>
          </div>
          {error && <p className="text-xs mt-2" style={{ color: '#E24B4A' }}>{error}</p>}
        </div>
      )}
      <button onClick={startAdd} className="text-sm px-3 py-1.5 rounded border" style={{ borderColor: '#1D9E75', color: '#1D9E75' }}>+ Add MED</button>
    </SectionCard>
  );
}

// ---- QTY Section ----
function QtySection({ qty, controllers, onUpdate }: {
  qty: QtyEntry[];
  controllers: Controller[];
  onUpdate: (d: QtyEntry[]) => void;
}) {
  const [editing, setEditing] = useState<QtyEntry | null>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ code: '', label: '', ioType: 'AI' as IOType });
  const [error, setError] = useState('');

  function startAdd() { setForm({ code: '', label: '', ioType: 'AI' }); setError(''); setAdding(true); setEditing(null); }
  function startEdit(e: QtyEntry) { setForm({ code: e.code, label: e.label, ioType: e.ioType }); setError(''); setEditing(e); setAdding(false); }
  function cancel() { setAdding(false); setEditing(null); setError(''); }

  function validate(): string | null {
    const code = form.code.toUpperCase().trim();
    if (!/^[A-Z0-9]{3,4}$/.test(code)) return 'QTY code must be 3–4 uppercase alphanumeric chars';
    if (!form.label.trim()) return 'Label is required';
    const dupe = qty.find(e => e.code === code && (!editing || e.id !== editing.id));
    if (dupe) return `Code "${code}" already exists`;
    return null;
  }

  function save() {
    const err = validate();
    if (err) { setError(err); return; }
    const code = form.code.toUpperCase().trim();
    if (adding) {
      onUpdate([...qty, { id: uuidv4(), code, label: form.label.trim(), ioType: form.ioType }]);
    } else if (editing) {
      onUpdate(qty.map(e => e.id === editing.id ? { ...e, code, label: form.label.trim(), ioType: form.ioType } : e));
    }
    cancel();
  }

  function del(e: QtyEntry) {
    const usage = getQtyUsage(e.code, controllers);
    if (usage.length > 0) {
      alert(`Cannot delete "${e.code}" — used in ${usage.length} controller(s):\n${usage.join('\n')}`);
      return;
    }
    if (!confirm(`Delete QTY "${e.code}"?`)) return;
    onUpdate(qty.filter(x => x.id !== e.id));
  }

  return (
    <SectionCard title="QTY Codes">
      <table className="w-full text-sm mb-3">
        <thead>
          <tr style={{ color: '#888780' }} className="text-xs uppercase">
            <th className="text-left pb-2 font-medium">Code</th>
            <th className="text-left pb-2 font-medium">Label</th>
            <th className="text-left pb-2 font-medium">IO Type</th>
            <th className="text-left pb-2 font-medium">In Use</th>
            <th className="text-left pb-2 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {qty.map(e => {
            const usage = getQtyUsage(e.code, controllers);
            return (
              <tr key={e.id} className="border-t" style={{ borderColor: '#F1EFE8' }}>
                <td className="py-2 pr-4"><span className="font-mono font-bold">{e.code}</span></td>
                <td className="py-2 pr-4">{e.label}</td>
                <td className="py-2 pr-4"><Badge label={e.ioType} /></td>
                <td className="py-2 pr-4"><span style={{ color: usage.length > 0 ? '#1D9E75' : '#888780' }} className="text-xs">{usage.length}</span></td>
                <td className="py-2">
                  <button onClick={() => startEdit(e)} className="text-xs mr-2" style={{ color: '#1D9E75' }}>Edit</button>
                  <button onClick={() => del(e)} className="text-xs" style={{ color: '#E24B4A' }}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {(adding || editing) && (
        <div className="p-3 rounded-lg mb-3 border" style={{ background: '#F1EFE8', borderColor: '#D3D1C7' }}>
          <div className="flex gap-3 flex-wrap items-end">
            <div>
              <label className="text-xs font-medium block mb-1" style={{ color: '#888780' }}>Code (3–4 chars)</label>
              <input className="border rounded px-2 py-1 text-sm font-mono w-24 uppercase" style={{ borderColor: '#D3D1C7' }}
                maxLength={4} value={form.code} onChange={e => setForm(f => ({ ...f, code: e.target.value.toUpperCase() }))} />
            </div>
            <div className="flex-1 min-w-40">
              <label className="text-xs font-medium block mb-1" style={{ color: '#888780' }}>Label</label>
              <input className="border rounded px-2 py-1 text-sm w-full" style={{ borderColor: '#D3D1C7' }}
                value={form.label} onChange={e => setForm(f => ({ ...f, label: e.target.value }))} />
            </div>
            <div>
              <label className="text-xs font-medium block mb-1" style={{ color: '#888780' }}>IO Type</label>
              <select className="border rounded px-2 py-1 text-sm" style={{ borderColor: '#D3D1C7' }}
                value={form.ioType} onChange={e => setForm(f => ({ ...f, ioType: e.target.value as IOType }))}>
                <option value="AI">AI</option>
                <option value="AO">AO</option>
                <option value="DI">DI</option>
                <option value="DO">DO</option>
              </select>
            </div>
            <button onClick={save} className="px-3 py-1.5 rounded text-sm text-white" style={{ background: '#1D9E75' }}>Save</button>
            <button onClick={cancel} className="px-3 py-1.5 rounded text-sm" style={{ background: '#D3D1C7', color: '#2C2C2A' }}>Cancel</button>
          </div>
          {error && <p className="text-xs mt-2" style={{ color: '#E24B4A' }}>{error}</p>}
        </div>
      )}
      <button onClick={startAdd} className="text-sm px-3 py-1.5 rounded border" style={{ borderColor: '#1D9E75', color: '#1D9E75' }}>+ Add QTY</button>
    </SectionCard>
  );
}

// ---- MOD Section ----
function ModSection({ mod, controllers, onUpdate }: {
  mod: ModEntry[];
  controllers: Controller[];
  onUpdate: (d: ModEntry[]) => void;
}) {
  const [editing, setEditing] = useState<ModEntry | null>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ code: '', label: '' });
  const [error, setError] = useState('');

  function startAdd() { setForm({ code: '', label: '' }); setError(''); setAdding(true); setEditing(null); }
  function startEdit(e: ModEntry) { setForm({ code: e.code, label: e.label }); setError(''); setEditing(e); setAdding(false); }
  function cancel() { setAdding(false); setEditing(null); setError(''); }

  function validate(): string | null {
    const code = form.code.toUpperCase().trim();
    if (!/^[A-Z0-9]{1,4}$/.test(code)) return 'MOD code must be 1–4 uppercase alphanumeric chars';
    if (!form.label.trim()) return 'Label is required';
    const dupe = mod.find(e => e.code === code && (!editing || e.id !== editing.id));
    if (dupe) return `Code "${code}" already exists`;
    return null;
  }

  function save() {
    const err = validate();
    if (err) { setError(err); return; }
    const code = form.code.toUpperCase().trim();
    if (adding) {
      onUpdate([...mod, { id: uuidv4(), code, label: form.label.trim() }]);
    } else if (editing) {
      onUpdate(mod.map(e => e.id === editing.id ? { ...e, code, label: form.label.trim() } : e));
    }
    cancel();
  }

  function del(e: ModEntry) {
    const usage = getModUsage(e.code, controllers);
    if (usage.length > 0) {
      alert(`Cannot delete "${e.code}" — used in ${usage.length} controller(s):\n${usage.join('\n')}`);
      return;
    }
    if (!confirm(`Delete MOD "${e.code}"?`)) return;
    onUpdate(mod.filter(x => x.id !== e.id));
  }

  return (
    <SectionCard title="MOD Codes">
      <table className="w-full text-sm mb-3">
        <thead>
          <tr style={{ color: '#888780' }} className="text-xs uppercase">
            <th className="text-left pb-2 font-medium">Code</th>
            <th className="text-left pb-2 font-medium">Label</th>
            <th className="text-left pb-2 font-medium">In Use</th>
            <th className="text-left pb-2 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {mod.map(e => {
            const usage = getModUsage(e.code, controllers);
            return (
              <tr key={e.id} className="border-t" style={{ borderColor: '#F1EFE8' }}>
                <td className="py-2 pr-4"><span className="font-mono font-bold">{e.code}</span></td>
                <td className="py-2 pr-4">{e.label}</td>
                <td className="py-2 pr-4"><span style={{ color: usage.length > 0 ? '#1D9E75' : '#888780' }} className="text-xs">{usage.length}</span></td>
                <td className="py-2">
                  <button onClick={() => startEdit(e)} className="text-xs mr-2" style={{ color: '#1D9E75' }}>Edit</button>
                  <button onClick={() => del(e)} className="text-xs" style={{ color: '#E24B4A' }}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {(adding || editing) && (
        <div className="p-3 rounded-lg mb-3 border" style={{ background: '#F1EFE8', borderColor: '#D3D1C7' }}>
          <div className="flex gap-3 flex-wrap items-end">
            <div>
              <label className="text-xs font-medium block mb-1" style={{ color: '#888780' }}>Code (1–4 chars)</label>
              <input className="border rounded px-2 py-1 text-sm font-mono w-24 uppercase" style={{ borderColor: '#D3D1C7' }}
                maxLength={4} value={form.code} onChange={e => setForm(f => ({ ...f, code: e.target.value.toUpperCase() }))} />
            </div>
            <div className="flex-1 min-w-40">
              <label className="text-xs font-medium block mb-1" style={{ color: '#888780' }}>Label</label>
              <input className="border rounded px-2 py-1 text-sm w-full" style={{ borderColor: '#D3D1C7' }}
                value={form.label} onChange={e => setForm(f => ({ ...f, label: e.target.value }))} />
            </div>
            <button onClick={save} className="px-3 py-1.5 rounded text-sm text-white" style={{ background: '#1D9E75' }}>Save</button>
            <button onClick={cancel} className="px-3 py-1.5 rounded text-sm" style={{ background: '#D3D1C7', color: '#2C2C2A' }}>Cancel</button>
          </div>
          {error && <p className="text-xs mt-2" style={{ color: '#E24B4A' }}>{error}</p>}
        </div>
      )}
      <button onClick={startAdd} className="text-sm px-3 py-1.5 rounded border" style={{ borderColor: '#1D9E75', color: '#1D9E75' }}>+ Add MOD</button>
    </SectionCard>
  );
}

// ---- Semantic Config Section ----
function SemanticConfigSection({ cfg, equip, med, qty, mod }: {
  cfg: SemanticConfig;
  equip: EquipEntry[];
  med: MedEntry[];
  qty: QtyEntry[];
  mod: ModEntry[];
}) {
  const [openTable, setOpenTable] = useState<'equip' | 'med' | 'qty'>('equip');

  function equipLabel(code: string) { return equip.find(e => e.code === code)?.label ?? code; }
  function medLabel(code: string)   { return code === '' ? '(none)' : (med.find(m => m.code === code)?.label ?? code); }
  function qtyLabel(code: string)   { return qty.find(q => q.code === code)?.label ?? code; }
  function modLabel(code: string)   { return code === '' ? '(none)' : (mod.find(m => m.code === code)?.label ?? code); }

  const tabStyle = (active: boolean) => ({
    padding: '6px 14px',
    borderRadius: '6px 6px 0 0',
    fontWeight: active ? 700 : 400,
    fontSize: '12px',
    cursor: 'pointer',
    border: '1px solid',
    borderBottom: active ? '1px solid #fff' : '1px solid #D3D1C7',
    background: active ? '#fff' : '#F1EFE8',
    color: active ? '#2C2C2A' : '#888780',
    marginRight: '4px',
    marginBottom: '-1px',
    position: 'relative' as const,
    zIndex: active ? 1 : 0,
  });

  function CodePill({ code, title }: { code: string; title: string }) {
    return (
      <span
        title={title}
        className="inline-block font-mono text-xs px-1.5 py-0.5 rounded mr-1 mb-1"
        style={{ background: code === '' ? '#F1EFE8' : '#E1F5EE', color: code === '' ? '#888780' : '#085041', border: '1px solid', borderColor: code === '' ? '#D3D1C7' : '#A8D5C4' }}
      >
        {code === '' ? '∅' : code}
      </span>
    );
  }

  return (
    <SectionCard title="Semantic Filter Tables">
      <p className="text-xs mb-4" style={{ color: '#888780' }}>
        Three allowlist tables control what combinations are valid in the builder.
        Each dropdown filters to only show valid options based on the previous selection.
      </p>

      {/* Tab bar */}
      <div style={{ borderBottom: '1px solid #D3D1C7', marginBottom: '0' }}>
        <button style={tabStyle(openTable === 'equip')} onClick={() => setOpenTable('equip')}>
          Table 1 — EQUIP → MED
        </button>
        <button style={tabStyle(openTable === 'med')} onClick={() => setOpenTable('med')}>
          Table 2 — MED → QTY
        </button>
        <button style={tabStyle(openTable === 'qty')} onClick={() => setOpenTable('qty')}>
          Table 3 — QTY → MOD
        </button>
      </div>

      <div className="border rounded-b rounded-tr p-4" style={{ borderColor: '#D3D1C7', background: '#fff' }}>

        {/* Table 1: EQUIP → valid MEDs */}
        {openTable === 'equip' && (
          <div>
            <p className="text-xs mb-3" style={{ color: '#888780' }}>
              For each equipment type, which media codes are valid. ∅ means "no medium" (status/fault points).
            </p>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs uppercase" style={{ color: '#888780' }}>
                  <th className="text-left pb-2 font-medium w-24">EQUIP</th>
                  <th className="text-left pb-2 font-medium" style={{ color: '#888780' }}>Equipment</th>
                  <th className="text-left pb-2 font-medium">Valid Media</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(cfg.equipMeds).map(([equipCode, meds]) => (
                  <tr key={equipCode} className="border-t" style={{ borderColor: '#F1EFE8' }}>
                    <td className="py-2 pr-3 align-top">
                      <span className="font-mono text-xs font-bold" style={{ color: '#2C2C2A' }}>{equipCode}</span>
                    </td>
                    <td className="py-2 pr-4 align-top text-xs" style={{ color: '#888780', whiteSpace: 'nowrap' }}>
                      {equipLabel(equipCode)}
                    </td>
                    <td className="py-1.5 align-top">
                      {meds.map(m => <CodePill key={m} code={m} title={medLabel(m)} />)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Table 2: MED → valid QTYs */}
        {openTable === 'med' && (
          <div>
            <p className="text-xs mb-3" style={{ color: '#888780' }}>
              For each medium, which quantity codes are valid. ∅ row covers points with no medium selected.
            </p>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs uppercase" style={{ color: '#888780' }}>
                  <th className="text-left pb-2 font-medium w-16">MED</th>
                  <th className="text-left pb-2 font-medium w-36">Medium</th>
                  <th className="text-left pb-2 font-medium">Valid Quantities</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(cfg.medQtys).map(([medCode, qtys]) => (
                  <tr key={medCode} className="border-t" style={{ borderColor: '#F1EFE8' }}>
                    <td className="py-2 pr-3 align-top">
                      <span className="font-mono text-xs font-bold" style={{ color: '#2C2C2A' }}>
                        {medCode === '' ? '∅' : medCode}
                      </span>
                    </td>
                    <td className="py-2 pr-4 align-top text-xs" style={{ color: '#888780', whiteSpace: 'nowrap' }}>
                      {medLabel(medCode)}
                    </td>
                    <td className="py-1.5 align-top">
                      {qtys.map(q => <CodePill key={q} code={q} title={qtyLabel(q)} />)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Table 3: QTY → valid MODs */}
        {openTable === 'qty' && (
          <div>
            <p className="text-xs mb-3" style={{ color: '#888780' }}>
              For each quantity, which modifier codes are valid. ∅ means "no modifier" is allowed.
            </p>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs uppercase" style={{ color: '#888780' }}>
                  <th className="text-left pb-2 font-medium w-20">QTY</th>
                  <th className="text-left pb-2 font-medium w-40">Quantity</th>
                  <th className="text-left pb-2 font-medium">Valid Modifiers</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(cfg.qtyMods).map(([qtyCode, mods]) => (
                  <tr key={qtyCode} className="border-t" style={{ borderColor: '#F1EFE8' }}>
                    <td className="py-2 pr-3 align-top">
                      <span className="font-mono text-xs font-bold" style={{ color: '#2C2C2A' }}>{qtyCode}</span>
                    </td>
                    <td className="py-2 pr-4 align-top text-xs" style={{ color: '#888780', whiteSpace: 'nowrap' }}>
                      {qtyLabel(qtyCode)}
                    </td>
                    <td className="py-1.5 align-top">
                      {mods.map(m => <CodePill key={m} code={m} title={modLabel(m)} />)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </SectionCard>
  );
}

// ---- Main DictionaryTab ----
export default function DictionaryTab(props: Props) {
  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-xl font-bold mb-4" style={{ color: '#2C2C2A' }}>Dictionary</h1>
      <EquipSection equip={props.equip} controllers={props.controllers} onUpdate={props.onUpdateEquip} />
      <MedSection med={props.med} controllers={props.controllers} onUpdate={props.onUpdateMed} />
      <QtySection qty={props.qty} controllers={props.controllers} onUpdate={props.onUpdateQty} />
      <ModSection mod={props.mod} controllers={props.controllers} onUpdate={props.onUpdateMod} />
      <SemanticConfigSection cfg={props.semanticConfig} equip={props.equip} med={props.med} qty={props.qty} mod={props.mod} />
    </div>
  );
}
