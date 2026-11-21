import React, { useState } from 'react';
import { Smartphone, Sparkles } from 'lucide-react';

interface StageOption {
  id: string;
  code: string;
  title: string;
  defaultMilestone: string;
}

const DISSERTATION_STAGES: StageOption[] = [
  {
    id: 'stage-a',
    code: 'Stage A',
    title: 'Concept Paper & Prospectus',
    defaultMilestone: 'Finalize Problem Statement & Theoretical Alignment',
  },
  {
    id: 'stage-b',
    code: 'Stage B',
    title: 'Proposal (Chapters 1–3) & IRB',
    defaultMilestone: 'Submit IRB Application & Proposal Defense Draft',
  },
  {
    id: 'stage-c',
    code: 'Stage C',
    title: 'Data Collection & Analysis',
    defaultMilestone: 'Complete Participant Recruitment & Coding/Analysis',
  },
  {
    id: 'stage-d',
    code: 'Stage D',
    title: 'Final Manuscript & Oral Defense',
    defaultMilestone: 'Convert Chapters 1–3 to Past Tense & Finalize Ch. 4–5',
  },
];

export function App() {
  const [activeStageId, setActiveStageId] = useState<string>('stage-a');
  const [targetDeadlineDays, setTargetDeadlineDays] = useState<number>(42);
  const [customLockMessage, setCustomLockMessage] = useState<string>(
    'Iterative progress builds scholarly authority.'
  );
  const [darkMode] = useState<boolean>(true);

  const activeStage =
    DISSERTATION_STAGES.find((s) => s.id === activeStageId) ||
    DISSERTATION_STAGES[0];

  // Live current date formatted cleanly for the phone lock screen
  const todayLabel = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 sm:p-8">
      {/* Standalone Lock Screen Customizer & Live Phone Widget */}
      <section
        aria-label="Dissertation Lock Screen Generator"
        className={`w-full max-w-md p-6 sm:p-8 rounded-3xl border-2 ${
          darkMode
            ? 'bg-slate-900 border-slate-800'
            : 'bg-white border-slate-300 shadow-md text-slate-900'
        } space-y-6 shadow-2xl`}
      >
        <div className="flex items-center space-x-3">
          <Smartphone className="w-6 h-6 text-indigo-400" aria-hidden="true" />
          <h1 className="text-xl font-black">Lock Screen Generator</h1>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          Design a personalized mobile wallpaper lock screen countdown to stay on
          track toward your target deadlines.
        </p>

        {/* Customization Inputs */}
        <div className="space-y-4">
          <div>
            <label
              htmlFor="stage-focus-select"
              className="text-xs font-bold text-slate-300 block mb-1.5"
            >
              Active Focus Stage:
            </label>
            <select
              id="stage-focus-select"
              value={activeStageId}
              onChange={(e) => setActiveStageId(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-950 border-2 border-slate-800 text-sm font-semibold text-slate-100 focus-visible:ring-4 focus-visible:ring-amber-400 outline-none"
            >
              {DISSERTATION_STAGES.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.code}: {s.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="target-days-input"
              className="text-xs font-bold text-slate-300 block mb-1.5"
            >
              Days to Deadline:
            </label>
            <input
              id="target-days-input"
              type="number"
              min={0}
              value={targetDeadlineDays}
              onChange={(e) => setTargetDeadlineDays(Number(e.target.value))}
              className="w-full p-3 rounded-xl bg-slate-950 border-2 border-slate-800 text-sm font-semibold text-slate-100 focus-visible:ring-4 focus-visible:ring-amber-400 outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="lock-message-input"
              className="text-xs font-bold text-slate-300 block mb-1.5"
            >
              Lock Screen Affirmation Quote:
            </label>
            <textarea
              id="lock-message-input"
              rows={2}
              value={customLockMessage}
              onChange={(e) => setCustomLockMessage(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-950 border-2 border-slate-800 text-sm text-slate-100 focus-visible:ring-4 focus-visible:ring-amber-400 outline-none leading-relaxed"
            />
          </div>
        </div>

        {/* Live Mobile Lock Screen Preview Mockup */}
        <div className="pt-2 flex justify-center">
          <div className="w-72 h-[480px] rounded-[40px] border-4 border-slate-700 bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950 p-5 relative shadow-2xl overflow-hidden flex flex-col justify-between text-center select-none">
            {/* Notch / Camera Bar */}
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-28 h-5 bg-slate-950 rounded-full z-20" />

            {/* Status Time Header */}
            <div className="pt-6 text-slate-100">
              <div className="text-4xl font-black tracking-tight">09:41</div>
              <div className="text-xs text-slate-400 font-semibold mt-1">
                {todayLabel}
              </div>
            </div>

            {/* Central Countdown Card Widget */}
            <div className="my-auto p-4 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-indigo-500/40 text-left space-y-3 shadow-xl">
              <div className="flex items-center justify-between text-xs font-extrabold text-indigo-400 uppercase tracking-wider">
                <span>🎓 Dissertation Countdown</span>
                <span className="px-2 py-0.5 rounded bg-indigo-500/30 text-indigo-200">
                  {activeStage.code}
                </span>
              </div>

              <div className="text-center py-2">
                <div className="text-4xl font-black text-amber-400">
                  {targetDeadlineDays}
                </div>
                <div className="text-xs uppercase font-extrabold text-slate-400 tracking-widest mt-1">
                  Days Remaining
                </div>
              </div>

              <div className="border-t border-slate-800 pt-2 space-y-1">
                <div className="text-xs font-bold text-slate-200">
                  Active Milestone:
                </div>
                <div className="text-xs text-slate-300 leading-tight">
                  • {activeStage.defaultMilestone}
                </div>
              </div>

              <div className="text-xs text-indigo-200 italic pt-2 border-t border-slate-800">
                "{customLockMessage}"
              </div>
            </div>

            {/* Bottom Lock Icon */}
            <div className="pb-2 text-slate-400 flex justify-center items-center gap-1.5 text-xs font-medium">
              <Sparkles
                className="w-4 h-4 text-amber-400"
                aria-hidden="true"
              />{' '}
              Swipe up to unlock workspace
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;