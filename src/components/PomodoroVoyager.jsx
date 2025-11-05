import React from "react";

const odysseyMilestones = [
  {
    id: "ignite",
    title: "Foco Inicial",
    description: "Defina sua intenção, planeje 3 ciclos e libere o mapa da jornada.",
    targetPoints: 120,
    progress: 100,
    aura: "from-orange-500 via-red-500 to-amber-400",
    badges: ["Ritual", "Anotações", "Playlist"]
  },
  {
    id: "momentum",
    title: "Pulso Constante",
    description: "Complete 5 dias de ofensiva e desbloqueie missões semanais.",
    targetPoints: 300,
    progress: 220,
    aura: "from-emerald-500 via-teal-500 to-cyan-400",
    badges: ["Streak", "Focus Sprint", "Respire"]
  },
  {
    id: "zenith",
    title: "Cume da Atenção",
    description: "Colete 900 pontos em um mês e receba o título de Guardião do Ritmo.",
    targetPoints: 900,
    progress: 640,
    aura: "from-indigo-500 via-violet-500 to-fuchsia-500",
    badges: ["Mentoria", "Deep Dive", "Ritmo"]
  }
];

const questDeck = [
  {
    id: "mission-arc",
    label: "Trama semanal",
    focus: "6 ciclos com pausa ativa guiada",
    reward: 180,
    trend: "+12% de consistência",
    gradient: "from-slate-900 via-slate-800 to-slate-900",
    accent: "border-l-4 border-cyan-400"
  },
  {
    id: "mission-ritual",
    label: "Ritual de aquecimento",
    focus: "Planeje micro-objetivos antes do primeiro ciclo",
    reward: 60,
    trend: "+5% na taxa de conclusão",
    gradient: "from-stone-900 via-zinc-900 to-stone-900",
    accent: "border-l-4 border-amber-400"
  },
  {
    id: "mission-expedition",
    label: "Expedição imersiva",
    focus: "3 blocos estendidos com review intencional",
    reward: 220,
    trend: "+9% de foco profundo",
    gradient: "from-slate-900 via-indigo-900 to-slate-900",
    accent: "border-l-4 border-fuchsia-400"
  }
];

const streakTelemetry = {
  current: 7,
  best: 21,
  recovery: 3,
  cadence: [86, 92, 74, 100, 96, 88, 93]
};

const relics = [
  {
    id: "ritualist",
    title: "Arquiteto da Rotina",
    text: "Transforma metas em ritmos sustentáveis que mantêm o foco aceso.",
    hue: "from-amber-400 via-orange-500 to-red-500"
  },
  {
    id: "strategist",
    title: "Cartógrafo Mental",
    text: "Mapeia sessões em capítulos imersivos com checkpoints visuais.",
    hue: "from-cyan-400 via-sky-500 to-blue-500"
  },
  {
    id: "guardian",
    title: "Guardião do Ritmo",
    text: "Protege as pausas como parte do ritual para renovar energia.",
    hue: "from-violet-400 via-purple-500 to-fuchsia-500"
  }
];

const motivationalLibrary = [
  "Todo ciclo é uma cena: conclua o capítulo com propósito.",
  "Sua ofensiva de hoje é o legado de amanhã.",
  "Planeje, mergulhe, revise: um roteiro digno da sua evolução."
];

function StreakSparkline({ cadence }) {
  return (
    <div className="flex items-end gap-1 h-16 w-full">
      {cadence.map((value, index) => (
        <div
          key={`spark-${index}`}
          className="flex-1 rounded-t-md bg-gradient-to-t from-slate-800 via-slate-600 to-slate-200"
          style={{ height: `${Math.max(value, 12)}%` }}
        />
      ))}
    </div>
  );
}

export function OdysseyGamefication() {
  return (
    <section className="w-full max-w-6xl mx-auto grid gap-8 md:grid-cols-[2fr_1fr] text-slate-100">
      <div className="bg-slate-950/70 backdrop-blur rounded-3xl border border-slate-800 shadow-2xl shadow-slate-950/50 p-8">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
          <div>
            <p className="uppercase tracking-[0.4em] text-xs text-slate-400">Trilha de Ascensão</p>
            <h1 className="text-3xl md:text-4xl font-semibold text-slate-50">
              Operação Pomodoro Odyssey
            </h1>
          </div>
          <div className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 px-6 py-3 rounded-full text-slate-950 font-medium shadow-lg shadow-cyan-500/30">
            640 / 900 pontos
          </div>
        </header>

        <div className="grid gap-6">
          {odysseyMilestones.map((milestone, index) => (
            <article
              key={milestone.id}
              className={`relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/60 p-6 md:p-8 transition-transform duration-300 hover:-translate-y-1 hover:border-slate-700`}
            >
              <div
                className={`absolute inset-0 opacity-40 bg-gradient-to-br ${milestone.aura}`}
                aria-hidden
              />
              <div className="relative grid gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs uppercase tracking-[0.3em] text-slate-300">
                      Checkpoint {index + 1}
                    </span>
                    <h2 className="text-2xl font-semibold text-slate-50">
                      {milestone.title}
                    </h2>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-200">{milestone.progress} pts</p>
                    <p className="text-xs text-slate-300">meta {milestone.targetPoints}</p>
                  </div>
                </div>
                <p className="text-sm md:text-base text-slate-200/90 max-w-3xl">
                  {milestone.description}
                </p>
                <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${milestone.aura}`}
                    style={{ width: `${Math.min((milestone.progress / milestone.targetPoints) * 100, 100)}%` }}
                  />
                </div>
                <ul className="flex flex-wrap gap-2">
                  {milestone.badges.map((badge) => (
                    <li
                      key={`${milestone.id}-${badge}`}
                      className="px-3 py-1 text-xs font-medium uppercase tracking-wider bg-slate-900/70 border border-slate-700 rounded-full"
                    >
                      {badge}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>

      <aside className="flex flex-col gap-6">
        <div className="bg-slate-950/70 backdrop-blur rounded-3xl border border-slate-800 shadow-xl shadow-slate-950/40 p-6">
          <h3 className="text-lg font-semibold text-slate-50">Missões em Destaque</h3>
          <p className="text-sm text-slate-300 mb-4">
            Complete arcos estratégicos e amplie o multiplicador diário.
          </p>
          <div className="space-y-4">
            {questDeck.map((quest) => (
              <div
                key={quest.id}
                className={`relative overflow-hidden rounded-2xl border border-slate-800 ${quest.accent}`}
              >
                <div className={`absolute inset-0 opacity-40 bg-gradient-to-r ${quest.gradient}`} aria-hidden />
                <div className="relative p-4">
                  <p className="uppercase text-xs tracking-[0.35em] text-slate-300 mb-1">
                    {quest.label}
                  </p>
                  <h4 className="text-base font-semibold text-slate-100">{quest.focus}</h4>
                  <div className="mt-3 flex items-center justify-between text-sm text-slate-200">
                    <span>Recompensa {quest.reward} pts</span>
                    <span className="text-cyan-300">{quest.trend}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-950/70 backdrop-blur rounded-3xl border border-slate-800 shadow-xl shadow-slate-950/40 p-6">
          <h3 className="text-lg font-semibold text-slate-50">Painel de Ritmo</h3>
          <p className="text-sm text-slate-300">Dias de ofensiva consolidados e projeção de consistência.</p>
          <div className="mt-4 grid gap-4">
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 py-3">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Atual</p>
                <p className="text-2xl font-semibold text-slate-50">{streakTelemetry.current}</p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 py-3">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Máximo</p>
                <p className="text-2xl font-semibold text-slate-50">{streakTelemetry.best}</p>
              </div>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Recuperação</p>
              <p className="text-base text-slate-200">{streakTelemetry.recovery} dias para novo recorde</p>
              <div className="mt-4">
                <StreakSparkline cadence={streakTelemetry.cadence} />
              </div>
            </div>
          </div>
        </div>
      </aside>
    </section>
  );
}

export function ProfileAurora({ name = "Clara Vega", discipline = "Design Narrativo" }) {
  const phrase = motivationalLibrary[(discipline.length + name.length) % motivationalLibrary.length];

  return (
    <section className="w-full max-w-5xl mx-auto bg-slate-950/80 backdrop-blur rounded-[2.5rem] border border-slate-800 text-slate-100 shadow-2xl shadow-slate-950/40 overflow-hidden">
      <div className="grid md:grid-cols-[2fr_3fr]">
        <div className="relative p-10">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-cyan-500/10 to-transparent" aria-hidden />
          <div className="relative space-y-6">
            <div>
              <p className="uppercase tracking-[0.4em] text-xs text-slate-300">Perfil</p>
              <h2 className="text-3xl font-semibold text-slate-50">{name}</h2>
              <p className="text-sm text-slate-300">{discipline}</p>
            </div>
            <div className="rounded-3xl border border-slate-800 bg-slate-950/60 p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Mantra do ciclo</p>
              <p className="mt-2 text-lg font-medium text-slate-100 leading-relaxed">{phrase}</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm uppercase tracking-[0.3em] text-slate-300">Relíquias de Evolução</h3>
              <div className="grid gap-3">
                {relics.map((relic) => (
                  <div
                    key={relic.id}
                    className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/70 p-4"
                  >
                    <div className={`absolute inset-y-0 left-0 w-1 bg-gradient-to-b ${relic.hue}`} aria-hidden />
                    <div className="relative pl-4">
                      <h4 className="text-base font-semibold text-slate-50">{relic.title}</h4>
                      <p className="text-sm text-slate-300">{relic.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="relative bg-gradient-to-br from-slate-900 via-slate-950 to-black p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.25),_transparent_55%)]" aria-hidden />
          <div className="relative grid gap-8">
            <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6">
              <h3 className="text-sm uppercase tracking-[0.3em] text-slate-300">Dias de ofensiva</h3>
              <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 py-4">
                  <p className="text-xs text-slate-400 uppercase tracking-[0.3em]">Atual</p>
                  <p className="text-3xl font-semibold text-slate-50">7</p>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 py-4">
                  <p className="text-xs text-slate-400 uppercase tracking-[0.3em]">Sequência</p>
                  <p className="text-3xl font-semibold text-slate-50">21</p>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 py-4">
                  <p className="text-xs text-slate-400 uppercase tracking-[0.3em]">Meta</p>
                  <p className="text-3xl font-semibold text-slate-50">30</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6">
              <h3 className="text-sm uppercase tracking-[0.3em] text-slate-300">Estratégia diária</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-200">
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-cyan-400" />
                  Revisão de metas antes do primeiro bloco.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
                  Ciclos duplos com pausa ativa guiada.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-fuchsia-400" />
                  Retrospetiva noturna com journaling rápido.
                </li>
              </ul>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6">
              <h3 className="text-sm uppercase tracking-[0.3em] text-slate-300">Painel de impacto</h3>
              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                  <p className="text-slate-400 uppercase tracking-[0.25em] text-[0.65rem]">Total de pontos</p>
                  <p className="text-2xl font-semibold text-slate-50">1280</p>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                  <p className="text-slate-400 uppercase tracking-[0.25em] text-[0.65rem]">Multiplicador</p>
                  <p className="text-2xl font-semibold text-slate-50">x1.8</p>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                  <p className="text-slate-400 uppercase tracking-[0.25em] text-[0.65rem]">Ritmo de foco</p>
                  <p className="text-2xl font-semibold text-slate-50">92%</p>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                  <p className="text-slate-400 uppercase tracking-[0.25em] text-[0.65rem]">Missões épicas</p>
                  <p className="text-2xl font-semibold text-slate-50">5</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function PomodoroVoyage() {
  return (
    <div className="space-y-16 py-10 px-6 bg-gradient-to-b from-slate-950 via-slate-900 to-black text-slate-100">
      <OdysseyGamefication />
      <ProfileAurora />
    </div>
  );
}
