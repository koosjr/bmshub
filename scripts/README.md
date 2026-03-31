# scripts/ — Seed Data Management

## Overview

`public/seed.json` is the **build output** — committed and served by GitHub Pages.
`scripts/data/` is the **source of truth** — small, hand-editable JSON files.
`scripts/build-seed.cjs` is the **build tool** that assembles everything.

Run after any edit:

```
node scripts/build-seed.cjs
```

The script is **additive and safe**: it never removes existing entries from `seed.json`.
It only increments `seed_version` when something actually changed.

---

## Common tasks

### Add a MED (medium/medium-type)

1. Edit `scripts/data/med.json`
2. Append your entry (give it a fresh UUID for `id`):
   ```json
   { "id": "xxxxxxxx-...", "code": "MY", "label": "My new medium" }
   ```
3. Run `node scripts/build-seed.cjs`

### Add an assembly

1. Create `scripts/data/assemblies/my-device.json` with a single assembly object:
   ```json
   {
     "id": "my-unique-id",
     "name": "My Device",
     "equipCode": "AHU",
     "description": "Short description",
     "points": [...]
   }
   ```
2. Run `node scripts/build-seed.cjs`

### Add an equipment type with full semantics

1. **`scripts/data/equip.json`** — add the equip entry
2. **`scripts/data/semantic/equip-meds.json`** — add `"MYCODE": ["MED1", "MED2", ...]`
3. **`scripts/data/semantic/med-qtys.json`** — ensure each MED has its qty list (usually already present)
4. Run `node scripts/build-seed.cjs`

---

## Source file layout

```
scripts/data/
  equip.json                  — equipment type dictionary
  med.json                    — medium/type dictionary
  qty.json                    — quantity/measurement dictionary
  mod.json                    — modifier dictionary
  semantic/
    equip-meds.json           — which mediums apply to each equipment type
    med-qtys.json             — which quantities apply to each medium
    qty-mods.json             — which modifiers apply to each quantity
  hardware/
    controller-models.json    — BMS controller hardware catalogue
    expansion-modules.json    — I/O expansion module catalogue
  assemblies/
    ahu-hydronic-vfd-sp-temp-co2-econ.json
    chilled-water-pump.json
    ...                       — one file per assembly template
```

> **Note:** `controllers[]` in `seed.json` is user data (created in the app) and is
> intentionally excluded from source files. The build script preserves it as-is.
