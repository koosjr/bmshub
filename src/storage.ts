import {
  EquipEntry, MedEntry, QtyEntry, ModEntry, SemanticConfig, Controller,
  Assembly, ControllerModel, ExpansionModule, Project,
} from './types';

const KEYS = {
  equip: 'bms_equip',
  med: 'bms_med',
  qty: 'bms_qty',
  mod: 'bms_mod',
  semanticConfig: 'bms_semantic_config',
  controllers: 'bms_controllers',
  assemblies: 'bms_assemblies',
  controllerModels: 'bms_controller_models',
  expansionModules: 'bms_expansion_modules',
  projects: 'bms_projects',
  seedVersion: 'bms_seed_version',
} as const;

// Bump this when seed rules change — triggers a rules refresh for existing users
export const CURRENT_SEED_VERSION = 6;

function load<T>(key: string): T[] {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    return JSON.parse(raw) as T[];
  } catch {
    return [];
  }
}

function save<T>(key: string, data: T[]): void {
  localStorage.setItem(key, JSON.stringify(data));
}

export function loadEquip(): EquipEntry[]               { return load<EquipEntry>(KEYS.equip); }
export function loadMed(): MedEntry[]                    { return load<MedEntry>(KEYS.med); }
export function loadQty(): QtyEntry[]                    { return load<QtyEntry>(KEYS.qty); }
export function loadMod(): ModEntry[]                    { return load<ModEntry>(KEYS.mod); }
export function loadControllers(): Controller[]          { return load<Controller>(KEYS.controllers); }
export function loadAssemblies(): Assembly[]             { return load<Assembly>(KEYS.assemblies); }
export function loadControllerModels(): ControllerModel[] { return load<ControllerModel>(KEYS.controllerModels); }
export function loadExpansionModules(): ExpansionModule[] { return load<ExpansionModule>(KEYS.expansionModules); }
export function loadProjects(): Project[]                { return load<Project>(KEYS.projects); }

export function saveEquip(data: EquipEntry[]):               void { save(KEYS.equip, data); }
export function saveMed(data: MedEntry[]):                    void { save(KEYS.med, data); }
export function saveQty(data: QtyEntry[]):                    void { save(KEYS.qty, data); }
export function saveMod(data: ModEntry[]):                    void { save(KEYS.mod, data); }
export function saveControllers(data: Controller[]):          void { save(KEYS.controllers, data); }
export function saveAssemblies(data: Assembly[]):             void { save(KEYS.assemblies, data); }
export function saveControllerModels(data: ControllerModel[]): void { save(KEYS.controllerModels, data); }
export function saveExpansionModules(data: ExpansionModule[]): void { save(KEYS.expansionModules, data); }
export function saveProjects(data: Project[]):               void { save(KEYS.projects, data); }

export function loadSemanticConfig(): SemanticConfig | null {
  try {
    const raw = localStorage.getItem(KEYS.semanticConfig);
    if (!raw) return null;
    return JSON.parse(raw) as SemanticConfig;
  } catch {
    return null;
  }
}

export function saveSemanticConfig(data: SemanticConfig): void {
  localStorage.setItem(KEYS.semanticConfig, JSON.stringify(data));
}

export function isFirstRun(): boolean {
  return localStorage.getItem(KEYS.equip) === null;
}

export function getSeedVersion(): number {
  return parseInt(localStorage.getItem(KEYS.seedVersion) ?? '0', 10);
}

export function setSeedVersion(v: number): void {
  localStorage.setItem(KEYS.seedVersion, String(v));
}

/** Returns true when seed data is stale and needs refreshing (existing users) */
export function needsRulesRefresh(): boolean {
  return !isFirstRun() && getSeedVersion() < CURRENT_SEED_VERSION;
}

export function exportAll(): string {
  return JSON.stringify({
    equip: loadEquip(),
    med: loadMed(),
    qty: loadQty(),
    mod: loadMod(),
    semanticConfig: loadSemanticConfig(),
    controllers: loadControllers(),
    assemblies: loadAssemblies(),
    controllerModels: loadControllerModels(),
    expansionModules: loadExpansionModules(),
    projects: loadProjects(),
  }, null, 2);
}

export function importAll(json: string): void {
  const data = JSON.parse(json);
  if (data.equip)             saveEquip(data.equip);
  if (data.med)               saveMed(data.med);
  if (data.qty)               saveQty(data.qty);
  if (data.mod)               saveMod(data.mod);
  if (data.semanticConfig)    saveSemanticConfig(data.semanticConfig);
  if (data.controllers)       saveControllers(data.controllers);
  if (data.assemblies)        saveAssemblies(data.assemblies);
  if (data.controllerModels)  saveControllerModels(data.controllerModels);
  if (data.expansionModules)  saveExpansionModules(data.expansionModules);
  if (data.projects)          saveProjects(data.projects);
}
