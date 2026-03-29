import { v4 as uuidv4 } from 'uuid';
import type { EquipEntry, MedEntry, QtyEntry, ModEntry, SemanticConfig, Controller, Assembly, ControllerModel, ExpansionModule, Project } from './types';

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
  { id: uuidv4(),                               code: 'FD',   label: 'Filter Dirty',          ioType: 'DI' },
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

// ─── SEMANTIC FILTER TABLES ───────────────────────────────────────────────────
// Three independent lookup tables — edit each one separately.
// Adding new equipment: add one line to seedEquipMeds only.
// '' in a list means "no medium / no modifier" is also valid.

// ── Table 1: QTY → valid MODs ─────────────────────────────────────────────────
export const seedQtyMods: Record<string, string[]> = {
  // Analogue measurements
  TMP:  ['', 'SP', 'HI', 'LO', 'HL', 'LL', 'DP', 'FB', 'T', 'M', 'B', 'IN', 'OUT'],
  STMP: ['', 'SP', 'HI', 'LO'],
  RTMP: ['', 'SP', 'HI', 'LO'],
  PRS:  ['', 'SP', 'HI', 'LO', 'HL', 'LL', 'DP', 'FB', 'IN', 'OUT'],
  DPR:  ['', 'SP', 'HI', 'LO', 'DP'],
  FLW:  ['', 'SP', 'HI', 'LO'],
  LVL:  ['', 'SP', 'HI', 'LO', 'HL', 'LL'],
  HUM:  ['', 'SP', 'HI', 'LO'],
  CO2:  ['', 'SP', 'HI', 'LO'],
  GLY:  [''],
  SPD:  ['', 'SP', 'FB'],
  // Switch / status — no modifier needed
  FSW:  [''],
  PSW:  ['', 'HL', 'LL'],
  LSW:  ['', 'HL', 'LL'],
  FD:   ['', '1', '2', '3'],
  OHS:  [''],
  SWT:  [''],
  FIR:  [''],
  STS:  [''],
  FLT:  [''],
  RUN:  [''],
  ENB:  [''],
  ALM:  [''],
  ONO:  [''],
  STG:  ['1', '2', '3'],
  // Drive / actuator outputs
  VSD:  ['', 'SP', 'FB'],
  PCT:  ['', 'SP', 'FB'],
  VLV:  ['', 'SP', 'FB'],
  DMP:  ['', 'SP', 'FB'],
  DMO:  [''],
  // Electrical measurements
  CUR:  ['', 'LN1', 'LN2', 'LN3'],
  VLN:  ['', 'LN1', 'LN2', 'LN3'],
  VPH:  ['', 'P12', 'P13', 'P23'],
  PWA:  ['', 'HI', 'LO'],
  PWF:  [''],
  PWR:  [''],
  KVA:  [''],
};

// ── Table 2: MED → valid QTYs ─────────────────────────────────────────────────
export const seedMedQtys: Record<string, string[]> = {
  // No medium — generic equipment-level status & control points
  '':  ['STS', 'FLT', 'RUN', 'ALM', 'FIR', 'SWT', 'VSD', 'SPD', 'PCT', 'ENB', 'STG', 'OHS', 'ONO'],
  // Air streams
  FA:  ['STS', 'FLT', 'RUN', 'VSD', 'SPD', 'DPR', 'FSW', 'FD', 'TMP', 'HUM', 'CO2', 'PCT', 'ENB', 'FLW'],
  SA:  ['TMP', 'DPR', 'HUM', 'CO2', 'FSW', 'FD', 'FLW', 'VSD', 'SPD', 'STS'],
  RA:  ['TMP', 'HUM', 'CO2', 'DPR'],
  OA:  ['TMP', 'HUM', 'DMP', 'DMO', 'DPR'],
  EX:  ['STS', 'FLT', 'RUN', 'VSD', 'SPD', 'DPR', 'TMP', 'PCT', 'ENB', 'FLW'],
  RM:  ['TMP', 'HUM', 'CO2'],
  ZN:  ['TMP', 'HUM', 'CO2'],
  // Hydronic circuits
  CW:  ['TMP', 'STMP', 'RTMP', 'PRS', 'DPR', 'FSW', 'FLW', 'VLV', 'DMP', 'DMO', 'GLY'],
  HW:  ['TMP', 'STMP', 'RTMP', 'PRS', 'DPR', 'FSW', 'FLW', 'VLV', 'DMP', 'DMO'],
  CO:  ['TMP', 'STMP', 'RTMP', 'PRS', 'DPR', 'FSW', 'FLW', 'VLV', 'DMO'],
  GY:  ['TMP', 'PRS', 'FSW', 'FLW', 'GLY'],
  WA:  ['TMP', 'PRS', 'FSW', 'FLW', 'LVL', 'LSW', 'VLV'],
  RW:  ['TMP', 'PRS', 'FSW', 'FLW'],
  SW:  ['TMP', 'STMP', 'RTMP', 'PRS', 'FSW', 'FLW', 'SWT'],
  // Refrigerant / HVAC
  RF:  ['TMP', 'PRS', 'PSW', 'LVL', 'LSW', 'STS', 'FLT'],
  EV:  ['TMP', 'PRS', 'VLV', 'DMO', 'STS'],
  DF:  ['SWT', 'TMP', 'STS'],
  CP:  ['TMP', 'PRS', 'PSW', 'STS', 'FLT', 'RUN', 'OHS'],
  // Medical / lab gases — GSB only
  MA:  ['PRS', 'PSW', 'FLW', 'FSW', 'ALM', 'LVL', 'LSW'],
  OX:  ['PRS', 'PSW', 'FLW', 'FSW', 'ALM', 'LVL', 'LSW'],
  NI:  ['PRS', 'PSW', 'FLW', 'FSW', 'ALM', 'LVL', 'LSW'],
  NO:  ['PRS', 'PSW', 'FLW', 'FSW', 'ALM', 'LVL', 'LSW'],
  AR:  ['PRS', 'PSW', 'FLW', 'FSW', 'ALM', 'LVL', 'LSW'],
  // Electrical
  EL:  ['CUR', 'PWA', 'PWF', 'PWR', 'KVA', 'VLN', 'VPH', 'STS', 'FLT', 'ALM', 'SWT'],
  EN:  ['TMP', 'PRS', 'RUN', 'FLT', 'OHS', 'SPD'],
  // Fuel / oil / liquids
  FU:  ['LVL', 'LSW', 'FLW', 'FSW', 'TMP', 'PRS', 'ALM'],
  OL:  ['TMP', 'PRS', 'LVL', 'LSW'],
  // Interlock / alarm / emergency
  AL:  ['STS', 'ALM'],
  ES:  ['SWT', 'STS'],
  IL:  ['SWT'],
};

// ── Table 3: EQUIP → valid MEDs ───────────────────────────────────────────────
// To add new equipment: append one line here. Tables 1 & 2 handle the rest.
export const seedEquipMeds: Record<string, string[]> = {
  ACP: ['EL', 'AR', ''],
  AHU: ['FA', 'SA', 'RA', 'OA', 'EX', 'CW', 'HW', 'SW', 'IL', ''],
  AUT: ['SW', 'EL', ''],
  BSC: ['FU', 'SW', 'EL', ''],
  BSD: ['FU', 'OL', 'SW', 'EL', ''],
  BSE: ['EL', 'SW', ''],
  BSG: ['FU', 'SW', 'EL', ''],
  BSR: ['EL', 'SW', ''],
  BWC: ['FU', 'HW', 'EL', ''],
  BWD: ['FU', 'OL', 'HW', 'EL', ''],
  BWE: ['EL', 'HW', ''],
  BWG: ['FU', 'HW', 'EL', ''],
  BWR: ['EL', 'HW', ''],
  CHR: ['CW', 'CO', 'EV', 'RF', 'EL', 'GY', ''],
  CTW: ['CO', 'OA', ''],
  CWP: ['CW', ''],
  ECF: ['FA', 'SA', 'EX', ''],
  EXF: ['EX', 'FA', ''],
  FCU: ['CW', 'HW', 'SA', 'RA', 'ZN', 'EL', ''],
  FMH: ['EX', 'FA', ''],
  GEN: ['EL', 'FU', 'EN', 'OL', ''],
  GSB: ['MA', 'OX', 'NI', 'NO', 'AR', 'FU', ''],
  HEX: ['CW', 'HW', 'CO', 'GY', ''],
  HWP: ['HW', ''],
  ILH: ['HW', 'EL', ''],
  LFC: ['CW', 'HW', 'SA', 'RA', ''],
  MAU: ['FA', 'SA', 'OA', 'RA', 'CW', 'HW', ''],
  PMP: ['CW', 'HW', 'WA', 'CO', 'GY', ''],
  RCR: ['RF', 'CP', 'EL', 'OL', ''],
  RFR: ['RF', 'CP', 'EL', 'OL', 'DF', ''],
  SAF: ['FA', 'SA', ''],
  SXF: ['EX', 'FA', ''],
  SYS: ['CW', 'HW', 'CO', 'GY', 'EL', 'WA', ''],
  TNK: ['CW', 'HW', 'WA', 'CO', 'FU', 'OL', ''],
  VAC: ['AR', 'EL', ''],
  VFD: ['EL', ''],
  VRV: ['RF', 'SA', 'RA', 'ZN', ''],
};

// Combined config assembled from the three tables above
export const seedSemanticConfig: SemanticConfig = {
  equipMeds: seedEquipMeds,
  medQtys:   seedMedQtys,
  qtyMods:   seedQtyMods,
};

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

  // ── Pumps ──────────────────────────────────────────────────────────────────

  {
    id: uuidv4(),
    name: 'Condenser Water Pump — VSD',
    equipCode: 'PMP',
    description: 'Condenser water pump with variable speed drive, supply and return pressure',
    points: [
      { id: uuidv4(), med: 'CO', qty: 'FSW',  mod: '' },
      { id: uuidv4(), med: 'CO', qty: 'PRS',  mod: 'IN'  },
      { id: uuidv4(), med: 'CO', qty: 'PRS',  mod: 'OUT' },
      { id: uuidv4(), med: '',   qty: 'VSD',  mod: '' },
      { id: uuidv4(), med: '',   qty: 'STS',  mod: '' },
      { id: uuidv4(), med: '',   qty: 'FLT',  mod: '' },
    ],
  },
  {
    id: uuidv4(),
    name: 'Condenser Water Pump',
    equipCode: 'PMP',
    description: 'Condenser water pump — direct on line, flow switch and fault monitoring',
    points: [
      { id: uuidv4(), med: 'CO', qty: 'FSW', mod: '' },
      { id: uuidv4(), med: '',   qty: 'STS', mod: '' },
      { id: uuidv4(), med: '',   qty: 'FLT', mod: '' },
    ],
  },
  {
    id: uuidv4(),
    name: 'Chilled Water Pump — VSD',
    equipCode: 'CWP',
    description: 'Chilled water pump with variable speed drive, supply and return pressure',
    points: [
      { id: uuidv4(), med: 'CW', qty: 'FSW',  mod: '' },
      { id: uuidv4(), med: 'CW', qty: 'PRS',  mod: 'IN'  },
      { id: uuidv4(), med: 'CW', qty: 'PRS',  mod: 'OUT' },
      { id: uuidv4(), med: '',   qty: 'VSD',  mod: '' },
      { id: uuidv4(), med: '',   qty: 'STS',  mod: '' },
      { id: uuidv4(), med: '',   qty: 'FLT',  mod: '' },
    ],
  },
  {
    id: uuidv4(),
    name: 'Chilled Water Pump',
    equipCode: 'CWP',
    description: 'Chilled water pump — direct on line, flow switch and fault monitoring',
    points: [
      { id: uuidv4(), med: 'CW', qty: 'FSW', mod: '' },
      { id: uuidv4(), med: '',   qty: 'STS', mod: '' },
      { id: uuidv4(), med: '',   qty: 'FLT', mod: '' },
    ],
  },
  {
    id: uuidv4(),
    name: 'Hot Water Pump — VSD',
    equipCode: 'HWP',
    description: 'Hot water pump with variable speed drive, supply and return pressure',
    points: [
      { id: uuidv4(), med: 'HW', qty: 'FSW',  mod: '' },
      { id: uuidv4(), med: 'HW', qty: 'PRS',  mod: 'IN'  },
      { id: uuidv4(), med: 'HW', qty: 'PRS',  mod: 'OUT' },
      { id: uuidv4(), med: '',   qty: 'VSD',  mod: '' },
      { id: uuidv4(), med: '',   qty: 'STS',  mod: '' },
      { id: uuidv4(), med: '',   qty: 'FLT',  mod: '' },
    ],
  },
  {
    id: uuidv4(),
    name: 'Hot Water Pump',
    equipCode: 'HWP',
    description: 'Hot water pump — direct on line, flow switch and fault monitoring',
    points: [
      { id: uuidv4(), med: 'HW', qty: 'FSW', mod: '' },
      { id: uuidv4(), med: '',   qty: 'STS', mod: '' },
      { id: uuidv4(), med: '',   qty: 'FLT', mod: '' },
    ],
  },

  // ── Chiller ────────────────────────────────────────────────────────────────

  {
    id: uuidv4(),
    name: 'Chiller — Full',
    equipCode: 'CHR',
    description: 'Full chiller monitoring — chilled and condenser water temperatures, flow switches and differential pressure',
    points: [
      { id: uuidv4(), med: '',   qty: 'STS',  mod: '' },
      { id: uuidv4(), med: '',   qty: 'FLT',  mod: '' },
      { id: uuidv4(), med: '',   qty: 'ALM',  mod: '' },
      { id: uuidv4(), med: 'CW', qty: 'STMP', mod: '' },
      { id: uuidv4(), med: 'CW', qty: 'RTMP', mod: '' },
      { id: uuidv4(), med: 'CO', qty: 'STMP', mod: '' },
      { id: uuidv4(), med: 'CO', qty: 'RTMP', mod: '' },
      { id: uuidv4(), med: 'CW', qty: 'DPR',  mod: '' },
      { id: uuidv4(), med: 'CW', qty: 'FSW',  mod: '' },
      { id: uuidv4(), med: 'CO', qty: 'FSW',  mod: '' },
    ],
  },

  // ── Cooling Tower ──────────────────────────────────────────────────────────

  {
    id: uuidv4(),
    name: 'Cooling Tower',
    equipCode: 'CTW',
    description: 'Cooling tower with VSD fan, condenser water supply and return temperatures, make-up valve',
    points: [
      { id: uuidv4(), med: 'CO', qty: 'STMP', mod: '' },
      { id: uuidv4(), med: 'CO', qty: 'RTMP', mod: '' },
      { id: uuidv4(), med: 'CO', qty: 'VLV',  mod: '' },
      { id: uuidv4(), med: 'CO', qty: 'DMP',  mod: '' },
      { id: uuidv4(), med: 'FA', qty: 'VSD',  mod: '' },
      { id: uuidv4(), med: '',   qty: 'STS',  mod: '' },
      { id: uuidv4(), med: '',   qty: 'FLT',  mod: '' },
      { id: uuidv4(), med: '',   qty: 'SWT',  mod: '' },
    ],
  },

  // ── Air Handling Units ─────────────────────────────────────────────────────

  {
    id: uuidv4(),
    name: 'AHU — Hydronic 4-pipe, All Wired',
    equipCode: 'AHU',
    description: 'Full AHU with 4-pipe hydronic coils, all sensors and actuators hardwired. Supply/return air temps, CO2, duct static, flow switch, 3× filter DPs, cooling and heating valves with position feedback, fresh air damper, fire alarm.',
    points: [
      { id: uuidv4(), med: 'FA', qty: 'VSD',  mod: '' },
      { id: uuidv4(), med: 'FA', qty: 'STS',  mod: '' },
      { id: uuidv4(), med: 'FA', qty: 'FLT',  mod: '' },
      { id: uuidv4(), med: '',   qty: 'SWT',  mod: '' },
      { id: uuidv4(), med: 'SA', qty: 'TMP',  mod: '' },
      { id: uuidv4(), med: 'RA', qty: 'TMP',  mod: '' },
      { id: uuidv4(), med: 'SW', qty: 'TMP',  mod: '' },
      { id: uuidv4(), med: 'RA', qty: 'CO2',  mod: '' },
      { id: uuidv4(), med: 'SA', qty: 'DPR',  mod: '' },
      { id: uuidv4(), med: 'SA', qty: 'FSW',  mod: '' },
      { id: uuidv4(), med: 'SA', qty: 'DPR',  mod: '1' },
      { id: uuidv4(), med: 'SA', qty: 'DPR',  mod: '2' },
      { id: uuidv4(), med: 'SA', qty: 'DPR',  mod: '3' },
      { id: uuidv4(), med: 'CW', qty: 'VLV',  mod: '' },
      { id: uuidv4(), med: 'CW', qty: 'DMP',  mod: '' },
      { id: uuidv4(), med: 'HW', qty: 'VLV',  mod: '' },
      { id: uuidv4(), med: 'HW', qty: 'DMP',  mod: '' },
      { id: uuidv4(), med: 'OA', qty: 'DMO',  mod: '' },
      { id: uuidv4(), med: 'OA', qty: 'DMP',  mod: '' },
      { id: uuidv4(), med: '',   qty: 'FIR',  mod: '' },
      { id: uuidv4(), med: 'FA', qty: 'VSD',  mod: '', ioOverride: 'AV' },
    ],
  },
  {
    id: uuidv4(),
    name: 'AHU — Hydronic 4-pipe, Communicative',
    equipCode: 'AHU',
    description: 'AHU with 4-pipe hydronic coils. Cooling valve, heating valve and RA sensor communicative via RS-485. EC fan motor via RS-485.',
    points: [
      { id: uuidv4(), med: 'FA', qty: 'VSD',  mod: '' },
      { id: uuidv4(), med: 'FA', qty: 'STS',  mod: '' },
      { id: uuidv4(), med: 'FA', qty: 'FLT',  mod: '' },
      { id: uuidv4(), med: '',   qty: 'SWT',  mod: '' },
      { id: uuidv4(), med: 'SA', qty: 'TMP',  mod: '' },
      { id: uuidv4(), med: 'SA', qty: 'DPR',  mod: '' },
      { id: uuidv4(), med: 'SA', qty: 'FSW',  mod: '' },
      { id: uuidv4(), med: 'SA', qty: 'DPR',  mod: '1' },
      { id: uuidv4(), med: 'SA', qty: 'DPR',  mod: '2' },
      { id: uuidv4(), med: 'CW', qty: 'VLV',  mod: '' },
      { id: uuidv4(), med: '',   qty: 'FIR',  mod: '' },
      { id: uuidv4(), med: 'CW', qty: 'PWA',  mod: '', ioOverride: 'AV' },
      { id: uuidv4(), med: 'HW', qty: 'PWA',  mod: '', ioOverride: 'AV' },
      { id: uuidv4(), med: 'RA', qty: 'TMP',  mod: '', ioOverride: 'AV' },
      { id: uuidv4(), med: 'FA', qty: 'VSD',  mod: '', ioOverride: 'AV' },
    ],
  },

  // ── Fan Coil Units ─────────────────────────────────────────────────────────

  {
    id: uuidv4(),
    name: 'FCU — Hydronic 2-pipe, Changeover',
    equipCode: 'FCU',
    description: '2-pipe fan coil unit with modulating changeover valve. Single water valve serves heating and cooling based on system mode.',
    points: [
      { id: uuidv4(), med: 'FA', qty: 'FLT',  mod: '' },
      { id: uuidv4(), med: 'SA', qty: 'FSW',  mod: '' },
      { id: uuidv4(), med: 'SA', qty: 'DPR',  mod: '' },
      { id: uuidv4(), med: 'ZN', qty: 'TMP',  mod: '' },
      { id: uuidv4(), med: 'WA', qty: 'VLV',  mod: '' },
      { id: uuidv4(), med: '',   qty: 'OHS',  mod: '' },
      { id: uuidv4(), med: '',   qty: 'FIR',  mod: '' },
    ],
  },
  {
    id: uuidv4(),
    name: 'FCU — Hydronic 2-pipe, Modulating + Electric Heat',
    equipCode: 'FCU',
    description: '2-pipe FCU with modulating changeover valve and 2-stage electric heating element.',
    points: [
      { id: uuidv4(), med: 'FA', qty: 'FLT',  mod: '' },
      { id: uuidv4(), med: 'SA', qty: 'FSW',  mod: '' },
      { id: uuidv4(), med: 'SA', qty: 'DPR',  mod: '' },
      { id: uuidv4(), med: 'ZN', qty: 'TMP',  mod: '' },
      { id: uuidv4(), med: 'WA', qty: 'VLV',  mod: '' },
      { id: uuidv4(), med: 'EL', qty: 'STG',  mod: '1' },
      { id: uuidv4(), med: 'EL', qty: 'STG',  mod: '2' },
      { id: uuidv4(), med: '',   qty: 'OHS',  mod: '' },
      { id: uuidv4(), med: '',   qty: 'FIR',  mod: '' },
    ],
  },
  {
    id: uuidv4(),
    name: 'FCU — Hydronic 4-pipe, Modulating',
    equipCode: 'FCU',
    description: '4-pipe fan coil unit with independent modulating cooling and heating valves with position feedback.',
    points: [
      { id: uuidv4(), med: 'FA', qty: 'FLT',  mod: '' },
      { id: uuidv4(), med: 'SA', qty: 'FSW',  mod: '' },
      { id: uuidv4(), med: 'SA', qty: 'DPR',  mod: '' },
      { id: uuidv4(), med: 'ZN', qty: 'TMP',  mod: '' },
      { id: uuidv4(), med: 'CW', qty: 'VLV',  mod: '' },
      { id: uuidv4(), med: 'CW', qty: 'DMP',  mod: '' },
      { id: uuidv4(), med: 'HW', qty: 'VLV',  mod: '' },
      { id: uuidv4(), med: 'HW', qty: 'DMP',  mod: '' },
      { id: uuidv4(), med: '',   qty: 'FIR',  mod: '' },
    ],
  },

  // ── Inline Heater ──────────────────────────────────────────────────────────

  {
    id: uuidv4(),
    name: 'Inline Heater — Water, 3-Stage',
    equipCode: 'ILH',
    description: '3-stage inline electric heater with water flow protection and supply/return temperatures',
    points: [
      { id: uuidv4(), med: 'HW', qty: 'FSW',  mod: '' },
      { id: uuidv4(), med: 'HW', qty: 'TMP',  mod: 'IN'  },
      { id: uuidv4(), med: 'HW', qty: 'TMP',  mod: 'OUT' },
      { id: uuidv4(), med: 'EL', qty: 'STG',  mod: '1' },
      { id: uuidv4(), med: 'EL', qty: 'STG',  mod: '2' },
      { id: uuidv4(), med: 'EL', qty: 'STG',  mod: '3' },
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
    id: 'eliwell-fa6200',
    name: 'Eliwell Free Advance 6200',
    description: 'Small plant room controller — 2× RS-485',
    io: { ai: 8, ao: 2, di: 2, do: 6 },
  },
  {
    id: 'eliwell-fa8400',
    name: 'Eliwell Free Advance 8400',
    description: 'Medium plant room controller — 2× RS-485',
    io: { ai: 8, ao: 4, di: 8, do: 8 },
  },
  {
    id: 'eliwell-fa12600',
    name: 'Eliwell Free Advance 12600',
    description: 'Large plant room controller — 2× RS-485',
    io: { ai: 12, ao: 6, di: 12, do: 12 },
  },
  {
    id: 'isma-aac20',
    name: 'ISMA AAC20',
    description: 'BACnet/IP DDC controller — RS-485, Dali, M-Bus, 2× LAN',
    io: { ai: 8, ao: 4, di: 4, do: 4 },
  },
];

// ─── SEED EXPANSION MODULES ───────────────────────────────────────────────────
export const seedExpansionModules: ExpansionModule[] = [
  // ── Eliwell EVE series (RS-485 bus, pairs with Free Advance controllers) ──
  {
    id: 'eve-6000',
    name: 'EVE6000',
    description: 'Eliwell EVE — AI4, DI2, DO6',
    io: { ai: 4, ao: 0, di: 2, do: 6 },
  },
  {
    id: 'eve-10200',
    name: 'EVE10200',
    description: 'Eliwell EVE — AI10, AO10, DI6, DO10',
    io: { ai: 10, ao: 10, di: 6, do: 10 },
  },
  {
    id: 'eve-4200',
    name: 'EVE4200',
    description: 'Eliwell EVE — AI6, AO5, DI8, DO7',
    io: { ai: 6, ao: 5, di: 8, do: 7 },
  },
  {
    id: 'eve-7500',
    name: 'EVE7500',
    description: 'Eliwell EVE — AI4, AO2, DI4, DO4',
    io: { ai: 4, ao: 2, di: 4, do: 4 },
  },
  // ── iSMA-B series (RS-485 bus, pairs with ISMA AAC20 controller) ──
  {
    id: 'isma-b-8i',
    name: 'iSMA-B-8I',
    description: 'iSMA expansion — DI8',
    io: { ai: 0, ao: 0, di: 8, do: 0 },
  },
  {
    id: 'isma-b-8u',
    name: 'iSMA-B-8U',
    description: 'iSMA expansion — AI8 (universal)',
    io: { ai: 8, ao: 0, di: 0, do: 0 },
  },
  {
    id: 'isma-b-4i4o-h',
    name: 'iSMA-B-4I4O-H',
    description: 'iSMA expansion — DI4, DO4',
    io: { ai: 0, ao: 0, di: 4, do: 4 },
  },
  {
    id: 'isma-b-4u4o-h',
    name: 'iSMA-B-4U4O-H',
    description: 'iSMA expansion — AI4 (universal), DO4',
    io: { ai: 4, ao: 0, di: 0, do: 4 },
  },
  {
    id: 'isma-b-4u4a-h',
    name: 'iSMA-B-4U4A-H',
    description: 'iSMA expansion — AI4 (universal), AO4',
    io: { ai: 4, ao: 4, di: 0, do: 0 },
  },
  {
    id: 'isma-b-mix18',
    name: 'iSMA-B-MIX18',
    description: 'iSMA expansion — AI5, AO4, DI5, DO4',
    io: { ai: 5, ao: 4, di: 5, do: 4 },
  },
  {
    id: 'isma-b-mix38',
    name: 'iSMA-B-MIX38',
    description: 'iSMA expansion — AI8, AO6, DI12, DO12',
    io: { ai: 8, ao: 6, di: 12, do: 12 },
  },
  {
    id: 'isma-b-mix18-ip',
    name: 'iSMA-B-MIX18-IP',
    description: 'iSMA expansion — AI5, AO4, DI5, DO4 + LAN',
    io: { ai: 5, ao: 4, di: 5, do: 4 },
  },
  {
    id: 'isma-b-mix38-ip',
    name: 'iSMA-B-MIX38-IP',
    description: 'iSMA expansion — AI8, AO6, DI12, DO12 + LAN',
    io: { ai: 8, ao: 6, di: 12, do: 12 },
  },
];
