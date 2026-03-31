#!/usr/bin/env node
/**
 * build-seed.cjs
 *
 * Assembles public/seed.json from source files in scripts/data/.
 * - Merges dict entries (equip/med/qty/mod) by code — additive, never removes.
 * - Merges assemblies and hardware by id — additive, updates if changed.
 * - Merges semantic config objects — additive, never removes keys.
 * - Increments seed_version only if assembled content differs from current seed.json.
 * - Preserves controllers[] from current seed.json (user data, not seed data).
 */

'use strict';

const fs = require('fs');
const path = require('path');

// ─── paths ────────────────────────────────────────────────────────────────────
const ROOT        = path.resolve(__dirname, '..');
const SEED_PATH   = path.join(ROOT, 'public', 'seed.json');
const DATA_DIR    = path.join(__dirname, 'data');

// ─── helpers ─────────────────────────────────────────────────────────────────
function readJSON(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeJSON(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
}

/**
 * Merge an array of objects keyed by a field (e.g. "code" or "id").
 * base is the current array; incoming is the new source array.
 * Returns { merged, added, updated }.
 */
function mergeByKey(base, incoming, keyField) {
  const map = new Map(base.map(item => [item[keyField], item]));
  const added = [];
  const updated = [];

  for (const item of incoming) {
    const key = item[keyField];
    const existing = map.get(key);
    if (!existing) {
      map.set(key, item);
      added.push(key);
    } else {
      // Update if anything changed
      const existingStr = JSON.stringify(existing);
      const incomingStr = JSON.stringify(item);
      if (existingStr !== incomingStr) {
        map.set(key, item);
        updated.push(key);
      }
    }
  }

  return { merged: Array.from(map.values()), added, updated };
}

/**
 * Merge two plain objects (semantic config style).
 * Adds keys from incoming that are missing in base; updates keys where value differs.
 * Returns { merged, added, updated }.
 */
function mergeObjects(base, incoming) {
  const merged = { ...base };
  const added = [];
  const updated = [];

  for (const [key, value] of Object.entries(incoming)) {
    if (!(key in merged)) {
      merged[key] = value;
      added.push(key);
    } else {
      if (JSON.stringify(merged[key]) !== JSON.stringify(value)) {
        merged[key] = value;
        updated.push(key);
      }
    }
  }

  return { merged, added, updated };
}

// ─── load source files ────────────────────────────────────────────────────────
console.log('\n=== BMSHub seed builder ===\n');

// Dict arrays
const srcEquip = readJSON(path.join(DATA_DIR, 'equip.json'));
const srcMed   = readJSON(path.join(DATA_DIR, 'med.json'));
const srcQty   = readJSON(path.join(DATA_DIR, 'qty.json'));
const srcMod   = readJSON(path.join(DATA_DIR, 'mod.json'));

// Semantic
const srcEquipMeds = readJSON(path.join(DATA_DIR, 'semantic', 'equip-meds.json'));
const srcMedQtys   = readJSON(path.join(DATA_DIR, 'semantic', 'med-qtys.json'));
const srcQtyMods   = readJSON(path.join(DATA_DIR, 'semantic', 'qty-mods.json'));

// Hardware
const srcControllerModels  = readJSON(path.join(DATA_DIR, 'hardware', 'controller-models.json'));
const srcExpansionModules  = readJSON(path.join(DATA_DIR, 'hardware', 'expansion-modules.json'));

// Assemblies — one file per assembly
const assemblyDir = path.join(DATA_DIR, 'assemblies');
const srcAssemblies = fs.readdirSync(assemblyDir)
  .filter(f => f.endsWith('.json'))
  .sort()
  .map(f => readJSON(path.join(assemblyDir, f)));

// ─── load current seed.json ───────────────────────────────────────────────────
let currentSeed = {};
if (fs.existsSync(SEED_PATH)) {
  currentSeed = readJSON(SEED_PATH);
}

const currentVersion = currentSeed.seed_version || 0;
const currentControllers = currentSeed.controllers || [];

// ─── merge each section ───────────────────────────────────────────────────────
const changes = [];

// Dict entries merge by "code"
const eqResult  = mergeByKey(currentSeed.equip  || [], srcEquip, 'code');
const medResult = mergeByKey(currentSeed.med     || [], srcMed,   'code');
const qtyResult = mergeByKey(currentSeed.qty     || [], srcQty,   'code');
const modResult = mergeByKey(currentSeed.mod     || [], srcMod,   'code');

for (const [label, result] of [
  ['equip', eqResult], ['med', medResult], ['qty', qtyResult], ['mod', modResult]
]) {
  if (result.added.length)   changes.push(`  [dict] ${label}: added   ${result.added.join(', ')}`);
  if (result.updated.length) changes.push(`  [dict] ${label}: updated ${result.updated.join(', ')}`);
}

// Assemblies merge by "id"
const asmResult = mergeByKey(currentSeed.assemblies || [], srcAssemblies, 'id');
if (asmResult.added.length)   changes.push(`  [assemblies] added:   ${asmResult.added.join(', ')}`);
if (asmResult.updated.length) changes.push(`  [assemblies] updated: ${asmResult.updated.join(', ')}`);

// Hardware merge by "id"
const cmResult  = mergeByKey(currentSeed.controllerModels  || [], srcControllerModels,  'id');
const emResult  = mergeByKey(currentSeed.expansionModules  || [], srcExpansionModules,   'id');
if (cmResult.added.length)   changes.push(`  [controllerModels] added:   ${cmResult.added.join(', ')}`);
if (cmResult.updated.length) changes.push(`  [controllerModels] updated: ${cmResult.updated.join(', ')}`);
if (emResult.added.length)   changes.push(`  [expansionModules] added:   ${emResult.added.join(', ')}`);
if (emResult.updated.length) changes.push(`  [expansionModules] updated: ${emResult.updated.join(', ')}`);

// Semantic config merge
const semEquipMeds = mergeObjects((currentSeed.semanticConfig || {}).equipMeds || {}, srcEquipMeds);
const semMedQtys   = mergeObjects((currentSeed.semanticConfig || {}).medQtys   || {}, srcMedQtys);
const semQtyMods   = mergeObjects((currentSeed.semanticConfig || {}).qtyMods   || {}, srcQtyMods);

for (const [label, result] of [
  ['equipMeds', semEquipMeds], ['medQtys', semMedQtys], ['qtyMods', semQtyMods]
]) {
  if (result.added.length)   changes.push(`  [semantic.${label}] added:   ${result.added.join(', ')}`);
  if (result.updated.length) changes.push(`  [semantic.${label}] updated: ${result.updated.join(', ')}`);
}

// ─── assemble candidate seed ──────────────────────────────────────────────────
const candidateSeed = {
  equip:  eqResult.merged,
  med:    medResult.merged,
  qty:    qtyResult.merged,
  mod:    modResult.merged,
  semanticConfig: {
    equipMeds: semEquipMeds.merged,
    medQtys:   semMedQtys.merged,
    qtyMods:   semQtyMods.merged,
  },
  controllers:      currentControllers,  // preserved as-is — user data
  assemblies:       asmResult.merged,
  controllerModels: cmResult.merged,
  expansionModules: emResult.merged,
  projects:         currentSeed.projects || [],
  seed_version:     currentVersion,       // placeholder, updated below if needed
};

// ─── compare against current seed (excluding seed_version and controllers) ────
// Strip seed_version + controllers from both sides before comparing
function comparableSnapshot(seed) {
  const { seed_version, controllers, ...rest } = seed;
  return JSON.stringify(rest);
}

const currentSnapshot  = comparableSnapshot(currentSeed);
const candidateSnapshot = comparableSnapshot(candidateSeed);

if (currentSnapshot === candidateSnapshot) {
  console.log('No changes detected. seed.json is already up to date.');
  console.log(`Current seed_version: ${currentVersion}\n`);
  process.exit(0);
}

// ─── something changed — bump version and write ───────────────────────────────
const newVersion = currentVersion + 1;
candidateSeed.seed_version = newVersion;

writeJSON(SEED_PATH, candidateSeed);

console.log('Changes detected:');
for (const c of changes) console.log(c);
console.log(`\nseed_version: ${currentVersion} → ${newVersion}`);
console.log(`Written: ${SEED_PATH}\n`);
