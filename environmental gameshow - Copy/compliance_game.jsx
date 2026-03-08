import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  RefreshCw,
  AlertTriangle,
  ShieldCheck,
  Sparkles,
  ChevronRight,
  Play,
  Pause,
  RotateCcw,
  ThumbsUp,
  ThumbsDown,
  Gavel,
  TimerReset,
} from "lucide-react";

const bucketA = [
  {
    id: "A1",
    title: "The Playground Puddle",
    description:
      "About 50 gallons of diesel have been released near an elementary school playground after a delivery vehicle ruptured a transfer hose. Parents are beginning to notice the smell.",
    codes: { s: 2, c: 2, o: 5 },
    tags: ["public", "urgent"],
  },
  {
    id: "A2",
    title: "The Fancy Fish",
    description:
      "Hydraulic fluid has entered a decorative koi pond ahead of a major public event at a high-visibility property. The water is visibly sheened and guests are arriving soon.",
    codes: { s: 2, c: 3, o: 5 },
    tags: ["public", "urgent"],
  },
  {
    id: "A3",
    title: "The Dairy Disaster",
    description:
      "A tanker release has sent thousands of gallons of spoiled milk into a protected trout stream. Odor is building, dissolved oxygen concerns are rising, and downstream landowners are calling.",
    codes: { s: 4, c: 3, o: 3 },
    tags: ["water", "urgent"],
  },
  {
    id: "A4",
    title: "The Historic Leak",
    description:
      "Lead paint dust has been distributed across the floor and entry corridor of a 200-year-old cathedral during renovation work. Preservation concerns are now competing with public safety concerns.",
    codes: { s: 3, c: 4, o: 4 },
    tags: ["technical", "public"],
  },
  {
    id: "A5",
    title: "The Tech Spill",
    description:
      "An unidentified green liquid is leaking from a server farm utility corridor into the HVAC return area. Nobody is fully sure what it is, and the site cannot shut down for long.",
    codes: { s: 4, c: 5, o: 4 },
    tags: ["technical", "uncertain"],
  },
  {
    id: "A6",
    title: "The Buffet Breach",
    description:
      "A grease backup has pushed waste and wash water into the kitchen and service corridor of a government event venue hours before a catered reception.",
    codes: { s: 2, c: 2, o: 4 },
    tags: ["public", "resource"],
  },
  {
    id: "A7",
    title: "The Mystery Barrel",
    description:
      "A rusted drum marked only with a hand-written warning has been discovered in a community garden after volunteers reported a chemical odor and staining near raised beds.",
    codes: { s: 5, c: 5, o: 3 },
    tags: ["uncertain", "technical"],
  },
  {
    id: "A8",
    title: "The Airport Oops",
    description:
      "Roughly 200 gallons of de-icing fluid have entered a decorative fountain and nearby storm drainage at a regional airport just before a civic ribbon-cutting event.",
    codes: { s: 3, c: 3, o: 4 },
    tags: ["public", "water"],
  },
];

const bucketB = [
  {
    id: "B1",
    title: 'The "Bugs"',
    subtitle: "In-situ Bioremediation",
    description:
      "Deploy a biologically driven treatment plan built around natural degradation processes and environmental conditioning.",
    codes: { p: 3, t: 5, r: 4 },
  },
  {
    id: "B2",
    title: 'The "Big Dig"',
    subtitle: "Excavate and Haul",
    description:
      "Remove the impacted material, containerize it, and ship it to a distant disposal facility with maximum visible effort.",
    codes: { p: 5, t: 3, r: 2 },
  },
  {
    id: "B3",
    title: 'The "Sponge"',
    subtitle: "Aggressive Sorbent Deployment",
    description:
      "Use absorbents, drain covers, and physical capture materials to create a fast, highly visible containment response.",
    codes: { p: 2, t: 2, r: 3 },
  },
  {
    id: "B4",
    title: 'The "Blast"',
    subtitle: "Power Washing + Degreaser",
    description:
      "Push contamination into submission with high-pressure cleaning and industrial chemistry, hoping the optics survive the rinse cycle.",
    codes: { p: 3, t: 2, r: 2 },
  },
  {
    id: "B5",
    title: 'The "Garden"',
    subtitle: "Phytoremediation",
    description:
      "Lean into plants, stabilization, and long-horizon recovery for a response that looks calm, green, and patient.",
    codes: { p: 2, t: 3, r: 5 },
  },
  {
    id: "B6",
    title: 'The "Shop-Vac"',
    subtitle: "One Vacuum, One Dream",
    description:
      "Apply highly motivated portable recovery equipment to a problem it may or may not have been designed to solve.",
    codes: { p: 1, t: 1, r: 2 },
  },
  {
    id: "B7",
    title: 'The "Toy Fleet"',
    subtitle: "20 Radio-Controlled Tonka Trucks",
    description:
      "Minimize site disturbance through tiny vehicle logistics and overwhelming confidence.",
    codes: { p: 0, t: 0, r: 5 },
  },
  {
    id: "B8",
    title: 'The "Bubbles"',
    subtitle: "Diffused Air Stripping",
    description:
      "Use aeration and oxygen transfer to address volatile or dissolved impacts with a solution that looks surprisingly impressive.",
    codes: { p: 4, t: 4, r: 4 },
  },
  {
    id: "B9",
    title: 'The "Vac Truck"',
    subtitle: "Recovery and Containment",
    description:
      "Bring in immediate mechanical recovery, visible containment, and practical field control to stop the spread quickly.",
    codes: { p: 4, t: 4, r: 3 },
  },
  {
    id: "B10",
    title: 'The "Command Board"',
    subtitle: "Containment + Documentation First",
    description:
      "Focus on perimeter control, source isolation, drain protection, documentation, and multi-party coordination before larger treatment decisions.",
    codes: { p: 3, t: 5, r: 4 },
  },
];

const bucketC = [
  {
    id: "C1",
    title: "The Media Circus",
    description:
      "A local news crew is filming live, and everyone on site is now very interested in looking competent.",
    codes: { s: 0, c: 1, o: 3 },
    tags: ["public"],
  },
  {
    id: "C2",
    title: "The Friday 4:00 PM",
    description:
      "Half the response team has already left for the weekend, and your backup options are evaporating by the minute.",
    codes: { s: 1, c: 2, o: 0 },
    tags: ["resource", "urgent"],
  },
  {
    id: "C3",
    title: "The Angry Neighbor",
    description:
      "A nearby resident is loudly documenting the entire event and demanding answers in increasingly dramatic terms.",
    codes: { s: 0, c: 1, o: 2 },
    tags: ["public"],
  },
  {
    id: "C4",
    title: "The Budget Axe",
    description:
      "The client has abruptly reduced spending authority, and every additional truck, drum, and phone call now requires explanation.",
    codes: { s: 1, c: 1, o: 0 },
    tags: ["resource"],
  },
  {
    id: "C5",
    title: "The VIP Visit",
    description:
      "A dignitary is arriving for a site walk-through, and public-facing optics just became a project objective.",
    codes: { s: 0, c: 1, o: 3 },
    tags: ["public"],
  },
  {
    id: "C6",
    title: "The Wildlife Crisis",
    description:
      "A protected species is now directly adjacent to the impact area, creating additional decision pressure and oversight concerns.",
    codes: { s: 1, c: 2, o: 2 },
    tags: ["water", "urgent"],
  },
  {
    id: "C7",
    title: "The Missing Link",
    description:
      "Site connectivity is gone, records are incomplete, and your team now has to work with partial information and improvised communication.",
    codes: { s: 0, c: 2, o: 1 },
    tags: ["technical", "uncertain"],
  },
  {
    id: "C8",
    title: "The Drain Leads Offsite",
    description:
      "You just learned the nearest drainage path connects directly to offsite conveyance, which changes the consequences and urgency immediately.",
    codes: { s: 2, c: 1, o: 1 },
    tags: ["water", "urgent"],
  },
  {
    id: "C9",
    title: "The Product Is Still Unknown",
    description:
      "Conflicting paperwork and incomplete labeling mean nobody is comfortable confirming exactly what was released.",
    codes: { s: 1, c: 2, o: 1 },
    tags: ["technical", "uncertain"],
  },
  {
    id: "C10",
    title: "The Social Media Spiral",
    description:
      "Photos are already circulating online, and public interpretation is moving faster than your incident updates.",
    codes: { s: 0, c: 1, o: 3 },
    tags: ["public"],
  },
];

const stageSteps = [
  { id: "scenario", label: "Bucket A Assigned" },
  { id: "tools", label: "Bucket B Selected" },
  { id: "modifier", label: "Modifier Revealed" },
  { id: "response", label: "Initial Response Plan" },
  { id: "audit", label: "Investigator Audit" },
  { id: "final", label: "Final Score" },
];

const investigatorConfig = [
  {
    id: "field",
    title: "Field Reality Investigator",
    prompt: "What happens in the first 10 minutes, and does this plan work on an actual job site?",
  },
  {
    id: "regulatory",
    title: "Regulatory Exposure Investigator",
    prompt: "What in this plan becomes a reporting, documentation, or permit problem by tomorrow morning?",
  },
  {
    id: "public",
    title: "Public / Optics Investigator",
    prompt: "How does this look to neighbors, media, elected officials, and the client?",
  },
];

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function getModifierPool(scenario, tool) {
  const scenarioTags = new Set(scenario?.tags || []);
  const preferred = bucketC.filter((card) => card.tags.some((tag) => scenarioTags.has(tag)));

  const secondary = bucketC.filter((card) => {
    if (preferred.some((p) => p.id === card.id)) return false;

    if (tool) {
      if (tool.codes.r >= 4 && card.tags.includes("public")) return true;
      if (tool.codes.t >= 4 && (card.tags.includes("technical") || card.tags.includes("uncertain"))) return true;
      if (tool.codes.p <= 2 && (card.tags.includes("urgent") || card.tags.includes("water"))) return true;
    }

    return false;
  });

  const pool = [...preferred, ...secondary];
  return pool.length ? pool : bucketC;
}

function getToolOptions() {
  return shuffle(bucketB).slice(0, 4);
}

function getScenario() {
  return shuffle(bucketA)[0];
}

function scoreRound(scenario, tool, modifier, bonuses, investigators) {
  if (!scenario || !tool || !modifier) {
    return null;
  }

  const adjusted = {
    s: scenario.codes.s + modifier.codes.s,
    c: scenario.codes.c + modifier.codes.c,
    o: scenario.codes.o + modifier.codes.o,
  };

  const gaps = {
    s: adjusted.s - tool.codes.p,
    c: adjusted.c - tool.codes.t,
    o: adjusted.o - tool.codes.r,
  };

  const costFromGap = (gap) => {
    if (gap <= 0) return -10000;
    if (gap === 1) return 10000;
    return 25000;
  };

  const mismatchCost = costFromGap(gaps.s) + costFromGap(gaps.c) + costFromGap(gaps.o);
  const baseCost = 250000;
  const bonusDelta = bonuses.reduce((sum, item) => sum + item.value, 0);

  const thumbs = investigators.reduce(
    (acc, item) => {
      if (item.vote === "up") acc.up += 1;
      if (item.vote === "down") acc.down += 1;
      return acc;
    },
    { up: 0, down: 0 }
  );

  const investigatorDelta = thumbs.up * -10000 + thumbs.down * 10000;
  const finalCost = baseCost + mismatchCost + bonusDelta + investigatorDelta;

  return {
    adjusted,
    gaps,
    mismatchCost,
    baseCost,
    bonusDelta,
    investigatorDelta,
    finalCost,
    thumbs,
  };
}

const hostAdjustments = [
  { id: "H1", label: "Used a strong technical term correctly", value: -10000, type: "bonus" },
  { id: "H2", label: "Protected drains or waterways early", value: -25000, type: "bonus" },
  { id: "H3", label: "Established safety perimeter / command", value: -15000, type: "bonus" },
  { id: "H4", label: "Remembered notification / reporting", value: -20000, type: "bonus" },
  { id: "H5", label: "Made an unsupported assumption", value: 15000, type: "penalty" },
  { id: "H6", label: "Ignored public optics", value: 10000, type: "penalty" },
  { id: "H7", label: "Made the investigators laugh", value: -5000, type: "bonus" },
  { id: "H8", label: "Overengineered the response dramatically", value: 20000, type: "penalty" },
];

function ScreenShell({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">{children}</div>
    </div>
  );
}

function BigCard({ title, description, subtitle, onClick, accent = "from-emerald-400 to-cyan-400" }) {
  return (
    <motion.button whileHover={{ y: -4, scale: 1.01 }} whileTap={{ scale: 0.99 }} onClick={onClick} className="w-full text-left">
      <Card className="overflow-hidden rounded-3xl border-white/10 bg-white/5 backdrop-blur">
        <div className={`h-2 bg-gradient-to-r ${accent}`} />
        <CardHeader>
          {subtitle ? <CardDescription className="text-slate-300">{subtitle}</CardDescription> : null}
          <CardTitle className="text-2xl text-white md:text-3xl">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-base leading-7 text-slate-200">{description}</p>
          {onClick ? (
            <div className="mt-6 flex items-center gap-2 text-sm font-medium text-cyan-300">
              Continue <ChevronRight className="h-4 w-4" />
            </div>
          ) : null}
        </CardContent>
      </Card>
    </motion.button>
  );
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

function StageTracker({ stage, scenario, selectedTool, modifier }) {
  const activeIndex = stageSteps.findIndex((step) => step.id === stage);

  return (
    <div className="mb-8 space-y-4">
      <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-6">
        {stageSteps.map((step, index) => {
          const isComplete = activeIndex > index;
          const isActive = activeIndex === index;
          return (
            <div
              key={step.id}
              className={`rounded-2xl border px-4 py-3 ${
                isActive
                  ? "border-cyan-400 bg-cyan-400/15"
                  : isComplete
                    ? "border-emerald-400/40 bg-emerald-400/10"
                    : "border-white/10 bg-white/5"
              }`}
            >
              <div className="text-xs uppercase tracking-wide text-slate-400">Stage {index + 1}</div>
              <div className="mt-1 text-sm font-semibold text-white">{step.label}</div>
            </div>
          );
        })}
      </div>
      {(scenario || selectedTool || modifier) && (
        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3">
            <div className="text-xs uppercase tracking-wide text-emerald-200/80">Bucket A Assigned</div>
            <div className="mt-1 text-sm font-semibold text-white">{scenario ? scenario.title : "Waiting..."}</div>
          </div>
          <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-3">
            <div className="text-xs uppercase tracking-wide text-cyan-200/80">Bucket B Selected</div>
            <div className="mt-1 text-sm font-semibold text-white">{selectedTool ? selectedTool.title : "Waiting..."}</div>
          </div>
          <div className="rounded-2xl border border-fuchsia-400/20 bg-fuchsia-400/10 px-4 py-3">
            <div className="text-xs uppercase tracking-wide text-fuchsia-200/80">Bucket C Modifier</div>
            <div className="mt-1 text-sm font-semibold text-white">{modifier ? modifier.title : "Waiting..."}</div>
          </div>
        </div>
      )}
    </div>
  );
}

function TimerPanel({ title, description, duration, timeLeft, isRunning, onStart, onPause, onReset, doneText = "Time's Up!" }) {
  const isDone = timeLeft === 0;
  return (
    <Card className="rounded-[2rem] border-white/10 bg-white/5 backdrop-blur">
      <CardHeader>
        <CardDescription className="text-slate-300">{title}</CardDescription>
        <CardTitle className="text-3xl text-white">{isDone ? doneText : formatTime(timeLeft)}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-lg leading-8 text-slate-200">{description}</p>
        <div className="flex flex-wrap gap-3">
          <Button onClick={onStart} className="rounded-2xl bg-emerald-400 text-slate-950 hover:bg-emerald-300">
            <Play className="mr-2 h-4 w-4" /> Start
          </Button>
          <Button onClick={onPause} variant="secondary" className="rounded-2xl">
            <Pause className="mr-2 h-4 w-4" /> Stop
          </Button>
          <Button onClick={onReset} variant="secondary" className="rounded-2xl">
            <RotateCcw className="mr-2 h-4 w-4" /> Reset
          </Button>
          <Badge className="rounded-full bg-white/10 px-4 py-2 text-slate-200">Duration: {duration}s</Badge>
        </div>
      </CardContent>
    </Card>
  );
}

function AdjustmentTicker({ feed }) {
  if (!feed.length) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-400">
        Host adjustments will appear here live as they are applied.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <AnimatePresence>
        {feed.slice(0, 5).map((item) => (
          <motion.div
            key={item.instanceId}
            initial={{ opacity: 0, x: 30, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -30, scale: 0.95 }}
            className={`rounded-2xl border p-4 ${
              item.type === "penalty"
                ? "border-rose-400/30 bg-rose-400/10"
                : "border-emerald-400/30 bg-emerald-400/10"
            }`}
          >
            <div className="text-sm font-semibold text-white">{item.label}</div>
            <div className="mt-1 text-xs uppercase tracking-wide text-slate-300">{item.type === "penalty" ? "Penalty Applied" : "Bonus Applied"}</div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default function ComplianceGauntletGame() {
  const [stage, setStage] = useState("home");
  const [scenario, setScenario] = useState(null);
  const [toolOptions, setToolOptions] = useState([]);
  const [selectedTool, setSelectedTool] = useState(null);
  const [modifier, setModifier] = useState(null);
  const [bonusIds, setBonusIds] = useState([]);
  const [adjustmentFeed, setAdjustmentFeed] = useState([]);
  const [responseTimeLeft, setResponseTimeLeft] = useState(60);
  const [responseRunning, setResponseRunning] = useState(false);
  const [auditState, setAuditState] = useState(
    investigatorConfig.reduce((acc, item) => {
      acc[item.id] = { timeLeft: 30, running: false, vote: null };
      return acc;
    }, {})
  );

  const bonuses = useMemo(() => hostAdjustments.filter((item) => bonusIds.includes(item.id)), [bonusIds]);

  const investigators = useMemo(
    () => investigatorConfig.map((item) => ({ ...item, vote: auditState[item.id]?.vote || null })),
    [auditState]
  );

  const score = useMemo(
    () => scoreRound(scenario, selectedTool, modifier, bonuses, investigators),
    [scenario, selectedTool, modifier, bonuses, investigators]
  );

  useEffect(() => {
    if (!responseRunning || responseTimeLeft === 0) return undefined;
    const timer = setTimeout(() => setResponseTimeLeft((prev) => Math.max(0, prev - 1)), 1000);
    return () => clearTimeout(timer);
  }, [responseRunning, responseTimeLeft]);

  useEffect(() => {
    if (responseTimeLeft === 0) {
      setResponseRunning(false);
    }
  }, [responseTimeLeft]);

  useEffect(() => {
    const runningInvestigator = investigatorConfig.find((item) => auditState[item.id]?.running);
    if (!runningInvestigator) return undefined;
    const id = runningInvestigator.id;
    const timeLeft = auditState[id].timeLeft;
    if (timeLeft === 0) return undefined;

    const timer = setTimeout(() => {
      setAuditState((prev) => ({
        ...prev,
        [id]: { ...prev[id], timeLeft: Math.max(0, prev[id].timeLeft - 1) },
      }));
    }, 1000);

    return () => clearTimeout(timer);
  }, [auditState]);

  useEffect(() => {
    investigatorConfig.forEach((item) => {
      if (auditState[item.id]?.timeLeft === 0 && auditState[item.id]?.running) {
        setAuditState((prev) => ({
          ...prev,
          [item.id]: { ...prev[item.id], running: false },
        }));
      }
    });
  }, [auditState]);

  const resetGame = () => {
    setStage("home");
    setScenario(null);
    setToolOptions([]);
    setSelectedTool(null);
    setModifier(null);
    setBonusIds([]);
    setAdjustmentFeed([]);
    setResponseTimeLeft(60);
    setResponseRunning(false);
    setAuditState(
      investigatorConfig.reduce((acc, item) => {
        acc[item.id] = { timeLeft: 30, running: false, vote: null };
        return acc;
      }, {})
    );
  };

  const generateScenario = () => {
    const next = getScenario();
    setScenario(next);
    setToolOptions([]);
    setSelectedTool(null);
    setModifier(null);
    setBonusIds([]);
    setAdjustmentFeed([]);
    setResponseTimeLeft(60);
    setResponseRunning(false);
    setAuditState(
      investigatorConfig.reduce((acc, item) => {
        acc[item.id] = { timeLeft: 30, running: false, vote: null };
        return acc;
      }, {})
    );
    setStage("scenario");
  };

  const generateToolOptions = () => {
    setToolOptions(getToolOptions());
    setStage("tools");
  };

  const chooseTool = (tool) => {
    setSelectedTool(tool);
    setModifier(null);
    setBonusIds([]);
    setAdjustmentFeed([]);
    setStage("modifier");
  };

  const generateModifier = () => {
    const pool = getModifierPool(scenario, selectedTool);
    const next = shuffle(pool)[0];
    setModifier(next);
    setResponseTimeLeft(60);
    setResponseRunning(false);
    setStage("response");
  };

  const toggleBonus = (id) => {
    const adjustment = hostAdjustments.find((item) => item.id === id);
    if (!adjustment) return;

    setBonusIds((prev) => {
      const isActive = prev.includes(id);
      if (isActive) {
        return prev.filter((item) => item !== id);
      }
      return [...prev, id];
    });

    setAdjustmentFeed((prev) => [
      {
        instanceId: `${id}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        label: adjustment.label,
        type: adjustment.type,
      },
      ...prev,
    ]);
  };

  const setInvestigatorVote = (id, vote) => {
    setAuditState((prev) => ({
      ...prev,
      [id]: { ...prev[id], vote },
    }));
  };

  const startInvestigatorTimer = (id) => {
    setAuditState((prev) => {
      const next = { ...prev };
      investigatorConfig.forEach((item) => {
        next[item.id] = { ...next[item.id], running: item.id === id };
      });
      return next;
    });
  };

  const stopInvestigatorTimer = (id) => {
    setAuditState((prev) => ({
      ...prev,
      [id]: { ...prev[id], running: false },
    }));
  };

  const resetInvestigatorTimer = (id) => {
    setAuditState((prev) => ({
      ...prev,
      [id]: { ...prev[id], timeLeft: 30, running: false },
    }));
  };

  const allInvestigatorVotesComplete = investigators.every((item) => item.vote === "up" || item.vote === "down");

  const verdict = useMemo(() => {
    if (!score) return null;
    if (score.finalCost <= 220000) return "Approved";
    if (score.finalCost <= 280000) return "Approved with Conditions";
    if (score.finalCost <= 340000) return "Significant Agency Concern";
    return "Please Never Say That Again";
  }, [score]);

  return (
    <ScreenShell>
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
            <Sparkles className="h-4 w-4 text-cyan-300" />
            Interactive conference demo
          </div>
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">The Compliance Gauntlet</h1>
          <p className="mt-3 max-w-3xl text-lg text-slate-300">
            Random incident. Strategic tool selection. Scenario-compatible modifier. Live timers. Hidden scoring for the host.
          </p>
        </div>
        <div className="flex gap-3">
          <Button onClick={resetGame} variant="secondary" className="rounded-2xl">
            <RefreshCw className="mr-2 h-4 w-4" /> Reset
          </Button>
        </div>
      </div>

      {stage !== "home" && <StageTracker stage={stage} scenario={scenario} selectedTool={selectedTool} modifier={modifier} />}

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div>
          <AnimatePresence mode="wait">
            {stage === "home" && (
              <motion.div key="home" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>
                <Card className="rounded-[2rem] border-white/10 bg-white/5 backdrop-blur">
                  <CardContent className="flex min-h-[420px] flex-col items-center justify-center p-10 text-center">
                    <AlertTriangle className="mb-6 h-16 w-16 text-amber-300" />
                    <h2 className="text-3xl font-semibold text-white md:text-4xl">Ready to create a disaster?</h2>
                    <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
                      Start by generating a random Bucket A incident card. The contestant will then choose from four response tools before fate reveals a compatible modifier.
                    </p>
                    <Button onClick={generateScenario} className="mt-8 rounded-2xl bg-emerald-400 px-8 py-6 text-lg font-semibold text-slate-950 hover:bg-emerald-300">
                      Generate a Spill
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {stage === "scenario" && scenario && (
              <motion.div key="scenario" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }} className="space-y-6">
                <div className="flex items-center gap-3">
                  <Badge className="rounded-full bg-emerald-500/20 px-4 py-2 text-emerald-200">Bucket A · Scenario</Badge>
                  <span className="text-slate-400">Click the card after the host reads it publicly</span>
                </div>
                <BigCard title={scenario.title} description={scenario.description} onClick={generateToolOptions} accent="from-emerald-400 to-lime-300" />
              </motion.div>
            )}

            {stage === "tools" && scenario && (
              <motion.div key="tools" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }} className="space-y-6">
                <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                  <div>
                    <Badge className="mb-3 rounded-full bg-cyan-500/20 px-4 py-2 text-cyan-200">Bucket B · Response Options</Badge>
                    <h2 className="text-2xl font-semibold text-white">Choose the primary response method</h2>
                    <p className="mt-2 text-slate-300">The contestant selects one option. The modifier will be revealed afterward.</p>
                  </div>
                  <Button onClick={generateToolOptions} variant="secondary" className="rounded-2xl">
                    Regenerate 4 Options
                  </Button>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {toolOptions.map((tool) => (
                    <BigCard key={tool.id} title={tool.title} subtitle={tool.subtitle} description={tool.description} onClick={() => chooseTool(tool)} accent="from-cyan-400 to-blue-400" />
                  ))}
                </div>
              </motion.div>
            )}

            {stage === "modifier" && scenario && selectedTool && (
              <motion.div key="modifier" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }} className="space-y-6">
                <div className="grid gap-4 lg:grid-cols-2">
                  <Card className="rounded-3xl border-white/10 bg-white/5">
                    <CardHeader>
                      <CardDescription className="text-slate-300">Chosen Scenario</CardDescription>
                      <CardTitle className="text-white">{scenario.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-200">{scenario.description}</p>
                    </CardContent>
                  </Card>
                  <Card className="rounded-3xl border-white/10 bg-white/5">
                    <CardHeader>
                      <CardDescription className="text-slate-300">Chosen Tool</CardDescription>
                      <CardTitle className="text-white">{selectedTool.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-200">{selectedTool.description}</p>
                    </CardContent>
                  </Card>
                </div>
                <Card className="rounded-[2rem] border-white/10 bg-white/5 backdrop-blur">
                  <CardContent className="flex min-h-[280px] flex-col items-center justify-center p-10 text-center">
                    <ShieldCheck className="mb-6 h-16 w-16 text-fuchsia-300" />
                    <h2 className="text-3xl font-semibold text-white">Time for the twist</h2>
                    <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
                      Generate a Bucket C modifier from a scenario-compatible subset tied to the incident and pressured by the selected approach.
                    </p>
                    <Button onClick={generateModifier} className="mt-8 rounded-2xl bg-fuchsia-400 px-8 py-6 text-lg font-semibold text-slate-950 hover:bg-fuchsia-300">
                      Generate Modifier
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {stage === "response" && scenario && selectedTool && modifier && (
              <motion.div key="response" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }} className="space-y-6">
                <div className="grid gap-4 lg:grid-cols-3">
                  <BigCard title={scenario.title} description={scenario.description} accent="from-emerald-400 to-lime-300" />
                  <BigCard title={selectedTool.title} subtitle={selectedTool.subtitle} description={selectedTool.description} accent="from-cyan-400 to-blue-400" />
                  <BigCard title={modifier.title} description={modifier.description} accent="from-fuchsia-400 to-pink-400" />
                </div>
                <TimerPanel
                  title="Initial Response Plan Update"
                  description="Contestant gets a panic window and then delivers a 60-second initial response plan. Start, stop, or reset the timer below. When the clock hits zero, the screen shows Time's Up!"
                  duration={60}
                  timeLeft={responseTimeLeft}
                  isRunning={responseRunning}
                  onStart={() => setResponseRunning(true)}
                  onPause={() => setResponseRunning(false)}
                  onReset={() => {
                    setResponseRunning(false);
                    setResponseTimeLeft(60);
                  }}
                />
                <div className="flex flex-wrap gap-3">
                  <Button onClick={() => setStage("audit")} className="rounded-2xl bg-amber-300 text-slate-950 hover:bg-amber-200">
                    <Gavel className="mr-2 h-4 w-4" /> Investigator Audit
                  </Button>
                </div>
              </motion.div>
            )}

            {stage === "audit" && scenario && selectedTool && modifier && (
              <motion.div key="audit" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }} className="space-y-6">
                <div className="grid gap-4 lg:grid-cols-3">
                  <BigCard title={scenario.title} description={scenario.description} accent="from-emerald-400 to-lime-300" />
                  <BigCard title={selectedTool.title} subtitle={selectedTool.subtitle} description={selectedTool.description} accent="from-cyan-400 to-blue-400" />
                  <BigCard title={modifier.title} description={modifier.description} accent="from-fuchsia-400 to-pink-400" />
                </div>
                <div className="grid gap-4 xl:grid-cols-3">
                  {investigatorConfig.map((investigator) => {
                    const state = auditState[investigator.id];
                    const isDone = state.timeLeft === 0;
                    return (
                      <Card key={investigator.id} className="rounded-[2rem] border-white/10 bg-white/5 backdrop-blur">
                        <CardHeader>
                          <CardDescription className="text-slate-300">Investigator Audit</CardDescription>
                          <CardTitle className="text-white">{investigator.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <p className="text-sm leading-7 text-slate-200">{investigator.prompt}</p>
                          <div className="rounded-2xl bg-slate-950/60 p-4 text-center">
                            <div className="text-xs uppercase tracking-wide text-slate-400">Timer</div>
                            <div className="mt-1 text-3xl font-bold text-white">{isDone ? "Time's Up!" : formatTime(state.timeLeft)}</div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <Button onClick={() => startInvestigatorTimer(investigator.id)} className="rounded-2xl bg-emerald-400 text-slate-950 hover:bg-emerald-300">
                              <Play className="mr-2 h-4 w-4" /> Start
                            </Button>
                            <Button onClick={() => stopInvestigatorTimer(investigator.id)} variant="secondary" className="rounded-2xl">
                              <Pause className="mr-2 h-4 w-4" /> Stop
                            </Button>
                            <Button onClick={() => resetInvestigatorTimer(investigator.id)} variant="secondary" className="rounded-2xl">
                              <TimerReset className="mr-2 h-4 w-4" /> Reset
                            </Button>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <Button
                              onClick={() => setInvestigatorVote(investigator.id, "up")}
                              className={`rounded-2xl ${state.vote === "up" ? "bg-emerald-400 text-slate-950 hover:bg-emerald-300" : "bg-white/10 text-white hover:bg-white/20"}`}
                            >
                              <ThumbsUp className="mr-2 h-4 w-4" /> Thumbs Up
                            </Button>
                            <Button
                              onClick={() => setInvestigatorVote(investigator.id, "down")}
                              className={`rounded-2xl ${state.vote === "down" ? "bg-rose-400 text-white hover:bg-rose-300" : "bg-white/10 text-white hover:bg-white/20"}`}
                            >
                              <ThumbsDown className="mr-2 h-4 w-4" /> Thumbs Down
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button onClick={() => setStage("response")} variant="secondary" className="rounded-2xl">
                    Back to Response Plan
                  </Button>
                  <Button
                    onClick={() => setStage("final")}
                    disabled={!allInvestigatorVotesComplete}
                    className="rounded-2xl bg-cyan-400 text-slate-950 hover:bg-cyan-300 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
                  >
                    Final Score
                  </Button>
                </div>
              </motion.div>
            )}

            {stage === "final" && score && scenario && selectedTool && modifier && (
              <motion.div key="final" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }} className="space-y-6">
                <div className="grid gap-4 lg:grid-cols-3">
                  <BigCard title={scenario.title} description={scenario.description} accent="from-emerald-400 to-lime-300" />
                  <BigCard title={selectedTool.title} subtitle={selectedTool.subtitle} description={selectedTool.description} accent="from-cyan-400 to-blue-400" />
                  <BigCard title={modifier.title} description={modifier.description} accent="from-fuchsia-400 to-pink-400" />
                </div>
                <Card className="rounded-[2rem] border-white/10 bg-white/5 backdrop-blur">
                  <CardHeader>
                    <CardDescription className="text-slate-300">Final Score Page</CardDescription>
                    <CardTitle className="text-4xl text-white">{verdict}</CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <div className="rounded-2xl bg-slate-950/60 p-4">
                      <div className="text-xs uppercase tracking-wide text-slate-400">Final Cost</div>
                      <div className="mt-1 text-3xl font-bold text-cyan-300">${score.finalCost.toLocaleString()}</div>
                    </div>
                    <div className="rounded-2xl bg-slate-950/60 p-4">
                      <div className="text-xs uppercase tracking-wide text-slate-400">Investigator Votes</div>
                      <div className="mt-1 text-3xl font-bold text-white">{score.thumbs.up} / {score.thumbs.down}</div>
                    </div>
                    <div className="rounded-2xl bg-slate-950/60 p-4">
                      <div className="text-xs uppercase tracking-wide text-slate-400">Host Adjustments</div>
                      <div className="mt-1 text-3xl font-bold text-white">{bonuses.length}</div>
                    </div>
                    <div className="rounded-2xl bg-slate-950/60 p-4">
                      <div className="text-xs uppercase tracking-wide text-slate-400">Fit Gaps</div>
                      <div className="mt-1 text-lg font-bold text-white">S {clamp(score.gaps.s, -9, 9)} · C {clamp(score.gaps.c, -9, 9)} · O {clamp(score.gaps.o, -9, 9)}</div>
                    </div>
                  </CardContent>
                </Card>
                <div className="flex flex-wrap gap-3">
                  <Button onClick={resetGame} className="rounded-2xl bg-emerald-400 text-slate-950 hover:bg-emerald-300">
                    Start New Round
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div>
          <Card className="sticky top-6 rounded-[2rem] border-white/10 bg-slate-950/70 backdrop-blur">
            <CardHeader>
              <CardDescription className="text-slate-400">Host control panel</CardDescription>
              <CardTitle className="text-white">Live scoring controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-3">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">Host bonuses / penalties</h3>
                <div className="space-y-2">
                  {hostAdjustments.map((item) => {
                    const active = bonusIds.includes(item.id);
                    return (
                      <button
                        key={item.id}
                        onClick={() => toggleBonus(item.id)}
                        className={`w-full rounded-2xl border px-4 py-3 text-left text-sm transition ${
                          active
                            ? item.type === "penalty"
                              ? "border-rose-400 bg-rose-400/15 text-white"
                              : "border-emerald-400 bg-emerald-400/15 text-white"
                            : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span>{item.label}</span>
                          <span className="text-xs uppercase tracking-wide text-slate-400">{item.type}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">Live adjustment feed</h3>
                <AdjustmentTicker feed={adjustmentFeed} />
              </div>

              {stage === "final" && score ? (
                <div className="space-y-3 rounded-3xl border border-white/10 bg-white/5 p-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">Host-only math</h3>
                  <div className="grid grid-cols-2 gap-3 text-sm text-slate-300">
                    <div>Base Cost</div>
                    <div className="text-right text-white">${score.baseCost.toLocaleString()}</div>
                    <div>Scenario / Tool Fit</div>
                    <div className="text-right text-white">{score.mismatchCost >= 0 ? "+" : "-"}${Math.abs(score.mismatchCost).toLocaleString()}</div>
                    <div>Host Adjustments</div>
                    <div className="text-right text-white">{score.bonusDelta >= 0 ? "+" : "-"}${Math.abs(score.bonusDelta).toLocaleString()}</div>
                    <div>Investigator Votes</div>
                    <div className="text-right text-white">{score.investigatorDelta >= 0 ? "+" : "-"}${Math.abs(score.investigatorDelta).toLocaleString()}</div>
                    <div className="font-semibold text-slate-100">Final Cost</div>
                    <div className="text-right text-lg font-bold text-cyan-300">${score.finalCost.toLocaleString()}</div>
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-slate-400">
                  Dollar math stays hidden during the live round. The full scoring breakdown appears on the final score page only.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </ScreenShell>
  );
}
