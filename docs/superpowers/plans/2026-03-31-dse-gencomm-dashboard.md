# DSE GenComm Generator Dashboard — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single self-contained HTML widget for ThingsBoard that displays all DSE GenComm generator telemetry with live data binding, enum decoding, alarm unpacking, and stale value detection.

**Architecture:** Single HTML file (`widgets/generator-dse-gencomm.html`) containing all CSS, HTML structure, and JS. Uses ThingsBoard widget API (`self.ctx`, `self.onDataUpdated()`) for live data. Includes a standalone demo mode with sample data for development/testing without ThingsBoard. No external dependencies.

**Tech Stack:** Vanilla HTML5/CSS3/ES6+, ThingsBoard Custom Widget API, CSS Grid layout.

**Spec:** `docs/superpowers/specs/2026-03-31-dse-gencomm-dashboard-design.md`

---

## File Structure

All work happens in a single file:

- **Create:** `widgets/generator-dse-gencomm.html` — the complete widget

The file is structured internally as:
1. `<style>` — CSS variables, grid layout, panel styles, tab styles, alarm styles, stale states
2. `<div>` structure — status bar, hero row (engine + fuel + mains), tabbed section, alarm bar
3. `<script>` — enum tables, key map, alarm decoder, TB lifecycle hooks, stale detection, demo mode

---

### Task 1: HTML Shell + CSS Foundation

**Files:**
- Create: `widgets/generator-dse-gencomm.html`

- [ ] **Step 1: Create the HTML shell with CSS variables and grid skeleton**

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>DSE GenComm — Generator Dashboard</title>
<style>
/* ── THEME ──────────────────────────────────────────────────── */
:root {
  --bg:       #0a0f1a;
  --panel:    #111827;
  --panel-alt:#0d1117;
  --border:   #1f2937;
  --border2:  #374151;

  /* Section accent colors */
  --eng-border:  #065f46;  --eng-text:  #34d399;
  --fuel-border: #1e40af;  --fuel-text: #60a5fa;
  --mains-border:#92400e;  --mains-text:#fbbf24;
  --elec-border: #7c3aed;  --elec-text: #a78bfa;
  --alm-border:  #7f1d1d;  --alm-text:  #f87171;

  /* Alarm severity */
  --sev-warn:  #fbbf24;
  --sev-shut:  #f87171;
  --sev-trip:  #f87171;
  --sev-ind:   #60a5fa;
  --sev-inact: #6b7280;

  /* Text */
  --t1: #f9fafb;
  --t2: #e5e7eb;
  --t3: #9ca3af;
  --t4: #6b7280;

  /* Badges */
  --bdg-green-bg: #065f46;  --bdg-green-fg: #34d399;
  --bdg-amber-bg: #92400e;  --bdg-amber-fg: #fbbf24;
  --bdg-red-bg:   #7f1d1d;  --bdg-red-fg:   #f87171;
  --bdg-grey-bg:  #1f2937;  --bdg-grey-fg:  #6b7280;
  --bdg-blue-bg:  #1e3a5f;  --bdg-blue-fg:  #60a5fa;

  --fm: 'Segoe UI', system-ui, -apple-system, sans-serif;
  --stale-opacity: 0.4;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { background: var(--bg); font-family: var(--fm); color: var(--t1); }
body { padding: 8px; }

/* ── WIDGET SHELL ───────────────────────────────────────────── */
.widget {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* ── STATUS BAR ─────────────────────────────────────────────── */
.status-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 12px;
  background: var(--panel);
  border-radius: 6px;
  border: 1px solid var(--border);
  flex-wrap: wrap;
  gap: 8px;
}
.status-bar__left,
.status-bar__right {
  display: flex;
  gap: 16px;
  align-items: center;
}
.status-bar__label {
  color: var(--t3);
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.status-bar__value {
  color: var(--t2);
  font-weight: 600;
  font-size: 12px;
}

/* ── BADGE ──────────────────────────────────────────────────── */
.bdg {
  padding: 2px 10px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 11px;
  display: inline-block;
}
.bdg--green { background: var(--bdg-green-bg); color: var(--bdg-green-fg); }
.bdg--amber { background: var(--bdg-amber-bg); color: var(--bdg-amber-fg); }
.bdg--red   { background: var(--bdg-red-bg);   color: var(--bdg-red-fg); }
.bdg--grey  { background: var(--bdg-grey-bg);  color: var(--bdg-grey-fg); }
.bdg--blue  { background: var(--bdg-blue-bg);  color: var(--bdg-blue-fg); }

/* ── HERO ROW (Engine + Fuel/Mains stack) ───────────────────── */
.hero-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

/* ── PANEL (generic) ────────────────────────────────────────── */
.panel {
  background: var(--panel);
  border-radius: 8px;
  padding: 12px;
}
.panel__title {
  font-weight: 700;
  font-size: 13px;
  margin-bottom: 10px;
  padding-bottom: 6px;
  border-bottom: 1px solid var(--border);
}
.panel--engine  { border: 1px solid var(--eng-border); }
.panel--engine .panel__title { color: var(--eng-text); }
.panel--fuel    { border: 1px solid var(--fuel-border); }
.panel--fuel .panel__title   { color: var(--fuel-text); }
.panel--mains   { border: 1px solid var(--mains-border); }
.panel--mains .panel__title  { color: var(--mains-text); }

/* ── RIGHT STACK (Fuel + Mains) ─────────────────────────────── */
.right-stack {
  display: grid;
  grid-template-rows: 1fr 1fr;
  gap: 10px;
}

/* ── VALUE CELL ─────────────────────────────────────────────── */
.val-grid {
  display: grid;
  gap: 8px;
}
.val-grid--3col { grid-template-columns: repeat(3, 1fr); }
.val-grid--4col { grid-template-columns: repeat(4, 1fr); }

.val-cell {}
.val-cell__label {
  color: var(--t4);
  font-size: 9px;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}
.val-cell__value {
  color: var(--t1);
  font-weight: 700;
  line-height: 1.2;
}
.val-cell__value--lg { font-size: 18px; }
.val-cell__value--md { font-size: 14px; }
.val-cell__unit {
  font-size: 10px;
  color: var(--t4);
  font-weight: 400;
}

/* ── STALE STATES ───────────────────────────────────────────── */
.val-cell--stale .val-cell__value {
  opacity: var(--stale-opacity);
}
.val-cell--stale::after {
  content: '⏱';
  font-size: 9px;
  margin-left: 4px;
  opacity: 0.5;
}
.val-cell--never .val-cell__value {
  color: var(--t4);
}

/* ── TABS ───────────────────────────────────────────────────── */
.tabs {
  background: var(--panel);
  border: 1px solid var(--border2);
  border-radius: 8px;
}
.tabs__bar {
  display: flex;
  border-bottom: 1px solid var(--border2);
}
.tabs__btn {
  padding: 8px 16px;
  color: var(--t4);
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  background: none;
  border-bottom: 2px solid transparent;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.tabs__btn:hover { color: var(--t3); }
.tabs__btn--active {
  color: var(--elec-text);
  border-bottom-color: var(--elec-text);
}
.tabs__content {
  padding: 12px;
}
.tab-pane { display: none; }
.tab-pane--active { display: block; }

/* ── ELECTRICAL TABLE ───────────────────────────────────────── */
.elec-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 11px;
}
.elec-table thead th {
  text-align: right;
  padding: 4px 8px;
  border-bottom: 1px solid var(--border);
  color: var(--t3);
  font-size: 9px;
  text-transform: uppercase;
  font-weight: 600;
}
.elec-table thead th:first-child { text-align: left; }
.elec-table tbody td {
  text-align: right;
  padding: 6px 8px;
  color: var(--t1);
}
.elec-table tbody td:first-child {
  text-align: left;
  color: var(--elec-text);
  font-weight: 600;
}
.elec-table tbody tr:nth-child(even) { background: var(--panel-alt); }
.elec-table .row-total {
  border-top: 1px solid var(--border2);
}
.elec-table .row-total td:first-child {
  color: var(--t2);
  font-weight: 700;
}
.elec-supplementary {
  margin-top: 8px;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  color: var(--t4);
  font-size: 10px;
}
.elec-supplementary span { color: var(--t1); }

/* ── DIAGNOSTICS GRID ───────────────────────────────────────── */
.diag-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 8px;
}
.diag-card {
  background: var(--panel-alt);
  border-radius: 6px;
  padding: 8px 10px;
  border: 1px solid var(--border);
}
.diag-card__label {
  color: var(--t4);
  font-size: 9px;
  text-transform: uppercase;
  margin-bottom: 2px;
}
.diag-card__value {
  color: var(--t1);
  font-size: 14px;
  font-weight: 600;
}
.diag-card__unit {
  color: var(--t4);
  font-size: 10px;
  font-weight: 400;
}
.diag-card--stale .diag-card__value { opacity: var(--stale-opacity); }
.diag-card--never .diag-card__value { color: var(--t4); }

/* ── ACCUMULATORS ───────────────────────────────────────────── */
.accum-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 10px;
}
.accum-card {
  background: var(--panel-alt);
  border-radius: 6px;
  padding: 12px;
  border: 1px solid var(--border);
}
.accum-card__label {
  color: var(--t4);
  font-size: 10px;
  text-transform: uppercase;
  margin-bottom: 4px;
}
.accum-card__value {
  color: var(--t1);
  font-size: 20px;
  font-weight: 700;
}
.accum-card__unit {
  color: var(--t4);
  font-size: 11px;
  font-weight: 400;
}

/* ── ALARM BAR ──────────────────────────────────────────────── */
.alarm-bar {
  background: var(--panel);
  border: 1px solid var(--alm-border);
  border-radius: 8px;
  padding: 10px;
}
.alarm-bar__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}
.alarm-bar__title {
  color: var(--alm-text);
  font-weight: 700;
  font-size: 12px;
}
.alarm-bar__table-wrap {
  background: var(--panel-alt);
  border-radius: 4px;
  padding: 8px;
  min-height: 36px;
  max-height: 160px;
  overflow-y: auto;
}
.alarm-bar__hdr-row,
.alarm-bar__row {
  display: flex;
  font-size: 10px;
  padding: 2px 0;
}
.alarm-bar__hdr-row {
  color: var(--t4);
  border-bottom: 1px solid var(--border);
  padding-bottom: 4px;
  margin-bottom: 4px;
}
.alarm-bar__row { color: var(--t3); }
.alarm-bar__col-time     { width: 140px; }
.alarm-bar__col-severity { width: 80px; }
.alarm-bar__col-name     { flex: 1; }
.alarm-bar__col-state    { width: 70px; text-align: right; }
.alarm-bar__empty {
  color: var(--t4);
  font-size: 11px;
  text-align: center;
  padding: 8px;
}

/* ── MAINS HEADER with BADGE ────────────────────────────────── */
.panel--mains .panel__title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* ── RESPONSIVE ─────────────────────────────────────────────── */
@media (max-width: 768px) {
  .hero-row { grid-template-columns: 1fr; }
  .val-grid--3col { grid-template-columns: repeat(2, 1fr); }
  .val-grid--4col { grid-template-columns: repeat(2, 1fr); }
  .status-bar { flex-direction: column; align-items: flex-start; }
}
</style>
</head>
<body>

<div class="widget" id="widget">
  <!-- STATUS BAR -->
  <div class="status-bar">
    <div class="status-bar__left">
      <span class="status-bar__label">Mode</span>
      <span class="bdg bdg--grey" id="sb-mode">--</span>
      <span class="status-bar__label">Engine</span>
      <span class="bdg bdg--grey" id="sb-engine">--</span>
    </div>
    <div class="status-bar__right">
      <span class="status-bar__label">Run Hours</span>
      <span class="status-bar__value" id="sb-runhrs">--</span>
      <span class="status-bar__label">Starts</span>
      <span class="status-bar__value" id="sb-starts">--</span>
    </div>
  </div>

  <!-- HERO ROW -->
  <div class="hero-row">
    <!-- ENGINE & GENERATOR -->
    <div class="panel panel--engine">
      <div class="panel__title">ENGINE &amp; GENERATOR</div>
      <div class="val-grid val-grid--3col">
        <div class="val-cell" id="vc-freq">
          <div class="val-cell__label">Frequency</div>
          <div class="val-cell__value val-cell__value--lg">-- <span class="val-cell__unit">Hz</span></div>
        </div>
        <div class="val-cell" id="vc-coolant-temp">
          <div class="val-cell__label">Coolant Temp</div>
          <div class="val-cell__value val-cell__value--lg">-- <span class="val-cell__unit">&deg;C</span></div>
        </div>
        <div class="val-cell" id="vc-oil-press">
          <div class="val-cell__label">Oil Pressure</div>
          <div class="val-cell__value val-cell__value--lg">-- <span class="val-cell__unit">kPa</span></div>
        </div>
        <div class="val-cell" id="vc-rpm">
          <div class="val-cell__label">RPM</div>
          <div class="val-cell__value val-cell__value--md">-- </div>
        </div>
        <div class="val-cell" id="vc-batt-v">
          <div class="val-cell__label">Battery</div>
          <div class="val-cell__value val-cell__value--md">-- <span class="val-cell__unit">V</span></div>
        </div>
        <div class="val-cell" id="vc-total-kw">
          <div class="val-cell__label">Total Power</div>
          <div class="val-cell__value val-cell__value--md">-- <span class="val-cell__unit">kW</span></div>
        </div>
        <div class="val-cell" id="vc-oil-temp">
          <div class="val-cell__label">Oil Temp</div>
          <div class="val-cell__value val-cell__value--md">-- <span class="val-cell__unit">&deg;C</span></div>
        </div>
        <div class="val-cell" id="vc-charge-alt">
          <div class="val-cell__label">Charge Alt</div>
          <div class="val-cell__value val-cell__value--md">-- <span class="val-cell__unit">V</span></div>
        </div>
        <div class="val-cell" id="vc-load">
          <div class="val-cell__label">Load</div>
          <div class="val-cell__value val-cell__value--md">-- <span class="val-cell__unit">%</span></div>
        </div>
      </div>
    </div>

    <!-- RIGHT STACK: Fuel + Mains -->
    <div class="right-stack">
      <!-- FUEL -->
      <div class="panel panel--fuel">
        <div class="panel__title">FUEL</div>
        <div class="val-grid val-grid--4col">
          <div class="val-cell" id="vc-fuel-level">
            <div class="val-cell__label">Level</div>
            <div class="val-cell__value val-cell__value--md">-- <span class="val-cell__unit">%</span></div>
          </div>
          <div class="val-cell" id="vc-fuel-used">
            <div class="val-cell__label">Total Used</div>
            <div class="val-cell__value val-cell__value--md">-- <span class="val-cell__unit">L</span></div>
          </div>
          <div class="val-cell" id="vc-fuel-rate">
            <div class="val-cell__label">Consumption</div>
            <div class="val-cell__value val-cell__value--md">-- <span class="val-cell__unit">L/h</span></div>
          </div>
          <div class="val-cell" id="vc-fuel-specific">
            <div class="val-cell__label">Specific</div>
            <div class="val-cell__value val-cell__value--md">-- <span class="val-cell__unit">L/h/kVA</span></div>
          </div>
        </div>
      </div>

      <!-- MAINS -->
      <div class="panel panel--mains">
        <div class="panel__title">
          <span>MAINS</span>
          <span class="bdg bdg--grey" id="sb-mains">--</span>
        </div>
        <div class="val-grid val-grid--4col">
          <div class="val-cell" id="vc-mains-l1">
            <div class="val-cell__label">L1-N</div>
            <div class="val-cell__value val-cell__value--md">-- <span class="val-cell__unit">V</span></div>
          </div>
          <div class="val-cell" id="vc-mains-l2">
            <div class="val-cell__label">L2-N</div>
            <div class="val-cell__value val-cell__value--md">-- <span class="val-cell__unit">V</span></div>
          </div>
          <div class="val-cell" id="vc-mains-l3">
            <div class="val-cell__label">L3-N</div>
            <div class="val-cell__value val-cell__value--md">-- <span class="val-cell__unit">V</span></div>
          </div>
          <div class="val-cell" id="vc-mains-freq">
            <div class="val-cell__label">Freq</div>
            <div class="val-cell__value val-cell__value--md">-- <span class="val-cell__unit">Hz</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- TABBED SECTION -->
  <div class="tabs">
    <div class="tabs__bar">
      <button class="tabs__btn tabs__btn--active" data-tab="electrical">Electrical</button>
      <button class="tabs__btn" data-tab="diagnostics">Diagnostics</button>
      <button class="tabs__btn" data-tab="accumulators">Accumulators</button>
    </div>
    <div class="tabs__content">
      <!-- ELECTRICAL TAB -->
      <div class="tab-pane tab-pane--active" id="tab-electrical">
        <table class="elec-table">
          <thead>
            <tr>
              <th>Phase</th><th>V (L-N)</th><th>V (L-L)</th><th>Amps</th>
              <th>kW</th><th>kVA</th><th>kVAr</th><th>PF</th>
            </tr>
          </thead>
          <tbody>
            <tr id="elec-l1">
              <td>L1</td><td>--</td><td>--</td><td>--</td>
              <td>--</td><td>--</td><td>--</td><td>--</td>
            </tr>
            <tr id="elec-l2">
              <td>L2</td><td>--</td><td>--</td><td>--</td>
              <td>--</td><td>--</td><td>--</td><td>--</td>
            </tr>
            <tr id="elec-l3">
              <td>L3</td><td>--</td><td>--</td><td>--</td>
              <td>--</td><td>--</td><td>--</td><td>--</td>
            </tr>
            <tr class="row-total" id="elec-total">
              <td>Total / Avg</td><td>—</td><td>—</td><td>—</td>
              <td>--</td><td>--</td><td>--</td><td>--</td>
            </tr>
          </tbody>
        </table>
        <div class="elec-supplementary" id="elec-supp">
          Earth Current: <span id="es-earth">--</span> A &nbsp;|&nbsp;
          Phase Rotation: <span id="es-phase-rot">--</span> &nbsp;|&nbsp;
          Lag/Lead: <span id="es-lag-lead">--</span>&deg; &nbsp;|&nbsp;
          % Full Power: <span id="es-pct-power">--</span>% &nbsp;|&nbsp;
          % Full Var: <span id="es-pct-var">--</span>% &nbsp;|&nbsp;
          Governor: <span id="es-gov">--</span>% &nbsp;|&nbsp;
          AVR: <span id="es-avr">--</span>%
        </div>
      </div>

      <!-- DIAGNOSTICS TAB -->
      <div class="tab-pane" id="tab-diagnostics">
        <div class="diag-grid" id="diag-grid">
          <!-- Populated by JS -->
        </div>
      </div>

      <!-- ACCUMULATORS TAB -->
      <div class="tab-pane" id="tab-accumulators">
        <div class="accum-grid" id="accum-grid">
          <!-- Populated by JS -->
        </div>
      </div>
    </div>
  </div>

  <!-- ALARM BAR -->
  <div class="alarm-bar">
    <div class="alarm-bar__header">
      <span class="alarm-bar__title">ALARMS</span>
      <span class="bdg bdg--green" id="alarm-count">NO ACTIVE ALARMS</span>
    </div>
    <div class="alarm-bar__table-wrap">
      <div class="alarm-bar__hdr-row">
        <span class="alarm-bar__col-time">Time</span>
        <span class="alarm-bar__col-severity">Severity</span>
        <span class="alarm-bar__col-name">Alarm</span>
        <span class="alarm-bar__col-state">State</span>
      </div>
      <div id="alarm-rows">
        <div class="alarm-bar__empty">No active alarms</div>
      </div>
    </div>
  </div>
</div>

<script>
// ═══════════════════════════════════════════════════════════════
//  DSE GenComm Generator Dashboard Widget
//  Single-file ThingsBoard custom widget
// ═══════════════════════════════════════════════════════════════

// ── CONFIGURATION ──────────────────────────────────────────────
const STALE_THRESHOLD_MS = 120000; // 2× 60s poll interval
const MAINS_PRESENT_THRESHOLD_V = 100; // V L-N above this = mains present

// ── TELEMETRY KEY MAP ──────────────────────────────────────────
// Maps internal names to ThingsBoard telemetry keys.
// Override these to match your IoT Gateway Modbus connector config.
const KEY_MAP = {
  // Status bar
  controlMode:        'control_mode',
  engineState:        'engine_operating_state',
  runTime:            'engine_run_time',
  numStarts:          'number_of_starts',

  // Engine hero
  genFreq:            'generator_frequency',
  coolantTemp:        'coolant_temperature',
  oilPressure:        'oil_pressure',
  engineSpeed:        'engine_speed',
  batteryVoltage:     'engine_battery_voltage',
  genTotalWatts:      'generator_total_watts',
  oilTemp:            'oil_temperature',
  chargeAltVoltage:   'charge_alternator_voltage',
  loadPct:            'percentage_load_at_speed',

  // Fuel
  fuelLevel:          'fuel_level',
  fuelUsed:           'fuel_used',
  fuelConsumption:    'fuel_consumption',

  // Mains
  mainsL1V:           'mains_l1n_voltage',
  mainsL2V:           'mains_l2n_voltage',
  mainsL3V:           'mains_l3n_voltage',
  mainsFreq:          'mains_frequency',

  // Electrical L1
  genL1Vln:           'generator_l1n_voltage',
  genL1Vll:           'generator_l1l2_voltage',
  genL1Amps:          'generator_l1_current',
  genL1Watts:         'generator_l1_watts',
  genL1VA:            'generator_l1_va',
  genL1Var:           'generator_l1_var',
  genL1PF:            'generator_power_factor_l1',

  // Electrical L2
  genL2Vln:           'generator_l2n_voltage',
  genL2Vll:           'generator_l2l3_voltage',
  genL2Amps:          'generator_l2_current',
  genL2Watts:         'generator_l2_watts',
  genL2VA:            'generator_l2_va',
  genL2Var:           'generator_l2_var',
  genL2PF:            'generator_power_factor_l2',

  // Electrical L3
  genL3Vln:           'generator_l3n_voltage',
  genL3Vll:           'generator_l3l1_voltage',
  genL3Amps:          'generator_l3_current',
  genL3Watts:         'generator_l3_watts',
  genL3VA:            'generator_l3_va',
  genL3Var:           'generator_l3_var',
  genL3PF:            'generator_power_factor_l3',

  // Electrical totals
  genTotalVA:         'generator_total_va',
  genTotalVar:        'generator_total_var',
  genAvgPF:           'generator_avg_power_factor',

  // Electrical supplementary
  earthCurrent:       'generator_earth_current',
  phaseRotation:      'generator_phase_rotation',
  lagLead:            'generator_current_lag_lead',
  pctFullPower:       'generator_pct_full_power',
  pctFullVar:         'generator_pct_full_var',
  governorOutput:     'governor_output',
  avrOutput:          'avr_output',

  // Diagnostics
  coolantPress1:      'coolant_pressure_1',
  coolantPress2:      'coolant_pressure_2',
  fuelPress1:         'fuel_pressure_1',
  fuelPress2:         'fuel_pressure_2',
  turboPress1:        'turbo_pressure_1',
  turboPress2:        'turbo_pressure_2',
  inletManifoldTemp1: 'inlet_manifold_temperature_1',
  inletManifoldTemp2: 'inlet_manifold_temperature_2',
  exhaustTemp1:       'exhaust_temperature_1',
  exhaustTemp2:       'exhaust_temperature_2',
  fuelTemp:           'fuel_temperature',
  atmosPressure:      'atmospheric_pressure',
  oilLevel:           'oil_level',
  coolantLevel:       'coolant_level',
  crankCasePress:     'crank_case_pressure',
  intercoolerTemp:    'intercooler_temperature',
  turboOilTemp:       'turbo_oil_temperature',
  ecuTemp:            'ecu_temperature',
  fanSpeed:           'fan_speed',
  airInletPress:      'air_inlet_pressure',
  injectorRail1:      'injector_rail_1_pressure',
  injectorRail2:      'injector_rail_2_pressure',
  accelPosition:      'accelerator_position',
  dcVoltage:          'dc_voltage',
  backupSupplyV:      'backup_supply_voltage',
  chargerMode:        'battery_charger_mode',
  ecuRatedSpeed:      'ecu_rated_speed',
  ecuIdleSpeed:       'ecu_idle_speed',

  // Accumulators
  genPosKwh:          'generator_pos_kwh',
  genNegKwh:          'generator_neg_kwh',
  genKvah:            'generator_kvah',
  genKvarh:           'generator_kvarh',

  // Alarms (registers 1-24 from Page 8)
  alarmReg1:          'alarm_reg_1',
  alarmReg2:          'alarm_reg_2',
  alarmReg3:          'alarm_reg_3',
  alarmReg4:          'alarm_reg_4',
  alarmReg5:          'alarm_reg_5',
  alarmReg6:          'alarm_reg_6',
  alarmReg7:          'alarm_reg_7',
  alarmReg8:          'alarm_reg_8',
  alarmReg9:          'alarm_reg_9',
  alarmReg10:         'alarm_reg_10',
  alarmReg11:         'alarm_reg_11',
  alarmReg12:         'alarm_reg_12',
  alarmReg13:         'alarm_reg_13',
  alarmReg14:         'alarm_reg_14',
  alarmReg15:         'alarm_reg_15',
  alarmReg16:         'alarm_reg_16',
  alarmReg17:         'alarm_reg_17',
  alarmReg18:         'alarm_reg_18',
  alarmReg19:         'alarm_reg_19',
  alarmReg20:         'alarm_reg_20',
  alarmReg21:         'alarm_reg_21',
  alarmReg22:         'alarm_reg_22',
  alarmReg23:         'alarm_reg_23',
  alarmReg24:         'alarm_reg_24',
};

// ── ENUM LOOKUP TABLES ─────────────────────────────────────────

const CONTROL_MODE = {
  0: 'Stop', 1: 'Auto', 2: 'Manual', 3: 'Test on Load',
  4: 'Auto + Restore', 5: 'User Config', 6: 'Test off Load', 7: 'Off'
};
const CONTROL_MODE_BADGE = {
  0: 'grey', 1: 'green', 2: 'amber', 3: 'blue',
  4: 'green', 5: 'amber', 6: 'blue', 7: 'grey'
};

const ENGINE_STATE = {
  0: 'Stopped', 1: 'Pre-Start', 2: 'Warming Up', 3: 'Running',
  4: 'Cooling Down', 5: 'Stopped', 6: 'Post Run', 15: 'N/A'
};
const ENGINE_STATE_BADGE = {
  0: 'grey', 1: 'amber', 2: 'amber', 3: 'green',
  4: 'amber', 5: 'grey', 6: 'amber', 15: 'grey'
};

const BATTERY_CHARGER_MODE = {
  0: 'Startup', 1: 'Init', 2: 'Boost/Bulk', 3: 'Absorption',
  4: 'Float', 5: 'Storage', 6: 'Test', 7: 'DC Alarm',
  8: 'Mains Alarm', 9: 'Temp Alarm', 10: 'Lamp Test', 11: 'Stopped'
};

const PHASE_ROTATION = {
  0: 'Indeterminate', 1: 'L1>L2>L3', 2: 'L3>L2>L1', 3: 'Phase Error'
};

const ALARM_SEVERITY = {
  0: { label: 'Disabled',    color: null,         show: false },
  1: { label: 'Not Active',  color: null,         show: false },
  2: { label: 'Warning',     color: 'var(--sev-warn)', show: true },
  3: { label: 'Shutdown',    color: 'var(--sev-shut)', show: true },
  4: { label: 'Elec Trip',   color: 'var(--sev-trip)', show: true },
  9: { label: 'Inactive',    color: 'var(--sev-inact)', show: true },
  10:{ label: 'Indication',  color: 'var(--sev-ind)',  show: true },
  15:{ label: 'N/A',         color: null,         show: false },
};

// 24 registers × 4 nibbles = 96 alarm names
// Index: [regOffset - 1][nibbleIndex]  (nibble 0 = bits 16-13, nibble 3 = bits 4-1)
const ALARM_NAMES = [
  /* reg 1  */ ['Emergency Stop','Low Oil Pressure','High Coolant Temp','High Oil Temp'],
  /* reg 2  */ ['Under Speed','Over Speed','Fail to Start','Fail to Rest'],
  /* reg 3  */ ['Loss Speed Sensing','Gen Low Voltage','Gen High Voltage','Gen Low Frequency'],
  /* reg 4  */ ['Gen High Frequency','Gen High Current','Gen Earth Fault','Gen Reverse Power'],
  /* reg 5  */ ['Air Flap','Oil Press Sender','Coolant Temp Sender','Oil Temp Sender'],
  /* reg 6  */ ['Fuel Level Sender','Mag Pickup','Loss AC Speed','Charge Alt Fail'],
  /* reg 7  */ ['Low Battery V','High Battery V','Low Fuel','High Fuel'],
  /* reg 8  */ ['Gen Fail Close','Mains Fail Close','Gen Fail Open','Mains Fail Open'],
  /* reg 9  */ ['Mains Low V','Mains High V','Bus Fail Close','Bus Fail Open'],
  /* reg 10 */ ['Mains Low Freq','Mains High Freq','Mains Failed','Mains Phase Rot Wrong'],
  /* reg 11 */ ['Gen Phase Rotation','Maintenance Due','Clock Not Set','Config Lost'],
  /* reg 12 */ ['Telemetry Cfg Lost','Not Calibrated','Modem Power Fault','Gen Short Circuit'],
  /* reg 13 */ ['Fail to Sync','Bus Live','Scheduled Run','Bus Phase Rot Wrong'],
  /* reg 14 */ ['Priority Error','MSC Data Error','MSC ID Error','MSC Failure'],
  /* reg 15 */ ['MSC Too Few','MSC Alarms Inhibited','MSC Old Version','Mains Reverse Power'],
  /* reg 16 */ ['Min Sets Not Reached','Insufficient Capacity','Exp Input Uncal','Exp Input Fail'],
  /* reg 17 */ ['Aux Sender 1 Low','Aux Sender 1 High','Aux Sender 1 Fault','Aux Sender 2 Low'],
  /* reg 18 */ ['Aux Sender 2 High','Aux Sender 2 Fault','Aux Sender 3 Low','Aux Sender 3 High'],
  /* reg 19 */ ['Aux Sender 3 Fault','Aux Sender 4 Low','Aux Sender 4 High','Aux Sender 4 Fault'],
  /* reg 20 */ ['ECU Link Lost','ECU Failure','ECU Error','Low Coolant Temp'],
  /* reg 21 */ ['Out of Sync','Low Oil Press Switch','Alt Aux Mains Fail','Loss of Excitation'],
  /* reg 22 */ ['Mains kW Limit','Neg Phase Sequence','ROCOF','Mains Vector Shift'],
  /* reg 23 */ ['G59 Low Freq','G59 High Freq','G59 Low V','G59 High V'],
  /* reg 24 */ ['G59 Trip','Gen kW Overload','Engine Inlet Temp Hi','Bus 1 Live'],
];

// ── DIAGNOSTICS FIELD DEFINITIONS ──────────────────────────────
const DIAG_FIELDS = [
  { key: 'coolantPress1',      label: 'Coolant Press 1',     unit: 'kPa',  scale: 1 },
  { key: 'coolantPress2',      label: 'Coolant Press 2',     unit: 'kPa',  scale: 1 },
  { key: 'fuelPress1',         label: 'Fuel Press 1',        unit: 'kPa',  scale: 1 },
  { key: 'fuelPress2',         label: 'Fuel Press 2',        unit: 'kPa',  scale: 1 },
  { key: 'turboPress1',        label: 'Turbo Press 1',       unit: 'kPa',  scale: 1 },
  { key: 'turboPress2',        label: 'Turbo Press 2',       unit: 'kPa',  scale: 1 },
  { key: 'inletManifoldTemp1', label: 'Inlet Manifold 1',    unit: '°C',   scale: 1 },
  { key: 'inletManifoldTemp2', label: 'Inlet Manifold 2',    unit: '°C',   scale: 1 },
  { key: 'exhaustTemp1',       label: 'Exhaust Temp 1',      unit: '°C',   scale: 1 },
  { key: 'exhaustTemp2',       label: 'Exhaust Temp 2',      unit: '°C',   scale: 1 },
  { key: 'fuelTemp',           label: 'Fuel Temp',           unit: '°C',   scale: 1 },
  { key: 'atmosPressure',      label: 'Atmos Pressure',      unit: 'kPa',  scale: 1 },
  { key: 'oilLevel',           label: 'Oil Level',           unit: '%',    scale: 1 },
  { key: 'coolantLevel',       label: 'Coolant Level',       unit: '%',    scale: 1 },
  { key: 'crankCasePress',     label: 'Crank Case Press',    unit: 'kPa',  scale: 0.01 },
  { key: 'intercoolerTemp',    label: 'Intercooler Temp',    unit: '°C',   scale: 1 },
  { key: 'turboOilTemp',       label: 'Turbo Oil Temp',      unit: '°C',   scale: 1 },
  { key: 'ecuTemp',            label: 'ECU Temp',            unit: '°C',   scale: 1 },
  { key: 'fanSpeed',           label: 'Fan Speed',           unit: 'RPM',  scale: 1 },
  { key: 'airInletPress',      label: 'Air Inlet Press',     unit: 'kPa',  scale: 1 },
  { key: 'injectorRail1',      label: 'Injector Rail 1',     unit: 'MPa',  scale: 0.01 },
  { key: 'injectorRail2',      label: 'Injector Rail 2',     unit: 'MPa',  scale: 0.01 },
  { key: 'accelPosition',      label: 'Accel Position',      unit: '%',    scale: 1 },
  { key: 'dcVoltage',          label: 'DC Voltage',          unit: 'V',    scale: 0.1 },
  { key: 'backupSupplyV',      label: 'Backup Supply',       unit: 'V',    scale: 0.1 },
  { key: 'chargerMode',        label: 'Charger Mode',        unit: '',     scale: 1, enum: BATTERY_CHARGER_MODE },
  { key: 'ecuRatedSpeed',      label: 'ECU Rated Speed',     unit: 'RPM',  scale: 1 },
  { key: 'ecuIdleSpeed',       label: 'ECU Idle Speed',      unit: 'RPM',  scale: 1 },
];

// ── ACCUMULATOR FIELD DEFINITIONS ──────────────────────────────
const ACCUM_FIELDS = [
  { key: 'genPosKwh',  label: 'Gen +kWh',         unit: 'kWh',   scale: 0.1 },
  { key: 'genNegKwh',  label: 'Gen -kWh',         unit: 'kWh',   scale: 0.1 },
  { key: 'genKvah',    label: 'Gen kVAh',         unit: 'kVAh',  scale: 0.1 },
  { key: 'genKvarh',   label: 'Gen kVArh',        unit: 'kVArh', scale: 0.1 },
  { key: 'fuelUsed',   label: 'Total Fuel Used',  unit: 'L',     scale: 1 },
  { key: 'runTime',    label: 'Run Hours',         unit: 'h',     scale: 1/3600 },
  { key: 'numStarts',  label: 'Number of Starts',  unit: '',      scale: 1 },
  { key: '_lifetimeSFC', label: 'Lifetime SFC',    unit: 'L/kWh', scale: 1, derived: true },
];


// ── STATE ──────────────────────────────────────────────────────
const D = {};   // Latest values (scaled)
const TS = {};  // Latest timestamps per key
let isDemo = false;

// ── UTILITY FUNCTIONS ──────────────────────────────────────────

function fmt(val, decimals = 1) {
  if (val == null || val === '--') return '--';
  const n = Number(val);
  if (isNaN(n)) return '--';
  return n.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals
  });
}

function fmtInt(val) {
  if (val == null || val === '--') return '--';
  const n = Number(val);
  if (isNaN(n)) return '--';
  return Math.round(n).toLocaleString();
}

function getStaleness(key) {
  if (TS[key] == null) return 'never';
  if (isDemo) return 'live';
  const age = Date.now() - TS[key];
  return age > STALE_THRESHOLD_MS ? 'stale' : 'live';
}

function applyStaleness(el, key) {
  el.classList.remove('val-cell--stale', 'val-cell--never',
                       'diag-card--stale', 'diag-card--never');
  const state = getStaleness(key);
  if (state === 'stale') {
    el.classList.add(el.classList.contains('diag-card') ? 'diag-card--stale' : 'val-cell--stale');
  } else if (state === 'never') {
    el.classList.add(el.classList.contains('diag-card') ? 'diag-card--never' : 'val-cell--never');
  }
}

function setBadge(el, text, color) {
  el.textContent = text;
  el.className = 'bdg bdg--' + color;
}

function setValCell(id, key, value, unit, decimals = 1) {
  const el = document.getElementById(id);
  if (!el) return;
  const valEl = el.querySelector('.val-cell__value');
  if (!valEl) return;
  const unitSpan = valEl.querySelector('.val-cell__unit');
  const unitHtml = unit ? ` <span class="val-cell__unit">${unit}</span>` : '';
  valEl.innerHTML = fmt(value, decimals) + unitHtml;
  applyStaleness(el, key);
}

// ── TAB SWITCHING ──────────────────────────────────────────────

document.querySelectorAll('.tabs__btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tabs__btn').forEach(b => b.classList.remove('tabs__btn--active'));
    document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('tab-pane--active'));
    btn.classList.add('tabs__btn--active');
    document.getElementById('tab-' + btn.dataset.tab).classList.add('tab-pane--active');
  });
});

// ── BUILD DIAGNOSTICS GRID ─────────────────────────────────────

function buildDiagGrid() {
  const grid = document.getElementById('diag-grid');
  grid.innerHTML = '';
  DIAG_FIELDS.forEach(f => {
    const card = document.createElement('div');
    card.className = 'diag-card';
    card.id = 'diag-' + f.key;
    card.innerHTML = `
      <div class="diag-card__label">${f.label}</div>
      <div class="diag-card__value">-- <span class="diag-card__unit">${f.unit}</span></div>
    `;
    grid.appendChild(card);
  });
}

// ── BUILD ACCUMULATORS GRID ────────────────────────────────────

function buildAccumGrid() {
  const grid = document.getElementById('accum-grid');
  grid.innerHTML = '';
  ACCUM_FIELDS.forEach(f => {
    const card = document.createElement('div');
    card.className = 'accum-card';
    card.id = 'accum-' + f.key;
    card.innerHTML = `
      <div class="accum-card__label">${f.label}</div>
      <div class="accum-card__value">-- <span class="accum-card__unit">${f.unit}</span></div>
    `;
    grid.appendChild(card);
  });
}

// ── ALARM DECODER ──────────────────────────────────────────────

function decodeAlarms() {
  const active = [];
  for (let reg = 1; reg <= 24; reg++) {
    const regKey = 'alarmReg' + reg;
    const raw = D[regKey];
    if (raw == null) continue;
    const val = Math.round(raw);
    for (let nib = 0; nib < 4; nib++) {
      const shift = (3 - nib) * 4;
      const code = (val >> shift) & 0x0F;
      const sev = ALARM_SEVERITY[code];
      if (!sev || !sev.show) continue;
      active.push({
        name: ALARM_NAMES[reg - 1][nib],
        severity: sev.label,
        color: sev.color,
        code: code,
      });
    }
  }
  return active;
}

function updateAlarmBar() {
  const alarms = decodeAlarms();
  const countEl = document.getElementById('alarm-count');
  const rowsEl = document.getElementById('alarm-rows');

  // Count only active alarms (not inactive/shown)
  const activeCount = alarms.filter(a => a.code >= 2 && a.code <= 10 && a.code !== 9).length;

  if (activeCount === 0) {
    setBadge(countEl, 'NO ACTIVE ALARMS', 'green');
  } else {
    setBadge(countEl, activeCount + ' ACTIVE ALARM' + (activeCount > 1 ? 'S' : ''), 'red');
  }

  if (alarms.length === 0) {
    rowsEl.innerHTML = '<div class="alarm-bar__empty">No active alarms</div>';
    return;
  }

  // Sort: shutdowns/trips first, then warnings, then indications, then inactive
  const sevOrder = { 3: 0, 4: 0, 2: 1, 10: 2, 9: 3 };
  alarms.sort((a, b) => (sevOrder[a.code] ?? 9) - (sevOrder[b.code] ?? 9));

  rowsEl.innerHTML = alarms.map(a => `
    <div class="alarm-bar__row">
      <span class="alarm-bar__col-time">${new Date().toLocaleString()}</span>
      <span class="alarm-bar__col-severity" style="color:${a.color}">${a.severity}</span>
      <span class="alarm-bar__col-name">${a.name}</span>
      <span class="alarm-bar__col-state" style="color:${a.color}">Active</span>
    </div>
  `).join('');
}

// ── UPDATE FUNCTIONS ───────────────────────────────────────────

function updateStatusBar() {
  // Control Mode
  const mode = D.controlMode;
  if (mode != null) {
    setBadge(document.getElementById('sb-mode'),
      CONTROL_MODE[mode] || `Unknown (${mode})`,
      CONTROL_MODE_BADGE[mode] || 'grey');
  }

  // Engine State
  const state = D.engineState;
  if (state != null) {
    setBadge(document.getElementById('sb-engine'),
      ENGINE_STATE[state] || `Unknown (${state})`,
      ENGINE_STATE_BADGE[state] || 'grey');
  }

  // Run Hours (seconds → hours)
  const runSec = D.runTime;
  document.getElementById('sb-runhrs').textContent =
    runSec != null ? fmtInt(runSec / 3600) + ' h' : '--';

  // Starts
  document.getElementById('sb-starts').textContent =
    D.numStarts != null ? fmtInt(D.numStarts) : '--';
}

function updateEngineHero() {
  setValCell('vc-freq',        'genFreq',         D.genFreq,         'Hz');
  setValCell('vc-coolant-temp','coolantTemp',      D.coolantTemp,     '°C', 0);
  setValCell('vc-oil-press',   'oilPressure',      D.oilPressure,     'kPa', 0);
  setValCell('vc-rpm',         'engineSpeed',      D.engineSpeed,     '', 0);
  setValCell('vc-batt-v',      'batteryVoltage',   D.batteryVoltage,  'V');
  setValCell('vc-total-kw',    'genTotalWatts',    D.genTotalWatts != null ? D.genTotalWatts / 1000 : null, 'kW');
  setValCell('vc-oil-temp',    'oilTemp',          D.oilTemp,         '°C', 0);
  setValCell('vc-charge-alt',  'chargeAltVoltage', D.chargeAltVoltage,'V');
  setValCell('vc-load',        'loadPct',          D.loadPct,         '%', 0);
}

function updateFuelPanel() {
  setValCell('vc-fuel-level',    'fuelLevel',       D.fuelLevel,       '%', 0);
  setValCell('vc-fuel-used',     'fuelUsed',        D.fuelUsed, 'L', 0);
  setValCell('vc-fuel-rate',     'fuelConsumption',  D.fuelConsumption, 'L/h');

  // Specific: L/h / kVA
  let specific = null;
  if (D.fuelConsumption != null && D.genTotalVA != null && D.genTotalVA > 0) {
    specific = D.fuelConsumption / (D.genTotalVA / 1000);
  }
  setValCell('vc-fuel-specific', 'fuelConsumption', specific, 'L/h/kVA', 3);
}

function updateMainsPanel() {
  setValCell('vc-mains-l1',   'mainsL1V',  D.mainsL1V,  'V', 0);
  setValCell('vc-mains-l2',   'mainsL2V',  D.mainsL2V,  'V', 0);
  setValCell('vc-mains-l3',   'mainsL3V',  D.mainsL3V,  'V', 0);
  setValCell('vc-mains-freq', 'mainsFreq', D.mainsFreq, 'Hz');

  // Mains present/absent
  const present = (D.mainsL1V > MAINS_PRESENT_THRESHOLD_V) ||
                  (D.mainsL2V > MAINS_PRESENT_THRESHOLD_V) ||
                  (D.mainsL3V > MAINS_PRESENT_THRESHOLD_V);
  const mainsEl = document.getElementById('sb-mains');
  if (D.mainsL1V == null && D.mainsL2V == null && D.mainsL3V == null) {
    setBadge(mainsEl, '--', 'grey');
  } else {
    setBadge(mainsEl, present ? 'PRESENT' : 'ABSENT', present ? 'green' : 'red');
  }
}

function updateElectricalTab() {
  function setRow(id, vln, vll, amps, kw, kva, kvar, pf) {
    const row = document.getElementById(id);
    if (!row) return;
    const cells = row.querySelectorAll('td');
    cells[1].textContent = fmt(vln);
    cells[2].textContent = fmt(vll);
    cells[3].textContent = fmt(amps);
    cells[4].textContent = kw != null ? fmt(kw / 1000) : '--';
    cells[5].textContent = kva != null ? fmt(kva / 1000) : '--';
    cells[6].textContent = kvar != null ? fmt(kvar / 1000) : '--';
    cells[7].textContent = fmt(pf, 2);
  }

  setRow('elec-l1', D.genL1Vln, D.genL1Vll, D.genL1Amps, D.genL1Watts, D.genL1VA, D.genL1Var, D.genL1PF);
  setRow('elec-l2', D.genL2Vln, D.genL2Vll, D.genL2Amps, D.genL2Watts, D.genL2VA, D.genL2Var, D.genL2PF);
  setRow('elec-l3', D.genL3Vln, D.genL3Vll, D.genL3Amps, D.genL3Watts, D.genL3VA, D.genL3Var, D.genL3PF);

  // Total row
  const totalRow = document.getElementById('elec-total');
  if (totalRow) {
    const cells = totalRow.querySelectorAll('td');
    cells[4].textContent = D.genTotalWatts != null ? fmt(D.genTotalWatts / 1000) : '--';
    cells[5].textContent = D.genTotalVA != null ? fmt(D.genTotalVA / 1000) : '--';
    cells[6].textContent = D.genTotalVar != null ? fmt(D.genTotalVar / 1000) : '--';
    cells[7].textContent = fmt(D.genAvgPF, 2);
  }

  // Supplementary
  document.getElementById('es-earth').textContent = fmt(D.earthCurrent);
  document.getElementById('es-phase-rot').textContent = PHASE_ROTATION[D.phaseRotation] || '--';
  document.getElementById('es-lag-lead').textContent = fmt(D.lagLead, 0);
  document.getElementById('es-pct-power').textContent = fmt(D.pctFullPower);
  document.getElementById('es-pct-var').textContent = fmt(D.pctFullVar);
  document.getElementById('es-gov').textContent = fmt(D.governorOutput);
  document.getElementById('es-avr').textContent = fmt(D.avrOutput);
}

function updateDiagnosticsTab() {
  DIAG_FIELDS.forEach(f => {
    const card = document.getElementById('diag-' + f.key);
    if (!card) return;
    const valEl = card.querySelector('.diag-card__value');
    const raw = D[f.key];
    let display;
    if (raw == null) {
      display = '--';
    } else if (f.enum) {
      display = f.enum[Math.round(raw)] || `Unknown (${raw})`;
    } else {
      display = fmt(raw * f.scale, f.scale < 1 ? 2 : 0);
    }
    const unitSpan = f.unit ? ` <span class="diag-card__unit">${f.unit}</span>` : '';
    valEl.innerHTML = display + unitSpan;
    applyStaleness(card, f.key);
  });
}

function updateAccumulatorsTab() {
  ACCUM_FIELDS.forEach(f => {
    const card = document.getElementById('accum-' + f.key);
    if (!card) return;
    const valEl = card.querySelector('.accum-card__value');
    let display;

    if (f.derived && f.key === '_lifetimeSFC') {
      // Lifetime SFC = Total Fuel Used / +kWh
      if (D.fuelUsed != null && D.genPosKwh != null && D.genPosKwh > 0) {
        display = fmt(D.fuelUsed / (D.genPosKwh * 0.1), 2);
      } else {
        display = '--';
      }
    } else {
      const raw = D[f.key];
      if (raw == null) {
        display = '--';
      } else {
        const scaled = raw * f.scale;
        display = f.scale < 1 ? fmt(scaled) : fmtInt(scaled);
      }
    }

    const unitSpan = f.unit ? ` <span class="accum-card__unit">${f.unit}</span>` : '';
    valEl.innerHTML = display + unitSpan;
  });
}

function updateAll() {
  updateStatusBar();
  updateEngineHero();
  updateFuelPanel();
  updateMainsPanel();
  updateElectricalTab();
  updateDiagnosticsTab();
  updateAccumulatorsTab();
  updateAlarmBar();
}

// ── THINGSBOARD WIDGET API INTEGRATION ─────────────────────────

// Build reverse lookup: TB key → internal key
const TB_KEY_TO_INTERNAL = {};
Object.entries(KEY_MAP).forEach(([internal, tbKey]) => {
  TB_KEY_TO_INTERNAL[tbKey] = internal;
});

// Scale factors for keys that need them (applied when reading from TB)
const SCALE_MAP = {
  genFreq: 0.1, chargeAltVoltage: 0.1, batteryVoltage: 0.1,
  mainsL1V: 0.1, mainsL2V: 0.1, mainsL3V: 0.1, mainsFreq: 0.1,
  genL1Vln: 0.1, genL2Vln: 0.1, genL3Vln: 0.1,
  genL1Vll: 0.1, genL2Vll: 0.1, genL3Vll: 0.1,
  genL1Amps: 0.1, genL2Amps: 0.1, genL3Amps: 0.1,
  earthCurrent: 0.1,
  genL1PF: 0.01, genL2PF: 0.01, genL3PF: 0.01, genAvgPF: 0.01,
  pctFullPower: 0.1, pctFullVar: 0.1,
  governorOutput: 0.1, avrOutput: 0.1,
  fuelConsumption: 0.01,
  dcVoltage: 0.1, backupSupplyV: 0.1,
  genPosKwh: 0.1, genNegKwh: 0.1, genKvah: 0.1, genKvarh: 0.1,
};

function processDataUpdate(data) {
  if (!data || !data.length) return;
  data.forEach(ds => {
    if (!ds.data) return;
    ds.data.forEach(series => {
      const tbKey = series.dataKey?.name || series.dataKey?.label;
      const internal = TB_KEY_TO_INTERNAL[tbKey];
      if (!internal) return;
      if (series.data && series.data.length) {
        const latest = series.data[series.data.length - 1];
        const raw = Number(latest[1]);
        const scale = SCALE_MAP[internal] || 1;
        D[internal] = raw * scale;
        TS[internal] = latest[0]; // timestamp
      }
    });
  });
  updateAll();
}

// ThingsBoard lifecycle hooks (only active when running inside TB)
if (typeof self !== 'undefined' && self.ctx) {
  self.onInit = function() {
    buildDiagGrid();
    buildAccumGrid();
  };
  self.onDataUpdated = function() {
    processDataUpdate(self.ctx.data);
  };
  self.onResize = function() {
    // CSS handles responsive via media queries
  };
  self.onDestroy = function() {
    // Nothing to clean up
  };
}

// ── DEMO MODE ──────────────────────────────────────────────────
// When opened standalone (not in ThingsBoard), populate with sample data

function loadDemoData() {
  isDemo = true;
  const now = Date.now();
  const demoValues = {
    controlMode: 1, engineState: 3,
    runTime: 15184800, numStarts: 1247,
    genFreq: 50.0, coolantTemp: 82, oilPressure: 420,
    engineSpeed: 1500, batteryVoltage: 27.4, genTotalWatts: 45200,
    oilTemp: 91, chargeAltVoltage: 28.1, loadPct: 72,
    fuelLevel: 85, fuelUsed: 12480, fuelConsumption: 8.4,
    mainsL1V: 230, mainsL2V: 228, mainsL3V: 231, mainsFreq: 50.0,
    genL1Vln: 230.1, genL1Vll: 398.5, genL1Amps: 65.4,
    genL1Watts: 14800, genL1VA: 15100, genL1Var: 2900, genL1PF: 0.98,
    genL2Vln: 228.7, genL2Vll: 397.2, genL2Amps: 63.1,
    genL2Watts: 14200, genL2VA: 14400, genL2Var: 2600, genL2PF: 0.97,
    genL3Vln: 231.4, genL3Vll: 399.1, genL3Amps: 67.8,
    genL3Watts: 15400, genL3VA: 15700, genL3Var: 3100, genL3PF: 0.98,
    genTotalVA: 45200, genTotalVar: 8600, genAvgPF: 0.98,
    earthCurrent: 0.2, phaseRotation: 1, lagLead: -2,
    pctFullPower: 72.1, pctFullVar: 14.3,
    governorOutput: 48.2, avrOutput: 52.1,
    coolantPress1: 180, fuelPress1: 320, turboPress1: 210,
    inletManifoldTemp1: 45, exhaustTemp1: 485, exhaustTemp2: 478,
    fuelTemp: 38, atmosPressure: 101, oilLevel: 88, coolantLevel: 95,
    intercoolerTemp: 42, ecuTemp: 55, fanSpeed: 2400,
    airInletPress: 102, accelPosition: 72,
    dcVoltage: 27.6, backupSupplyV: 27.2, chargerMode: 4,
    ecuRatedSpeed: 1500, ecuIdleSpeed: 800,
    genPosKwh: 189420, genNegKwh: 120, genKvah: 195800, genKvarh: 42100,
    // Sample alarm: Low Fuel warning
    alarmReg7: 0x0020, // nibble 2 (Low Fuel) = code 2 (warning)
  };

  Object.entries(demoValues).forEach(([key, val]) => {
    D[key] = val;
    TS[key] = now;
  });

  updateAll();
}

// ── INIT ───────────────────────────────────────────────────────

buildDiagGrid();
buildAccumGrid();

// If not inside ThingsBoard, start demo mode
if (typeof self === 'undefined' || !self.ctx) {
  loadDemoData();
}

</script>
</body>
</html>
```

- [ ] **Step 2: Verify the file opens in a browser**

Open `widgets/generator-dse-gencomm.html` in a browser. Expected:
- Dark background (#0a0f1a)
- Status bar with AUTO badge (green), RUNNING badge (green), run hours and starts
- Engine panel with Hz=50.0, Coolant=82°C, Oil Pressure=420 kPa as large values
- Fuel panel with 85%, 12,480 L, 8.4 L/h, specific consumption
- Mains panel with ~230V per phase, 50.0 Hz, PRESENT badge
- Electrical tab with 3-phase table filled with sample data
- Diagnostics and Accumulators tabs clickable and populated
- Alarm bar showing "Low Fuel — Warning" as one active alarm
- All values populated from demo data (no `--` except unreported diagnostics fields)

- [ ] **Step 3: Commit**

```bash
git add widgets/generator-dse-gencomm.html
git commit -m "feat: add DSE GenComm generator dashboard widget

Single self-contained HTML widget for ThingsBoard with:
- Status bar, engine hero, fuel, mains panels
- Tabbed electrical/diagnostics/accumulators sections
- Alarm bar with 4-bit nibble decoder (96 named alarms)
- Enum lookups, stale value detection, demo mode
- Full key map for TB IoT Gateway Modbus connector"
```

---

### Task 2: Visual Polish and Testing

**Files:**
- Modify: `widgets/generator-dse-gencomm.html`

- [ ] **Step 1: Open in browser and verify all sections render correctly**

Open `widgets/generator-dse-gencomm.html` directly in a browser. Check:
- All 3 tabs switch correctly (Electrical → Diagnostics → Accumulators)
- Demo data populates all main values
- Alarm bar shows "Low Fuel" warning with amber color
- Diagnostic cards that have no demo data show `--` in grey
- Responsive: resize browser to narrow width (<768px), confirm single-column layout

- [ ] **Step 2: Test alarm decoder with multiple alarms**

Open browser console and run:
```js
D.alarmReg1 = 0x3200; // Emergency Stop=shutdown(3), Low Oil Pressure=warning(2)
D.alarmReg7 = 0x0020; // Low Fuel=warning(2)
TS.alarmReg1 = Date.now();
updateAll();
```

Expected: Alarm bar shows "3 ACTIVE ALARMS" in red badge, with Emergency Stop (red), Low Oil Pressure (amber), Low Fuel (amber) sorted by severity.

- [ ] **Step 3: Test stale value detection**

Open browser console and run:
```js
isDemo = false;
TS.genFreq = Date.now() - 200000; // 200s ago = stale
TS.coolantTemp = null; // never received
updateAll();
```

Expected: Frequency value dims to 0.4 opacity with ⏱ icon. Coolant temp shows `--` in grey.

- [ ] **Step 4: Commit any fixes**

```bash
git add widgets/generator-dse-gencomm.html
git commit -m "fix: polish and verify DSE GenComm dashboard widget"
```

---

### Task 3: Documentation Update

**Files:**
- Modify: `widgets/generator-dse-gencomm.html` (add header comment)

- [ ] **Step 1: Add file header comment with usage instructions**

Add at the very top of the `<script>` block:

```js
// ═══════════════════════════════════════════════════════════════
//  DSE GenComm Generator Dashboard Widget
//  Single-file ThingsBoard custom widget
//
//  USAGE IN THINGSBOARD:
//  1. Create a new Custom Widget in TB Widget Library
//  2. Paste this file's HTML into the HTML tab
//  3. Configure datasources with telemetry keys matching KEY_MAP
//  4. Adjust KEY_MAP values if your gateway uses different key names
//
//  STANDALONE TESTING:
//  Open this file directly in a browser — demo data loads automatically
//
//  DATA SOURCE: DSE GenComm Modbus register map
//  See: docs/superpowers/specs/2026-03-31-dse-gencomm-dashboard-design.md
// ═══════════════════════════════════════════════════════════════
```

- [ ] **Step 2: Commit**

```bash
git add widgets/generator-dse-gencomm.html
git commit -m "docs: add usage instructions to DSE GenComm widget header"
```
