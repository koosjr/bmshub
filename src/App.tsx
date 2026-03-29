import { useState, useEffect, useCallback } from 'react';
import {
  EquipEntry, MedEntry, QtyEntry, ModEntry, SemanticConfig, Controller,
  Assembly, ControllerModel, ExpansionModule, Project,
} from './types';
import { exportForSimulator } from './simulatorExport';
import {
  loadEquip, loadMed, loadQty, loadMod, loadSemanticConfig, loadControllers,
  loadAssemblies, loadControllerModels, loadExpansionModules, loadProjects,
  saveEquip, saveMed, saveQty, saveMod, saveSemanticConfig, saveControllers,
  saveAssemblies, saveControllerModels, saveExpansionModules, saveProjects,
  isFirstRun, needsRulesRefresh, setSeedVersion, CURRENT_SEED_VERSION,
  exportAll, importAll,
} from './storage';
import {
  seedEquip, seedMed, seedQty, seedMod, seedSemanticConfig,
  seedAssemblies, seedControllerModels, seedExpansionModules,
} from './seedData';
import DictionaryTab from './components/DictionaryTab';
import AssembliesTab from './components/AssembliesTab';
import ControllerBuilderTab from './components/ControllerBuilderTab';
import ExportTab from './components/ExportTab';

type Tab = 'dictionary' | 'assemblies' | 'builder' | 'export';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('builder');
  const [loaded, setLoaded] = useState(false);

  const [equip, setEquip] = useState<EquipEntry[]>([]);
  const [med, setMed] = useState<MedEntry[]>([]);
  const [qty, setQty] = useState<QtyEntry[]>([]);
  const [mod, setMod] = useState<ModEntry[]>([]);
  const [semanticConfig, setSemanticConfig] = useState<SemanticConfig>(seedSemanticConfig);
  const [controllers, setControllers] = useState<Controller[]>([]);
  const [assemblies, setAssemblies] = useState<Assembly[]>([]);
  const [controllerModels, setControllerModels] = useState<ControllerModel[]>([]);
  const [expansionModules, setExpansionModules] = useState<ExpansionModule[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  // Load from localStorage on mount, seed if first run
  useEffect(() => {
    async function init() {
      // Try to fetch seed.json from the public folder
      async function fetchSeed(): Promise<Record<string, unknown> | null> {
        try {
          const base = import.meta.env.BASE_URL ?? '/';
          const res = await fetch(`${base}seed.json`);
          if (!res.ok) return null;
          return await res.json();
        } catch {
          return null;
        }
      }

      // Apply non-user parts of a seed payload (dict + config + assemblies + hardware)
      function applySeedPayload(data: Record<string, unknown>) {
        if (data.equip)            { saveEquip(data.equip as EquipEntry[]);                     setEquip(data.equip as EquipEntry[]); }
        if (data.med)              { saveMed(data.med as MedEntry[]);                           setMed(data.med as MedEntry[]); }
        if (data.qty)              { saveQty(data.qty as QtyEntry[]);                           setQty(data.qty as QtyEntry[]); }
        if (data.mod)              { saveMod(data.mod as ModEntry[]);                           setMod(data.mod as ModEntry[]); }
        if (data.semanticConfig)   { saveSemanticConfig(data.semanticConfig as SemanticConfig); setSemanticConfig(data.semanticConfig as SemanticConfig); }
        if (data.assemblies)       { saveAssemblies(data.assemblies as Assembly[]);             setAssemblies(data.assemblies as Assembly[]); }
        if (data.controllerModels) { saveControllerModels(data.controllerModels as ControllerModel[]); setControllerModels(data.controllerModels as ControllerModel[]); }
        if (data.expansionModules) { saveExpansionModules(data.expansionModules as ExpansionModule[]); setExpansionModules(data.expansionModules as ExpansionModule[]); }
      }

      // Hardcoded fallback (used only if seed.json is unreachable)
      function applyHardcodedSeed() {
        saveEquip(seedEquip);             setEquip(seedEquip);
        saveMed(seedMed);                 setMed(seedMed);
        saveQty(seedQty);                 setQty(seedQty);
        saveMod(seedMod);                 setMod(seedMod);
        saveSemanticConfig(seedSemanticConfig); setSemanticConfig(seedSemanticConfig);
        saveAssemblies(seedAssemblies);   setAssemblies(seedAssemblies);
        saveControllerModels(seedControllerModels); setControllerModels(seedControllerModels);
        saveExpansionModules(seedExpansionModules); setExpansionModules(seedExpansionModules);
      }

      if (isFirstRun()) {
        const seed = await fetchSeed();
        if (seed) {
          applySeedPayload(seed);
        } else {
          applyHardcodedSeed();
        }
        // Controllers and projects always start empty on first run
        saveControllers([]);   setControllers([]);
        saveProjects([]);      setProjects([]);
        setSeedVersion(CURRENT_SEED_VERSION);
      } else {
        setEquip(loadEquip());
        setMed(loadMed());
        setQty(loadQty());
        setMod(loadMod());
        if (needsRulesRefresh()) {
          // Re-apply seed dict + config + assemblies + hardware, preserving user controllers/projects
          const seed = await fetchSeed();
          if (seed) {
            applySeedPayload(seed);
          } else {
            applyHardcodedSeed();
          }
          setSeedVersion(CURRENT_SEED_VERSION);
        } else {
          setSemanticConfig(loadSemanticConfig() ?? seedSemanticConfig);
          setAssemblies(loadAssemblies());
          setControllerModels(loadControllerModels());
          setExpansionModules(loadExpansionModules());
        }
        setControllers(loadControllers());
        const existingProjects = loadProjects();
        setProjects(existingProjects);
      }
      setLoaded(true);
    }
    init();
  }, []);

  const updateEquip = useCallback((data: EquipEntry[]) => {
    setEquip(data);
    saveEquip(data);
  }, []);
  const updateMed = useCallback((data: MedEntry[]) => {
    setMed(data);
    saveMed(data);
  }, []);
  const updateQty = useCallback((data: QtyEntry[]) => {
    setQty(data);
    saveQty(data);
  }, []);
  const updateMod = useCallback((data: ModEntry[]) => {
    setMod(data);
    saveMod(data);
  }, []);
  const updateSemanticConfig = useCallback((data: SemanticConfig) => {
    setSemanticConfig(data);
    saveSemanticConfig(data);
  }, []);
  const updateControllers = useCallback((data: Controller[]) => {
    setControllers(data);
    saveControllers(data);
  }, []);
  const updateAssemblies = useCallback((data: Assembly[]) => {
    setAssemblies(data);
    saveAssemblies(data);
  }, []);
  const updateControllerModels = useCallback((data: ControllerModel[]) => {
    setControllerModels(data);
    saveControllerModels(data);
  }, []);
  const updateExpansionModules = useCallback((data: ExpansionModule[]) => {
    setExpansionModules(data);
    saveExpansionModules(data);
  }, []);
  const updateProjects = useCallback((data: Project[]) => {
    setProjects(data);
    saveProjects(data);
  }, []);

  const handleExportForSimulator = useCallback((projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    return exportForSimulator(controllers, qty, project?.name ?? 'Project', projectId, controllerModels);
  }, [controllers, qty, projects]);

  const handleImport = useCallback((json: string) => {
    importAll(json);
    setEquip(loadEquip());
    setMed(loadMed());
    setQty(loadQty());
    setMod(loadMod());
    const importedCfg = loadSemanticConfig();
    setSemanticConfig(importedCfg ?? seedSemanticConfig);
    setControllers(loadControllers());
    setAssemblies(loadAssemblies());
    setControllerModels(loadControllerModels());
    setExpansionModules(loadExpansionModules());
    setProjects(loadProjects());
  }, []);

  const tabs: { id: Tab; label: string }[] = [
    { id: 'dictionary',  label: 'Dictionary' },
    { id: 'assemblies',  label: 'Assemblies' },
    { id: 'builder',     label: 'Controller Builder' },
    { id: 'export',      label: 'Export' },
  ];

  return (
    <div className="min-h-screen" style={{ background: '#F1EFE8' }}>
      {/* Header */}
      <header style={{ background: '#2C2C2A', position: 'sticky', top: 0, zIndex: 50 }} className="px-6 py-3 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded flex items-center justify-center text-white font-bold text-sm"
            style={{ background: '#1D9E75', fontFamily: 'JetBrains Mono, monospace' }}
          >
            B
          </div>
          <span className="text-white font-semibold text-lg">BMSHub</span>
          <span style={{ color: '#888780' }} className="text-sm">Naming Convention Manager</span>
        </div>
        <div className="ml-auto flex items-center gap-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="px-4 py-1.5 rounded text-sm font-medium transition-colors"
              style={
                activeTab === tab.id
                  ? { background: '#1D9E75', color: '#fff' }
                  : { color: '#D3D1C7' }
              }
            >
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      {/* Main content */}
      <main className="p-4">
        {!loaded && (
          <div className="flex items-center justify-center h-64">
            <span style={{ color: '#888780' }} className="text-sm">Loading…</span>
          </div>
        )}
        {loaded && activeTab === 'dictionary' && (
          <DictionaryTab
            equip={equip}
            med={med}
            qty={qty}
            mod={mod}
            semanticConfig={semanticConfig}
            controllers={controllers}
            onUpdateEquip={updateEquip}
            onUpdateMed={updateMed}
            onUpdateQty={updateQty}
            onUpdateMod={updateMod}
            onUpdateSemanticConfig={updateSemanticConfig}
          />
        )}
        {loaded && activeTab === 'assemblies' && (
          <AssembliesTab
            equip={equip}
            med={med}
            qty={qty}
            mod={mod}
            semanticConfig={semanticConfig}
            assemblies={assemblies}
            controllerModels={controllerModels}
            expansionModules={expansionModules}
            onUpdateAssemblies={updateAssemblies}
            onUpdateControllerModels={updateControllerModels}
            onUpdateExpansionModules={updateExpansionModules}
          />
        )}
        {loaded && activeTab === 'builder' && (
          <ControllerBuilderTab
            equip={equip}
            med={med}
            qty={qty}
            mod={mod}
            semanticConfig={semanticConfig}
            controllers={controllers}
            assemblies={assemblies}
            controllerModels={controllerModels}
            expansionModules={expansionModules}
            projects={projects}
            onUpdateControllers={updateControllers}
            onUpdateProjects={updateProjects}
          />
        )}
        {loaded && activeTab === 'export' && (
          <ExportTab
            controllers={controllers}
            equip={equip}
            med={med}
            qty={qty}
            mod={mod}
            projects={projects}
            onExportAll={exportAll}
            onImport={handleImport}
            onExportForSimulator={handleExportForSimulator}
          />
        )}
      </main>
    </div>
  );
}
