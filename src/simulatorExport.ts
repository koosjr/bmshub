// C:\Dev\bmshub\src\simulatorExport.ts
import { Controller, QtyEntry, ControllerModel } from './types';

export interface SimExportPoint {
  tag: string;
  description: string;
  io_type: 'AI' | 'AO' | 'DI' | 'DO' | 'AV' | 'BV';
}

export interface SimExportDevice {
  id: string;
  name: string;
  profile_name: string;            // TB device profile — same for all devices of same type
  description: string;
  modbus_address_offset: number;   // 0 = no offset; -1 = Eliwell 1-based docs
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
): 'AI' | 'AO' | 'DI' | 'DO' | 'AV' | 'BV' | null {
  if (variable.ioOverride === 'AV') return 'AV';
  if (variable.ioOverride === 'BV') return 'BV';
  const ioType = qtyList.find(q => q.code === variable.qty)?.ioType;
  if (!ioType || !['AI', 'AO', 'DI', 'DO'].includes(ioType)) return null;
  return ioType as 'AI' | 'AO' | 'DI' | 'DO';
}

export function exportForSimulator(
  controllers: Controller[],
  qtyList: QtyEntry[],
  projectName: string,
  projectId: string | null = null,
  controllerModels: ControllerModel[] = [],
): string {
  const devices: SimExportDevice[] = [];

  for (const ctrl of controllers) {
    if (projectId !== null && ctrl.projectId !== projectId) continue; // filter by project
    const points: SimExportPoint[] = [];
    for (const v of ctrl.variables) {
      const io = resolveIOType(v, qtyList);
      if (!io) continue; // skip unrecognised io types
      points.push({ tag: v.name, description: v.description, io_type: io });
    }
    if (points.length === 0) continue;

    const deviceName = ctrl.siteName
      ? `${ctrl.siteName} — ${ctrl.label}`
      : ctrl.label;

    const model = controllerModels.find(m => m.id === ctrl.modelId);
    const modbusOffset = model?.modbusAddressOffset ?? 0;

    devices.push({
      id: ctrl.id,
      name: deviceName,
      profile_name: ctrl.profileName || ctrl.label,  // fallback to label if not set
      description: ctrl.label,
      modbus_address_offset: modbusOffset,
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
