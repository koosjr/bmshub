const fs = require('fs');
const path = require('path');
const seed = JSON.parse(fs.readFileSync(path.join(__dirname, '../public/seed.json'), 'utf8'));

// ── Add missing MEDs ──────────────────────────────────────────────────
const newMeds = [
  { id: '8a57592a-8b22-473d-8d2c-1f1ff23b3a1f', code: 'CL',  label: 'Coolant' },
  { id: 'dc000796-c881-425a-baaa-29728c3d39d5', code: 'BT',  label: 'Battery' },
  { id: 'a4377ef9-1160-4363-9f43-918bcccfdcbd', code: 'AC',  label: 'Alternating Current' },
  { id: '345149a7-9660-40cc-86c5-8c22c49fe318', code: 'GN',  label: 'Generator Electrical' },
  { id: '83e4e530-3409-4289-8cca-7aa50dc8c267', code: 'DC',  label: 'Direct Current' },
  { id: '586fd02c-a574-4da1-b878-efe82a21f923', code: 'AN',  label: 'Alternator' },
  { id: 'f85cce24-9a19-497e-a079-e16f7ad8d439', code: 'MF',  label: 'Manifold' },
  { id: '0c71c27f-562b-4a86-a58d-2d3bfeeb2742', code: 'AT',  label: 'Atmospheric' },
  { id: 'e993c8c4-c7de-47da-b687-fe50cb0ab792', code: 'TB',  label: 'Turbo' },
  { id: '3c35179f-65d9-4588-9f43-a97d128ae4f9', code: 'IR',  label: 'Injector Rail' },
  { id: '4e7708da-928b-4499-b744-c1ed8cb74a35', code: 'EC',  label: 'Engine Control Unit (ECU)' },
  { id: 'f324f85a-683b-40b4-85cd-17377331890d', code: 'IC',  label: 'Inter Cooler' },
  { id: '817361d2-d0d9-41cc-b354-2115ef601f71', code: 'AV',  label: 'Average' },
  { id: 'be1de84d-a776-4d69-a253-0f23a7263eda', code: 'SC',  label: 'Starts' },
  { id: '63470e77-b3b7-4f0b-baf8-10fbecb5906e', code: 'EG',  label: 'Exhaust Gas' },
  { id: 'eecae80f-89d9-42ce-a437-feba260cda6f', code: 'ME',  label: 'Mains Electrical' },
  { id: 'bdf50c3f-8ea4-4da0-bc97-4e052a56fb05', code: 'CM',  label: 'Control Mode' },
];
const existingMedCodes = new Set(seed.med.map(m => m.code));
for (const m of newMeds) {
  if (!existingMedCodes.has(m.code)) { seed.med.push(m); console.log('Added MED:', m.code); }
}

// ── Add missing QTYs ──────────────────────────────────────────────────
const newQtys = [
  { id: '585456f9-9c1d-41a1-9b83-1881d0f24ec3', code: 'VLT', label: 'Voltage',        ioType: 'AI' },
  { id: '140e74b8-e98d-4623-b229-cea2a15ebd11', code: 'PHR', label: 'Phase Rotation',  ioType: 'AI' },
  { id: 'dde668f8-60e8-46da-96f9-92e049732325', code: 'CON', label: 'Consumption',     ioType: 'AI' },
  { id: '65d03e06-f6d9-4729-bbd6-76d65396be86', code: 'OPS', label: 'Operating State', ioType: 'AI' },
  { id: 'a4b2dd8c-76de-4037-99a9-b94a3602376c', code: 'RNT', label: 'Run Time (h)',    ioType: 'AI' },
  { id: '388ee0ee-c87d-45cc-bf66-c3c0e5884a31', code: 'USD', label: 'Used',            ioType: 'AI' },
  { id: '1ed74cc4-c587-4a0a-b439-a11d221a4406', code: 'NUM', label: 'Number',          ioType: 'AI' },
  { id: '39b4bace-c978-48c2-b77a-021d1973c7b1', code: 'CHM', label: 'Charger Mode',    ioType: 'AI' },
];
const existingQtyCodes = new Set(seed.qty.map(q => q.code));
for (const q of newQtys) {
  if (!existingQtyCodes.has(q.code)) { seed.qty.push(q); console.log('Added QTY:', q.code); }
}

// ── Add DSE GenComm assembly ──────────────────────────────────────────
const dseId = 'dse-gencomm-full-2024-01';
if (!seed.assemblies.find(a => a.id === dseId)) {
  seed.assemblies.push({
    id: dseId,
    name: 'DSE GenComm — Full Monitoring',
    equipCode: 'GEN',
    description: 'DSE 72xx/73xx/8xxx GenComm Modbus — complete monitoring point set. All points are Modbus holding registers (AV). Scale factors apply per DSE register map.',
    points: [
      { id: 'dse-g-001', med: 'CM',  qty: 'NUM', mod: '',    ioOverride: 'AV' },
      { id: 'dse-g-002', med: 'BT',  qty: 'CHM', mod: '',    ioOverride: 'AV' },
      { id: 'dse-g-003', med: 'OL',  qty: 'PRS', mod: '',    ioOverride: 'AV' },
      { id: 'dse-g-004', med: 'CL',  qty: 'TMP', mod: '',    ioOverride: 'AV' },
      { id: 'dse-g-005', med: 'OL',  qty: 'TMP', mod: '',    ioOverride: 'AV' },
      { id: 'dse-g-006', med: 'FU',  qty: 'LVL', mod: '',    ioOverride: 'AV' },
      { id: 'dse-g-007', med: 'AN',  qty: 'VLT', mod: '',    ioOverride: 'AV' },
      { id: 'dse-g-008', med: 'BT',  qty: 'VLT', mod: '',    ioOverride: 'AV' },
      { id: 'dse-g-009', med: 'EN',  qty: 'SPD', mod: '',    ioOverride: 'AV' },
      { id: 'dse-g-010', med: 'GN',  qty: 'FRQ', mod: '',    ioOverride: 'AV' },
      { id: 'dse-g-011', med: 'GN',  qty: 'VLT', mod: 'LN1', ioOverride: 'AV' },
      { id: 'dse-g-012', med: 'GN',  qty: 'VLT', mod: 'LN2', ioOverride: 'AV' },
      { id: 'dse-g-013', med: 'GN',  qty: 'VLT', mod: 'LN3', ioOverride: 'AV' },
      { id: 'dse-g-014', med: 'GN',  qty: 'VLT', mod: 'P12', ioOverride: 'AV' },
      { id: 'dse-g-015', med: 'GN',  qty: 'VLT', mod: 'P23', ioOverride: 'AV' },
      { id: 'dse-g-016', med: 'GN',  qty: 'VLT', mod: 'P13', ioOverride: 'AV' },
      { id: 'dse-g-017', med: 'GN',  qty: 'CUR', mod: 'LN1', ioOverride: 'AV' },
      { id: 'dse-g-018', med: 'GN',  qty: 'CUR', mod: 'LN2', ioOverride: 'AV' },
      { id: 'dse-g-019', med: 'GN',  qty: 'CUR', mod: 'LN3', ioOverride: 'AV' },
      { id: 'dse-g-020', med: 'GN',  qty: 'PWA', mod: 'LN1', ioOverride: 'AV' },
      { id: 'dse-g-021', med: 'GN',  qty: 'PWA', mod: 'LN2', ioOverride: 'AV' },
      { id: 'dse-g-022', med: 'GN',  qty: 'PWA', mod: 'LN3', ioOverride: 'AV' },
      { id: 'dse-g-023', med: 'GN',  qty: 'PHR', mod: '',    ioOverride: 'AV' },
      { id: 'dse-g-024', med: 'ME',  qty: 'FRQ', mod: '',    ioOverride: 'AV' },
      { id: 'dse-g-025', med: 'ME',  qty: 'VLT', mod: 'LN1', ioOverride: 'AV' },
      { id: 'dse-g-026', med: 'ME',  qty: 'VLT', mod: 'LN2', ioOverride: 'AV' },
      { id: 'dse-g-027', med: 'ME',  qty: 'VLT', mod: 'LN3', ioOverride: 'AV' },
      { id: 'dse-g-028', med: 'ME',  qty: 'VLT', mod: 'P12', ioOverride: 'AV' },
      { id: 'dse-g-029', med: 'ME',  qty: 'VLT', mod: 'P23', ioOverride: 'AV' },
      { id: 'dse-g-030', med: 'ME',  qty: 'VLT', mod: 'P13', ioOverride: 'AV' },
      { id: 'dse-g-031', med: 'ME',  qty: 'CUR', mod: 'LN1', ioOverride: 'AV' },
      { id: 'dse-g-032', med: 'ME',  qty: 'CUR', mod: 'LN2', ioOverride: 'AV' },
      { id: 'dse-g-033', med: 'ME',  qty: 'CUR', mod: 'LN3', ioOverride: 'AV' },
      { id: 'dse-g-034', med: 'ME',  qty: 'PWA', mod: 'LN1', ioOverride: 'AV' },
      { id: 'dse-g-035', med: 'ME',  qty: 'PWA', mod: 'LN2', ioOverride: 'AV' },
      { id: 'dse-g-036', med: 'ME',  qty: 'PWA', mod: 'LN3', ioOverride: 'AV' },
      { id: 'dse-g-037', med: 'ME',  qty: 'PHR', mod: '',    ioOverride: 'AV' },
      { id: 'dse-g-038', med: 'EN',  qty: 'PCT', mod: '',    ioOverride: 'AV' },
      { id: 'dse-g-039', med: 'AN',  qty: 'PCT', mod: '',    ioOverride: 'AV' },
      { id: 'dse-g-040', med: 'DC',  qty: 'VLT', mod: '',    ioOverride: 'AV' },
      { id: 'dse-g-041', med: 'CL',  qty: 'PRS', mod: '',    ioOverride: 'AV' },
      { id: 'dse-g-042', med: 'FU',  qty: 'PRS', mod: '',    ioOverride: 'AV' },
      { id: 'dse-g-043', med: 'TB',  qty: 'PRS', mod: '',    ioOverride: 'AV' },
      { id: 'dse-g-044', med: 'MF',  qty: 'TMP', mod: '',    ioOverride: 'AV' },
      { id: 'dse-g-045', med: 'EG',  qty: 'TMP', mod: '',    ioOverride: 'AV' },
      { id: 'dse-g-046', med: 'FU',  qty: 'CON', mod: '',    ioOverride: 'AV' },
      { id: 'dse-g-047', med: 'AT',  qty: 'PRS', mod: '',    ioOverride: 'AV' },
      { id: 'dse-g-048', med: 'FU',  qty: 'TMP', mod: '',    ioOverride: 'AV' },
      { id: 'dse-g-049', med: 'OL',  qty: 'LVL', mod: '',    ioOverride: 'AV' },
      { id: 'dse-g-050', med: 'CL',  qty: 'LVL', mod: '',    ioOverride: 'AV' },
      { id: 'dse-g-051', med: 'IR',  qty: 'PRS', mod: 'LN1', ioOverride: 'AV' },
      { id: 'dse-g-052', med: 'IR',  qty: 'PRS', mod: 'LN2', ioOverride: 'AV' },
      { id: 'dse-g-053', med: 'IC',  qty: 'TMP', mod: '',    ioOverride: 'AV' },
      { id: 'dse-g-054', med: 'TB',  qty: 'TMP', mod: '',    ioOverride: 'AV' },
      { id: 'dse-g-055', med: 'EC',  qty: 'OPS', mod: '',    ioOverride: 'AV' },
      { id: 'dse-g-056', med: 'EN',  qty: 'OPS', mod: '',    ioOverride: 'AV' },
      { id: 'dse-g-057', med: 'EC',  qty: 'SPD', mod: 'HI',  ioOverride: 'AV' },
      { id: 'dse-g-058', med: 'EC',  qty: 'SPD', mod: 'LO',  ioOverride: 'AV' },
      { id: 'dse-g-059', med: 'GN',  qty: 'PWA', mod: '',    ioOverride: 'AV' },
      { id: 'dse-g-060', med: 'GN',  qty: 'KVA', mod: 'LN1', ioOverride: 'AV' },
      { id: 'dse-g-061', med: 'GN',  qty: 'KVA', mod: 'LN2', ioOverride: 'AV' },
      { id: 'dse-g-062', med: 'GN',  qty: 'KVA', mod: 'LN3', ioOverride: 'AV' },
      { id: 'dse-g-063', med: 'GN',  qty: 'KVA', mod: '',    ioOverride: 'AV' },
      { id: 'dse-g-064', med: 'GN',  qty: 'PWR', mod: 'LN1', ioOverride: 'AV' },
      { id: 'dse-g-065', med: 'GN',  qty: 'PWR', mod: 'LN2', ioOverride: 'AV' },
      { id: 'dse-g-066', med: 'GN',  qty: 'PWR', mod: 'LN3', ioOverride: 'AV' },
      { id: 'dse-g-067', med: 'GN',  qty: 'PWR', mod: '',    ioOverride: 'AV' },
      { id: 'dse-g-068', med: 'GN',  qty: 'PWF', mod: 'LN1', ioOverride: 'AV' },
      { id: 'dse-g-069', med: 'GN',  qty: 'PWF', mod: 'LN2', ioOverride: 'AV' },
      { id: 'dse-g-070', med: 'GN',  qty: 'PWF', mod: 'LN3', ioOverride: 'AV' },
      { id: 'dse-g-071', med: 'GN',  qty: 'PWF', mod: '',    ioOverride: 'AV' },
      { id: 'dse-g-072', med: 'GN',  qty: 'PCT', mod: '',    ioOverride: 'AV' },
      { id: 'dse-g-073', med: 'ME',  qty: 'PWA', mod: '',    ioOverride: 'AV' },
      { id: 'dse-g-074', med: 'ME',  qty: 'KVA', mod: '',    ioOverride: 'AV' },
      { id: 'dse-g-075', med: 'ME',  qty: 'PWR', mod: '',    ioOverride: 'AV' },
      { id: 'dse-g-076', med: 'ME',  qty: 'PWF', mod: '',    ioOverride: 'AV' },
      { id: 'dse-g-077', med: 'ME',  qty: 'PCT', mod: '',    ioOverride: 'AV' },
      { id: 'dse-g-078', med: 'EN',  qty: 'RNT', mod: '',    ioOverride: 'AV' },
      { id: 'dse-g-079', med: 'SC',  qty: 'NUM', mod: '',    ioOverride: 'AV' },
      { id: 'dse-g-080', med: 'FU',  qty: 'USD', mod: '',    ioOverride: 'AV' },
      { id: 'dse-g-081', med: 'GN',  qty: 'USD', mod: 'HI',  ioOverride: 'AV' },
      { id: 'dse-g-082', med: 'GN',  qty: 'USD', mod: 'LO',  ioOverride: 'AV' },
      { id: 'dse-g-083', med: 'AL',  qty: 'NUM', mod: '',    ioOverride: 'AV' },
    ]
  });
  console.log('Added DSE GenComm assembly');
}

// ── Bump version ──────────────────────────────────────────────────────
seed.seed_version = 9;

fs.writeFileSync(path.join(__dirname, '../public/seed.json'), JSON.stringify(seed, null, 2));
console.log('seed_version:', seed.seed_version);
console.log('Total MEDs:', seed.med.length);
console.log('Total QTYs:', seed.qty.length);
console.log('Total Assemblies:', seed.assemblies.length);
