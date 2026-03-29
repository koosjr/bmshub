// C:\Dev\bmshub\src\simulatorExport.ts
import { Controller, QtyEntry } from './types';

export interface SimExportPoint {
  tag: string;
  description: string;
  io_type: 'AI' | 'AO' | 'DI' | 'DO';
}

export interface SimExportDevice {
  id: string;
  name: string;
  description: string;
  points: SimExportPoint[];
}

export interface SimulatorExportFile {
  version: string;
  project: string;
  exported_at: string;
  devices: SimExportDevice[];
}

function resolveIOType(
  variable: Controller['variables'][number],
  qtyList: QtyEntry[],
): 'AI' | 'AO' | 'DI' | 'DO' | null {
  if (variable.ioOverride === 'AV' || variable.ioOverride === 'BV') return null; // software only
  const ioType = qtyList.find(q => q.code === variable.qty)?.ioType;
  if (!ioType || !['AI', 'AO', 'DI', 'DO'].includes(ioType)) return null;
  return ioType as 'AI' | 'AO' | 'DI' | 'DO';
}

export function exportForSimulator(
  controllers: Controller[],
  qtyList: QtyEntry[],
  projectName: string,
  projectId: string | null = null,
): string {
  const devices: SimExportDevice[] = [];

  for (const ctrl of controllers) {
    if (projectId !== null && ctrl.projectId !== projectId) continue; // filter by project
    const points: SimExportPoint[] = [];
    for (const v of ctrl.variables) {
      const io = resolveIOType(v, qtyList);
      if (!io) continue; // skip AV/BV soft points
      points.push({ tag: v.name, description: v.description, io_type: io });
    }
    if (points.length === 0) continue;

    const deviceName = ctrl.siteName
      ? `${ctrl.siteName} — ${ctrl.label}`
      : ctrl.label;

    devices.push({
      id: ctrl.id,
      name: deviceName,
      description: ctrl.label,
      points,
    });
  }

  const payload: SimulatorExportFile = {
    version: '1.0',
    project: projectName,
    exported_at: new Date().toISOString(),
    devices,
  };

  return JSON.stringify(payload, null, 2);
}
