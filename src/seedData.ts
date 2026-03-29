import { v4 as uuidv4 } from 'uuid';
import type { EquipEntry, MedEntry, QtyEntry, ModEntry, SemanticRule, Controller, Assembly, ControllerModel, ExpansionModule, Project } from './types';

// ─── EQUIP — sorted alphabetically by code ───────────────────────────────────
export const seedEquip: EquipEntry[] = [
  { id: 'bf0f040e-6723-4b1a-9acc-322270c8a2f5', code: 'ACP', label: 'Air Compressor',                    takesNum: true  },
  { id: 'e3188e57-0425-4cee-b37e-f84cc5d2ec17', code: 'AHU', label: 'Air handling unit',                 takesNum: true  },
  { id: 'b3b6dc32-1a24-475c-ab7c-283ebf06cafc', code: 'AUT', label: 'Autoclave',                         takesNum: true  },
  { id: '5500a54e-b42a-4096-a6c2-5247d0cdafce', code: 'BSC', label: 'Boiler - Steam Coal',               takesNum: true  },
  { id: 'c8c67c7b-39cd-46c9-bd61-b3dcb4c94ec6', code: 'BSD', label: 'Boiler - Steam Diesel',             takesNum: true  },
  { id: 'ad5ee883-88fc-4d5c-9804-e9f5bfcd4138', code: 'BSE', label: 'Boiler - Steam Electric',           takesNum: true  },
  { id: 'a02ab6ae-d243-46a2-a92c-30de65c87b53', code: 'BSG', label: 'Boiler - Steam LPG',                takesNum: true  },
  { id: '40d47b47-0991-4773-bc7c-37d573941e08', code: 'BSR', label: 'Boiler - Steam Element',            takesNum: true  },
  { id: '3e187ca5-02ea-43fb-9f4a-4f229db56804', code: 'BWC', label: 'Boiler - Water Coal',               takesNum: true  },
  { id: '645e261c-e5b0-486d-ae5a-25920466bced', code: 'BWD', label: 'Boiler - Water Diesel',             takesNum: true  },
  { id: '63d33478-20de-4f0c-977a-8146d4f98877', code: 'BWE', label: 'Boiler - Water Electrode',          takesNum: true  },
  { id: '5901da52-4bbd-4727-b8f9-89e9246c34f1', code: 'BWG', label: 'Boiler - Water LPG',                takesNum: true  },
  { id: 'c04d3f53-50f1-4cc2-b300-0fbc460f215f', code: 'BWR', label: 'Boiler - Water Elements (Resistive)', takesNum: true },
  { id: '99b7d6b9-3604-4574-b912-fe2a79422deb', code: 'CHR', label: 'Chiller',                           takesNum: true  },
  { id: '23709f82-c7d4-445a-ab74-2335f407dd5e', code: 'CTW', label: 'Cooling tower',                     takesNum: true  },
  { id: '2603d8e5-158e-4492-9aa0-6943b787f007', code: 'CWP', label: 'Chilled water pump',                takesNum: true  },
  { id: '54aa25bd-9f4c-4229-81f6-9d9ab9ffa69b', code: 'ECF', label: 'FAN - EC',                          takesNum: true  },
  { id: '6ff172be-a0e8-462b-8cae-b1f202880b88', code: 'EXF', label: 'Exhaust fan',                       takesNum: true  },
  { id: 'c7e0724f-4cfc-403e-befd-da6ff60935a6', code: 'FCU', label: 'Fan coil unit',                     takesNum: true  },
  { id: '72358014-d9bb-4905-941b-ae998a4ae17b', code: 'FMH', label: 'Fume Hood',                         takesNum: true  },
  { id: '3c1343e5-e41e-40f1-ab3b-8e150631d392', code: 'GEN', label: 'Generator',                         takesNum: true  },
  { id: 'cbf8900f-267f-4277-aab1-f44f1a22fc6a', code: 'GSB', label: 'Gas Bank - Laboratory',             takesNum: true  },
  { id: '36d10fae-756f-49ba-8674-3f864ff2e385', code: 'HEX', label: 'Heat exchanger',                    takesNum: true  },
  { id: '87773244-f38e-42a2-a8bd-efed74f5cc32', code: 'HWP', label: 'Hot water pump',                    takesNum: true  },
  { id: 'de70888e-43cb-473a-98a7-829472bc6d47', code: 'ILH', label: 'Inline electric heater',            takesNum: true  },
  { id: '30e39970-29a7-4ea2-b057-ebeb7ffba0e5', code: 'LFC', label: 'Laminar Flow Cabinet',              takesNum: true  },
  { id: '18d8b26b-a62f-429e-9932-1e5a0d445ec1', code: 'MAU', label: 'Make-up air unit',                  takesNum: true  },
  { id: 'ec84f891-3394-46dd-8153-208260b2e4a7', code: 'PMP', label: 'General pump',                      takesNum: true  },
  { id: '83a4c770-214f-4f30-973c-ab3bc985c24d', code: 'RCR', label: 'Refrigeration - Cold Room',         takesNum: true  },
  { id: '87ac3f88-d64e-4a6b-b01c-a89f055b9da9', code: 'RFR', label: 'Refrigeration - Freezer Room',      takesNum: true  },
  { id: '6bcd81f6-ce2d-4b2d-9f02-838bd2fa2ed5', code: 'SAF', label: 'Supply Air Fan',                    takesNum: true  },
  { id: 'a17f9eeb-787b-4379-9297-82d19c2c8dbc', code: 'SXF', label: 'Smoke Extract Fan',                 takesNum: true  },
  { id: '36e88a78-3300-4fd3-b11e-0ea2656efb6f', code: 'SYS', label: 'System / circuit level',            takesNum: false },
  { id: '07542033-95a8-4eda-886e-df2ca3cca37a', code: 'TNK', label: 'Storage tank',                      takesNum: true  },
  { id: '265efb98-10cd-4471-920a-5855da6c13d9', code: 'VAC', label: 'Vacuum Pump',                       takesNum: true  },
  { id: '824d79f0-20f1-45e4-9dbe-c0eb365b5ee8', code: 'VFD', label: 'Variable Frequency Drive',          takesNum: true  },
  { id: 'a74f6691-0eeb-4e74-a8ef-f8bce1242b9f', code: 'VRV', label: 'VRV / VRF system',                  takesNum: true  },
];

// ─── MED — sorted alphabetically by code ─────────────────────────────────────
export const seedMed: MedEntry[] = [
  { id: 'dbefa209-66ce-4b85-9293-2719b496e57b', code: 'AL', label: 'Alarm'              },
  { id: '83d0d5b6-e2a3-44d7-a7a9-a3de6e1cd069', code: 'AR', label: 'Air'                },
  { id: 'f537fedc-654e-4701-98bc-5fdf04816c43', code: 'CO', label: 'Condenser water'     },
  { id: '2a659682-0df6-46c6-b765-54be7f0fda07', code: 'CP', label: 'Compressor'          },
  { id: 'c865e17a-6441-4861-914f-f7890f88df4d', code: 'CW', label: 'Chilled water'       },
  { id: 'e533511c-8ea5-4486-8066-ebb4a92c6c53', code: 'DF', label: 'Defrost'             },
  { id: '52271fe2-b945-4a0f-a4be-b39a03ec85f6', code: 'EL', label: 'Electric'            },
  { id: '6c3852ec-bf22-42a2-abdf-94a36d47bded', code: 'EN', label: 'Engine'              },
  { id: 'b83ef9c1-80ea-4f0e-8599-3b58cb5db42c', code: 'ES', label: 'Emergency Stop'      },
  { id: 'd17bab23-0857-42a1-bb96-552f21bdc7ba', code: 'EV', label: 'Expansion Valve'     },
  { id: 'a7c15393-0e18-484e-a117-e1b6d05c3b91', code: 'EX', label: 'Exhaust air'         },
  { id: 'ed0aaa90-fc87-4dcf-b6c1-3ea03cf761bd', code: 'FA', label: 'Fan'                 },
  { id: '9797d933-aae2-451e-a3a6-66cede783ecf', code: 'FU', label: 'Fuel'                },
  { id: '12a4ede3-95c2-419d-9c74-31afff735bee', code: 'GY', label: 'Glycol circuit'      },
  { id: 'e6b8c834-6d24-4878-bd92-0f2d5d51d62a', code: 'HW', label: 'Hot water'           },
  { id: '9084b164-e31a-4c9c-a783-8aeb38b39111', code: 'IL', label: 'Interlock - Hardwire'},
  { id: '986c7dad-2809-4f5e-99b4-cdaf9f1d3bd9', code: 'MA', label: 'Medical Air'         },
  { id: '1453de3d-2447-494b-b643-cab8c67e52b7', code: 'NI', label: 'Nitrogen'            },
  { id: 'ceb64207-303e-41fc-b085-cc51c7703f07', code: 'NO', label: 'Nitrogen Oxide'      },
  { id: '50082aae-9e95-48b8-9e71-18042d90c845', code: 'OA', label: 'Outside air'         },
  { id: 'a5377f5d-cc86-4e9e-92a5-aa8f99c71bec', code: 'OL', label: 'Oil'                 },
  { id: 'bcabd65f-f9ae-4a95-abac-9c22e35fcd25', code: 'OX', label: 'Oxygen'              },
  { id: 'd7c707fc-300e-46aa-a58a-9d31ca87e8a3', code: 'RA', label: 'Return air'          },
  { id: 'cde3b135-a9ea-4068-bc94-0c92e1b7802a', code: 'RF', label: 'Refrigerant'         },
  { id: '4f69de70-7943-4238-ac31-03b7db3a3eca', code: 'RM', label: 'Room'                },
  { id: 'b4ef0c57-1a39-4792-af05-518254679d43', code: 'RW', label: 'Return Water'        },
  { id: 'a0c8749f-ed52-4c00-afbc-a7744cf2365e', code: 'SA', label: 'Supply air'          },
  { id: 'c57dd755-88ce-48d8-a23a-a55366a55d79', code: 'SW', label: 'Supply Water'        },
  { id: '0987a0e7-a865-44d0-a077-73d547a17a25', code: 'WA', label: 'Water'               },
  { id: 'e1f7fd14-fd87-4688-b2c3-a5fb87be28b5', code: 'ZN', label: 'Zone / room'         },
];

// ─── QTY — sorted alphabetically by code ─────────────────────────────────────
export const seedQty: QtyEntry[] = [
  { id: 'a09ee73a-c4da-4a9a-bcca-e2a560f0db8c', code: 'ALM',  label: 'Alarm output',          ioType: 'DO' },
  { id: 'e7be0aeb-3bc4-41a5-8d5c-d1e9a115a90b', code: 'CO2',  label: 'CO2 level (ppm)',        ioType: 'AI' },
  { id: 'cf138d2d-e9ed-468c-bcee-12517835e7bb', code: 'CUR',  label: 'Current',                ioType: 'AI' },
  { id: 'e88ca8ed-0827-43d3-ab2a-73c04e8971c2', code: 'DMP',  label: 'Damper position',        ioType: 'AI' },
  { id: 'bc3058bc-f9c6-4f34-b4d5-63f2a11b7eec', code: 'DMO',  label: 'Damper Output',          ioType: 'AO' },
  { id: 'c4fdfd3d-a79b-4178-9e13-5b71cacceeb9', code: 'DPR',  label: 'Differential pressure',  ioType: 'AI' },
  { id: 'a0a5d60d-58d4-4d22-b1e1-4754fbb9dea8', code: 'ENB',  label: 'Enable command',         ioType: 'DO' },
  { id: 'fdfc3105-b1cf-41fd-afec-1c6ab65f8ba2', code: 'FIR',  label: 'Fire',                   ioType: 'DI' },
  { id: '5337c93a-e270-453f-8d21-7b6ac974c3e7', code: 'FLT',  label: 'Fault',                  ioType: 'DI' },
  { id: 'b716a442-c281-4d64-9674-cfebe2a60705', code: 'FLW',  label: 'Flow rate',               ioType: 'AI' },
  { id: 'dded79a5-4baa-40f7-b231-83baea8fb8e5', code: 'FSW',  label: 'Flow switch',             ioType: 'DI' },
  { id: 'dda3c1a0-49b2-4452-b4c6-62a98adf42e2', code: 'GLY',  label: 'Glycol concentration',   ioType: 'AI' },
  { id: '1caf097c-9ca3-43f0-9194-c00be7b209e6', code: 'HUM',  label: 'Humidity',               ioType: 'AI' },
  { id: '004a1eab-a91a-483f-b931-21346137603a', code: 'KVA',  label: 'Power Apparent',          ioType: 'AI' },
  { id: '96243a08-4073-4dd0-b198-2d01cef6bdd6', code: 'LSW',  label: 'Level Switch',            ioType: 'DI' },
  { id: 'ff12c6a3-b103-4e8f-b217-9266ffadbda5', code: 'LVL',  label: 'Level Sensor',            ioType: 'AI' },
  { id: 'fba62b81-3673-4de9-af0f-e89feb973373', code: 'OHS',  label: 'Overheat Stat',           ioType: 'DI' },
  { id: 'b2472189-5cf4-4659-9a50-fbee899e84a3', code: 'ONO',  label: 'On Off',                  ioType: 'AI' },
  { id: '263e3b6e-f6f6-4300-881b-8e7a6c1c1ec9', code: 'PCT',  label: 'Percentage output',       ioType: 'AO' },
  { id: '15d0ae8d-4071-4c8e-96ac-6b6114bf32e7', code: 'PRS',  label: 'Pressure Sensor',         ioType: 'AI' },
  { id: '247ffa0a-3757-417b-995a-8bca451d503b', code: 'PSW',  label: 'Pressure Switch',         ioType: 'AI' },
  { id: 'd5ac7b16-fa84-4a1f-9b66-7e2dd63fe956', code: 'PWA',  label: 'Power Active',            ioType: 'AI' },
  { id: '04fcfd26-e2d5-43e7-9c6d-8abdf7e9d390', code: 'PWF',  label: 'Power Factor',            ioType: 'AI' },
  { id: '0f7808e7-6722-41b6-a783-b49f5385cccd', code: 'PWR',  label: 'Power Reactive',          ioType: 'AI' },
  { id: 'dca80830-508d-4542-aef6-7c580d3c1a0c', code: 'RTMP', label: 'Return temperature',      ioType: 'AI' },
  { id: '3a3ffe57-a3db-479f-8bbb-5b88fd47af9f', code: 'RUN',  label: 'Running status',          ioType: 'DI' },
  { id: 'b81d165b-81c4-451f-917b-90a75f03e6b9', code: 'SPD',  label: 'Speed feedback',          ioType: 'AI' },
  { id: '123e375c-73b2-4a22-8d4d-1bc130c9ed5c', code: 'STMP', label: 'Supply temperature',      ioType: 'AI' },
  { id: '9fb8af46-0cc0-4ee5-b0f3-3787a1d3d656', code: 'STG',  label: 'Stage output',            ioType: 'DO' },
  { id: 'f28a5a8f-a46c-4a84-add1-77af876e96ef', code: 'STS',  label: 'Start Stop',              ioType: 'DO' },
  { id: '4d21af5c-7c1a-4a57-a431-01712dee885e', code: 'SWT',  label: 'Switch',                  ioType: 'AI' },
  { id: '7730cdef-20e7-4d8a-a38a-43acbc87df14', code: 'TMP',  label: 'Temperature',             ioType: 'AI' },
  { id: '585456f9-9c1d-41a1-9b83-1881d0f24ec3', code: 'VLN',  label: 'Voltage Line',            ioType: 'AI' },
  { id: '9a6bba0c-6b57-4382-a60e-3e57da09a2f7', code: 'VLV',  label: 'Valve position',          ioType: 'AO' },
  { id: '36fc12ab-3199-4489-bea4-cb15ff1f3cf0', code: 'VPH',  label: 'Voltage Phase',           ioType: 'AI' },
  { id: '22690972-17cb-4e48-b6bc-18fc83327800', code: 'VSD',  label: 'Drive speed ref',         ioType: 'AO' },
];

// ─── MOD — alphabetic first, numeric codes (1,2,3) at the end ─────────────────
export const seedMod: ModEntry[] = [
  { id: 'b1182562-6435-4a1f-aed3-ea75abd0f19a', code: 'B',   label: 'Bottom position'   },
  { id: 'ddf0e3b8-f3f0-4db0-b17d-164caac79c98', code: 'DP',  label: 'Differential'      },
  { id: '9879b168-827f-4ca2-b84f-8e3b801cf9a1', code: 'FB',  label: 'Feedback / actual' },
  { id: 'efcfdc0e-458e-4bc3-91b1-2287042aed7d', code: 'HI',  label: 'High'              },
  { id: '1219476b-439a-4845-93a1-447c3ed04cc6', code: 'HL',  label: 'High limit'        },
  { id: '5fba16d5-c65a-4c97-8f56-c114f628a302', code: 'IN',  label: 'Input'             },
  { id: '37e62057-0b6f-4980-b606-866d2201c1b8', code: 'LN1', label: 'Line L1'           },
  { id: 'dfdd44b4-4e07-4842-a8a3-fdf3ce801d89', code: 'LN2', label: 'Line L2'           },
  { id: '84ab1bc3-3cb7-4b77-82b1-229425fe3eb2', code: 'LN3', label: 'Line L3'           },
  { id: '33d7f2b6-9cda-4b63-a7a8-70d7a898032b', code: 'LO',  label: 'Low'              },
  { id: '3fa71a50-0307-4a3b-ac25-adce4ce4e70d', code: 'LL',  label: 'Low limit'         },
  { id: 'a5478c04-4178-4466-b16c-73fc4024e5df', code: 'M',   label: 'Middle position'   },
  { id: '8b5b0ab5-04cf-433b-9099-6917e4d5c343', code: 'OUT', label: 'Output'            },
  { id: '73acccea-450b-4b5b-8c43-2d303c5a122e', code: 'P12', label: 'Phase 1-2'         },
  { id: '62654d1c-d4d1-40da-8512-d05b72bd8421', code: 'P13', label: 'Phase 1-3'         },
  { id: '62734e7f-4b11-485e-bf0a-6ee322067efb', code: 'P23', label: 'Phase 2-3'         },
  { id: '4d5beca6-a847-426f-b6e4-e6567f25b8a2', code: 'SP',  label: 'Setpoint'          },
  { id: '2f17958e-9fed-4492-bd5c-1a9b9d830b80', code: 'T',   label: 'Top position'      },
  { id: 'bc193846-1620-4ba2-8544-933828db91ef', code: '1',   label: 'Step'              },
  { id: '0105cda9-50d0-487d-ae14-0708cf5495be', code: '2',   label: 'Step'              },
  { id: 'ac51130a-82e2-4343-81ac-be63d97f5b81', code: '3',   label: 'Step'              },
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
