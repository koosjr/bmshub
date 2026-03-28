# BMSHub Naming Convention Manager

A single-page application for managing BMS variable naming conventions following the positional pattern:
`[EQUIP][NUM][MED][QTY][MOD]`

## Development

```bash
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

## Build

```bash
npm run build
```

Output is placed in the `dist/` directory.

## Deployment

Copy the contents of `dist/` to any static web host.

### bmshub.co.za

Upload the contents of `dist/` to the web root of the hosting account.

## Data Storage

All data is stored in the browser's `localStorage`. Use the **Export** tab to back up or transfer data as JSON.
