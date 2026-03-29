import { v4 as uuidv4 } from 'uuid';
import type { EquipEntry, MedEntry, QtyEntry, ModEntry, SemanticRule, Controller, Assembly, ControllerModel, ExpansionModule, Project } from './types';

// ─── EQUIP — sorted alphabetically by code ───────────────────────────────────
export const seedEquip: EquipEntry[] = [
  { id: '0fd350da-b152-490e-8862-6c60cb3b5fc5', code: 'AHU', label: 'Air handling unit',     takesNum: true  },
  { id: '14d53dc6-722b-4a4c-9da9-c4363e57045d', code: 'BLR', label: 'Boiler',                 takesNum: true  },
  { id: 'ffecd11c-1c23-43ed-86e9-8deb00244674', code: 'CHR', label: 'Chiller',                takesNum: true  },
  { id: '804946da-0859-4dd8-a0d1-c2db782c31a5', code: 'CTW', label: 'Cooling tower',          takesNum: true  },
  { id: '7db64dc2-fe58-4328-b511-ee05e5765fa0', code: 'CWP', label: 'Chilled water pump',     takesNum: true  },
  { id: '952bfc34-373e-4324-92ef-9154b8829473', code: 'EXF', label: 'Exhaust fan',            takesNum: true  },
  { id: 'b441efe2-0993-432d-a03c-1302718410bf', code: 'FCU', label: 'Fan coil unit',          takesNum: true  },
  { id: 'f7571760-0ba2-40cc-af28-01e7afcbddc3', code: 'GEN', label: 'Generator',              takesNum: true  },
  { id: 'c7d1d3a6-11c3-404c-bee9-74a97d04554a', code: 'HEX', label: 'Heat exchanger',         takesNum: true  },
  { id: 'bbf1098e-20ad-4e99-9f0c-96cae8a44a17', code: 'HWP', label: 'Hot water pump',         takesNum: true  },
  { id: 'a15d75a9-332e-4575-b1ef-94a4f69c2228', code: 'ILH', label: 'Inline electric heater', takesNum: true  },
  { id: '8811f9f1-d521-41f5-b3a3-66d79bd5b564', code: 'MAU', label: 'Make-up air unit',       takesNum: true  },
  { id: '0609f184-dd00-4a0f-90a0-aec86ba5799e', code: 'PMP', label: 'General pump',           takesNum: true  },
  { id: '3a4b43dc-e5c6-42ec-854d-5988d62117e7', code: 'SYS', label: 'System / circuit level', takesNum: false },
  { id: '00cdd2b8-beeb-476d-b0a4-14a7150ffe57', code: 'TNK', label: 'Storage tank',           takesNum: true  },
  { id: 'a7e2a0c8-6eb1-49bc-acec-0f513cfa5f08', code: 'VRV', label: 'VRV / VRF system',       takesNum: true  },
];

// ─── MED — sorted alphabetically by code ─────────────────────────────────────
export const seedMed: MedEntry[] = [
  { id: 'a688a2ba-849e-47e1-adf7-20424636f3b5', code: 'CO', label: 'Condenser water' },
  { id: '831429e2-12cb-4249-b697-97faed740c44', code: 'CW', label: 'Chilled water'   },
  { id: '3a8ec03a-056d-4c89-8de5-2a8cf267e88a', code: 'EX', label: 'Exhaust air'     },
  { id: 'a3d1e068-9361-4217-9dce-f55f9a989d41', code: 'FA', label: 'Fan'             },
  { id: '99e1801e-effd-419c-9165-c20278e08f85', code: 'GY', label: 'Glycol circuit'  },
  { id: 'a9aff777-a38f-409e-bce2-eb72c509e850', code: 'HW', label: 'Hot water'       },
  { id: 'd7b592d3-ded9-4308-9301-948bd13a0df4', code: 'MA', label: 'Mixed air'       },
  { id: '0b11f32c-08a9-4211-b32b-a8e73dac205e', code: 'OA', label: 'Outside air'     },
  { id: '237a49fa-1ab5-4ce0-b143-68d3c6e7a27a', code: 'RA', label: 'Return air'      },
  { id: '080af221-41db-4b24-8022-00d3cf1a3149', code: 'RF', label: 'Refrigerant'     },
  { id: '72f15e8e-f3dc-45f3-8f65-7a93e0325b23', code: 'SA', label: 'Supply air'      },
  { id: '5e3650fd-51c4-4283-a702-a891a1eab450', code: 'ZN', label: 'Zone / room'     },
];

// ─── QTY — sorted alphabetically by code ─────────────────────────────────────
export const seedQty: QtyEntry[] = [
  { id: '24ebb834-4966-4977-a6c2-5f3a441dd8e4', code: 'ALM',  label: 'Alarm output',          ioType: 'DO' },
  { id: '86ffc8b8-721c-47c2-9f20-0697eb34d84c', code: 'CO2',  label: 'CO2 level (ppm)',       ioType: 'AI' },
  { id: '9d1e5269-b816-42d1-badb-ac6682faa668', code: 'DMP',  label: 'Damper position',       ioType: 'AO' },
  { id: 'df1e33d6-77fb-4ad3-8eaf-48a5a1ce30c8', code: 'DPR',  label: 'Differential pressure', ioType: 'AI' },
  { id: 'd99fbe62-257a-461b-9f38-eff6f52eaf48', code: 'ENB',  label: 'Enable command',        ioType: 'DO' },
  { id: 'b1f2d38d-6000-4a7f-a8ef-eefa777e8f52', code: 'FLT',  label: 'Fault',                 ioType: 'DI' },
  { id: 'a5cdcc41-0880-41df-b899-0de860b5a344', code: 'FLW',  label: 'Flow rate',             ioType: 'AI' },
  { id: '850054e9-9ea7-4276-8cf5-5527fc48c46c', code: 'FSW',  label: 'Flow switch',           ioType: 'DI' },
  { id: '3eb0b9bf-7067-4540-85bf-92b34fb930b9', code: 'GLY',  label: 'Glycol concentration',  ioType: 'AI' },
  { id: 'bdb0b0c2-d8fa-4449-bab2-24ee194adc99', code: 'HUM',  label: 'Humidity',              ioType: 'AI' },
  { id: 'd44025f8-c580-4ddc-ae5c-c2dff5b3976f', code: 'PCT',  label: 'Percentage output',     ioType: 'AO' },
  { id: '929f1c0d-06d5-461a-815f-f0741004d9ee', code: 'PRS',  label: 'Pressure',              ioType: 'AI' },
  { id: '140bbe9d-c923-466f-919c-49ddc8513723', code: 'PWR',  label: 'Power / energy',        ioType: 'AI' },
  { id: '98cec28d-f83b-4dbc-b5a2-89d49b3bb6a4', code: 'RUN',  label: 'Running status',        ioType: 'DI' },
  { id: '914fba2d-66b3-48e2-ae8a-f30b31e48ae8', code: 'RTMP', label: 'Return temperature',    ioType: 'AI' },
  { id: '314681c3-7cc5-43ef-b093-6337c205c1c2', code: 'SPD',  label: 'Speed feedback',        ioType: 'AI' },
  { id: '00da8ae0-7feb-49b1-b717-8dc0558022a6', code: 'STG',  label: 'Stage output',          ioType: 'DO' },
  { id: 'c46a182d-2a28-4f33-a883-5dcaa23cfc13', code: 'STMP', label: 'Supply temperature',    ioType: 'AI' },
  { id: '08948d63-e05b-43b0-bf14-aef78a8d0412', code: 'TMP',  label: 'Temperature',           ioType: 'AI' },
  { id: 'b075a5a8-8e67-4a35-a942-2bbddce2111e', code: 'VLV',  label: 'Valve position',        ioType: 'AO' },
  { id: '4da6259a-9b6d-493a-bf5f-6e63b164309c', code: 'VOC',  label: 'VOC index',             ioType: 'AI' },
  { id: 'ef3dea2c-bdac-4a64-8d55-2db349848b92', code: 'VSD',  label: 'Drive speed ref',       ioType: 'AO' },
];

// ─── MOD — alphabetic first, numeric codes (1,2,3) at the end ─────────────────
export const seedMod: ModEntry[] = [
  { id: '16fb6e84-1ef1-41d7-8f18-09820a13d2af', code: 'B',  label: 'Bottom position'    },
  { id: '600ca38d-ff0e-4c26-8353-4a57e0d1a02b', code: 'DP', label: 'Differential'       },
  { id: '4f599aff-5662-420a-a362-cdab7b692a03', code: 'FB', label: 'Feedback / actual'  },
  { id: '9d80ff4c-8962-4483-a377-e03e03ae6eb9', code: 'HI', label: 'High limit'         },
  { id: 'ed64eafc-d328-472d-8e2c-62421b5ca31d', code: 'LO', label: 'Low limit'          },
  { id: '4496785a-2d30-4fcc-b51a-8f5b62d240d0', code: 'M',  label: 'Middle position'    },
  { id: 'abe6deab-7a39-4ded-94be-2b714c2d6249', code: 'SP', label: 'Setpoint'           },
  { id: '22d9fa60-4995-464c-a3dd-0e41c80b0132', code: 'T',  label: 'Top position'       },
  { id: '98816dfd-f442-49bd-96e0-79fa2fc347f2', code: '1',  label: 'Stage / instance 1' },
  { id: 'afb77289-7faa-4e65-94a7-2ea3cc05fbd4', code: '2',  label: 'Stage / instance 2' },
  { id: '99b59356-0e64-489c-8574-98517915cb08', code: '3',  label: 'Stage / instance 3' },
];

// ─── RULES — comprehensive semantic validation ────────────────────────────────
//
// Strategy per equip:
//   1. BLOCK invalid media (equip + bad_med + qty:"*")
//   2. BLOCK invalid qty   (equip + med:"*"  + bad_qty)
//   3. ALLOW valid media catch-alls (equip + good_med + qty:"*", allowed:true)
//        — NOTE: SemanticRule.allowed is typed as `false` in types.ts so only
//          blocking rules are expressed here; the valid-media catch-alls are
//          represented by the absence of a blocking rule for that combination.
//
// All media codes: CO, CW, EX, FA, GY, HW, MA, OA, RA, RF, SA, ZN
// All qty codes:   ALM, CO2, DMP, DPR, ENB, FLT, FLW, FSW, GLY, HUM,
//                  PCT, PRS, PWR, RUN, RTMP, SPD, STG, STMP, TMP, VLV, VOC, VSD

export const seedRules: SemanticRule[] = [

  // ══════════════════════════════════════════════════════════════════════════
  // AHU — Air handling unit
  // Valid media : SA, RA, OA, MA, EX, CW, HW, ZN, FA
  // Invalid media: CO, GY, RF
  // Valid qty   : TMP, HUM, PRS, DPR, CO2, VOC, FLW, FSW, VLV, DMP, VSD, RUN, ENB, FLT, PCT, SPD, STG, ALM, STMP, RTMP, PWR
  // Invalid qty : GLY, RTMP (invalid), STMP (invalid for AHU, already in valid list)
  //   — actually GLY is the only global qty not in AHU valid list
  // ══════════════════════════════════════════════════════════════════════════

  // AHU — block invalid media
  { id: 'ahu-co-any',  equip: 'AHU', med: 'CO', qty: '*', allowed: false, reason: 'AHUs have no condenser water circuit. CO medium belongs on CHR, CTW, or CWP.' },
  { id: 'ahu-gy-any',  equip: 'AHU', med: 'GY', qty: '*', allowed: false, reason: 'AHUs do not use glycol circuits directly. Use HEX or SYS for glycol points.' },
  { id: 'ahu-rf-any',  equip: 'AHU', med: 'RF', qty: '*', allowed: false, reason: 'AHUs have no refrigerant circuit. Refrigerant belongs on CHR or VRV.' },

  // AHU — block invalid qty
  { id: 'ahu-any-gly', equip: 'AHU', med: '*', qty: 'GLY', allowed: false, reason: 'AHUs do not measure glycol concentration. GLY belongs on SYS or HEX for glycol circuits.' },

  // ══════════════════════════════════════════════════════════════════════════
  // FCU — Fan coil unit
  // Valid media : SA, RA, ZN, CW, HW, FA
  // Invalid media: OA, MA, EX, CO, GY, RF
  // Valid qty   : TMP, HUM, CO2, VLV, DMP, VSD, RUN, ENB, FLT, PCT, SPD, STG, ALM
  // Invalid qty : PRS, DPR, FLW, FSW, PWR, VOC, GLY, STMP, RTMP
  // ══════════════════════════════════════════════════════════════════════════

  // FCU — block invalid media
  { id: 'fcu-oa-any',  equip: 'FCU', med: 'OA', qty: '*', allowed: false, reason: 'FCUs do not handle outside air directly. OA medium belongs on AHU or MAU.' },
  { id: 'fcu-ma-any',  equip: 'FCU', med: 'MA', qty: '*', allowed: false, reason: 'FCUs have no mixed air plenum. MA medium belongs on AHU.' },
  { id: 'fcu-ex-any',  equip: 'FCU', med: 'EX', qty: '*', allowed: false, reason: 'FCUs have no exhaust air duct. EX medium belongs on AHU or EXF.' },
  { id: 'fcu-co-any',  equip: 'FCU', med: 'CO', qty: '*', allowed: false, reason: 'FCUs have no condenser water circuit. CO medium belongs on CHR or CTW.' },
  { id: 'fcu-gy-any',  equip: 'FCU', med: 'GY', qty: '*', allowed: false, reason: 'FCUs do not use glycol circuits. GY medium belongs on HEX or SYS.' },
  { id: 'fcu-rf-any',  equip: 'FCU', med: 'RF', qty: '*', allowed: false, reason: 'FCUs have no refrigerant circuit. Refrigerant belongs on CHR or VRV.' },

  // FCU — block invalid qty
  { id: 'fcu-any-prs',  equip: 'FCU', med: '*', qty: 'PRS',  allowed: false, reason: 'FCUs do not measure static pressure. PRS belongs on AHU duct or SYS.' },
  { id: 'fcu-any-dpr',  equip: 'FCU', med: '*', qty: 'DPR',  allowed: false, reason: 'FCUs do not measure differential pressure. DPR belongs on AHU or SYS.' },
  { id: 'fcu-any-flw',  equip: 'FCU', med: '*', qty: 'FLW',  allowed: false, reason: 'FCUs do not have flow meters. FLW belongs on SYS or CHR.' },
  { id: 'fcu-any-fsw',  equip: 'FCU', med: '*', qty: 'FSW',  allowed: false, reason: 'FCUs do not have flow switches. FSW belongs on CHR, CWP, or HWP.' },
  { id: 'fcu-any-pwr',  equip: 'FCU', med: '*', qty: 'PWR',  allowed: false, reason: 'FCUs do not have power metering. PWR belongs on GEN or SYS.' },
  { id: 'fcu-any-voc',  equip: 'FCU', med: '*', qty: 'VOC',  allowed: false, reason: 'FCU controllers do not typically measure VOC. Place VOC sensor on AHU or SYS.' },
  { id: 'fcu-any-gly',  equip: 'FCU', med: '*', qty: 'GLY',  allowed: false, reason: 'FCUs do not measure glycol concentration. GLY belongs on SYS or HEX.' },
  { id: 'fcu-any-stmp', equip: 'FCU', med: '*', qty: 'STMP', allowed: false, reason: 'STMP (supply temperature) is an AHU-level quantity. Use TMP with SA medium on FCU instead.' },
  { id: 'fcu-any-rtmp', equip: 'FCU', med: '*', qty: 'RTMP', allowed: false, reason: 'RTMP (return temperature) is an AHU-level quantity. Use TMP with RA medium on FCU instead.' },

  // ══════════════════════════════════════════════════════════════════════════
  // MAU — Make-up air unit
  // Valid media : SA, OA, FA, CW, HW
  // Invalid media: RA, MA, EX, ZN, CO, GY, RF
  // Valid qty   : TMP, HUM, PRS, DPR, CO2, FLW, FSW, VLV, DMP, VSD, RUN, ENB, FLT, PCT, SPD, ALM
  // Invalid qty : VOC, STG, PWR, GLY, STMP, RTMP
  // ══════════════════════════════════════════════════════════════════════════

  // MAU — block invalid media
  { id: 'mau-ra-any',  equip: 'MAU', med: 'RA', qty: '*', allowed: false, reason: 'MAUs supply only fresh outside air and have no return air path. RA medium belongs on AHU.' },
  { id: 'mau-ma-any',  equip: 'MAU', med: 'MA', qty: '*', allowed: false, reason: 'MAUs have no mixing box. MA medium belongs on AHU.' },
  { id: 'mau-ex-any',  equip: 'MAU', med: 'EX', qty: '*', allowed: false, reason: 'MAUs have no exhaust air duct. EX medium belongs on AHU or EXF.' },
  { id: 'mau-zn-any',  equip: 'MAU', med: 'ZN', qty: '*', allowed: false, reason: 'MAUs do not serve individual zones directly. Zone sensors belong on AHU, FCU, or room controllers.' },
  { id: 'mau-co-any',  equip: 'MAU', med: 'CO', qty: '*', allowed: false, reason: 'MAUs have no condenser water circuit. CO medium belongs on CHR or CTW.' },
  { id: 'mau-gy-any',  equip: 'MAU', med: 'GY', qty: '*', allowed: false, reason: 'MAUs do not use glycol circuits. GY medium belongs on HEX or SYS.' },
  { id: 'mau-rf-any',  equip: 'MAU', med: 'RF', qty: '*', allowed: false, reason: 'MAUs have no refrigerant circuit. Refrigerant belongs on CHR or VRV.' },

  // MAU — block invalid qty
  { id: 'mau-any-voc',  equip: 'MAU', med: '*', qty: 'VOC',  allowed: false, reason: 'MAUs treat outside air supply; VOC measurement is a zone-level concern, use AHU or SYS.' },
  { id: 'mau-any-stg',  equip: 'MAU', med: '*', qty: 'STG',  allowed: false, reason: 'MAUs have no staged output — use VSD for variable speed or ENB for on/off.' },
  { id: 'mau-any-pwr',  equip: 'MAU', med: '*', qty: 'PWR',  allowed: false, reason: 'MAUs do not typically have power metering. PWR belongs on GEN or SYS.' },
  { id: 'mau-any-gly',  equip: 'MAU', med: '*', qty: 'GLY',  allowed: false, reason: 'MAUs do not measure glycol concentration. GLY belongs on SYS or HEX.' },
  { id: 'mau-any-stmp', equip: 'MAU', med: '*', qty: 'STMP', allowed: false, reason: 'STMP is an AHU-level shorthand. On MAU use TMP with SA medium for supply temperature.' },
  { id: 'mau-any-rtmp', equip: 'MAU', med: '*', qty: 'RTMP', allowed: false, reason: 'RTMP is an AHU-level shorthand. MAUs have no return air — use TMP with OA medium instead.' },

  // ══════════════════════════════════════════════════════════════════════════
  // EXF — Exhaust fan
  // Valid media : EX, FA
  // Invalid media: SA, RA, OA, MA, ZN, CW, HW, CO, GY, RF
  // Valid qty   : RUN, ENB, FLT, VSD, SPD, DMP, ALM, PRS, DPR
  // Invalid qty : TMP, HUM, CO2, VOC, FLW, FSW, VLV, STG, PCT, GLY, PWR, STMP, RTMP
  // ══════════════════════════════════════════════════════════════════════════

  // EXF — block invalid media
  { id: 'exf-sa-any',  equip: 'EXF', med: 'SA', qty: '*', allowed: false, reason: 'Exhaust fans handle exhaust air only, not supply air. SA medium belongs on AHU or MAU.' },
  { id: 'exf-ra-any',  equip: 'EXF', med: 'RA', qty: '*', allowed: false, reason: 'Exhaust fans handle exhaust air only, not return air. RA medium belongs on AHU.' },
  { id: 'exf-oa-any',  equip: 'EXF', med: 'OA', qty: '*', allowed: false, reason: 'Exhaust fans handle exhaust air only, not outside air. OA medium belongs on AHU or MAU.' },
  { id: 'exf-ma-any',  equip: 'EXF', med: 'MA', qty: '*', allowed: false, reason: 'Exhaust fans have no mixing box. MA medium belongs on AHU.' },
  { id: 'exf-zn-any',  equip: 'EXF', med: 'ZN', qty: '*', allowed: false, reason: 'Exhaust fans do not sense zones. Zone sensors belong on AHU, FCU, or room controllers.' },
  { id: 'exf-cw-any',  equip: 'EXF', med: 'CW', qty: '*', allowed: false, reason: 'Exhaust fans have no chilled water coil. CW medium belongs on AHU, FCU, or CWP.' },
  { id: 'exf-hw-any',  equip: 'EXF', med: 'HW', qty: '*', allowed: false, reason: 'Exhaust fans have no hot water coil. HW medium belongs on AHU, FCU, or HWP.' },
  { id: 'exf-co-any',  equip: 'EXF', med: 'CO', qty: '*', allowed: false, reason: 'Exhaust fans have no condenser water circuit. CO medium belongs on CHR or CTW.' },
  { id: 'exf-gy-any',  equip: 'EXF', med: 'GY', qty: '*', allowed: false, reason: 'Exhaust fans have no glycol circuit. GY medium belongs on HEX or SYS.' },
  { id: 'exf-rf-any',  equip: 'EXF', med: 'RF', qty: '*', allowed: false, reason: 'Exhaust fans have no refrigerant circuit. Refrigerant belongs on CHR or VRV.' },

  // EXF — block invalid qty
  { id: 'exf-any-tmp',  equip: 'EXF', med: '*', qty: 'TMP',  allowed: false, reason: 'Exhaust fans do not measure temperature. Place TMP sensors on AHU or SYS.' },
  { id: 'exf-any-hum',  equip: 'EXF', med: '*', qty: 'HUM',  allowed: false, reason: 'Exhaust fans do not measure humidity. Place HUM sensors on AHU or SYS.' },
  { id: 'exf-any-co2',  equip: 'EXF', med: '*', qty: 'CO2',  allowed: false, reason: 'Exhaust fans do not measure CO2. Place CO2 sensors on AHU or SYS.' },
  { id: 'exf-any-voc',  equip: 'EXF', med: '*', qty: 'VOC',  allowed: false, reason: 'Exhaust fans do not measure VOC. Place VOC sensors on AHU or SYS.' },
  { id: 'exf-any-flw',  equip: 'EXF', med: '*', qty: 'FLW',  allowed: false, reason: 'Exhaust fans do not have flow meters. FLW belongs on AHU or SYS.' },
  { id: 'exf-any-fsw',  equip: 'EXF', med: '*', qty: 'FSW',  allowed: false, reason: 'Exhaust fans do not have flow switches. FSW belongs on pipework systems.' },
  { id: 'exf-any-vlv',  equip: 'EXF', med: '*', qty: 'VLV',  allowed: false, reason: 'Exhaust fans have no valves. VLV belongs on coil or pipe valve actuators.' },
  { id: 'exf-any-stg',  equip: 'EXF', med: '*', qty: 'STG',  allowed: false, reason: 'Exhaust fans have no staged outputs. Use VSD for variable speed or ENB for on/off.' },
  { id: 'exf-any-pct',  equip: 'EXF', med: '*', qty: 'PCT',  allowed: false, reason: 'Use VSD for fan speed reference on exhaust fans, not PCT.' },
  { id: 'exf-any-gly',  equip: 'EXF', med: '*', qty: 'GLY',  allowed: false, reason: 'Exhaust fans have no glycol circuit. GLY belongs on SYS or HEX.' },
  { id: 'exf-any-pwr',  equip: 'EXF', med: '*', qty: 'PWR',  allowed: false, reason: 'Exhaust fans do not typically have power metering. PWR belongs on GEN or SYS.' },
  { id: 'exf-any-stmp', equip: 'EXF', med: '*', qty: 'STMP', allowed: false, reason: 'STMP is not applicable to exhaust fans.' },
  { id: 'exf-any-rtmp', equip: 'EXF', med: '*', qty: 'RTMP', allowed: false, reason: 'RTMP is not applicable to exhaust fans.' },

  // ══════════════════════════════════════════════════════════════════════════
  // CHR — Chiller
  // Valid media : CW, CO, RF
  // Invalid media: SA, RA, OA, MA, EX, ZN, HW, GY, FA
  // Valid qty   : TMP, PRS, DPR, FLW, FSW, VLV, RUN, ENB, FLT, PWR, ALM, STMP, RTMP, PCT
  // Invalid qty : HUM, CO2, VOC, DMP, VSD, STG, SPD, GLY
  // ══════════════════════════════════════════════════════════════════════════

  // CHR — block invalid media
  { id: 'chr-sa-any',  equip: 'CHR', med: 'SA', qty: '*', allowed: false, reason: 'Chillers have no air-side medium. SA medium belongs on AHU or FCU.' },
  { id: 'chr-ra-any',  equip: 'CHR', med: 'RA', qty: '*', allowed: false, reason: 'Chillers have no air-side medium. RA medium belongs on AHU or FCU.' },
  { id: 'chr-oa-any',  equip: 'CHR', med: 'OA', qty: '*', allowed: false, reason: 'Chillers have no outside air connection. OA medium belongs on AHU or MAU.' },
  { id: 'chr-ma-any',  equip: 'CHR', med: 'MA', qty: '*', allowed: false, reason: 'Chillers have no mixed air plenum. MA medium belongs on AHU.' },
  { id: 'chr-ex-any',  equip: 'CHR', med: 'EX', qty: '*', allowed: false, reason: 'Chillers have no exhaust air medium. EX medium belongs on AHU or EXF.' },
  { id: 'chr-zn-any',  equip: 'CHR', med: 'ZN', qty: '*', allowed: false, reason: 'Chillers do not sense zones. Zone sensors belong on AHU, FCU, or room controllers.' },
  { id: 'chr-hw-any',  equip: 'CHR', med: 'HW', qty: '*', allowed: false, reason: 'Chillers have no hot water circuit. HW medium belongs on BLR, HWP, or ILH.' },
  { id: 'chr-gy-any',  equip: 'CHR', med: 'GY', qty: '*', allowed: false, reason: 'Chillers do not use glycol circuits directly. Use HEX or SYS for glycol points.' },
  { id: 'chr-fa-any',  equip: 'CHR', med: 'FA', qty: '*', allowed: false, reason: 'Chiller fan points should use RF or CO medium, not the FA medium.' },

  // CHR — block invalid qty
  { id: 'chr-any-hum',  equip: 'CHR', med: '*', qty: 'HUM',  allowed: false, reason: 'Chillers do not measure humidity. HUM belongs on AHU or SYS.' },
  { id: 'chr-any-co2',  equip: 'CHR', med: '*', qty: 'CO2',  allowed: false, reason: 'Chillers do not measure CO2. CO2 belongs on AHU or SYS.' },
  { id: 'chr-any-voc',  equip: 'CHR', med: '*', qty: 'VOC',  allowed: false, reason: 'Chillers do not measure VOC. VOC belongs on AHU or SYS.' },
  { id: 'chr-any-dmp',  equip: 'CHR', med: '*', qty: 'DMP',  allowed: false, reason: 'Chillers have no dampers. DMP belongs on AHU or FCU.' },
  { id: 'chr-any-vsd',  equip: 'CHR', med: '*', qty: 'VSD',  allowed: false, reason: 'Chillers do not expose a VSD speed reference point directly. Use PCT for capacity or SPD for compressor speed.' },
  { id: 'chr-any-stg',  equip: 'CHR', med: '*', qty: 'STG',  allowed: false, reason: 'Chiller staging is handled at SYS level. Use PCT for chiller loading percentage.' },
  { id: 'chr-any-spd',  equip: 'CHR', med: '*', qty: 'SPD',  allowed: false, reason: 'Chiller compressor speed is an internal quantity. Use PCT for capacity percentage.' },
  { id: 'chr-any-gly',  equip: 'CHR', med: '*', qty: 'GLY',  allowed: false, reason: 'Chillers do not measure glycol concentration. GLY belongs on SYS or HEX for glycol circuits.' },

  // ══════════════════════════════════════════════════════════════════════════
  // CTW — Cooling tower
  // Valid media : CO, FA
  // Invalid media: SA, RA, OA, MA, EX, ZN, CW, HW, GY, RF
  // Valid qty   : TMP, FLW, FSW, VLV, VSD, RUN, ENB, FLT, SPD, ALM, DMP, PCT
  // Invalid qty : HUM, PRS, DPR, CO2, VOC, STG, PWR, GLY, STMP, RTMP
  // ══════════════════════════════════════════════════════════════════════════

  // CTW — block invalid media
  { id: 'ctw-sa-any',  equip: 'CTW', med: 'SA', qty: '*', allowed: false, reason: 'Cooling towers have no supply air duct. SA medium belongs on AHU or FCU.' },
  { id: 'ctw-ra-any',  equip: 'CTW', med: 'RA', qty: '*', allowed: false, reason: 'Cooling towers have no return air duct. RA medium belongs on AHU or FCU.' },
  { id: 'ctw-oa-any',  equip: 'CTW', med: 'OA', qty: '*', allowed: false, reason: 'Cooling towers do not have an outside air connection. OA medium belongs on AHU or MAU.' },
  { id: 'ctw-ma-any',  equip: 'CTW', med: 'MA', qty: '*', allowed: false, reason: 'Cooling towers have no mixed air plenum. MA medium belongs on AHU.' },
  { id: 'ctw-ex-any',  equip: 'CTW', med: 'EX', qty: '*', allowed: false, reason: 'Cooling tower exhaust is represented by the FA medium, not EX.' },
  { id: 'ctw-zn-any',  equip: 'CTW', med: 'ZN', qty: '*', allowed: false, reason: 'Cooling towers do not sense zones. Zone sensors belong on AHU, FCU, or room controllers.' },
  { id: 'ctw-cw-any',  equip: 'CTW', med: 'CW', qty: '*', allowed: false, reason: 'Cooling towers carry condenser water (CO), not chilled water (CW). Use CO medium.' },
  { id: 'ctw-hw-any',  equip: 'CTW', med: 'HW', qty: '*', allowed: false, reason: 'Cooling towers have no hot water circuit. HW medium belongs on BLR, HWP, or ILH.' },
  { id: 'ctw-gy-any',  equip: 'CTW', med: 'GY', qty: '*', allowed: false, reason: 'Cooling towers do not use glycol circuits. GY medium belongs on HEX or SYS.' },
  { id: 'ctw-rf-any',  equip: 'CTW', med: 'RF', qty: '*', allowed: false, reason: 'Cooling towers have no refrigerant circuit. Refrigerant belongs on CHR or VRV.' },

  // CTW — block invalid qty
  { id: 'ctw-any-hum',  equip: 'CTW', med: '*', qty: 'HUM',  allowed: false, reason: 'Cooling towers do not measure humidity in BMS points. HUM belongs on AHU or SYS.' },
  { id: 'ctw-any-prs',  equip: 'CTW', med: '*', qty: 'PRS',  allowed: false, reason: 'Cooling towers do not measure static pressure. PRS belongs on CHR or SYS.' },
  { id: 'ctw-any-dpr',  equip: 'CTW', med: '*', qty: 'DPR',  allowed: false, reason: 'Cooling towers do not measure differential pressure. DPR belongs on CWP or SYS.' },
  { id: 'ctw-any-co2',  equip: 'CTW', med: '*', qty: 'CO2',  allowed: false, reason: 'Cooling towers do not measure CO2. CO2 belongs on AHU or SYS.' },
  { id: 'ctw-any-voc',  equip: 'CTW', med: '*', qty: 'VOC',  allowed: false, reason: 'Cooling towers do not measure VOC. VOC belongs on AHU or SYS.' },
  { id: 'ctw-any-stg',  equip: 'CTW', med: '*', qty: 'STG',  allowed: false, reason: 'Cooling towers have no staged outputs. Use VSD for variable speed or ENB for on/off.' },
  { id: 'ctw-any-pwr',  equip: 'CTW', med: '*', qty: 'PWR',  allowed: false, reason: 'Cooling towers do not typically have power metering. PWR belongs on GEN or SYS.' },
  { id: 'ctw-any-gly',  equip: 'CTW', med: '*', qty: 'GLY',  allowed: false, reason: 'Cooling towers do not measure glycol concentration. GLY belongs on SYS or HEX.' },
  { id: 'ctw-any-stmp', equip: 'CTW', med: '*', qty: 'STMP', allowed: false, reason: 'STMP is an air-side shorthand. On CTW use TMP with CO medium for water temperature.' },
  { id: 'ctw-any-rtmp', equip: 'CTW', med: '*', qty: 'RTMP', allowed: false, reason: 'RTMP is an air-side shorthand. On CTW use TMP with CO medium for water temperature.' },

  // ══════════════════════════════════════════════════════════════════════════
  // CWP — Chilled water pump
  // Valid media : CW
  // Invalid media: SA, RA, OA, MA, EX, ZN, HW, CO, GY, FA, RF
  // Valid qty   : RUN, ENB, FLT, VSD, SPD, FSW, PRS, DPR, FLW, PWR, ALM, PCT
  // Invalid qty : TMP, HUM, CO2, VOC, VLV, DMP, STG, GLY, STMP, RTMP
  // ══════════════════════════════════════════════════════════════════════════

  // CWP — block invalid media
  { id: 'cwp-sa-any',  equip: 'CWP', med: 'SA', qty: '*', allowed: false, reason: 'CHW pumps have no air medium. Supply air points belong on AHU or FCU.' },
  { id: 'cwp-ra-any',  equip: 'CWP', med: 'RA', qty: '*', allowed: false, reason: 'CHW pumps have no air medium.' },
  { id: 'cwp-oa-any',  equip: 'CWP', med: 'OA', qty: '*', allowed: false, reason: 'CHW pumps have no air medium.' },
  { id: 'cwp-ma-any',  equip: 'CWP', med: 'MA', qty: '*', allowed: false, reason: 'CHW pumps have no mixed air medium.' },
  { id: 'cwp-ex-any',  equip: 'CWP', med: 'EX', qty: '*', allowed: false, reason: 'CHW pumps have no exhaust air medium.' },
  { id: 'cwp-zn-any',  equip: 'CWP', med: 'ZN', qty: '*', allowed: false, reason: 'CHW pumps do not sense zones. Zone points belong on AHU, FCU, or room controllers.' },
  { id: 'cwp-hw-any',  equip: 'CWP', med: 'HW', qty: '*', allowed: false, reason: 'CHW pumps carry chilled water, not hot water. Use HWP for hot water circuits.' },
  { id: 'cwp-co-any',  equip: 'CWP', med: 'CO', qty: '*', allowed: false, reason: 'CHW pumps have no condenser water circuit. Use CTW or CHR for condenser points.' },
  { id: 'cwp-gy-any',  equip: 'CWP', med: 'GY', qty: '*', allowed: false, reason: 'CHW pumps do not circulate glycol. GY medium belongs on HEX or SYS.' },
  { id: 'cwp-fa-any',  equip: 'CWP', med: 'FA', qty: '*', allowed: false, reason: 'CHW pumps have no fan medium. Pumps are not fans.' },
  { id: 'cwp-rf-any',  equip: 'CWP', med: 'RF', qty: '*', allowed: false, reason: 'CHW pumps have no refrigerant circuit — refrigerant is inside the chiller.' },

  // CWP — block invalid qty
  { id: 'cwp-any-tmp',  equip: 'CWP', med: '*', qty: 'TMP',  allowed: false, reason: 'Pumps do not measure water temperature. Temperature belongs on SYS (header sensor) or CHR.' },
  { id: 'cwp-any-hum',  equip: 'CWP', med: '*', qty: 'HUM',  allowed: false, reason: 'Pumps do not measure humidity.' },
  { id: 'cwp-any-co2',  equip: 'CWP', med: '*', qty: 'CO2',  allowed: false, reason: 'Pumps do not measure CO2.' },
  { id: 'cwp-any-voc',  equip: 'CWP', med: '*', qty: 'VOC',  allowed: false, reason: 'Pumps do not measure VOC.' },
  { id: 'cwp-any-vlv',  equip: 'CWP', med: '*', qty: 'VLV',  allowed: false, reason: 'Pumps do not have valve outputs — valves are separate actuators on the pipework.' },
  { id: 'cwp-any-dmp',  equip: 'CWP', med: '*', qty: 'DMP',  allowed: false, reason: 'Pumps have no dampers.' },
  { id: 'cwp-any-stg',  equip: 'CWP', med: '*', qty: 'STG',  allowed: false, reason: 'Pumps have no staged outputs — use VSD for variable speed or ENB for on/off.' },
  { id: 'cwp-any-gly',  equip: 'CWP', med: '*', qty: 'GLY',  allowed: false, reason: 'Pumps do not measure glycol concentration. GLY belongs on SYS or HEX.' },
  { id: 'cwp-any-stmp', equip: 'CWP', med: '*', qty: 'STMP', allowed: false, reason: 'STMP is an air-side shorthand and not applicable to pumps.' },
  { id: 'cwp-any-rtmp', equip: 'CWP', med: '*', qty: 'RTMP', allowed: false, reason: 'RTMP is an air-side shorthand and not applicable to pumps.' },

  // ══════════════════════════════════════════════════════════════════════════
  // HWP — Hot water pump
  // Valid media : HW
  // Invalid media: SA, RA, OA, MA, EX, ZN, CW, CO, GY, FA, RF
  // Valid qty   : RUN, ENB, FLT, VSD, SPD, FSW, PRS, DPR, FLW, PWR, ALM, PCT
  // Invalid qty : TMP, HUM, CO2, VOC, VLV, DMP, STG, GLY, STMP, RTMP
  // ══════════════════════════════════════════════════════════════════════════

  // HWP — block invalid media
  { id: 'hwp-sa-any',  equip: 'HWP', med: 'SA', qty: '*', allowed: false, reason: 'HW pumps have no air medium. Supply air points belong on AHU or FCU.' },
  { id: 'hwp-ra-any',  equip: 'HWP', med: 'RA', qty: '*', allowed: false, reason: 'HW pumps have no air medium.' },
  { id: 'hwp-oa-any',  equip: 'HWP', med: 'OA', qty: '*', allowed: false, reason: 'HW pumps have no outside air medium.' },
  { id: 'hwp-ma-any',  equip: 'HWP', med: 'MA', qty: '*', allowed: false, reason: 'HW pumps have no mixed air medium.' },
  { id: 'hwp-ex-any',  equip: 'HWP', med: 'EX', qty: '*', allowed: false, reason: 'HW pumps have no exhaust air medium.' },
  { id: 'hwp-zn-any',  equip: 'HWP', med: 'ZN', qty: '*', allowed: false, reason: 'HW pumps do not sense zones. Zone points belong on AHU, FCU, or room controllers.' },
  { id: 'hwp-cw-any',  equip: 'HWP', med: 'CW', qty: '*', allowed: false, reason: 'HW pumps carry hot water, not chilled water. Use CWP for chilled water circuits.' },
  { id: 'hwp-co-any',  equip: 'HWP', med: 'CO', qty: '*', allowed: false, reason: 'HW pumps have no condenser water circuit. Use CTW or CHR for condenser points.' },
  { id: 'hwp-gy-any',  equip: 'HWP', med: 'GY', qty: '*', allowed: false, reason: 'HW pumps do not circulate glycol. GY medium belongs on HEX or SYS.' },
  { id: 'hwp-fa-any',  equip: 'HWP', med: 'FA', qty: '*', allowed: false, reason: 'HW pumps have no fan medium. Pumps are not fans.' },
  { id: 'hwp-rf-any',  equip: 'HWP', med: 'RF', qty: '*', allowed: false, reason: 'HW pumps have no refrigerant circuit.' },

  // HWP — block invalid qty
  { id: 'hwp-any-tmp',  equip: 'HWP', med: '*', qty: 'TMP',  allowed: false, reason: 'Pumps do not measure water temperature. Temperature belongs on SYS (header sensor) or BLR.' },
  { id: 'hwp-any-hum',  equip: 'HWP', med: '*', qty: 'HUM',  allowed: false, reason: 'Pumps do not measure humidity.' },
  { id: 'hwp-any-co2',  equip: 'HWP', med: '*', qty: 'CO2',  allowed: false, reason: 'Pumps do not measure CO2.' },
  { id: 'hwp-any-voc',  equip: 'HWP', med: '*', qty: 'VOC',  allowed: false, reason: 'Pumps do not measure VOC.' },
  { id: 'hwp-any-vlv',  equip: 'HWP', med: '*', qty: 'VLV',  allowed: false, reason: 'Pumps do not have valve outputs — valves are separate actuators on the pipework.' },
  { id: 'hwp-any-dmp',  equip: 'HWP', med: '*', qty: 'DMP',  allowed: false, reason: 'Pumps have no dampers.' },
  { id: 'hwp-any-stg',  equip: 'HWP', med: '*', qty: 'STG',  allowed: false, reason: 'Pumps have no staged outputs — use VSD for variable speed or ENB for on/off.' },
  { id: 'hwp-any-gly',  equip: 'HWP', med: '*', qty: 'GLY',  allowed: false, reason: 'Pumps do not measure glycol concentration. GLY belongs on SYS or HEX.' },
  { id: 'hwp-any-stmp', equip: 'HWP', med: '*', qty: 'STMP', allowed: false, reason: 'STMP is an air-side shorthand and not applicable to pumps.' },
  { id: 'hwp-any-rtmp', equip: 'HWP', med: '*', qty: 'RTMP', allowed: false, reason: 'RTMP is an air-side shorthand and not applicable to pumps.' },

  // ══════════════════════════════════════════════════════════════════════════
  // ILH — Inline electric heater
  // Valid media : SA, HW
  // Invalid media: RA, OA, MA, EX, ZN, CW, CO, GY, FA, RF
  // Valid qty   : TMP, RUN, ENB, FLT, STG, ALM, STMP, RTMP
  // Invalid qty : HUM, PRS, DPR, CO2, VOC, FLW, FSW, VLV, DMP, VSD, SPD, PCT, GLY, PWR
  // ══════════════════════════════════════════════════════════════════════════

  // ILH — block invalid media
  { id: 'ilh-ra-any',  equip: 'ILH', med: 'RA', qty: '*', allowed: false, reason: 'Inline heaters are in the supply air stream, not return air. RA medium belongs on AHU.' },
  { id: 'ilh-oa-any',  equip: 'ILH', med: 'OA', qty: '*', allowed: false, reason: 'Inline heaters are in the supply air stream, not outside air. OA medium belongs on AHU or MAU.' },
  { id: 'ilh-ma-any',  equip: 'ILH', med: 'MA', qty: '*', allowed: false, reason: 'Inline heaters have no mixed air section. MA medium belongs on AHU.' },
  { id: 'ilh-ex-any',  equip: 'ILH', med: 'EX', qty: '*', allowed: false, reason: 'Inline heaters are not in the exhaust stream. EX medium belongs on AHU or EXF.' },
  { id: 'ilh-zn-any',  equip: 'ILH', med: 'ZN', qty: '*', allowed: false, reason: 'Inline heaters do not sense zones. Zone sensors belong on AHU, FCU, or room controllers.' },
  { id: 'ilh-cw-any',  equip: 'ILH', med: 'CW', qty: '*', allowed: false, reason: 'Inline electric heaters have no chilled water coil. CW medium belongs on AHU or FCU.' },
  { id: 'ilh-co-any',  equip: 'ILH', med: 'CO', qty: '*', allowed: false, reason: 'Inline heaters have no condenser water circuit. CO medium belongs on CHR or CTW.' },
  { id: 'ilh-gy-any',  equip: 'ILH', med: 'GY', qty: '*', allowed: false, reason: 'Inline heaters have no glycol circuit. GY medium belongs on HEX or SYS.' },
  { id: 'ilh-fa-any',  equip: 'ILH', med: 'FA', qty: '*', allowed: false, reason: 'Inline heaters have no fan. FA medium belongs on AHU, FCU, or EXF.' },
  { id: 'ilh-rf-any',  equip: 'ILH', med: 'RF', qty: '*', allowed: false, reason: 'Inline heaters have no refrigerant circuit. Refrigerant belongs on CHR or VRV.' },

  // ILH — block invalid qty
  { id: 'ilh-any-hum',  equip: 'ILH', med: '*', qty: 'HUM',  allowed: false, reason: 'Inline heaters do not measure humidity. HUM belongs on AHU or SYS.' },
  { id: 'ilh-any-prs',  equip: 'ILH', med: '*', qty: 'PRS',  allowed: false, reason: 'Inline heaters do not measure static pressure. PRS belongs on AHU duct or SYS.' },
  { id: 'ilh-any-dpr',  equip: 'ILH', med: '*', qty: 'DPR',  allowed: false, reason: 'Inline heaters do not measure differential pressure. DPR belongs on AHU or SYS.' },
  { id: 'ilh-any-co2',  equip: 'ILH', med: '*', qty: 'CO2',  allowed: false, reason: 'Inline heaters do not measure CO2. CO2 belongs on AHU or SYS.' },
  { id: 'ilh-any-voc',  equip: 'ILH', med: '*', qty: 'VOC',  allowed: false, reason: 'Inline heaters do not measure VOC. VOC belongs on AHU or SYS.' },
  { id: 'ilh-any-flw',  equip: 'ILH', med: '*', qty: 'FLW',  allowed: false, reason: 'Inline heaters do not have flow meters. FLW belongs on SYS or HWP.' },
  { id: 'ilh-any-fsw',  equip: 'ILH', med: '*', qty: 'FSW',  allowed: false, reason: 'Inline heaters do not have flow switches. FSW belongs on pipework systems.' },
  { id: 'ilh-any-vlv',  equip: 'ILH', med: '*', qty: 'VLV',  allowed: false, reason: 'Inline electric heaters have no valve. VLV belongs on coil or pipe valve actuators.' },
  { id: 'ilh-any-dmp',  equip: 'ILH', med: '*', qty: 'DMP',  allowed: false, reason: 'Inline heaters have no damper. DMP belongs on AHU or FCU.' },
  { id: 'ilh-any-vsd',  equip: 'ILH', med: '*', qty: 'VSD',  allowed: false, reason: 'Inline electric heaters have no VSD. Use STG for staged heating outputs.' },
  { id: 'ilh-any-spd',  equip: 'ILH', med: '*', qty: 'SPD',  allowed: false, reason: 'Inline heaters have no speed feedback. SPD belongs on fan or pump equipment.' },
  { id: 'ilh-any-pct',  equip: 'ILH', med: '*', qty: 'PCT',  allowed: false, reason: 'Inline electric heaters use STG for staged control, not PCT.' },
  { id: 'ilh-any-gly',  equip: 'ILH', med: '*', qty: 'GLY',  allowed: false, reason: 'Inline heaters do not measure glycol concentration. GLY belongs on SYS or HEX.' },
  { id: 'ilh-any-pwr',  equip: 'ILH', med: '*', qty: 'PWR',  allowed: false, reason: 'Inline electric heater power draw is not typically a BMS point. PWR belongs on GEN or SYS.' },

  // ══════════════════════════════════════════════════════════════════════════
  // BLR — Boiler
  // Valid media : HW, GY
  // Invalid media: SA, RA, OA, MA, EX, ZN, CW, CO, FA, RF
  // Valid qty   : TMP, PRS, FLW, FSW, RUN, ENB, FLT, ALM, STMP, RTMP, PWR
  // Invalid qty : HUM, DPR, CO2, VOC, VLV, DMP, VSD, STG, SPD, PCT, GLY
  // ══════════════════════════════════════════════════════════════════════════

  // BLR — block invalid media
  { id: 'blr-sa-any',  equip: 'BLR', med: 'SA', qty: '*', allowed: false, reason: 'Boilers have no supply air medium. SA medium belongs on AHU or FCU.' },
  { id: 'blr-ra-any',  equip: 'BLR', med: 'RA', qty: '*', allowed: false, reason: 'Boilers have no return air medium. RA medium belongs on AHU or FCU.' },
  { id: 'blr-oa-any',  equip: 'BLR', med: 'OA', qty: '*', allowed: false, reason: 'Boilers have no outside air medium for BMS points. OA medium belongs on AHU or MAU.' },
  { id: 'blr-ma-any',  equip: 'BLR', med: 'MA', qty: '*', allowed: false, reason: 'Boilers have no mixed air medium. MA medium belongs on AHU.' },
  { id: 'blr-ex-any',  equip: 'BLR', med: 'EX', qty: '*', allowed: false, reason: 'Boiler flue gas is not represented as EX medium in BMS. EX belongs on AHU or EXF.' },
  { id: 'blr-zn-any',  equip: 'BLR', med: 'ZN', qty: '*', allowed: false, reason: 'Boilers do not sense zones. Zone sensors belong on AHU, FCU, or room controllers.' },
  { id: 'blr-cw-any',  equip: 'BLR', med: 'CW', qty: '*', allowed: false, reason: 'Boilers have no chilled water circuit. CW medium belongs on CHR or CWP.' },
  { id: 'blr-co-any',  equip: 'BLR', med: 'CO', qty: '*', allowed: false, reason: 'Boilers have no condenser water circuit. CO medium belongs on CHR or CTW.' },
  { id: 'blr-fa-any',  equip: 'BLR', med: 'FA', qty: '*', allowed: false, reason: 'Boiler burner fan points use HW or GY medium, not FA.' },
  { id: 'blr-rf-any',  equip: 'BLR', med: 'RF', qty: '*', allowed: false, reason: 'Boilers have no refrigerant circuit. Refrigerant belongs on CHR or VRV.' },

  // BLR — block invalid qty
  { id: 'blr-any-hum',  equip: 'BLR', med: '*', qty: 'HUM',  allowed: false, reason: 'Boilers do not measure humidity. HUM belongs on AHU or SYS.' },
  { id: 'blr-any-dpr',  equip: 'BLR', med: '*', qty: 'DPR',  allowed: false, reason: 'Boilers do not measure differential pressure. DPR belongs on HWP or SYS.' },
  { id: 'blr-any-co2',  equip: 'BLR', med: '*', qty: 'CO2',  allowed: false, reason: 'Boilers do not measure CO2 as a BMS point. CO2 belongs on AHU or SYS.' },
  { id: 'blr-any-voc',  equip: 'BLR', med: '*', qty: 'VOC',  allowed: false, reason: 'Boilers do not measure VOC. VOC belongs on AHU or SYS.' },
  { id: 'blr-any-vlv',  equip: 'BLR', med: '*', qty: 'VLV',  allowed: false, reason: 'Boiler valve actuators are separate devices on the pipework, not boiler points.' },
  { id: 'blr-any-dmp',  equip: 'BLR', med: '*', qty: 'DMP',  allowed: false, reason: 'Boilers have no damper outputs. DMP belongs on AHU or FCU.' },
  { id: 'blr-any-vsd',  equip: 'BLR', med: '*', qty: 'VSD',  allowed: false, reason: 'Boilers have no VSD. Use STG for burner stages.' },
  { id: 'blr-any-stg',  equip: 'BLR', med: '*', qty: 'STG',  allowed: false, reason: 'Boiler staging is typically handled internally. Use PWR for energy monitoring or RUN for status.' },
  { id: 'blr-any-spd',  equip: 'BLR', med: '*', qty: 'SPD',  allowed: false, reason: 'Boilers have no speed feedback. SPD belongs on fan or pump equipment.' },
  { id: 'blr-any-pct',  equip: 'BLR', med: '*', qty: 'PCT',  allowed: false, reason: 'Boilers do not expose a percentage output to BMS. Use STMP/RTMP for temperature monitoring.' },
  { id: 'blr-any-gly',  equip: 'BLR', med: '*', qty: 'GLY',  allowed: false, reason: 'Boilers do not measure glycol concentration. GLY belongs on SYS or HEX.' },

  // ══════════════════════════════════════════════════════════════════════════
  // HEX — Heat exchanger
  // Valid media : CW, HW, CO, GY
  // Invalid media: SA, RA, OA, MA, EX, ZN, FA, RF
  // Valid qty   : TMP, PRS, FLW, FSW, VLV, ALM, STMP, RTMP
  // Invalid qty : HUM, DPR, CO2, VOC, DMP, VSD, RUN, ENB, FLT, STG, SPD, PCT, GLY, PWR
  // ══════════════════════════════════════════════════════════════════════════

  // HEX — block invalid media
  { id: 'hex-sa-any',  equip: 'HEX', med: 'SA', qty: '*', allowed: false, reason: 'Heat exchangers (plate/shell) have no air-side medium for BMS. SA medium belongs on AHU or FCU.' },
  { id: 'hex-ra-any',  equip: 'HEX', med: 'RA', qty: '*', allowed: false, reason: 'Heat exchangers have no return air medium. RA medium belongs on AHU or FCU.' },
  { id: 'hex-oa-any',  equip: 'HEX', med: 'OA', qty: '*', allowed: false, reason: 'Heat exchangers have no outside air connection. OA medium belongs on AHU or MAU.' },
  { id: 'hex-ma-any',  equip: 'HEX', med: 'MA', qty: '*', allowed: false, reason: 'Heat exchangers have no mixed air plenum. MA medium belongs on AHU.' },
  { id: 'hex-ex-any',  equip: 'HEX', med: 'EX', qty: '*', allowed: false, reason: 'Heat exchangers have no exhaust air stream. EX medium belongs on AHU or EXF.' },
  { id: 'hex-zn-any',  equip: 'HEX', med: 'ZN', qty: '*', allowed: false, reason: 'Heat exchangers do not sense zones. Zone sensors belong on AHU, FCU, or room controllers.' },
  { id: 'hex-fa-any',  equip: 'HEX', med: 'FA', qty: '*', allowed: false, reason: 'Heat exchangers have no fan. FA medium belongs on AHU, FCU, or EXF.' },
  { id: 'hex-rf-any',  equip: 'HEX', med: 'RF', qty: '*', allowed: false, reason: 'Heat exchangers have no refrigerant circuit. Refrigerant belongs on CHR or VRV.' },

  // HEX — block invalid qty
  { id: 'hex-any-hum',  equip: 'HEX', med: '*', qty: 'HUM',  allowed: false, reason: 'Heat exchangers do not measure humidity. HUM belongs on AHU or SYS.' },
  { id: 'hex-any-dpr',  equip: 'HEX', med: '*', qty: 'DPR',  allowed: false, reason: 'Heat exchanger differential pressure is not typically a BMS point. DPR belongs on CWP or SYS.' },
  { id: 'hex-any-co2',  equip: 'HEX', med: '*', qty: 'CO2',  allowed: false, reason: 'Heat exchangers do not measure CO2. CO2 belongs on AHU or SYS.' },
  { id: 'hex-any-voc',  equip: 'HEX', med: '*', qty: 'VOC',  allowed: false, reason: 'Heat exchangers do not measure VOC. VOC belongs on AHU or SYS.' },
  { id: 'hex-any-dmp',  equip: 'HEX', med: '*', qty: 'DMP',  allowed: false, reason: 'Heat exchangers have no damper. DMP belongs on AHU or FCU.' },
  { id: 'hex-any-vsd',  equip: 'HEX', med: '*', qty: 'VSD',  allowed: false, reason: 'Heat exchangers have no VSD. VSD belongs on fan or pump equipment.' },
  { id: 'hex-any-run',  equip: 'HEX', med: '*', qty: 'RUN',  allowed: false, reason: 'Heat exchangers have no run status. RUN belongs on pumps and fans.' },
  { id: 'hex-any-enb',  equip: 'HEX', med: '*', qty: 'ENB',  allowed: false, reason: 'Heat exchangers have no enable command. ENB belongs on pumps and fans.' },
  { id: 'hex-any-flt',  equip: 'HEX', med: '*', qty: 'FLT',  allowed: false, reason: 'Heat exchangers have no fault output. FLT belongs on active plant such as pumps and fans.' },
  { id: 'hex-any-stg',  equip: 'HEX', med: '*', qty: 'STG',  allowed: false, reason: 'Heat exchangers have no staged outputs. Use VLV for modulating control.' },
  { id: 'hex-any-spd',  equip: 'HEX', med: '*', qty: 'SPD',  allowed: false, reason: 'Heat exchangers have no speed feedback. SPD belongs on fan or pump equipment.' },
  { id: 'hex-any-pct',  equip: 'HEX', med: '*', qty: 'PCT',  allowed: false, reason: 'Heat exchangers have no percentage output. Use VLV for modulating control.' },
  { id: 'hex-any-gly',  equip: 'HEX', med: '*', qty: 'GLY',  allowed: false, reason: 'Heat exchangers do not measure glycol concentration inline. GLY belongs on SYS.' },
  { id: 'hex-any-pwr',  equip: 'HEX', med: '*', qty: 'PWR',  allowed: false, reason: 'Heat exchangers are passive devices and have no power metering. PWR belongs on GEN or SYS.' },

  // ══════════════════════════════════════════════════════════════════════════
  // TNK — Storage tank
  // Valid media : CW, HW, CO, GY
  // Invalid media: SA, RA, OA, MA, EX, ZN, FA, RF
  // Valid qty   : TMP, PRS, FLW, FSW, ALM
  // Invalid qty : HUM, DPR, CO2, VOC, VLV, DMP, VSD, RUN, ENB, FLT, STG, SPD, PCT, GLY, PWR, STMP, RTMP
  // ══════════════════════════════════════════════════════════════════════════

  // TNK — block invalid media
  { id: 'tnk-sa-any',  equip: 'TNK', med: 'SA', qty: '*', allowed: false, reason: 'Storage tanks have no air-side medium. SA medium belongs on AHU or FCU.' },
  { id: 'tnk-ra-any',  equip: 'TNK', med: 'RA', qty: '*', allowed: false, reason: 'Storage tanks have no return air medium. RA medium belongs on AHU or FCU.' },
  { id: 'tnk-oa-any',  equip: 'TNK', med: 'OA', qty: '*', allowed: false, reason: 'Storage tanks have no outside air connection. OA medium belongs on AHU or MAU.' },
  { id: 'tnk-ma-any',  equip: 'TNK', med: 'MA', qty: '*', allowed: false, reason: 'Storage tanks have no mixed air medium. MA medium belongs on AHU.' },
  { id: 'tnk-ex-any',  equip: 'TNK', med: 'EX', qty: '*', allowed: false, reason: 'Storage tanks have no exhaust air medium. EX medium belongs on AHU or EXF.' },
  { id: 'tnk-zn-any',  equip: 'TNK', med: 'ZN', qty: '*', allowed: false, reason: 'Storage tanks do not sense zones. Zone sensors belong on AHU, FCU, or room controllers.' },
  { id: 'tnk-fa-any',  equip: 'TNK', med: 'FA', qty: '*', allowed: false, reason: 'Storage tanks have no fan. FA medium belongs on AHU, FCU, or EXF.' },
  { id: 'tnk-rf-any',  equip: 'TNK', med: 'RF', qty: '*', allowed: false, reason: 'Storage tanks have no refrigerant circuit. Refrigerant belongs on CHR or VRV.' },

  // TNK — block invalid qty
  { id: 'tnk-any-hum',  equip: 'TNK', med: '*', qty: 'HUM',  allowed: false, reason: 'Storage tanks do not measure humidity. HUM belongs on AHU or SYS.' },
  { id: 'tnk-any-dpr',  equip: 'TNK', med: '*', qty: 'DPR',  allowed: false, reason: 'Storage tanks do not measure differential pressure. DPR belongs on CWP or SYS.' },
  { id: 'tnk-any-co2',  equip: 'TNK', med: '*', qty: 'CO2',  allowed: false, reason: 'Storage tanks do not measure CO2. CO2 belongs on AHU or SYS.' },
  { id: 'tnk-any-voc',  equip: 'TNK', med: '*', qty: 'VOC',  allowed: false, reason: 'Storage tanks do not measure VOC. VOC belongs on AHU or SYS.' },
  { id: 'tnk-any-vlv',  equip: 'TNK', med: '*', qty: 'VLV',  allowed: false, reason: 'Tank valve actuators are separate devices on the pipework, not tank points.' },
  { id: 'tnk-any-dmp',  equip: 'TNK', med: '*', qty: 'DMP',  allowed: false, reason: 'Storage tanks have no damper. DMP belongs on AHU or FCU.' },
  { id: 'tnk-any-vsd',  equip: 'TNK', med: '*', qty: 'VSD',  allowed: false, reason: 'Storage tanks have no VSD. VSD belongs on fan or pump equipment.' },
  { id: 'tnk-any-run',  equip: 'TNK', med: '*', qty: 'RUN',  allowed: false, reason: 'Storage tanks have no run status. RUN belongs on active plant.' },
  { id: 'tnk-any-enb',  equip: 'TNK', med: '*', qty: 'ENB',  allowed: false, reason: 'Storage tanks have no enable command. ENB belongs on active plant.' },
  { id: 'tnk-any-flt',  equip: 'TNK', med: '*', qty: 'FLT',  allowed: false, reason: 'Storage tanks have no fault output. FLT belongs on active plant.' },
  { id: 'tnk-any-stg',  equip: 'TNK', med: '*', qty: 'STG',  allowed: false, reason: 'Storage tanks have no staged outputs. STG belongs on active plant.' },
  { id: 'tnk-any-spd',  equip: 'TNK', med: '*', qty: 'SPD',  allowed: false, reason: 'Storage tanks have no speed feedback. SPD belongs on fan or pump equipment.' },
  { id: 'tnk-any-pct',  equip: 'TNK', med: '*', qty: 'PCT',  allowed: false, reason: 'Storage tanks have no percentage output. PCT belongs on active plant.' },
  { id: 'tnk-any-gly',  equip: 'TNK', med: '*', qty: 'GLY',  allowed: false, reason: 'Storage tanks do not measure glycol concentration inline. GLY belongs on SYS.' },
  { id: 'tnk-any-pwr',  equip: 'TNK', med: '*', qty: 'PWR',  allowed: false, reason: 'Storage tanks are passive and have no power metering. PWR belongs on GEN or SYS.' },
  { id: 'tnk-any-stmp', equip: 'TNK', med: '*', qty: 'STMP', allowed: false, reason: 'STMP is an air-side shorthand. On TNK use TMP for tank temperature.' },
  { id: 'tnk-any-rtmp', equip: 'TNK', med: '*', qty: 'RTMP', allowed: false, reason: 'RTMP is an air-side shorthand. On TNK use TMP for tank temperature.' },

  // ══════════════════════════════════════════════════════════════════════════
  // VRV — VRV / VRF system
  // Valid media : RF, SA, RA, ZN
  // Invalid media: OA, MA, EX, CW, HW, CO, GY, FA
  // Valid qty   : TMP, RUN, ENB, FLT, PCT, ALM, VLV, DMP
  // Invalid qty : HUM, PRS, DPR, CO2, VOC, FLW, FSW, VSD, STG, SPD, GLY, PWR, STMP, RTMP
  // ══════════════════════════════════════════════════════════════════════════

  // VRV — block invalid media
  { id: 'vrv-oa-any',  equip: 'VRV', med: 'OA', qty: '*', allowed: false, reason: 'VRV/VRF systems do not handle outside air directly. OA medium belongs on AHU or MAU.' },
  { id: 'vrv-ma-any',  equip: 'VRV', med: 'MA', qty: '*', allowed: false, reason: 'VRV/VRF systems have no mixed air plenum. MA medium belongs on AHU.' },
  { id: 'vrv-ex-any',  equip: 'VRV', med: 'EX', qty: '*', allowed: false, reason: 'VRV/VRF systems have no exhaust air duct. EX medium belongs on AHU or EXF.' },
  { id: 'vrv-cw-any',  equip: 'VRV', med: 'CW', qty: '*', allowed: false, reason: 'VRV/VRF systems use refrigerant, not chilled water. CW medium belongs on CHR or CWP.' },
  { id: 'vrv-hw-any',  equip: 'VRV', med: 'HW', qty: '*', allowed: false, reason: 'VRV/VRF systems use refrigerant, not hot water. HW medium belongs on BLR or HWP.' },
  { id: 'vrv-co-any',  equip: 'VRV', med: 'CO', qty: '*', allowed: false, reason: 'VRV/VRF systems have no condenser water circuit. Use RF medium for refrigerant.' },
  { id: 'vrv-gy-any',  equip: 'VRV', med: 'GY', qty: '*', allowed: false, reason: 'VRV/VRF systems have no glycol circuit. GY medium belongs on HEX or SYS.' },
  { id: 'vrv-fa-any',  equip: 'VRV', med: 'FA', qty: '*', allowed: false, reason: 'VRV/VRF condenser fan points use RF medium, not FA.' },

  // VRV — block invalid qty
  { id: 'vrv-any-hum',  equip: 'VRV', med: '*', qty: 'HUM',  allowed: false, reason: 'VRV/VRF systems do not measure humidity. HUM belongs on AHU or SYS.' },
  { id: 'vrv-any-prs',  equip: 'VRV', med: '*', qty: 'PRS',  allowed: false, reason: 'Refrigerant circuit pressure is an internal chiller/VRV quantity, not a BMS point.' },
  { id: 'vrv-any-dpr',  equip: 'VRV', med: '*', qty: 'DPR',  allowed: false, reason: 'VRV/VRF systems do not expose differential pressure to BMS. DPR belongs on CWP or SYS.' },
  { id: 'vrv-any-co2',  equip: 'VRV', med: '*', qty: 'CO2',  allowed: false, reason: 'VRV/VRF systems do not measure CO2. CO2 belongs on AHU or SYS.' },
  { id: 'vrv-any-voc',  equip: 'VRV', med: '*', qty: 'VOC',  allowed: false, reason: 'VRV/VRF systems do not measure VOC. VOC belongs on AHU or SYS.' },
  { id: 'vrv-any-flw',  equip: 'VRV', med: '*', qty: 'FLW',  allowed: false, reason: 'VRV/VRF systems do not have flow meters. FLW belongs on SYS or CHR.' },
  { id: 'vrv-any-fsw',  equip: 'VRV', med: '*', qty: 'FSW',  allowed: false, reason: 'VRV/VRF systems have no flow switches. FSW belongs on pipework systems.' },
  { id: 'vrv-any-vsd',  equip: 'VRV', med: '*', qty: 'VSD',  allowed: false, reason: 'VRV/VRF compressor speed is managed internally. Use PCT for capacity percentage.' },
  { id: 'vrv-any-stg',  equip: 'VRV', med: '*', qty: 'STG',  allowed: false, reason: 'VRV/VRF systems do not have staged outputs. Use PCT for capacity control.' },
  { id: 'vrv-any-spd',  equip: 'VRV', med: '*', qty: 'SPD',  allowed: false, reason: 'VRV/VRF compressor speed is an internal quantity. Use PCT for capacity.' },
  { id: 'vrv-any-gly',  equip: 'VRV', med: '*', qty: 'GLY',  allowed: false, reason: 'VRV/VRF systems have no glycol circuit. GLY belongs on SYS or HEX.' },
  { id: 'vrv-any-pwr',  equip: 'VRV', med: '*', qty: 'PWR',  allowed: false, reason: 'VRV/VRF power draw is not typically a BMS point. PWR belongs on GEN or SYS.' },
  { id: 'vrv-any-stmp', equip: 'VRV', med: '*', qty: 'STMP', allowed: false, reason: 'STMP is an AHU-level shorthand. On VRV use TMP with SA medium for supply temperature.' },
  { id: 'vrv-any-rtmp', equip: 'VRV', med: '*', qty: 'RTMP', allowed: false, reason: 'RTMP is an AHU-level shorthand. On VRV use TMP with RA medium for return temperature.' },

  // ══════════════════════════════════════════════════════════════════════════
  // GEN — Generator
  // Valid media : FA
  // Invalid media: SA, RA, OA, MA, EX, ZN, CW, HW, CO, GY, RF
  // Valid qty   : RUN, ENB, FLT, ALM, PWR
  // Invalid qty : TMP, HUM, PRS, DPR, CO2, VOC, FLW, FSW, VLV, DMP, VSD, STG, SPD, PCT, GLY, STMP, RTMP
  // ══════════════════════════════════════════════════════════════════════════

  // GEN — block invalid media
  { id: 'gen-sa-any',  equip: 'GEN', med: 'SA', qty: '*', allowed: false, reason: 'Generators have no supply air medium. SA medium belongs on AHU or FCU.' },
  { id: 'gen-ra-any',  equip: 'GEN', med: 'RA', qty: '*', allowed: false, reason: 'Generators have no return air medium. RA medium belongs on AHU or FCU.' },
  { id: 'gen-oa-any',  equip: 'GEN', med: 'OA', qty: '*', allowed: false, reason: 'Generators have no outside air medium for BMS. OA medium belongs on AHU or MAU.' },
  { id: 'gen-ma-any',  equip: 'GEN', med: 'MA', qty: '*', allowed: false, reason: 'Generators have no mixed air medium. MA medium belongs on AHU.' },
  { id: 'gen-ex-any',  equip: 'GEN', med: 'EX', qty: '*', allowed: false, reason: 'Generator exhaust fumes are not monitored as EX medium. EX belongs on AHU or EXF.' },
  { id: 'gen-zn-any',  equip: 'GEN', med: 'ZN', qty: '*', allowed: false, reason: 'Generators do not sense zones. Zone sensors belong on AHU, FCU, or room controllers.' },
  { id: 'gen-cw-any',  equip: 'GEN', med: 'CW', qty: '*', allowed: false, reason: 'Generators have no chilled water circuit. CW medium belongs on CHR or CWP.' },
  { id: 'gen-hw-any',  equip: 'GEN', med: 'HW', qty: '*', allowed: false, reason: 'Generators have no hot water circuit. HW medium belongs on BLR or HWP.' },
  { id: 'gen-co-any',  equip: 'GEN', med: 'CO', qty: '*', allowed: false, reason: 'Generators have no condenser water circuit. CO medium belongs on CHR or CTW.' },
  { id: 'gen-gy-any',  equip: 'GEN', med: 'GY', qty: '*', allowed: false, reason: 'Generators have no glycol circuit. GY medium belongs on HEX or SYS.' },
  { id: 'gen-rf-any',  equip: 'GEN', med: 'RF', qty: '*', allowed: false, reason: 'Generators have no refrigerant circuit. Refrigerant belongs on CHR or VRV.' },

  // GEN — block invalid qty
  { id: 'gen-any-tmp',  equip: 'GEN', med: '*', qty: 'TMP',  allowed: false, reason: 'Generator temperature (coolant/exhaust) is not typically a BMS point. TMP belongs on AHU or SYS.' },
  { id: 'gen-any-hum',  equip: 'GEN', med: '*', qty: 'HUM',  allowed: false, reason: 'Generators do not measure humidity. HUM belongs on AHU or SYS.' },
  { id: 'gen-any-prs',  equip: 'GEN', med: '*', qty: 'PRS',  allowed: false, reason: 'Generators do not measure air or fluid pressure as a BMS point. PRS belongs on SYS or CHR.' },
  { id: 'gen-any-dpr',  equip: 'GEN', med: '*', qty: 'DPR',  allowed: false, reason: 'Generators do not measure differential pressure. DPR belongs on CWP or SYS.' },
  { id: 'gen-any-co2',  equip: 'GEN', med: '*', qty: 'CO2',  allowed: false, reason: 'Generators do not measure CO2 as a BMS point. CO2 belongs on AHU or SYS.' },
  { id: 'gen-any-voc',  equip: 'GEN', med: '*', qty: 'VOC',  allowed: false, reason: 'Generators do not measure VOC. VOC belongs on AHU or SYS.' },
  { id: 'gen-any-flw',  equip: 'GEN', med: '*', qty: 'FLW',  allowed: false, reason: 'Generators have no flow meters. FLW belongs on pipework systems.' },
  { id: 'gen-any-fsw',  equip: 'GEN', med: '*', qty: 'FSW',  allowed: false, reason: 'Generators have no flow switches. FSW belongs on pipework systems.' },
  { id: 'gen-any-vlv',  equip: 'GEN', med: '*', qty: 'VLV',  allowed: false, reason: 'Generators have no valve outputs as BMS points. VLV belongs on coil or pipe actuators.' },
  { id: 'gen-any-dmp',  equip: 'GEN', med: '*', qty: 'DMP',  allowed: false, reason: 'Generators have no damper outputs. DMP belongs on AHU or FCU.' },
  { id: 'gen-any-vsd',  equip: 'GEN', med: '*', qty: 'VSD',  allowed: false, reason: 'Generators have no VSD. VSD belongs on fan or pump equipment.' },
  { id: 'gen-any-stg',  equip: 'GEN', med: '*', qty: 'STG',  allowed: false, reason: 'Generators have no staged outputs. Use ENB for on/off command.' },
  { id: 'gen-any-spd',  equip: 'GEN', med: '*', qty: 'SPD',  allowed: false, reason: 'Generator speed is not a standard BMS point. SPD belongs on fan or pump equipment.' },
  { id: 'gen-any-pct',  equip: 'GEN', med: '*', qty: 'PCT',  allowed: false, reason: 'Generators do not expose a percentage output to BMS. Use PWR for power monitoring.' },
  { id: 'gen-any-gly',  equip: 'GEN', med: '*', qty: 'GLY',  allowed: false, reason: 'Generators do not measure glycol concentration. GLY belongs on SYS or HEX.' },
  { id: 'gen-any-stmp', equip: 'GEN', med: '*', qty: 'STMP', allowed: false, reason: 'STMP is an air-side shorthand and not applicable to generators.' },
  { id: 'gen-any-rtmp', equip: 'GEN', med: '*', qty: 'RTMP', allowed: false, reason: 'RTMP is an air-side shorthand and not applicable to generators.' },

  // ══════════════════════════════════════════════════════════════════════════
  // PMP — General pump
  // Valid media : CW, HW, CO, GY
  // Invalid media: SA, RA, OA, MA, EX, ZN, FA, RF
  // Valid qty   : RUN, ENB, FLT, VSD, SPD, FSW, PRS, DPR, FLW, PWR, ALM, PCT
  // Invalid qty : TMP, HUM, CO2, VOC, VLV, DMP, STG, GLY, STMP, RTMP
  // ══════════════════════════════════════════════════════════════════════════

  // PMP — block invalid media
  { id: 'pmp-sa-any',  equip: 'PMP', med: 'SA', qty: '*', allowed: false, reason: 'General pumps have no air medium. SA medium belongs on AHU or FCU.' },
  { id: 'pmp-ra-any',  equip: 'PMP', med: 'RA', qty: '*', allowed: false, reason: 'General pumps have no return air medium. RA medium belongs on AHU or FCU.' },
  { id: 'pmp-oa-any',  equip: 'PMP', med: 'OA', qty: '*', allowed: false, reason: 'General pumps have no outside air medium. OA medium belongs on AHU or MAU.' },
  { id: 'pmp-ma-any',  equip: 'PMP', med: 'MA', qty: '*', allowed: false, reason: 'General pumps have no mixed air medium. MA medium belongs on AHU.' },
  { id: 'pmp-ex-any',  equip: 'PMP', med: 'EX', qty: '*', allowed: false, reason: 'General pumps have no exhaust air medium. EX medium belongs on AHU or EXF.' },
  { id: 'pmp-zn-any',  equip: 'PMP', med: 'ZN', qty: '*', allowed: false, reason: 'General pumps do not sense zones. Zone sensors belong on AHU, FCU, or room controllers.' },
  { id: 'pmp-fa-any',  equip: 'PMP', med: 'FA', qty: '*', allowed: false, reason: 'General pumps have no fan medium. Pumps are not fans.' },
  { id: 'pmp-rf-any',  equip: 'PMP', med: 'RF', qty: '*', allowed: false, reason: 'General pumps have no refrigerant circuit. Refrigerant belongs on CHR or VRV.' },

  // PMP — block invalid qty
  { id: 'pmp-any-tmp',  equip: 'PMP', med: '*', qty: 'TMP',  allowed: false, reason: 'Pumps do not measure water temperature. Temperature belongs on SYS (header sensor).' },
  { id: 'pmp-any-hum',  equip: 'PMP', med: '*', qty: 'HUM',  allowed: false, reason: 'Pumps do not measure humidity.' },
  { id: 'pmp-any-co2',  equip: 'PMP', med: '*', qty: 'CO2',  allowed: false, reason: 'Pumps do not measure CO2.' },
  { id: 'pmp-any-voc',  equip: 'PMP', med: '*', qty: 'VOC',  allowed: false, reason: 'Pumps do not measure VOC.' },
  { id: 'pmp-any-vlv',  equip: 'PMP', med: '*', qty: 'VLV',  allowed: false, reason: 'Pumps do not have valve outputs — valves are separate actuators on the pipework.' },
  { id: 'pmp-any-dmp',  equip: 'PMP', med: '*', qty: 'DMP',  allowed: false, reason: 'Pumps have no dampers.' },
  { id: 'pmp-any-stg',  equip: 'PMP', med: '*', qty: 'STG',  allowed: false, reason: 'Pumps have no staged outputs — use VSD for variable speed or ENB for on/off.' },
  { id: 'pmp-any-gly',  equip: 'PMP', med: '*', qty: 'GLY',  allowed: false, reason: 'Pumps do not measure glycol concentration. GLY belongs on SYS or HEX.' },
  { id: 'pmp-any-stmp', equip: 'PMP', med: '*', qty: 'STMP', allowed: false, reason: 'STMP is an air-side shorthand and not applicable to pumps.' },
  { id: 'pmp-any-rtmp', equip: 'PMP', med: '*', qty: 'RTMP', allowed: false, reason: 'RTMP is an air-side shorthand and not applicable to pumps.' },

  // ══════════════════════════════════════════════════════════════════════════
  // SYS — System / circuit level
  // Valid media : CW, HW, CO, GY, SA, RA, ZN, OA
  // Invalid media: MA, EX, FA, RF
  // Valid qty   : TMP, HUM, PRS, DPR, CO2, VOC, FLW, FSW, GLY, PWR, ALM, STMP, RTMP
  // Invalid qty : VLV, DMP, VSD, RUN, ENB, FLT, STG, SPD, PCT
  // ══════════════════════════════════════════════════════════════════════════

  // SYS — block invalid media
  { id: 'sys-ma-any',  equip: 'SYS', med: 'MA', qty: '*', allowed: false, reason: 'System-level points do not use mixed air medium. MA medium belongs on AHU.' },
  { id: 'sys-ex-any',  equip: 'SYS', med: 'EX', qty: '*', allowed: false, reason: 'System-level points do not use exhaust air medium. EX medium belongs on AHU or EXF.' },
  { id: 'sys-fa-any',  equip: 'SYS', med: 'FA', qty: '*', allowed: false, reason: 'System-level points do not use the fan medium. FA belongs on specific fan equipment.' },
  { id: 'sys-rf-any',  equip: 'SYS', med: 'RF', qty: '*', allowed: false, reason: 'System-level points do not use refrigerant medium. RF belongs on CHR or VRV.' },

  // SYS — block invalid qty
  { id: 'sys-any-vlv',  equip: 'SYS', med: '*', qty: 'VLV',  allowed: false, reason: 'System-level points do not have valve outputs. VLV belongs on specific coil or pipe actuators.' },
  { id: 'sys-any-dmp',  equip: 'SYS', med: '*', qty: 'DMP',  allowed: false, reason: 'System-level points do not have damper outputs. DMP belongs on specific AHU or FCU.' },
  { id: 'sys-any-vsd',  equip: 'SYS', med: '*', qty: 'VSD',  allowed: false, reason: 'System-level points do not have VSD speed references. VSD belongs on specific fan or pump.' },
  { id: 'sys-any-run',  equip: 'SYS', med: '*', qty: 'RUN',  allowed: false, reason: 'System-level points do not have run status. RUN belongs on specific active plant.' },
  { id: 'sys-any-enb',  equip: 'SYS', med: '*', qty: 'ENB',  allowed: false, reason: 'System-level points do not have enable commands. ENB belongs on specific active plant.' },
  { id: 'sys-any-flt',  equip: 'SYS', med: '*', qty: 'FLT',  allowed: false, reason: 'System-level points do not have fault outputs. FLT belongs on specific active plant.' },
  { id: 'sys-any-stg',  equip: 'SYS', med: '*', qty: 'STG',  allowed: false, reason: 'Stage outputs belong on specific equipment, not at system level. Use SYS for monitoring quantities only.' },
  { id: 'sys-any-spd',  equip: 'SYS', med: '*', qty: 'SPD',  allowed: false, reason: 'Speed feedback belongs on specific fan or pump equipment, not at system level.' },
  { id: 'sys-any-pct',  equip: 'SYS', med: '*', qty: 'PCT',  allowed: false, reason: 'Percentage outputs belong on specific equipment. SYS is for monitoring quantities only.' },

];

// ─── SEED PROJECTS ────────────────────────────────────────────────────────────
export const seedProjects: Project[] = [
  {
    id: 'proj-pacofs',
    name: 'PACOFS',
    description: 'PACOFS K-Floor refurbishment',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function makeVar(
  equip: string, num: string, med: string, qty: string, mod: string,
  equipList: EquipEntry[], medList: MedEntry[], qtyList: QtyEntry[], modList: ModEntry[]
) {
  const name = equip + num + med + qty + mod;
  const equipEntry = equipList.find(e => e.code === equip);
  const medEntry = medList.find(m => m.code === med);
  const qtyEntry = qtyList.find(q => q.code === qty);
  const modEntry = modList.find(m => m.code === mod);

  let description = '';
  const equipLabel = equipEntry?.label ?? equip;
  const medLabel = medEntry?.label ?? '';
  const qtyLabel = qtyEntry?.label ?? qty;
  const modLabel = modEntry?.label ?? '';

  if (equip === 'SYS') {
    const parts = ['System'];
    if (num) parts[0] += ` ${num}`;
    parts.push('—');
    if (medLabel) parts.push(medLabel);
    parts.push(qtyLabel);
    if (modLabel) parts.push(modLabel);
    description = parts.join(' ');
  } else {
    const parts = [equipLabel];
    if (num) parts.push(num);
    parts.push('—');
    if (medLabel) parts.push(medLabel);
    parts.push(qtyLabel);
    if (modLabel) parts.push(modLabel);
    description = parts.join(' ');
  }

  return {
    id: uuidv4(),
    equip, num, med, qty, mod,
    name,
    description: description.replace(/\s+/g, ' ').trim(),
  };
}

// ─── SEED CONTROLLER BUILDER ──────────────────────────────────────────────────
export function buildSeedController(
  equipList: EquipEntry[],
  medList: MedEntry[],
  qtyList: QtyEntry[],
  modList: ModEntry[]
): Controller {
  const mv = (equip: string, num: string, med: string, qty: string, mod: string) =>
    makeVar(equip, num, med, qty, mod, equipList, medList, qtyList, modList);

  const variables = [
    mv('CHR','1','','RUN',''),
    mv('CHR','1','','ENB',''),
    mv('CHR','1','','FLT',''),
    mv('CHR','1','CW','STMP',''),
    mv('CHR','1','CW','RTMP',''),
    mv('CHR','1','CO','STMP',''),
    mv('CHR','1','CO','RTMP',''),
    mv('CHR','1','CW','DPR',''),
    mv('CHR','1','CW','FSW',''),
    mv('CHR','1','CO','FSW',''),
    mv('CHR','2','','RUN',''),
    mv('CHR','2','','ENB',''),
    mv('CHR','2','','FLT',''),
    mv('CHR','2','CW','STMP',''),
    mv('CHR','2','CW','RTMP',''),
    mv('CHR','2','CO','STMP',''),
    mv('CHR','2','CO','RTMP',''),
    mv('CHR','2','CW','DPR',''),
    mv('CHR','2','CW','FSW',''),
    mv('CHR','2','CO','FSW',''),
    mv('CWP','1','','RUN',''),
    mv('CWP','1','','ENB',''),
    mv('CWP','1','','FLT',''),
    mv('CWP','1','','VSD',''),
    mv('CWP','1','','FSW',''),
    mv('CWP','2','','RUN',''),
    mv('CWP','2','','ENB',''),
    mv('CWP','2','','FLT',''),
    mv('CWP','2','','VSD',''),
    mv('CWP','2','','FSW',''),
    mv('HWP','1','','RUN',''),
    mv('HWP','1','','ENB',''),
    mv('HWP','1','','FLT',''),
    mv('HWP','1','','VSD',''),
    mv('HWP','1','','FSW',''),
    mv('HWP','2','','RUN',''),
    mv('HWP','2','','ENB',''),
    mv('HWP','2','','FLT',''),
    mv('HWP','2','','VSD',''),
    mv('HWP','2','','FSW',''),
    mv('ILH','1','','ENB',''),
    mv('ILH','1','','RUN',''),
    mv('ILH','1','','FLT',''),
    mv('ILH','1','','STG','1'),
    mv('ILH','1','','STG','2'),
    mv('ILH','1','','STG','3'),
    mv('ILH','2','','ENB',''),
    mv('ILH','2','','RUN',''),
    mv('ILH','2','','FLT',''),
    mv('ILH','2','','STG','1'),
    mv('ILH','2','','STG','2'),
    mv('ILH','2','','STG','3'),
    mv('TNK','1','','TMP','T'),
    mv('TNK','1','','TMP','M'),
    mv('TNK','1','','TMP','B'),
    mv('SYS','','CW','STMP',''),
    mv('SYS','','CW','RTMP',''),
    mv('SYS','','CW','DPR',''),
    mv('SYS','','CW','DPR','SP'),
    mv('SYS','','HW','STMP',''),
    mv('SYS','','HW','RTMP',''),
    mv('SYS','','HW','DPR',''),
    mv('SYS','','HW','DPR','SP'),
  ];

  const now = new Date().toISOString();
  return {
    id: uuidv4(),
    siteName: 'PACOFS',
    label: 'K-Floor Plant Room — Eliwell 12600',
    variables,
    createdAt: now,
    updatedAt: now,
    modelId: 'eliwell-12600',
    projectId: 'proj-pacofs',
    duplicates: 1,
  };
}

// ─── SEED ASSEMBLIES ──────────────────────────────────────────────────────────
export const seedAssemblies: Assembly[] = [
  {
    id: uuidv4(),
    name: 'Chiller — Full',
    equipCode: 'CHR',
    description: 'Full chiller monitoring with chilled and condenser water circuits',
    points: [
      { id: uuidv4(), med: '',   qty: 'RUN',  mod: '' },
      { id: uuidv4(), med: '',   qty: 'ENB',  mod: '' },
      { id: uuidv4(), med: '',   qty: 'FLT',  mod: '' },
      { id: uuidv4(), med: 'CW', qty: 'STMP', mod: '' },
      { id: uuidv4(), med: 'CW', qty: 'RTMP', mod: '' },
      { id: uuidv4(), med: 'CO', qty: 'STMP', mod: '' },
      { id: uuidv4(), med: 'CO', qty: 'RTMP', mod: '' },
      { id: uuidv4(), med: 'CW', qty: 'DPR',  mod: '' },
      { id: uuidv4(), med: 'CW', qty: 'FSW',  mod: '' },
      { id: uuidv4(), med: 'CO', qty: 'FSW',  mod: '' },
    ],
  },
  {
    id: uuidv4(),
    name: 'Chilled Water Pump',
    equipCode: 'CWP',
    description: 'Standard chilled water pump monitoring',
    points: [
      { id: uuidv4(), med: '', qty: 'RUN', mod: '' },
      { id: uuidv4(), med: '', qty: 'ENB', mod: '' },
      { id: uuidv4(), med: '', qty: 'FLT', mod: '' },
      { id: uuidv4(), med: '', qty: 'VSD', mod: '' },
      { id: uuidv4(), med: '', qty: 'FSW', mod: '' },
    ],
  },
  {
    id: uuidv4(),
    name: 'Hot Water Pump',
    equipCode: 'HWP',
    description: 'Standard hot water pump monitoring',
    points: [
      { id: uuidv4(), med: '', qty: 'RUN', mod: '' },
      { id: uuidv4(), med: '', qty: 'ENB', mod: '' },
      { id: uuidv4(), med: '', qty: 'FLT', mod: '' },
      { id: uuidv4(), med: '', qty: 'VSD', mod: '' },
      { id: uuidv4(), med: '', qty: 'FSW', mod: '' },
    ],
  },
  {
    id: uuidv4(),
    name: 'Inline Electric Heater — 3-Stage',
    equipCode: 'ILH',
    description: '3-stage inline electric heater',
    points: [
      { id: uuidv4(), med: '', qty: 'ENB', mod: '' },
      { id: uuidv4(), med: '', qty: 'RUN', mod: '' },
      { id: uuidv4(), med: '', qty: 'FLT', mod: '' },
      { id: uuidv4(), med: '', qty: 'STG', mod: '1' },
      { id: uuidv4(), med: '', qty: 'STG', mod: '2' },
      { id: uuidv4(), med: '', qty: 'STG', mod: '3' },
    ],
  },
  {
    id: uuidv4(),
    name: 'AHU — Basic',
    equipCode: 'AHU',
    description: 'Basic air handling unit with supply/return/outside air sensors, valves and fan',
    points: [
      { id: uuidv4(), med: '',   qty: 'RUN', mod: '' },
      { id: uuidv4(), med: '',   qty: 'ENB', mod: '' },
      { id: uuidv4(), med: '',   qty: 'FLT', mod: '' },
      { id: uuidv4(), med: 'SA', qty: 'TMP', mod: '' },
      { id: uuidv4(), med: 'RA', qty: 'TMP', mod: '' },
      { id: uuidv4(), med: 'OA', qty: 'TMP', mod: '' },
      { id: uuidv4(), med: 'SA', qty: 'HUM', mod: '' },
      { id: uuidv4(), med: 'CW', qty: 'VLV', mod: '' },
      { id: uuidv4(), med: 'HW', qty: 'VLV', mod: '' },
      { id: uuidv4(), med: 'FA', qty: 'VSD', mod: '' },
      { id: uuidv4(), med: 'OA', qty: 'DMP', mod: '' },
      { id: uuidv4(), med: 'SA', qty: 'DPR', mod: '' },
      { id: uuidv4(), med: '',   qty: 'FSW', mod: '' },
    ],
  },
  {
    id: uuidv4(),
    name: 'FCU — Basic',
    equipCode: 'FCU',
    description: 'Basic fan coil unit with zone temperature and water valves',
    points: [
      { id: uuidv4(), med: '',   qty: 'RUN', mod: '' },
      { id: uuidv4(), med: '',   qty: 'ENB', mod: '' },
      { id: uuidv4(), med: 'ZN', qty: 'TMP', mod: '' },
      { id: uuidv4(), med: 'CW', qty: 'VLV', mod: '' },
      { id: uuidv4(), med: 'HW', qty: 'VLV', mod: '' },
    ],
  },
  {
    id: uuidv4(),
    name: 'Cooling Tower',
    equipCode: 'CTW',
    description: 'Cooling tower with fan speed and condenser water temperatures',
    points: [
      { id: uuidv4(), med: '',   qty: 'RUN',  mod: '' },
      { id: uuidv4(), med: '',   qty: 'ENB',  mod: '' },
      { id: uuidv4(), med: '',   qty: 'FLT',  mod: '' },
      { id: uuidv4(), med: 'FA', qty: 'VSD',  mod: '' },
      { id: uuidv4(), med: 'CO', qty: 'STMP', mod: '' },
      { id: uuidv4(), med: 'CO', qty: 'RTMP', mod: '' },
    ],
  },
  {
    id: uuidv4(),
    name: 'Boiler — Basic',
    equipCode: 'BLR',
    description: 'Basic boiler monitoring with hot water temperatures and percentage output',
    points: [
      { id: uuidv4(), med: '',   qty: 'RUN',  mod: '' },
      { id: uuidv4(), med: '',   qty: 'ENB',  mod: '' },
      { id: uuidv4(), med: '',   qty: 'FLT',  mod: '' },
      { id: uuidv4(), med: 'HW', qty: 'STMP', mod: '' },
      { id: uuidv4(), med: 'HW', qty: 'RTMP', mod: '' },
      { id: uuidv4(), med: '',   qty: 'PCT',  mod: '' },
    ],
  },
  {
    id: uuidv4(),
    name: 'Storage Tank — 3-Sensor',
    equipCode: 'TNK',
    description: 'Storage tank with top, middle and bottom temperature sensors',
    points: [
      { id: uuidv4(), med: '', qty: 'TMP', mod: 'T' },
      { id: uuidv4(), med: '', qty: 'TMP', mod: 'M' },
      { id: uuidv4(), med: '', qty: 'TMP', mod: 'B' },
    ],
  },
  {
    id: uuidv4(),
    name: 'General Pump — Basic',
    equipCode: 'PMP',
    description: 'General pump monitoring',
    points: [
      { id: uuidv4(), med: '', qty: 'RUN', mod: '' },
      { id: uuidv4(), med: '', qty: 'ENB', mod: '' },
      { id: uuidv4(), med: '', qty: 'FLT', mod: '' },
      { id: uuidv4(), med: '', qty: 'VSD', mod: '' },
      { id: uuidv4(), med: '', qty: 'FSW', mod: '' },
    ],
  },
  {
    id: uuidv4(),
    name: 'SYS — CHW Circuit',
    equipCode: 'SYS',
    description: 'Chilled water system header sensors and setpoints',
    points: [
      { id: uuidv4(), med: 'CW', qty: 'STMP', mod: '' },
      { id: uuidv4(), med: 'CW', qty: 'RTMP', mod: '' },
      { id: uuidv4(), med: 'CW', qty: 'DPR',  mod: '' },
      { id: uuidv4(), med: 'CW', qty: 'DPR',  mod: 'SP' },
    ],
  },
  {
    id: uuidv4(),
    name: 'SYS — HW Circuit',
    equipCode: 'SYS',
    description: 'Hot water system header sensors and setpoints',
    points: [
      { id: uuidv4(), med: 'HW', qty: 'STMP', mod: '' },
      { id: uuidv4(), med: 'HW', qty: 'RTMP', mod: '' },
      { id: uuidv4(), med: 'HW', qty: 'DPR',  mod: '' },
      { id: uuidv4(), med: 'HW', qty: 'DPR',  mod: 'SP' },
    ],
  },
];

// ─── SEED CONTROLLER MODELS ───────────────────────────────────────────────────
export const seedControllerModels: ControllerModel[] = [
  {
    id: 'eliwell-ewpc974t',
    name: 'Eliwell EWPC 974/T',
    description: 'Small controller, panel mount',
    io: { ai: 4, ao: 2, di: 8, do: 4 },
  },
  {
    id: 'eliwell-12600',
    name: 'Eliwell 12600',
    description: 'Medium plant room controller',
    io: { ai: 8, ao: 4, di: 12, do: 8 },
  },
  {
    id: 'eliwell-15200',
    name: 'Eliwell 15200',
    description: 'Large plant room controller',
    io: { ai: 12, ao: 6, di: 16, do: 12 },
  },
];

// ─── SEED EXPANSION MODULES ───────────────────────────────────────────────────
export const seedExpansionModules: ExpansionModule[] = [
  {
    id: uuidv4(),
    name: 'Eliwell XM-8DI',
    description: '8 digital input expansion',
    io: { ai: 0, ao: 0, di: 8, do: 0 },
  },
  {
    id: uuidv4(),
    name: 'Eliwell XM-8DO',
    description: '8 digital output expansion',
    io: { ai: 0, ao: 0, di: 0, do: 8 },
  },
  {
    id: uuidv4(),
    name: 'Eliwell XM-4AI',
    description: '4 analog input expansion',
    io: { ai: 4, ao: 0, di: 0, do: 0 },
  },
  {
    id: uuidv4(),
    name: 'Eliwell XM-4AO',
    description: '4 analog output expansion',
    io: { ai: 0, ao: 4, di: 0, do: 0 },
  },
  {
    id: uuidv4(),
    name: 'Eliwell XM-8IO',
    description: 'Mixed 4DI + 4DO expansion',
    io: { ai: 0, ao: 0, di: 4, do: 4 },
  },
];
