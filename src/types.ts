export interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface EquipEntry {
  id: string;
  code: string;
  label: string;
  takesNum: boolean;
}

export interface MedEntry {
  id: string;
  code: string;
  label: string;
}

export interface QtyEntry {
  id: string;
  code: string;
  label: string;
  ioType: 'AI' | 'AO' | 'DI' | 'DO';
}

export interface ModEntry {
  id: string;
  code: string;
  label: string;
}

export interface SemanticRule {
  id: string;
  equip: string;   // EQUIP code or '*' for any
  med: string;     // MED code, '*' for any, '' for "must be absent"
  qty: string;     // QTY code or '*' for any
  allowed: false;  // always false
  reason: string;
}

export interface SemanticConfig {
  equipMeds: Record<string, string[]>; // EQUIP code → valid MED codes ('' = no-med allowed)
  medQtys:   Record<string, string[]>; // MED code   → valid QTY codes (key '' = no-medium QTYs)
  qtyMods:   Record<string, string[]>; // QTY code   → valid MOD codes ('' = no-mod allowed)
}

export interface DeviceSupply {
  supply: boolean;        // tick box — are we supplying this device?
  deviceType: string;     // see rules in ControllerBuilderTab
  signalType: string;     // see rules in ControllerBuilderTab
  quantity: number;       // how many (default 1)
}

export interface ControllerVariable {
  id: string;
  equip: string;
  num: string;        // '1'-'9' or '' for SYS
  med: string;        // '' if not used
  qty: string;
  mod: string;        // '' if not used
  name: string;       // computed: equip+num+med+qty+mod
  description: string;
  ioOverride?: 'AV' | 'BV' | null; // overrides physical IO type to a soft value
  device?: DeviceSupply;
}

export interface AssemblyPoint {
  id: string;
  med: string;             // '' if no medium
  qty: string;             // QTY code
  mod: string;             // '' if no modifier
  ioOverride?: 'AV' | 'BV' | null;  // soft value override
}

export interface Assembly {
  id: string;
  name: string;           // e.g. "Chiller — Full monitoring"
  equipCode: string;      // which EQUIP this assembly is for, e.g. "CHR"
  description: string;    // short description
  points: AssemblyPoint[];
}

export interface IOCount {
  ai: number;   // analog inputs
  ao: number;   // analog outputs
  di: number;   // digital inputs
  do: number;   // digital outputs
}

export interface ControllerModel {
  id: string;
  name: string;          // e.g. "Eliwell 12600"
  description: string;
  io: IOCount;
  modbusAddressOffset?: number;  // e.g. -1 for Eliwell (docs use 1-based, poll 0-based)
}

export interface ExpansionModule {
  id: string;
  name: string;          // e.g. "Eliwell EXP-8DI"
  description: string;
  io: IOCount;
}

export interface ControllerExpansion {
  moduleId: string;
  quantity: number;      // how many of this module are fitted
}

export interface Controller {
  id: string;
  siteName: string;
  label: string;
  variables: ControllerVariable[];
  createdAt: string;
  updatedAt: string;
  modelId?: string;                    // which ControllerModel is fitted
  expansions?: ControllerExpansion[];  // list of expansion modules and quantities
  projectId: string;
  duplicates: number;                  // how many identical sets (default 1)
}

export type ValidationResult =
  | { valid: true; name: string; description: string }
  | { valid: false; errors: ValidationError[] }

export interface ValidationError {
  layer: 'structural' | 'semantic';
  rule: string;
  message: string;
}

export interface AppData {
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
}
