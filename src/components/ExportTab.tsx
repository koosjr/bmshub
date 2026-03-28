import { useState, useMemo, useRef } from 'react';
import { Controller, EquipEntry, MedEntry, QtyEntry, ModEntry } from '../types';

interface Props {
  controllers: Controller[];
  equip: EquipEntry[];
  med: MedEntry[];
  qty: QtyEntry[];
  mod: ModEntry[];
  onExportAll: () => string;
  onImport: (json: string) => void;
  onExportForSimulator: () => string;
}

const IO_COLORS: Record<string, { bg: string; text: string }> = {
  AI: { bg: '#E1F5EE', text: '#085041' },
  AO: { bg: '#FAEEDA', text: '#854F0B' },
  DI: { bg: '#FCEBEB', text: '#A32D2D' },
  DO: { bg: '#2C2C2A', text: '#F1EFE8' },
  AV: { bg: '#E8EFF8', text: '#1a3a6b' },
  BV: { bg: '#F0E8F8', text: '#5a1a6b' },
};

function effectiveIOType(v: { qty: string; ioOverride?: 'AV' | 'BV' | null }, qtyList: { code: string; ioType: string }[]): string {
  if (v.ioOverride) return v.ioOverride;
  return qtyList.find(q => q.code === v.qty)?.ioType ?? '??';
}

function CopyBlock({ title, content, lang = 'text' }: { title: string; content: string; lang?: string }) {
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard.writeText(content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="bg-white rounded-xl border mb-4" style={{ borderColor: '#D3D1C7' }}>
      <div className="flex items-center justify-between px-5 py-3 border-b" style={{ borderColor: '#D3D1C7' }}>
        <span className="font-semibold text-sm" style={{ color: '#2C2C2A' }}>{title}</span>
        <button
          onClick={copy}
          className="text-xs px-3 py-1.5 rounded font-medium transition-colors"
          style={copied ? { background: '#E1F5EE', color: '#085041' } : { background: '#F1EFE8', color: '#2C2C2A' }}
        >
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>
      <pre
        className="p-4 text-xs overflow-auto max-h-64"
        style={{
          fontFamily: lang === 'mono' ? 'JetBrains Mono, monospace' : 'JetBrains Mono, monospace',
          color: '#2C2C2A',
          background: '#F1EFE8',
          borderRadius: '0 0 12px 12px',
          whiteSpace: 'pre',
        }}
      >
        {content || '(no content)'}
      </pre>
    </div>
  );
}

export default function ExportTab({ controllers, qty: qtyList, onExportAll, onImport, onExportForSimulator }: Props) {
  const [selectedCtrlId, setSelectedCtrlId] = useState<string>(
    controllers[0]?.id ?? ''
  );
  const [importError, setImportError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const selectedCtrl = controllers.find(c => c.id === selectedCtrlId) ?? controllers[0];

  // ThingsBoard key list
  const tbKeys = useMemo(() => {
    if (!selectedCtrl) return '';
    return selectedCtrl.variables.map(v => v.name).join('\n');
  }, [selectedCtrl]);

  // Eliwell variable declarations
  const eliwellDecl = useMemo(() => {
    if (!selectedCtrl) return '';
    const lines: string[] = [];
    lines.push(`; ${selectedCtrl.siteName} — ${selectedCtrl.label}`);
    lines.push(`; Generated ${new Date().toLocaleDateString()}`);
    lines.push('');

    // Group by effective IO type
    const groups: Record<string, typeof selectedCtrl.variables> = { AI: [], AO: [], DI: [], DO: [], AV: [], BV: [] };
    for (const v of selectedCtrl.variables) {
      const io = effectiveIOType(v, qtyList);
      if (io in groups) groups[io].push(v);
    }

    for (const ioType of ['AI', 'AO', 'DI', 'DO'] as const) {
      const vars = groups[ioType];
      if (vars.length === 0) continue;
      lines.push(`; --- ${ioType} ---`);
      for (const v of vars) {
        const typeName = (ioType === 'AI' || ioType === 'AO') ? 'REAL' : 'BOOL';
        lines.push(`${v.name.padEnd(14)} : ${typeName};  (* ${v.description} *)`);
      }
      lines.push('');
    }

    const softTypes = (['AV', 'BV'] as const).filter(t => groups[t].length > 0);
    if (softTypes.length > 0) {
      lines.push('; --- Software values (AV/BV — no physical I/O channel) ---');
      for (const ioType of softTypes) {
        for (const v of groups[ioType]) {
          const typeName = ioType === 'AV' ? 'REAL' : 'BOOL';
          lines.push(`${v.name.padEnd(14)} : ${typeName};  (* [${ioType}] ${v.description} *)`);
        }
      }
      lines.push('');
    }

    return lines.join('\n').trim();
  }, [selectedCtrl, qtyList]);

  // Human-readable table
  const humanTable = useMemo(() => {
    if (!selectedCtrl) return '';
    const header = `${'#'.padEnd(4)} ${'Name'.padEnd(14)} ${'IO'.padEnd(4)} Description`;
    const sep = '-'.repeat(70);
    const rows = selectedCtrl.variables.map((v, i) => {
      const io = effectiveIOType(v, qtyList);
      return `${String(i + 1).padEnd(4)} ${v.name.padEnd(14)} ${io.padEnd(4)} ${v.description}`;
    });
    return [
      `${selectedCtrl.siteName} — ${selectedCtrl.label}`,
      sep,
      header,
      sep,
      ...rows,
      sep,
      `Total: ${selectedCtrl.variables.length} variables`,
    ].join('\n');
  }, [selectedCtrl, qtyList]);

  function handleImportFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      try {
        const text = ev.target?.result as string;
        JSON.parse(text); // validate
        onImport(text);
        setImportError('');
        alert('Data imported successfully. The page will reload.');
        window.location.reload();
      } catch {
        setImportError('Invalid JSON file');
      }
    };
    reader.readAsText(file);
  }

  function handleExportJson() {
    const json = onExportAll();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bmshub-export.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleExportForSimulator() {
    const json = onExportForSimulator();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'simulator-export.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  if (controllers.length === 0) {
    return (
      <div className="max-w-3xl mx-auto">
        <h1 className="text-xl font-bold mb-4" style={{ color: '#2C2C2A' }}>Export</h1>
        <div className="bg-white rounded-xl border p-8 text-center" style={{ borderColor: '#D3D1C7' }}>
          <p style={{ color: '#888780' }}>No controllers to export. Create one in the Controller Builder tab.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-xl font-bold mb-4" style={{ color: '#2C2C2A' }}>Export</h1>

      {/* Controller selector */}
      <div className="bg-white rounded-xl border p-4 mb-4" style={{ borderColor: '#D3D1C7' }}>
        <label className="text-xs font-medium block mb-2" style={{ color: '#888780' }}>Select Controller</label>
        <select
          className="border rounded px-3 py-2 text-sm w-full"
          style={{ borderColor: '#D3D1C7' }}
          value={selectedCtrlId}
          onChange={e => setSelectedCtrlId(e.target.value)}
        >
          {controllers.map(c => (
            <option key={c.id} value={c.id}>
              {c.siteName} — {c.label} ({c.variables.length} vars)
            </option>
          ))}
        </select>
      </div>

      {selectedCtrl && (
        <>
          {/* Summary bar */}
          <div className="flex gap-3 mb-4 flex-wrap">
            {(['AI','AO','DI','DO'] as const).map(io => {
              const count = selectedCtrl.variables.filter(v => {
                const q = qtyList.find(q => q.code === v.qty);
                return q?.ioType === io;
              }).length;
              if (count === 0) return null;
              const c = IO_COLORS[io];
              return (
                <div key={io} className="px-3 py-1.5 rounded-lg text-sm font-medium"
                  style={{ background: c.bg, color: c.text }}>
                  <span className="font-mono font-bold">{io}</span>
                  <span className="ml-2">{count}</span>
                </div>
              );
            })}
            <div className="px-3 py-1.5 rounded-lg text-sm font-medium" style={{ background: '#F1EFE8', color: '#2C2C2A' }}>
              Total: <strong>{selectedCtrl.variables.length}</strong>
            </div>
          </div>

          <CopyBlock title="ThingsBoard Key List" content={tbKeys} lang="mono" />
          <CopyBlock title="Eliwell Variable Declarations" content={eliwellDecl} lang="mono" />
          <CopyBlock title="Human-Readable Table" content={humanTable} lang="mono" />
        </>
      )}

      {/* JSON Import / Export */}
      <div className="bg-white rounded-xl border p-5" style={{ borderColor: '#D3D1C7' }}>
        <h3 className="font-semibold text-sm mb-4" style={{ color: '#2C2C2A' }}>Full Data — JSON Import / Export</h3>
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={handleExportJson}
            className="px-4 py-2 rounded text-sm font-medium"
            style={{ background: '#1D9E75', color: '#fff' }}
          >
            Export All Data as JSON
          </button>
          <button
            onClick={handleExportForSimulator}
            className="px-4 py-2 rounded text-sm font-medium"
            style={{ background: '#2C6BAD', color: '#fff' }}
          >
            Export for Simulator
          </button>
          <button
            onClick={() => fileRef.current?.click()}
            className="px-4 py-2 rounded text-sm font-medium border"
            style={{ borderColor: '#D3D1C7', color: '#2C2C2A' }}
          >
            Import JSON
          </button>
          <input ref={fileRef} type="file" accept=".json" className="hidden" onChange={handleImportFile} />
        </div>
        {importError && (
          <p className="text-xs mt-2" style={{ color: '#E24B4A' }}>{importError}</p>
        )}
        <p className="text-xs mt-3" style={{ color: '#888780' }}>
          Export saves all dictionaries, controllers, and rules. Import merges / replaces all data.
          Useful for backups and transferring to another browser.
        </p>
      </div>
    </div>
  );
}
