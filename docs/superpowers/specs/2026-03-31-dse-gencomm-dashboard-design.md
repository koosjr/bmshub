# DSE GenComm Generator Dashboard — Design Spec

**Date:** 2026-03-31
**Type:** ThingsBoard HTML Widget
**Data Source:** DSE GenComm Modbus register map (136 registers)
**Reference:** `G:\My Drive\PACOFS BMS\Deepsea\DSE_GenComm_Modbus_Points_list_koos.csv`

---

## Overview

A single self-contained HTML widget for ThingsBoard that displays all telemetry from a DSE GenComm generator controller. The widget uses the ThingsBoard widget API (`self.ctx`, `self.onDataUpdated()`) for live data binding. Dark theme, CSS grid layout, designed to be scripted/templated for reuse across multiple generator installations.

The DSE GenComm is a standard controller — this widget is built once and reused.

---

## Layout Structure

Layout A — Hero Engine with side panels, tabbed detail section, alarm bar at bottom.

```
┌─────────────────────────────────┐
│  STATUS BAR: Mode | Engine State | Run Hours | Starts                │
├───────────────────┬─────────────┤
│                   │    FUEL     │
│  ENGINE &         │  Level|Used │
│  GENERATOR        │  L/h|L/kWh │
│  (hero panel)     ├─────────────┤
│  RPM|Freq|kW      │   MAINS    │
│  Oil|Coolant|Batt │  V L1-3    │
│                   │  Freq|Status│
├───────────────────┴─────────────┤
│  [ELECTRICAL] [DIAGNOSTICS] [ACCUMULATORS]  ← tabs                   │
│  ┌─────────────────────────────┐│
│  │  (tab content area)         ││
│  └─────────────────────────────┘│
├─────────────────────────────────┤
│  ALARM BAR                                                           │
│  Time | Severity | Alarm Name | State                                │
└─────────────────────────────────┘
```

---

## Section Details

### 1. Status Bar (always visible)

Top strip with key status indicators.

| Field               | Source Register           | Type   | Mapping                                                                                        |
|---------------------|---------------------------|--------|------------------------------------------------------------------------------------------------|
| Control Mode        | Page 3, Offset 4          | Enum   | 0=Stop, 1=Auto, 2=Manual, 3=Test on Load, 4=Auto+Manual Restore, 5=User Config, 6=Test off Load, 7=Off |
| Engine State        | Page 5, Offset 128        | Enum   | 0=Stopped, 1=Pre-Start, 2=Warming Up, 3=Running, 4=Cooling Down, 5=Stopped, 6=Post Run, 15=N/A |
| Run Hours           | Page 10, Offset 6         | UINT32 | Seconds → display as hours                                                                     |
| Number of Starts    | Page 7, Offset 16         | UINT32 | Raw count                                                                                      |

Mode and State rendered as colored badges (green=running/auto, amber=manual/warming, grey=stopped/off).

### 2. Engine & Generator Hero (left, ~50% width)

Primary focus panel. Largest visual zone.

| Field                  | Source                    | Unit  | Scale | Display Size |
|------------------------|---------------------------|-------|-------|--------------|
| Generator Frequency    | Page 4, Offset 7          | Hz    | ×0.1  | Large (18px) |
| Coolant Temperature    | Page 4, Offset 1          | °C    | 1     | Large        |
| Oil Pressure           | Page 4, Offset 0          | kPa   | 1     | Large        |
| Engine Speed           | Page 4, Offset 6          | RPM   | 1     | Medium (14px)|
| Engine Battery Voltage | Page 4, Offset 5          | V     | ×0.1  | Medium       |
| Generator Total Watts  | Page 6, Offset 0          | W     | 1     | Medium (→kW) |
| Oil Temperature        | Page 4, Offset 2          | °C    | 1     | Medium       |
| Charge Alt Voltage     | Page 4, Offset 4          | V     | ×0.1  | Medium       |
| Percentage Load        | Page 5, Offset 74         | %     | 1     | Medium       |

Layout: 3×3 grid within the panel. Top row (Hz, Coolant Temp, Oil Pressure) uses larger font — these are the critical engine health indicators. Second tier (RPM, Battery, kW, etc.) in medium font.

### 3. Fuel Panel (top-right, ~50% width, top half)

| Field              | Source                | Unit   | Scale | Notes                                    |
|--------------------|-----------------------|--------|-------|------------------------------------------|
| Fuel Level         | Page 4, Offset 3      | %      | 1     | 0-130% range                             |
| Total Fuel Used    | Page 7, Offset 34     | Litres | 1     | UINT32 accumulator                       |
| Fuel Consumption   | Page 5, Offset 10     | L/h    | ×0.01 | UINT32                                   |
| Specific Consump.  | *Calculated*          | L/h/kVA | —    | Instantaneous: Fuel_Consumption(L/h) / Generator_Total_VA(kVA). Live efficiency reading. |

4-column layout. Specific consumption is a derived value computed in the widget JS.

### 4. Mains Panel (top-right, ~50% width, bottom half)

Simplified view — voltages, frequency, and presence only.

| Field            | Source                | Unit | Scale | Notes           |
|------------------|-----------------------|------|-------|-----------------|
| Mains L1-N V     | Page 4, Offset 36     | V    | ×0.1  | UINT32          |
| Mains L2-N V     | Page 4, Offset 38     | V    | ×0.1  | UINT32          |
| Mains L3-N V     | Page 4, Offset 40     | V    | ×0.1  | UINT32          |
| Mains Frequency  | Page 4, Offset 35     | Hz   | ×0.1  |                 |
| Mains Present    | *Derived*             | Bool | —     | True if any L-N voltage > threshold (e.g., >100V) |

Header includes a PRESENT/ABSENT badge. 4-column layout (L1-N, L2-N, L3-N, Freq).

### 5. Tabbed Section (full-width)

Three tabs sharing one content area below the hero row.

#### Tab 1: Electrical (default active)

Full 3-phase generator electrical table.

**Table columns:** Phase | V (L-N) | V (L-L) | Amps | kW | kVA | kVAr | PF

| Row       | V(L-N) Source     | V(L-L) Source     | Amps Source       | kW Source         | kVA Source       | kVAr Source       | PF Source         |
|-----------|-------------------|-------------------|-------------------|-------------------|------------------|-------------------|-------------------|
| L1        | Pg4 Off8 (U32)    | Pg4 Off14 (U32)   | Pg4 Off20 (U32)   | Pg4 Off28 (I32)   | Pg6 Off2 (U32)   | Pg6 Off10 (I32)   | Pg6 Off18 (I16)   |
| L2        | Pg4 Off10 (U32)   | Pg4 Off16 (U32)   | Pg4 Off22 (U32)   | Pg4 Off30 (I32)   | Pg6 Off4 (U32)   | Pg6 Off12 (I32)   | Pg6 Off19 (I16)   |
| L3        | Pg4 Off12 (U32)   | Pg4 Off18 (U32)   | Pg4 Off24 (U32)   | Pg4 Off32 (I32)   | Pg6 Off6 (U32)   | Pg6 Off14 (I32)   | Pg6 Off20 (I16)   |
| Total/Avg | —                 | —                 | —                 | Pg6 Off0 (I32)    | Pg6 Off8 (U32)   | Pg6 Off16 (I32)   | Pg6 Off21 (I16)   |

**Scale factors:** Voltages ×0.1, Currents ×0.1, Watts ×1 (display as kW by ÷1000), VA/VAr ×1 (÷1000), PF ×0.01.

**Below the table** (supplementary row):
- Earth Current: Page 4, Offset 26 (×0.1 A)
- Phase Rotation: Page 4, Offset 49 (enum: 0=Indeterminate, 1=L1>L2>L3, 2=L3>L2>L1, 3=Phase error)
- Current Lag/Lead: Page 4, Offset 34 (degrees)
- % Full Power: Page 6, Offset 22 (×0.1 %)
- % Full Var: Page 6, Offset 23 (×0.1 %)
- Governor Output: Page 4, Offset 195 (×0.1 %)
- AVR Output: Page 4, Offset 196 (×0.1 %)

#### Tab 2: Diagnostics

All secondary engine sensors. Display as a grid of labeled value cards.

| Field                    | Source              | Unit  | Scale |
|--------------------------|---------------------|-------|-------|
| Coolant Pressure 1       | Pg5 Off0            | kPa   | 1     |
| Coolant Pressure 2       | Pg5 Off1            | kPa   | 1     |
| Fuel Pressure 1          | Pg5 Off2            | kPa   | 1     |
| Fuel Pressure 2          | Pg5 Off3            | kPa   | 1     |
| Turbo Pressure 1         | Pg5 Off4            | kPa   | 1     |
| Turbo Pressure 2         | Pg5 Off5            | kPa   | 1     |
| Inlet Manifold Temp 1    | Pg5 Off6            | °C    | 1     |
| Inlet Manifold Temp 2    | Pg5 Off7            | °C    | 1     |
| Exhaust Temp 1           | Pg5 Off8            | °C    | 1     |
| Exhaust Temp 2           | Pg5 Off9            | °C    | 1     |
| Fuel Temperature         | Pg5 Off15           | °C    | 1     |
| Atmospheric Pressure     | Pg5 Off14           | kPa   | 1     |
| Oil Level                | Pg5 Off77           | %     | 1     |
| Coolant Level            | Pg5 Off79           | %     | 1     |
| Crank Case Pressure      | Pg5 Off78           | kPa   | ×0.01 |
| Intercooler Temp         | Pg5 Off102          | °C    | 1     |
| Turbo Oil Temp           | Pg5 Off103          | °C    | 1     |
| ECU Temperature          | Pg5 Off104          | °C    | 1     |
| Fan Speed                | Pg5 Off105          | RPM   | 1     |
| Air Inlet Pressure       | Pg5 Off108          | kPa   | 1     |
| Injector Rail 1 Press    | Pg5 Off80           | MPa   | ×0.01 |
| Injector Rail 2 Press    | Pg5 Off81           | MPa   | ×0.01 |
| Accelerator Position     | Pg5 Off75           | %     | 1     |
| DC Voltage               | Pg4 Off199          | V     | ×0.1  |
| Backup Supply Voltage    | Pg11 Off3           | V     | ×0.1  |
| Battery Charger Mode     | Pg3 Off27           | Enum  | 0=Startup, 1=Init, 2=Boost/Bulk, 3=Absorption, 4=Float, 5=Storage, 6=Test, 7=DC alarm, 8=Mains alarm, 9=Temp alarm, 10=Lamp test, 11=Stopped |
| ECU Rated Speed          | Pg5 Off177          | RPM   | 1     |
| ECU Idle Speed           | Pg5 Off178          | RPM   | 1     |

Layout: responsive grid of small value cards (label + value + unit), 4-6 columns depending on widget width. Cards that never receive data show `--` in grey.

#### Tab 3: Accumulators

Cumulative counters and energy metering.

| Field                | Source              | Unit   | Scale | Notes                  |
|----------------------|---------------------|--------|-------|------------------------|
| Generator +kWh      | Pg7 Off8            | kWh    | ×0.1  | UINT32                 |
| Generator -kWh      | Pg7 Off10           | kWh    | ×0.1  | UINT32                 |
| Generator kVAh      | Pg7 Off12           | kVAh   | ×0.1  | UINT32                 |
| Generator kVArh     | Pg7 Off14           | kVArh  | ×0.1  | UINT32                 |
| Total Fuel Used     | Pg7 Off34           | Litres | 1     | UINT32                 |
| Run Hours           | Pg10 Off6           | Hours  | ÷3600 | Seconds→Hours (UINT32) |
| Number of Starts    | Pg7 Off16           | Count  | 1     | UINT32                 |
| Specific Fuel Cons. | *Calculated*        | L/kWh  | —     | Lifetime: Total_Fuel_Used / +kWh. Shows overall efficiency. |

Layout: larger value cards, 3-4 columns. These are "lifetime" values so display with more prominence.

### 6. Alarm Bar (bottom, full-width)

Decodes the packed alarm registers (Page 8, Offsets 1-24). Each register contains 4 alarms packed as 4-bit nibbles.

**Alarm severity codes** (per nibble):
| Code | Meaning          | Display Color |
|------|------------------|---------------|
| 0    | Disabled         | Hidden        |
| 1    | Not Active       | Hidden        |
| 2    | Warning          | Amber         |
| 3    | Shutdown         | Red           |
| 4    | Electrical Trip  | Red           |
| 9    | Inactive (shown) | Grey          |
| 10   | Active Indication| Blue          |
| 15   | Unimplemented    | Hidden        |

**Alarm names** (97-128 named alarms mapped from register offsets):
The widget JS contains a complete lookup array mapping register offset + nibble position → alarm name (e.g., offset 1 bits 16-13 = "Emergency Stop", bits 12-9 = "Low Oil Pressure", etc.).

**Display:**
- Header row: "ALARMS" label + badge showing count of active alarms (or "NO ACTIVE ALARMS" in green)
- Table columns: Time | Severity | Alarm Name | State
- Only show alarms with severity code 2, 3, 4, or 10 (active conditions)
- Severity 9 (inactive but shown) displayed if no active alarms, to confirm monitoring is working
- When no alarms: show "No active alarms" message in the table area

**Alarm register map (complete):**

| Reg Offset | Bits 16-13         | Bits 12-9            | Bits 8-5             | Bits 4-1              |
|------------|---------------------|----------------------|----------------------|-----------------------|
| 1          | Emergency Stop      | Low Oil Pressure     | High Coolant Temp    | High Oil Temp         |
| 2          | Under Speed         | Over Speed           | Fail to Start        | Fail to Rest          |
| 3          | Loss Speed Sensing  | Gen Low Voltage      | Gen High Voltage     | Gen Low Frequency     |
| 4          | Gen High Frequency  | Gen High Current     | Gen Earth Fault      | Gen Reverse Power     |
| 5          | Air Flap            | Oil Press Sender     | Coolant Temp Sender  | Oil Temp Sender       |
| 6          | Fuel Level Sender   | Mag Pickup           | Loss AC Speed        | Charge Alt Fail       |
| 7          | Low Battery V       | High Battery V       | Low Fuel             | High Fuel             |
| 8          | Gen Fail Close      | Mains Fail Close     | Gen Fail Open        | Mains Fail Open       |
| 9          | Mains Low V         | Mains High V         | Bus Fail Close       | Bus Fail Open         |
| 10         | Mains Low Freq      | Mains High Freq      | Mains Failed         | Mains Phase Rot Wrong |
| 11         | Gen Phase Rotation  | Maintenance Due      | Clock Not Set        | Config Lost           |
| 12         | Telemetry Cfg Lost  | Not Calibrated       | Modem Power Fault    | Gen Short Circuit     |
| 13         | Fail to Sync        | Bus Live             | Scheduled Run        | Bus Phase Rot Wrong   |
| 14         | Priority Error      | MSC Data Error       | MSC ID Error         | MSC Failure           |
| 15         | MSC Too Few         | MSC Alarms Inhibited | MSC Old Version      | Mains Reverse Power   |
| 16         | Min Sets Not Reached| Insufficient Capacity| Exp Input Uncal      | Exp Input Fail        |
| 17         | Aux Sender 1 Low    | Aux Sender 1 High    | Aux Sender 1 Fault   | Aux Sender 2 Low      |
| 18         | Aux Sender 2 High   | Aux Sender 2 Fault   | Aux Sender 3 Low     | Aux Sender 3 High     |
| 19         | Aux Sender 3 Fault  | Aux Sender 4 Low     | Aux Sender 4 High    | Aux Sender 4 Fault    |
| 20         | ECU Link Lost       | ECU Failure          | ECU Error            | Low Coolant Temp      |
| 21         | Out of Sync         | Low Oil Press Switch | Alt Aux Mains Fail   | Loss of Excitation    |
| 22         | Mains kW Limit      | Neg Phase Sequence   | ROCOF                | Mains Vector Shift    |
| 23         | G59 Low Freq        | G59 High Freq        | G59 Low V            | G59 High V            |
| 24         | G59 Trip            | Gen kW Overload      | Engine Inlet Temp Hi | Bus 1 Live            |

---

## Data Binding — ThingsBoard Widget API

### Telemetry Key Naming Convention

Each Modbus register maps to a ThingsBoard telemetry key. The widget expects keys in the format delivered by the TB IoT Gateway Modbus connector (typically configured by the user). The widget will be configurable to accept any key naming scheme via a key-map object at the top of the JS.

Example default key map:
```js
const KEY_MAP = {
  controlMode:       'control_mode',
  engineState:       'engine_operating_state',
  oilPressure:       'oil_pressure',
  coolantTemp:       'coolant_temperature',
  // ... etc
};
```

Users can override this map in the ThingsBoard widget settings to match their gateway config.

### Widget Lifecycle

```
self.onInit()
  → Build DOM structure
  → Initialize enum lookup tables
  → Set up tab switching
  → Register for data updates

self.onDataUpdated()
  → Read self.ctx.data (array of datasource data)
  → For each telemetry key:
      - Extract value and timestamp
      - Apply scale factor
      - Check staleness (timestamp vs threshold)
      - Apply enum mapping if applicable
      - Update DOM element
  → Unpack alarm registers and update alarm bar
  → Compute derived values (specific fuel consumption, mains present)

self.onResize()
  → Adjust grid columns for responsive layout

self.onDestroy()
  → Clean up timers/intervals
```

### Stale Value Detection

For each telemetry value, the widget tracks the last-received timestamp.

| State          | Condition                        | Visual Treatment                          |
|----------------|----------------------------------|-------------------------------------------|
| Live           | Timestamp < 2× poll interval     | Normal white text, full opacity           |
| Stale          | Timestamp > 2× poll interval     | Dimmed (opacity 0.4), subtle clock icon   |
| Never received | No data point exists for this key| Display `--` in grey                      |

The poll interval threshold is configurable in the widget settings (default: 60 seconds, so stale = no update in 120s).

---

## Visual Design

- **Theme:** Dark (matches ThingsBoard dark mode) — background `#0a0f1a`, panels `#111827`
- **Panel borders:** Color-coded by section:
  - Engine/Generator: green (`#065f46` border, `#34d399` text)
  - Fuel: blue (`#1e40af` border, `#60a5fa` text)
  - Mains: amber (`#92400e` border, `#fbbf24` text)
  - Electrical: purple (`#7c3aed` border, `#a78bfa` text)
  - Alarms: red (`#7f1d1d` border, `#f87171` text)
- **Typography:** System font stack (`Segoe UI`, system-ui, sans-serif). Monospace for numeric values optional.
- **Responsive:** CSS grid with `minmax()` — collapses to single-column on narrow widgets
- **Alarm severity colors:** Amber (warning), Red (shutdown/trip), Blue (indication), Grey (inactive)
- **Status badges:** Rounded pill shapes with background tint matching state

---

## Enum Lookup Tables

All enums are defined as JS objects in the widget, sourced from the DSE GenComm specification:

- `CONTROL_MODE` — 8 values (0-7)
- `ENGINE_STATE` — 8 values (0-6, 15)
- `BATTERY_CHARGER_MODE` — 12 values (0-11)
- `PHASE_ROTATION` — 4 values (0-3)
- `ALARM_SEVERITY` — 7 active codes (0-4, 9-10, 15)
- `ALARM_NAMES` — 96 named alarms (24 registers × 4 nibbles)

---

## File Location

Output: `widgets/generator-dse-gencomm.html`

Single file containing all HTML, CSS, and JS. No external dependencies. Follows the same pattern as `widgets/ahu-widget.html`.

---

## Out of Scope (first iteration)

- Historical trend charts (can be added as a 4th tab later)
- Generator control commands (write registers)
- Multi-unit / parallel generator views
- Mains full 3-phase detail (intentionally summarized)
- ThingsBoard alarm system integration (widget uses its own alarm decoding)
