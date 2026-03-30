export default function AboutTab() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10 space-y-8">

      {/* Intro */}
      <div>
        <h1 className="text-2xl font-bold mb-3" style={{ color: '#2C2C2A' }}>About BMSHub</h1>
        <p className="text-sm leading-relaxed" style={{ color: '#555452' }}>
          BMSHub is a free, open-source engineering companion built for BMS designers and integrators.
          It helps you generate consistent tag names, build point schedules, manage assembly templates,
          and export simulator configurations — all without a login, a server, or a subscription.
        </p>
      </div>

      {/* Mission */}
      <div className="rounded-xl p-6 border" style={{ background: '#fff', borderColor: '#D3D1C7' }}>
        <h2 className="font-bold text-base mb-3" style={{ color: '#2C2C2A' }}>Our Mission</h2>
        <p className="text-sm leading-relaxed mb-4" style={{ color: '#555452' }}>
          The BMS industry has long been dominated by proprietary systems that lock clients into a
          single vendor for the lifetime of their building. Migrations are expensive, integrations
          are difficult, and the client — who paid for everything — often has no ownership of their
          own data or system logic.
        </p>
        <p className="text-sm leading-relaxed" style={{ color: '#555452' }}>
          We believe that needs to change. <strong style={{ color: '#2C2C2A' }}>The client pays for
          the intellectual property and has the right to own it.</strong> Open standards, open tools,
          and transparent engineering practices benefit everyone — except the vendors who profit from
          dependency.
        </p>
      </div>

      {/* Services */}
      <div className="rounded-xl p-6 border" style={{ background: '#fff', borderColor: '#D3D1C7' }}>
        <h2 className="font-bold text-base mb-3" style={{ color: '#2C2C2A' }}>How We Can Help</h2>
        <ul className="space-y-2">
          {[
            'BMS system design and point schedule development',
            'BMS integration and protocol engineering (Modbus, BACnet, MQTT)',
            'Vendor-independent system architecture',
            'Migrating legacy proprietary systems to open platforms',
            'Training and mentorship for in-house BMS teams',
          ].map(item => (
            <li key={item} className="flex items-start gap-2 text-sm" style={{ color: '#555452' }}>
              <span className="mt-0.5 font-bold" style={{ color: '#1D9E75' }}>→</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Contact */}
      <div className="rounded-xl p-6 border" style={{ background: '#E1F5EE', borderColor: '#1D9E75' }}>
        <h2 className="font-bold text-base mb-1" style={{ color: '#085041' }}>Get in Touch</h2>
        <p className="text-sm mb-4" style={{ color: '#085041' }}>
          Interested in advice, collaboration, or a quote? I'd love to hear from you.
        </p>
        <div className="text-sm font-semibold" style={{ color: '#085041' }}>Koos Uys</div>
        <a href="mailto:uyskoos@gmail.com"
          className="text-sm underline" style={{ color: '#085041' }}>
          uyskoos@gmail.com
        </a>
      </div>

      {/* Open source */}
      <p className="text-xs text-center" style={{ color: '#888780' }}>
        BMSHub is open source. Contributions welcome on{' '}
        <a href="https://github.com/koosjr/bmshub" target="_blank" rel="noreferrer"
          className="underline">github.com/koosjr/bmshub</a>.
      </p>

    </div>
  );
}
