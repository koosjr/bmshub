import { useState, useEffect, useCallback } from 'react';
import {
  EquipEntry, MedEntry, QtyEntry, ModEntry, SemanticRule, Controller,
  Assembly, ControllerModel, ExpansionModule, Project,
} from './types';
import { exportForSimulator } from './simulatorExport';
import {
  loadEquip, loadMed, loadQty, loadMod, loadRules, loadControllers,
  loadAssemblies, loadControllerModels, loadExpansionModules, loadProjects,
  saveEquip, saveMed, saveQty, saveMod, saveRules, saveControllers,
  saveAssemblies, saveControllerModels, saveExpansionModules, saveProjects,
  isFirstRun, needsRulesRefresh, setSeedVersion, CURRENT_SEED_VERSION,
  exportAll, importAll,
} from './storage';
import {
  seedEquip, seedMed, seedQty, seedMod, seedRules, buildSeedController,
  seedAssemblies, seedControllerModels, seedExpansionModules, seedProjects,
} from './seedData';
import DictionaryTab from './components/DictionaryTab';
import AssembliesTab from './components/AssembliesTab';
import ControllerBuilderTab from './components/ControllerBuilderTab';
import ExportTab from './components/ExportTab';

type Tab = 'dictionary' | 'assemblies' | 'builder' | 'export';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('builder');

  const [equip, setEquip] = useState<EquipEntry[]>([]);
  const [med, setMed] = useState<MedEntry[]>([]);
  const [qty, setQty] = useState<QtyEntry[]>([]);
  const [mod, setMod] = useState<ModEntry[]>([]);
  const [rules, setRules] = useState<SemanticRule[]>([]);
  const [controllers, setControllers] = useState<Controller[]>([]);
  const [assemblies, setAssemblies] = useState<Assembly[]>([]);
  const [controllerModels, setControllerModels] = useState<ControllerModel[]>([]);
  const [expansionModules, setExpansionModules] = useState<ExpansionModule[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  // Load from localStorage on mount, seed if first run
  useEffect(() => {
    if (isFirstRun()) {
      const eq = seedEquip;
      const me = seedMed;
      const qt = seedQty;
      const mo = seedMod;
      const ru = seedRules;
      const ctrl = buildSeedController(eq, me, qt, mo);
      const asm = seedAssemblies;
      const ctrlModels = seedControllerModels;
      const expMods = seedExpansionModules;
      const projs = seedProjects;
      saveEquip(eq);
      saveMed(me);
      saveQty(qt);
      saveMod(mo);
      saveRules(ru);
      saveControllers([ctrl]);
      saveAssemblies(asm);
      saveControllerModels(ctrlModels);
      saveExpansionModules(expMods);
      saveProjects(projs);
      setSeedVersion(CURRENT_SEED_VERSION);
      setEquip(eq);
      setMed(me);
      setQty(qt);
      setMod(mo);
      setRules(ru);
      setControllers([ctrl]);
      setAssemblies(asm);
      setControllerModels(ctrlModels);
      setExpansionModules(expMods);
      setProjects(projs);
    } else {
      setEquip(loadEquip());
      setMed(loadMed());
      setQty(loadQty());
      setMod(loadMod());
      // Refresh seed rules/assemblies/hardware when version is stale
      if (needsRulesRefresh()) {
        const refreshedRules = seedRules;
        const refreshedAsm = seedAssemblies;
        const refreshedModels = seedControllerModels;
        const refreshedExpMods = seedExpansionModules;
        saveRules(refreshedRules);
        // Only overwrite assemblies/hardware if none exist yet
        const existingAsm = loadAssemblies();
        if (existingAsm.length === 0) {
          saveAssemblies(refreshedAsm);
          setAssemblies(refreshedAsm);
        } else {
          setAssemblies(existingAsm);
        }
        const existingModels = loadControllerModels();
        if (existingModels.length === 0) {
          saveControllerModels(refreshedModels);
          setControllerModels(refreshedModels);
        } else {
          setControllerModels(existingModels);
        }
        const existingExpMods = loadExpansionModules();
        if (existingExpMods.length === 0) {
          saveExpansionModules(refreshedExpMods);
          setExpansionModules(refreshedExpMods);
        } else {
          setExpansionModules(existingExpMods);
        }
        setSeedVersion(CURRENT_SEED_VERSION);
        setRules(refreshedRules);
      } else {
        setRules(loadRules());
        setAssemblies(loadAssemblies());
        setControllerModels(loadControllerModels());
        setExpansionModules(loadExpansionModules());
      }
      setControllers(loadControllers());
      // Load projects (seed if none exist yet)
      const existingProjects = loadProjects();
      if (existingProjects.length === 0) {
        saveProjects(seedProjects);
        setProjects(seedProjects);
      } else {
        setProjects(existingProjects);
      }
    }
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
  const updateRules = useCallback((data: SemanticRule[]) => {
    setRules(data);
    saveRules(data);
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
    return exportForSimulator(controllers, qty, project?.name ?? 'Project', projectId);
  }, [controllers, qty, projects]);

  const handleImport = useCallback((json: string) => {
    importAll(json);
    setEquip(loadEquip());
    setMed(loadMed());
    setQty(loadQty());
    setMod(loadMod());
    setRules(loadRules());
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
        {activeTab === 'dictionary' && (
          <DictionaryTab
            equip={equip}
            med={med}
            qty={qty}
            mod={mod}
            rules={rules}
            controllers={controllers}
            onUpdateEquip={updateEquip}
            onUpdateMed={updateMed}
            onUpdateQty={updateQty}
            onUpdateMod={updateMod}
            onUpdateRules={updateRules}
          />
        )}
        {activeTab === 'assemblies' && (
          <AssembliesTab
            equip={equip}
            med={med}
            qty={qty}
            mod={mod}
            rules={rules}
            assemblies={assemblies}
            controllerModels={controllerModels}
            expansionModules={expansionModules}
            onUpdateAssemblies={updateAssemblies}
            onUpdateControllerModels={updateControllerModels}
            onUpdateExpansionModules={updateExpansionModules}
          />
        )}
        {activeTab === 'builder' && (
          <ControllerBuilderTab
            equip={equip}
            med={med}
            qty={qty}
            mod={mod}
            rules={rules}
            controllers={controllers}
            assemblies={assemblies}
            controllerModels={controllerModels}
            expansionModules={expansionModules}
            projects={projects}
            onUpdateControllers={updateControllers}
            onUpdateProjects={updateProjects}
          />
        )}
        {activeTab === 'export' && (
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
