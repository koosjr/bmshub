import React from 'react';

export default function WelcomeModal({ onAccept }: { onAccept: () => void }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4"
      style={{ background: 'rgba(0,0,0,0.6)' }}>
      <div className="bg-white rounded-2xl shadow-2xl w-full" style={{ maxWidth: '520px' }}>

        {/* Header */}
        <div className="px-7 pt-7 pb-4">
          <h1 className="text-xl font-bold mb-1" style={{ color: '#2C2C2A' }}>
            Welcome to BMSHub
          </h1>
          <p className="text-sm" style={{ color: '#888780' }}>
            A free, open-source engineering companion for BMS design.
            Please take a moment to read the following before continuing.
          </p>
        </div>

        {/* Disclaimer items */}
        <div className="px-7 pb-2 space-y-4">

          <Item icon="💾" title="Your data stays in your browser">
            BMSHub runs entirely in your browser — there is no server, no account,
            and no data is ever uploaded anywhere. All projects, dictionaries, and
            assemblies are stored in your browser's local storage.
            <strong> Export your data regularly</strong> (Settings → Export) so you
            don't lose your work if you clear your browser or switch devices.
          </Item>

          <Item icon="⚙️" title="Engineering responsibility">
            This tool assists with tag generation, BOQ estimation, and assembly
            templates. As a qualified engineer you remain fully responsible for
            verifying the accuracy, completeness, and suitability of all outputs
            for your specific project and site conditions.
          </Item>

          <Item icon="🔓" title="Open source — no warranty">
            BMSHub is provided free of charge under an open-source licence.
            It is offered as-is, without warranty of any kind. If you find it
            useful, share it with a colleague or contribute back on GitHub.
          </Item>

          <Item icon="🎉" title="Enjoy!">
            This tool was built by engineers, for engineers. We hope it saves
            you hours of spreadsheet work. Have fun with it — and if something
            doesn't work the way you expect, raise an issue on GitHub.
          </Item>

        </div>

        {/* Accept button */}
        <div className="px-7 py-5">
          <button
            onClick={onAccept}
            className="w-full py-3 rounded-xl text-white font-semibold text-sm"
            style={{ background: '#1D9E75' }}>
            I understand — let's go!
          </button>
        </div>

      </div>
    </div>
  );
}

function Item({ icon, title, children }: {
  icon: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-3">
      <span className="text-lg mt-0.5 shrink-0">{icon}</span>
      <div>
        <p className="text-sm font-semibold mb-0.5" style={{ color: '#2C2C2A' }}>{title}</p>
        <p className="text-xs leading-relaxed" style={{ color: '#888780' }}>{children}</p>
      </div>
    </div>
  );
}
