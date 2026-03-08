import React, { useEffect, useMemo, useState } from "react";

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

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

function getToolOptions() {
  return shuffle(bucketB).slice(0, 4);
}

function getScenario() {
  return shuffle(bucketA)[0];
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

function scoreRound(scenario, tool, modifier, bonuses, investigators) {
  if (!scenario || !tool || !modifier) return null;

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

function Card({ children, className = "", onClick }) {
  return (
    <div className={`card ${className} ${onClick ? "clickable" : ""}`} onClick={onClick}>
      {children}
    </div>
  );
}

function Badge({ children, className = "" }) {
  return <span className={`badge ${className}`}>{children}</span>;
}

function Button({ children, onClick, variant = "primary", disabled = false, className = "", type = "button" }) {
  return (
    <button type={type} disabled={disabled} onClick={onClick} className={`btn ${variant} ${className}`}>
      {children}
    </button>
  );
}

function BigCard({ title, description, subtitle, onClick, accentClass = "accent-green" }) {
  return (
    <Card onClick={onClick} className="big-card">
      <div className={`card-accent ${accentClass}`} />
      <div className="card-body">
        {subtitle ? <div className="card-subtitle">{subtitle}</div> : null}
        <div className="card-title">{title}</div>
        <p className="card-text">{description}</p>
        {onClick ? <div className="continue-text">Continue →</div> : null}
      </div>
    </Card>
  );
}

function StageTracker({ stage, scenario, selectedTool, modifier }) {
  const activeIndex = stageSteps.findIndex((step) => step.id === stage);

  return (
    <div className="stage-section">
      <div className="stage-grid">
        {stageSteps.map((step, index) => {
          const isComplete = activeIndex > index;
          const isActive = activeIndex === index;
          const stateClass = isActive ? "stage-active" : isComplete ? "stage-complete" : "stage-idle";

          return (
            <div key={step.id} className={`stage-card ${stateClass}`}>
              <div className="stage-number">Stage {index + 1}</div>
              <div className="stage-label">{step.label}</div>
            </div>
          );
        })}
      </div>

      {(scenario || selectedTool || modifier) && (
        <div className="selection-grid">
          <div className="selection-box selection-a">
            <div className="selection-label">Bucket A Assigned</div>
            <div className="selection-value">{scenario ? scenario.title : "Waiting..."}</div>
          </div>
          <div className="selection-box selection-b">
            <div className="selection-label">Bucket B Selected</div>
            <div className="selection-value">{selectedTool ? selectedTool.title : "Waiting..."}</div>
          </div>
          <div className="selection-box selection-c">
            <div className="selection-label">Bucket C Modifier</div>
            <div className="selection-value">{modifier ? modifier.title : "Waiting..."}</div>
          </div>
        </div>
      )}
    </div>
  );
}

function TimerPanel({ title, description, duration, timeLeft, onStart, onPause, onReset, doneText = "Time's Up!" }) {
  const isDone = timeLeft === 0;

  return (
    <Card>
      <div className="timer-panel">
        <div className="panel-label">{title}</div>
        <div className="timer-value">{isDone ? doneText : formatTime(timeLeft)}</div>
        <p className="panel-text">{description}</p>
        <div className="button-row wrap">
          <Button onClick={onStart}>Start</Button>
          <Button onClick={onPause} variant="secondary">Stop</Button>
          <Button onClick={onReset} variant="secondary">Reset</Button>
          <Badge>Duration: {duration}s</Badge>
        </div>
      </div>
    </Card>
  );
}

function AdjustmentTicker({ feed }) {
  if (!feed.length) {
    return <div className="ticker-empty">Host adjustments will appear here live as they are applied.</div>;
  }

  return (
    <div className="ticker-list">
      {feed.slice(0, 5).map((item) => (
        <div key={item.instanceId} className={`ticker-item ${item.type === "penalty" ? "ticker-penalty" : "ticker-bonus"}`}>
          <div className="ticker-title">{item.label}</div>
          <div className="ticker-subtitle">{item.type === "penalty" ? "Penalty Applied" : "Bonus Applied"}</div>
        </div>
      ))}
    </div>
  );
}

export default function App() {
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
    if (responseTimeLeft === 0) setResponseRunning(false);
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

  const resetAuditState = () =>
    investigatorConfig.reduce((acc, item) => {
      acc[item.id] = { timeLeft: 30, running: false, vote: null };
      return acc;
    }, {});

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
    setAuditState(resetAuditState());
  };

  const generateScenario = () => {
    setScenario(getScenario());
    setToolOptions([]);
    setSelectedTool(null);
    setModifier(null);
    setBonusIds([]);
    setAdjustmentFeed([]);
    setResponseTimeLeft(60);
    setResponseRunning(false);
    setAuditState(resetAuditState());
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
    setModifier(shuffle(pool)[0]);
    setResponseTimeLeft(60);
    setResponseRunning(false);
    setStage("response");
  };

  const toggleBonus = (id) => {
    const adjustment = hostAdjustments.find((item) => item.id === id);
    if (!adjustment) return;

    setBonusIds((prev) => {
      if (prev.includes(id)) return prev.filter((item) => item !== id);
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
    <div className="app-shell">
      <div className="container">
        <div className="topbar">
          <div>
            <div className="pill">Interactive conference demo</div>
            <h1 className="app-title">The Compliance Gauntlet</h1>
            <p className="app-subtitle">
              Random incident. Strategic tool selection. Scenario-compatible modifier. Live timers. Hidden scoring for the host.
            </p>
          </div>
          <div className="topbar-actions">
            <Button onClick={resetGame} variant="secondary">Reset</Button>
          </div>
        </div>

        {stage !== "home" && <StageTracker stage={stage} scenario={scenario} selectedTool={selectedTool} modifier={modifier} />}

        <div className="main-grid">
          <div>
            {stage === "home" && (
              <Card className="center-card">
                <div className="home-box">
                  <div className="home-icon">⚠️</div>
                  <h2 className="home-title">Ready to create a disaster?</h2>
                  <p className="home-text">
                    Start by generating a random Bucket A incident card. The contestant will then choose from four response tools before fate reveals a compatible modifier.
                  </p>
                  <Button onClick={generateScenario}>Generate a Spill</Button>
                </div>
              </Card>
            )}

            {stage === "scenario" && scenario && (
              <div className="page-stack">
                <div className="row-inline">
                  <Badge>Bucket A · Scenario</Badge>
                  <span className="muted">Click the card after the host reads it publicly</span>
                </div>
                <BigCard title={scenario.title} description={scenario.description} onClick={generateToolOptions} accentClass="accent-green" />
              </div>
            )}

            {stage === "tools" && scenario && (
              <div className="page-stack">
                <div className="split-row">
                  <div>
                    <Badge>Bucket B · Response Options</Badge>
                    <h2 className="section-title">Choose the primary response method</h2>
                    <p className="muted">The contestant selects one option. The modifier will be revealed afterward.</p>
                  </div>
                  <Button onClick={generateToolOptions} variant="secondary">Regenerate 4 Options</Button>
                </div>

                <div className="card-grid two-up">
                  {toolOptions.map((tool) => (
                    <BigCard
                      key={tool.id}
                      title={tool.title}
                      subtitle={tool.subtitle}
                      description={tool.description}
                      onClick={() => chooseTool(tool)}
                      accentClass="accent-blue"
                    />
                  ))}
                </div>
              </div>
            )}

            {stage === "modifier" && scenario && selectedTool && (
              <div className="page-stack">
                <div className="card-grid two-up">
                  <BigCard title={scenario.title} description={scenario.description} accentClass="accent-green" />
                  <BigCard title={selectedTool.title} subtitle={selectedTool.subtitle} description={selectedTool.description} accentClass="accent-blue" />
                </div>

                <Card className="center-card">
                  <div className="home-box">
                    <div className="home-icon">🛡️</div>
                    <h2 className="home-title">Time for the twist</h2>
                    <p className="home-text">
                      Generate a Bucket C modifier from a scenario-compatible subset tied to the incident and pressured by the selected approach.
                    </p>
                    <Button onClick={generateModifier}>Generate Modifier</Button>
                  </div>
                </Card>
              </div>
            )}

            {stage === "response" && scenario && selectedTool && modifier && (
              <div className="page-stack">
                <div className="card-grid three-up">
                  <BigCard title={scenario.title} description={scenario.description} accentClass="accent-green" />
                  <BigCard title={selectedTool.title} subtitle={selectedTool.subtitle} description={selectedTool.description} accentClass="accent-blue" />
                  <BigCard title={modifier.title} description={modifier.description} accentClass="accent-pink" />
                </div>

                <TimerPanel
                  title="Initial Response Plan Update"
                  description="Contestant gets a panic window and then delivers a 60-second initial response plan. Start, stop, or reset the timer below. When the clock hits zero, the screen shows Time's Up!"
                  duration={60}
                  timeLeft={responseTimeLeft}
                  onStart={() => setResponseRunning(true)}
                  onPause={() => setResponseRunning(false)}
                  onReset={() => {
                    setResponseRunning(false);
                    setResponseTimeLeft(60);
                  }}
                />

                <div className="button-row">
                  <Button onClick={() => setStage("audit")} variant="warning">Investigator Audit</Button>
                </div>
              </div>
            )}

            {stage === "audit" && scenario && selectedTool && modifier && (
              <div className="page-stack">
                <div className="card-grid three-up">
                  <BigCard title={scenario.title} description={scenario.description} accentClass="accent-green" />
                  <BigCard title={selectedTool.title} subtitle={selectedTool.subtitle} description={selectedTool.description} accentClass="accent-blue" />
                  <BigCard title={modifier.title} description={modifier.description} accentClass="accent-pink" />
                </div>

                <div className="card-grid three-up">
                  {investigatorConfig.map((investigator) => {
                    const state = auditState[investigator.id];
                    const isDone = state.timeLeft === 0;
                    return (
                      <Card key={investigator.id}>
                        <div className="audit-panel">
                          <div className="panel-label">Investigator Audit</div>
                          <div className="audit-title">{investigator.title}</div>
                          <p className="panel-text">{investigator.prompt}</p>
                          <div className="audit-timer-box">
                            <div className="audit-timer-label">Timer</div>
                            <div className="audit-timer-value">{isDone ? "Time's Up!" : formatTime(state.timeLeft)}</div>
                          </div>
                          <div className="button-row wrap">
                            <Button onClick={() => startInvestigatorTimer(investigator.id)}>Start</Button>
                            <Button onClick={() => stopInvestigatorTimer(investigator.id)} variant="secondary">Stop</Button>
                            <Button onClick={() => resetInvestigatorTimer(investigator.id)} variant="secondary">Reset</Button>
                          </div>
                          <div className="button-row split">
                            <Button
                              onClick={() => setInvestigatorVote(investigator.id, "up")}
                              variant={state.vote === "up" ? "success" : "secondary"}
                            >
                              Thumbs Up
                            </Button>
                            <Button
                              onClick={() => setInvestigatorVote(investigator.id, "down")}
                              variant={state.vote === "down" ? "danger" : "secondary"}
                            >
                              Thumbs Down
                            </Button>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>

                <div className="button-row">
                  <Button onClick={() => setStage("response")} variant="secondary">Back to Response Plan</Button>
                  <Button onClick={() => setStage("final")} disabled={!allInvestigatorVotesComplete}>Final Score</Button>
                </div>
              </div>
            )}

            {stage === "final" && score && scenario && selectedTool && modifier && (
              <div className="page-stack">
                <div className="card-grid three-up">
                  <BigCard title={scenario.title} description={scenario.description} accentClass="accent-green" />
                  <BigCard title={selectedTool.title} subtitle={selectedTool.subtitle} description={selectedTool.description} accentClass="accent-blue" />
                  <BigCard title={modifier.title} description={modifier.description} accentClass="accent-pink" />
                </div>

                <Card>
                  <div className="score-grid">
                    <div className="score-header">
                      <div className="panel-label">Final Score Page</div>
                      <div className="score-verdict">{verdict}</div>
                    </div>
                    <div className="summary-grid">
                      <div className="summary-box">
                        <div className="summary-label">Final Cost</div>
                        <div className="summary-value money">${score.finalCost.toLocaleString()}</div>
                      </div>
                      <div className="summary-box">
                        <div className="summary-label">Investigator Votes</div>
                        <div className="summary-value">{score.thumbs.up} / {score.thumbs.down}</div>
                      </div>
                      <div className="summary-box">
                        <div className="summary-label">Host Adjustments</div>
                        <div className="summary-value">{bonuses.length}</div>
                      </div>
                      <div className="summary-box">
                        <div className="summary-label">Fit Gaps</div>
                        <div className="summary-value small">S {clamp(score.gaps.s, -9, 9)} · C {clamp(score.gaps.c, -9, 9)} · O {clamp(score.gaps.o, -9, 9)}</div>
                      </div>
                    </div>
                  </div>
                </Card>

                <div className="button-row">
                  <Button onClick={resetGame}>Start New Round</Button>
                </div>
              </div>
            )}
          </div>

          <div>
            <Card className="host-panel">
              <div className="panel-label">Host control panel</div>
              <div className="host-title">Live scoring controls</div>

              <div className="host-section">
                <div className="host-section-title">Host bonuses / penalties</div>
                <div className="host-button-list">
                  {hostAdjustments.map((item) => {
                    const active = bonusIds.includes(item.id);
                    return (
                      <button
                        key={item.id}
                        onClick={() => toggleBonus(item.id)}
                        className={`host-adjustment ${active ? (item.type === "penalty" ? "host-adjustment-penalty" : "host-adjustment-bonus") : ""}`}
                      >
                        <span>{item.label}</span>
                        <span className="host-adjustment-type">{item.type}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="host-section">
                <div className="host-section-title">Live adjustment feed</div>
                <AdjustmentTicker feed={adjustmentFeed} />
              </div>

              {stage === "final" && score ? (
                <div className="host-math-box">
                  <div className="host-section-title">Host-only math</div>
                  <div className="math-grid">
                    <div>Base Cost</div>
                    <div className="math-value">${score.baseCost.toLocaleString()}</div>
                    <div>Scenario / Tool Fit</div>
                    <div className="math-value">{score.mismatchCost >= 0 ? "+" : "-"}${Math.abs(score.mismatchCost).toLocaleString()}</div>
                    <div>Host Adjustments</div>
                    <div className="math-value">{score.bonusDelta >= 0 ? "+" : "-"}${Math.abs(score.bonusDelta).toLocaleString()}</div>
                    <div>Investigator Votes</div>
                    <div className="math-value">{score.investigatorDelta >= 0 ? "+" : "-"}${Math.abs(score.investigatorDelta).toLocaleString()}</div>
                    <div className="math-total-label">Final Cost</div>
                    <div className="math-total-value">${score.finalCost.toLocaleString()}</div>
                  </div>
                </div>
              ) : (
                <div className="host-note">
                  Dollar math stays hidden during the live round. The full scoring breakdown appears on the final score page only.
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
