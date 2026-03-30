import { useRef } from 'react';

const SECTIONS = [
  { id: 'dictionary',  label: 'Dictionary' },
  { id: 'assemblies',  label: 'Assemblies' },
  { id: 'builder',     label: 'Controller Builder' },
  { id: 'io',          label: 'I/O Counting' },
  { id: 'data',        label: 'Your Data' },
];

function Section({ id, title, intro, children }: {
  id: string; title: string; intro: string; children: React.ReactNode;
}) {
  return (
    <div id={id} className="rounded-xl border p-6 scroll-mt-24" style={{ background: '#fff', borderColor: '#D3D1C7' }}>
      <h2 className="font-bold text-base mb-2" style={{ color: '#2C2C2A' }}>{title}</h2>
      <p className="text-sm mb-4 leading-relaxed" style={{ color: '#555452' }}>{intro}</p>
      <div className="text-sm leading-relaxed space-y-3" style={{ color: '#555452' }}>
        {children}
      </div>
    </div>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="px-1.5 py-0.5 rounded text-xs font-mono font-bold"
      style={{ background: '#F1EFE8', color: '#2C2C2A' }}>{children}</code>
  );
}

function Badge({ color, children }: { color: 'green' | 'amber' | 'blue' | 'red'; children: React.ReactNode }) {
  const styles = {
    green: { background: '#E1F5EE', color: '#085041' },
    amber: { background: '#FAEEDA', color: '#854F0B' },
    blue:  { background: '#E8EFF8', color: '#1a3a6b' },
    red:   { background: '#FCEBEB', color: '#A32D2D' },
  };
  return (
    <span className="px-1.5 py-0.5 rounded text-xs font-mono font-bold" style={styles[color]}>{children}</span>
  );
}

export default function WikiTab() {
  const topRef = useRef<HTMLDivElement>(null);

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">

      <h1 className="text-2xl font-bold mb-1" style={{ color: '#2C2C2A' }}>How BMSHub Works</h1>
      <p className="text-sm mb-6" style={{ color: '#888780' }}>
        A quick guide to getting the most out of the tool.
      </p>

      {/* Sticky mini-nav */}
      <div ref={topRef} className="sticky top-14 z-10 flex flex-wrap gap-2 mb-6 py-2 px-3 rounded-lg border"
        style={{ background: '#F1EFE8', borderColor: '#D3D1C7' }}>
        {SECTIONS.map(s => (
          <button key={s.id} onClick={() => scrollTo(s.id)}
            className="text-xs px-3 py-1 rounded font-medium hover:opacity-80 transition-opacity"
            style={{ background: '#2C2C2A', color: '#F1EFE8' }}>
            {s.label}
          </button>
        ))}
      </div>

      <div className="space-y-6">

        {/* ── 1. Dictionary ── */}
        <Section id="dictionary" title="1 · The Dictionary"
          intro="Think of the Dictionary as the vocabulary of your BMS. Before you can name a single point, you define the building blocks — and everything flows from there.">
          <p>
            BMSHub uses a four-level hierarchy to build every tag name:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs mt-2 mb-2">
              <thead>
                <tr style={{ background: '#F1EFE8' }}>
                  <th className="text-left px-3 py-2 font-semibold">Level</th>
                  <th className="text-left px-3 py-2 font-semibold">Meaning</th>
                  <th className="text-left px-3 py-2 font-semibold">Example</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['EQUIP', 'Equipment type', 'AHU, CWP, CHR'],
                  ['NUM',   'Instance number', '1, 2, 3 …'],
                  ['MED',   'Medium (what flows)', 'CW, HW, SA, FA'],
                  ['QTY',   'Quantity (what is measured)', 'TMP, FSW, VLV'],
                  ['MOD',   'Modifier (which one)', 'IN, OUT, SP, FB'],
                ].map(([lvl, meaning, ex]) => (
                  <tr key={lvl} className="border-t" style={{ borderColor: '#F1EFE8' }}>
                    <td className="px-3 py-1.5"><Code>{lvl}</Code></td>
                    <td className="px-3 py-1.5">{meaning}</td>
                    <td className="px-3 py-1.5 font-mono text-xs" style={{ color: '#888780' }}>{ex}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            A finished tag looks like <Code>AHU1SATMPSP</Code> — Air Handling Unit 1,
            Supply Air, Temperature, Setpoint.
          </p>
          <p>
            <strong style={{ color: '#2C2C2A' }}>Semantic Filter</strong> — In the Dictionary tab, three
            tables control what combinations are valid: which media are allowed per equipment type, which
            quantities are allowed per medium, and which modifiers are valid per quantity. The Controller
            Builder uses these rules to grey out or hide invalid options, so your team can't accidentally
            create a nonsense tag.
          </p>
        </Section>

        {/* ── 2. Assemblies ── */}
        <Section id="assemblies" title="2 · Assemblies"
          intro="An assembly is a template — a standard set of points for a piece of equipment. Build it once, apply it to as many controllers as you need.">
          <p>
            Go to the <strong style={{ color: '#2C2C2A' }}>Assemblies</strong> tab and click
            <strong style={{ color: '#2C2C2A' }}> + New Assembly</strong>. Choose the equipment type,
            give it a name, and add each point as a MED + QTY + MOD combination. The tag preview updates
            live as you type.
          </p>
          <p>
            <strong style={{ color: '#2C2C2A' }}>Cloning</strong> — Got a Chilled Water Pump assembly and
            need a Hot Water Pump? Hit <strong style={{ color: '#2C2C2A' }}>Clone</strong>, pick the new
            equipment type, and you get a copy ready to tweak. All the points transfer; just adjust what
            doesn't apply.
          </p>
          <p>
            <strong style={{ color: '#2C2C2A' }}>AV and BV points</strong> — Not every point is a wire.
            Setpoints, calculated values, and software alarms live inside the controller as
            <em> Analogue Values</em> (AV) or <em>Binary Values</em> (BV). Mark a point as
            {' '}<Badge color="blue">AV</Badge> or <Badge color="blue">BV</Badge> in the assembly
            and BMSHub will include it in your simulator export but exclude it from the physical I/O
            count — because there's nothing to wire to it.
          </p>
        </Section>

        {/* ── 3. Controller Builder ── */}
        <Section id="builder" title="3 · Controller Builder"
          intro="The Controller Builder is where your design becomes a real I/O schedule. Create a controller, apply assemblies, tick off the devices you're supplying, and let BMSHub do the counting.">
          <p>
            <strong style={{ color: '#2C2C2A' }}>Creating a controller</strong> — Click
            <strong style={{ color: '#2C2C2A' }}> + New Controller</strong>, give it a label (e.g.
            <Code>PACOFS-AHU1</Code>), an area (e.g. <Code>Ground Floor Plant Room</Code>), and
            set the number of <em>Duplicates</em> if this controller group is repeated across floors
            or units. Duplicates only affect the project-total BOQ — the per-controller schedule always
            shows one set.
          </p>
          <p>
            <strong style={{ color: '#2C2C2A' }}>Applying assemblies</strong> — Click
            <strong style={{ color: '#2C2C2A' }}> Apply Assembly</strong>, choose the template, and
            pick the instance number. If you apply the same assembly twice BMSHub automatically
            suggests the next available number (CWP1 → CWP2 → CWP3).
          </p>
          <p>
            <strong style={{ color: '#2C2C2A' }}>Ticking field devices</strong> — Each point has a
            <em> Supply</em> checkbox. Tick it when you are supplying the sensor or actuator — this is
            what appears in your BOQ export. For each ticked device you can also set the signal type
            (<Code>0–10V</Code>, <Code>4–20mA</Code>, <Code>PT100</Code> etc.) and quantity.
          </p>
          <p>
            <strong style={{ color: '#2C2C2A' }}>Hardware</strong> — Assign a controller model from
            the Hardware Library, then add expansion modules as needed. BMSHub totals the available
            I/O and compares it to what your points require.
          </p>
        </Section>

        {/* ── 4. I/O Counting ── */}
        <Section id="io" title="4 · I/O Counting"
          intro="No more counting rows in a spreadsheet. BMSHub tracks your physical I/O automatically and tells you exactly where you stand.">
          <p>
            Every QTY code in the Dictionary carries an I/O type:
          </p>
          <div className="flex flex-wrap gap-2 my-2">
            <span><Badge color="green">AI</Badge> Analogue Input — sensors (temperature, pressure, humidity)</span>
            <span><Badge color="amber">AO</Badge> Analogue Output — actuators, VSDs, valves</span>
            <span><Badge color="red">DI</Badge> Digital Input — switches, flow switches, stats</span>
            <span><Badge color="blue">DO</Badge> Digital Output — relays, contactors, enable signals</span>
          </div>
          <p>
            <Badge color="blue">AV</Badge> RS-485 / network points and <Badge color="blue">BV</Badge> binary
            software values (e.g. software alarms, enable flags) are counted separately and never
            appear in the physical I/O total.
          </p>
          <p>
            Once you assign a <strong style={{ color: '#2C2C2A' }}>controller model</strong>, BMSHub
            shows the available I/O for that model. Add
            <strong style={{ color: '#2C2C2A' }}> expansion modules</strong> to increase capacity.
            A <span style={{ color: '#1D9E75', fontWeight: 600 }}>green</span> status means you have
            enough I/O; a <span style={{ color: '#E24B4A', fontWeight: 600 }}>red</span> status means
            you are short on one or more types — add an expansion module or split into two controllers.
          </p>
        </Section>

        {/* ── 5. Your Data ── */}
        <Section id="data" title="5 · Your Data"
          intro="There is no server, no login, and no subscription. Your data lives entirely in your browser — private by design.">
          <p>
            BMSHub stores everything in your browser's <strong style={{ color: '#2C2C2A' }}>localStorage</strong>.
            Your projects, dictionary customisations, assemblies and controllers never leave your machine.
          </p>
          <p>
            <strong style={{ color: '#2C2C2A' }}>Export early, export often</strong> — localStorage is
            tied to one browser on one device. If you clear your browser data, or want to move to another
            machine, use the <strong style={{ color: '#2C2C2A' }}>Export</strong> tab to save a JSON file
            first. The <strong style={{ color: '#2C2C2A' }}>Import</strong> option on the same tab loads
            it back — on any device, any browser.
          </p>
          <p>
            <strong style={{ color: '#2C2C2A' }}>Sharing a starter pack</strong> — Export your configured
            dictionary and assemblies and share the JSON with a colleague. They import it once and are
            immediately working with your naming conventions — no setup required.
          </p>
        </Section>

      </div>

      <p className="text-xs text-center mt-8" style={{ color: '#888780' }}>
        Something unclear or missing? Open an issue on{' '}
        <a href="https://github.com/koosjr/bmshub" target="_blank" rel="noreferrer" className="underline">
          github.com/koosjr/bmshub
        </a>
      </p>
    </div>
  );
}
