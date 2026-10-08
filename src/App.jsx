import React, { useState, useRef, useMemo, useCallback, useEffect } from "react";

// ---------- Data ----------
const NODES = {
  Europunk: { label: "Europunk", color: "#f50be2ff", info: "Europunk <noun> Denotes an aesthetically-oriented genre of speculative fiction based on the noun to which it is suffixed, in this case based on the successful realisation of the European Ideal and fulfillment of the European Project. But how does one become a true Europunk? Truth is, there are many ways..." },
  Europarliament: { label: "European Parliament, Brussels", color: "#ef4444", info: "In Varietate Concordia. The goal of uniting Europe isn't owned by any single ideology; it takes all kinds to build a United Europe." },
  Left: { label: "GUE/NGL", color: "#3b82f6", info: "Eight planets divided into rocky inner worlds and gas/ice giants. All orbit the Sun in roughly the same plane." },
  Green: { label: "Greens/EFA", color: "#a7837f", info: "Smallest planet, closest to the Sun. A year lasts 88 Earth days; surface temperatures swing from -180°C to 430°C." },
  SnD: { label: "S&D", color: "#22c55e", info: "The only known world with life. 71% of its surface is ocean, and it has a single large moon that stabilises its axial tilt." },
  Renew: { label: "Renew Europe", color: "#dc7726", info: "The 'Red Planet', coloured by iron oxide dust. Home to Olympus Mons, the tallest volcano in the solar system (21 km high)." },
  EPP: { label: "EPP", color: "#eab308", info: "The largest planet — more than twice as massive as all others combined. Its Great Red Spot is a storm wider than Earth." },
  ECR: { label: "ECR", color: "#facc15", info: "Famous for its spectacular ring system of ice and rock. It's less dense than water — it would float in a big enough bathtub." },
  PfE: { label: "PfE/ESN", color: "#8b5cf6", info: "Natural satellites. Earth has 1, Mars 2, Jupiter has 95+ confirmed, and Saturn leads with 140+." },
  Pan-European-Solidarity: { label: "Pan-European Solidarity", color: "#94a3b8", info: "Earth's only natural satellite, likely formed when a Mars-sized body struck the young Earth. It drifts 3.8 cm farther away each year." },
  PES-Books: { label: "Library", color: "#aaaaa5", info: "Want to learn more about Pan-European Solidarity, or just want to maximise the accuracy of your LARPs? Get started here."},
  PES-Peeps: { label: "Notable Figures", color: "#aaaaa6", info: "Want to know more about the influential figures associated with Pan-European Solidarity and who shaped its history? Or maybe you just want to know who to LARP as in your discord PFP...?"},
  Degrowth-Socialism: { label: "Degrowth Socialism", color: "#64748b", info: "A ring of rocky debris between Mars and Jupiter — leftovers from the system's formation that Jupiter's gravity never let clump into a planet." },
  DS-Books: { label: "Library", color: "#aaaaa7", info: "Want to learn more about Degrowth Socialism, or just want to maximise the accuracy of your LARPs? Get started here."},
  DS-Peeps: { label: "Notable Figures", color: "#aaaaa8", info: "Want to know more about the influential figures associated with Degrowth Socialism and who shaped its history? Or maybe you just want to know who to LARP as in your discord PFP...?"},
  Welfare-Europeanism: { label: "Welfare Europeanism", color: "#aaaaaa", info: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"},
  WE-Books: { label: "Library", color: "#aaaaa9", info: "Want to learn more about Welfare Europeanism, or just want to maximise the accuracy of your LARPs? Get started here."},
  WE-Peeps: { label: "Notable Figures", color: "#aaaaba", info: "Want to know more about the influential figures associated with Welfare Europeanism and who shaped its history? Or maybe you just want to know who to LARP as in your discord PFP...?"},
  Sustainable-Democracy: { label: "Sustainable Democracy", color: "#aaaaab", info: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"},
  SD-Books: { label: "Library", color: "#aaaabb", info: "Want to learn more about Sustainable Democracy, or just want to maximise the accuracy of your LARPs? Get started here."},
  SD-Peeps: { label: "Notable Figures", color: "#aaaabc", info: "Want to know more about the influential figures associated with Sustainable Democracy and who shaped its history? Or maybe you just want to know who to LARP as in your discord PFP...?"},
  Euroliberalism: { label: "Euroliberalism", color: "#aaaaac", info: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"},
  EL-Books: { label: "Library", color: "#aaaabd", info: "Want to learn more about Euroliberalism, or just want to maximise the accuracy of your LARPs? Get started here."},
  EL-Peeps: { label: "Notable Figures", color: "#aaaabe", info: "Want to know more about the influential figures associated with Euroliberalism and who shaped its history? Or maybe you just want to know who to LARP as in your discord PFP...?"},
  Abundance-Liberalism: { label: "Abundance Liberalism", color: "#aaaaad", info: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"},
  AL-Books: { label: "Library", color: "#aaaabf", info: "Want to learn more about Euroliberalism, or just want to maximise the accuracy of your LARPs? Get started here."},
  AL-Peeps: { label: "Notable Figures", color: "#aaaab1", info: "Want to know more about the influential figures associated with Euroliberalism and who shaped its history? Or maybe you just want to know who to LARP as in your discord PFP...?"},
  Techno-Optimism: { label: "Techno-Optimism", color: "#aaaaae", info: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"},
  TO-Books: { label: "Library", color: "#aaaab2", info: "Want to learn more about Techno-Optimism, or just want to maximise the accuracy of your LARPs? Get started here."},
  TO-Peeps: { label: "Notable Figures", color: "#aaaab3", info: "Want to know more about the influential figures associated with Techno-Optimism and who shaped its history? Or maybe you just want to know who to LARP as in your discord PFP...?"},
  Pan-European-Konservatismus: { label: "Pan-European Konservatismus", color: "#aaaaaf", info: "xxxxxxxxxxxxxxxxxxxxxxxxxx"},
  PEK-Books: { label: "Library", color: "#aaaab4", info: "Want to learn more about Pan-European Konservatismus, or just want to maximise the accuracy of your LARPs? Get started here."},
  PEK-Peeps: { label: "Notable Figures", color: "#aaaab5", info: "Want to know more about the influential figures associated with Pan-European Konservatismus and who shaped its history? Or maybe you just want to know who to LARP as in your discord PFP...?"},
  Elysée-Europeanism: { label: "Elysée Europeanism", color: "#aaaaa1", info: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"},
  EE-Books: { label: "Library", color: "#aaaab6", info: "Want to learn more about Elysée Europeanism, or just want to maximise the accuracy of your LARPs? Get started here."},
  EE-Peeps: { label: "Notable Figures", color: "#aaaab7", info: "Want to know more about the influential figures associated with Elysée Europeanism and who shaped its history? Or maybe you just want to know who to LARP as in your discord PFP...?"},
  Soft-Euroscepticism: { label: "Soft Euroscepticism", color: "#aaaaa2", info: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"},
  SE-Books: { label: "Library", color: "#aaaab8", info: "Want to learn more about Soft Euroscepticism, or just want to maximise the accuracy of your LARPs? Get started here."},
  SE-Peeps: { label: "Notable Figures", color: "#aaaab9", info: "Want to know more about the influential figures associated with Soft Euroscepticism and who shaped its history? Or maybe you just want to know who to LARP as in your discord PFP...?"},
  Hard-Euroscepticism: { label: "Hard Euroscepticism", color: "#aaaaa3", info: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"},
  HE-Books: { label: "Library", color: "#aaaaca", info: "Want to learn more about Hard Euroscepticism, or just want to maximise the accuracy of your LARPs? Get started here."},
  HE-Peeps: { label: "Notable Figures", color: "#aaaacb", info: "Want to know more about the influential figures associated with Hard Euroscepticism and who shaped its history? Or maybe you just want to know who to LARP as in your discord PFP...?"},
  Pan-European-Nationalism: { label: "Pan-European Nationalism", color: "#aaaaa4", info: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"},
  PEN-Books: { label: "Library", color: "#aaaacb", info: "Want to learn more about Pan-European Nationalism, or just want to maximise the accuracy of your LARPs? Get started here."},
  PEN-Peeps: { label: "Notable Figures", color: "#aaaacc", info: "Want to know more about the influential figures associated with Pan-European Nationalism and who shaped its history? Or maybe you just want to know who to LARP as in your discord PFP...?"},
};

const LINKS = {
  Europunk: ["Europarliament"],
  Europarliament: ["Left", "Green", "SnD", "Renew", "EPP", "ECR", "PfE"],
  Left: ["Pan-European-Solidarity", "Degrowth-Socialism"],
  Green: ["Degrowth-Socialism", "Sustainable-Democracy"],
  SnD: ["Welfare-Europeanism", "Sustainable-Democracy"],
  Renew: ["Euroliberalism", "Abundance-Liberalism", "Techno-Optimism"], 
  EPP: ["Elysée-Europeanism", "Pan-European-Konservatismus"], 
  ECR: ["Soft-Euroscepticism"], 
  PfE: ["Hard-Euroscepticism", "Pan-European-Nationalism"],
  Pan-European-Solidarity: ["PES-Books", "PES-Peeps"],
  Degrowth-Socialism: ["DS-Books", "DS-Peeps"],
  Sustainable-Democracy: ["SD-Books", "SD-Peeps"],
  Welfare-Europeanism: ["WE-Books", "WE-Peeps"],
  Euroliberalism: ["EL-Books", "EL-Peeps"],
  Abundance-Liberalism: ["AL-Books", "AL-Peeps"],
  Techno-Optimism: ["TO-Books", "TO-Peeps"],
  Elysée-Europeanism: ["EE-Books", "EE-Peeps"],
  Pan-European-Konservatismus: ["PEK-Books", "PEK-Peeps"],
  Soft-Euroscepticism: ["SE-Books", "SE-Peeps"],
  Hard-Euroscepticism: ["HE-Books", "HE-Peeps"],
  Pan-European-Nationalism: ["PEN-Books", "PEN-Peeps"]
};

const ROOT = "Europunk";

// ---------- Layout: radial tree from root ----------
function layout() {
  const pos = { [ROOT]: { x: 0, y: 0 } };
  function place(nodeId, depth, angleCenter, angleSpan) {
    const children = LINKS[nodeId] || [];
    if (!children.length) return;
    const r = 150 + depth * 110;
    children.forEach((childId, i) => {
      const a = angleCenter - angleSpan / 2 + (angleSpan / (children.length + 1)) * (i + 1);
      pos[childId] = { x: pos[nodeId].x + r * Math.cos(a), y: pos[nodeId].y + r * Math.sin(a) };
      place(childId, depth + 1, a, Math.min(angleSpan, (Math.PI * 2) / 3));
    });
  }
  place(ROOT, 0, -Math.PI / 2, Math.PI * 2);
  return pos;
}

// depth of each node
function depths() {
  const d = { [ROOT]: 0 };
  const walk = (id) => (LINKS[id] || []).forEach((c) => { d[c] = d[id] + 1; walk(c); });
  walk(ROOT);
  return d;
}

export default function App() {
  const positions = useMemo(() => layout(), []);
  const depthOf = useMemo(() => depths(), []);

  // focusId: the node the camera is currently zoomed into. null = root overview.
  const [focusId, setFocusId] = useState(null);
  const [selected, setSelected] = useState(null);
  const [anim, setAnim] = useState(0); // increments to retrigger CSS transition
  const clickTimer = useRef(null);
  const svgRef = useRef(null);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [userZoom, setUserZoom] = useState(1);
  const dragRef = useRef(null);
  const movedRef = useRef(false);

  const current = focusId ?? ROOT;

  // Which nodes are visible? Full ancestor path of focus + all descendants of focus + siblings along path.
  const path = useMemo(() => {
    // build parent map
    const parent = {};
    Object.keys(LINKS).forEach((p) => (LINKS[p] || []).forEach((c) => (parent[c] = p)));
    const chain = [];
    let n = focusId;
    while (n) { chain.unshift(n); n = parent[n]; }
    if (focusId) chain.unshift(ROOT);
    return chain;
  }, [focusId]);

  const visible = useMemo(() => {
    if (!focusId) return new Set([ROOT, ...(LINKS[ROOT] || [])]);
    const set = new Set(path);
    // descendants of the focus node
    const add = (id) => (LINKS[id] || []).forEach((c) => { set.add(c); add(c); });
    add(focusId);
    return set;
  }, [path, focusId]);

  const edges = useMemo(() => {
    const list = [];
    Object.keys(LINKS).forEach((p) =>
      (LINKS[p] || []).forEach((c) => { if (visible.has(p) && visible.has(c)) list.push([p, c]); })
    );
    return list;
  }, [visible]);

  // Camera: center on current node, zoom in when focused.
  const cam = useMemo(() => {
    const p = positions[current];
    const zoom = focusId ? 1.6 : 1;
    return { x: p.x, y: p.y, zoom };
  }, [current, focusId, positions]);

  // Wheel zoom (about the cursor) — attached non-passively so we can preventDefault
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const onWheel = (e) => {
      e.preventDefault();
      const rect = svg.getBoundingClientRect();
      const s = {
        x: ((e.clientX - rect.left) / rect.width) * VP_W - VP_W / 2,
        y: ((e.clientY - rect.top) / rect.height) * VP_H - VP_H / 2,
      };
      const f = e.deltaY < 0 ? 1.15 : 1 / 1.15;
      setUserZoom((z) => {
        const nz = Math.min(3, Math.max(0.4, z * f));
        const k = nz / z;
        setPan((p) => ({ x: s.x - k * (s.x - p.x), y: s.y - k * (s.y - p.y) }));
        return nz;
      });
    };
    svg.addEventListener("wheel", onWheel, { passive: false });
    return () => svg.removeEventListener("wheel", onWheel);
  }, []);

  // Single click: select (show info). Double click: zoom in.
  const handleClick = useCallback((id) => {
    if (movedRef.current) return;
    if (clickTimer.current) { clearTimeout(clickTimer.current); clickTimer.current = null; return; }
    clickTimer.current = setTimeout(() => { clickTimer.current = null; setSelected(id); }, 220);
  }, []);

  const handleDblClick = useCallback((id) => {
    if (movedRef.current) return;
    if (clickTimer.current) { clearTimeout(clickTimer.current); clickTimer.current = null; }
    if (!(LINKS[id] || []).length) { setSelected(id); return; } // leaf: just show info
    setPan({ x: 0, y: 0 });
    setUserZoom(1);
    setFocusId(id);
    setAnim((a) => a + 1);
  }, []);

  // Clicking a faded ancestor: zoom back out to it; its descendants' deeper levels vanish.
  const handleAncestorClick = useCallback((id) => {
    if (movedRef.current) return;
    setPan({ x: 0, y: 0 });
    setUserZoom(1);
    setFocusId(id === ROOT ? null : id);
    setAnim((a) => a + 1);
  }, []);

  // Opacity per node based on its relation to current focus.
  const opacityFor = useCallback((id) => {
    if (id === current) return 1;
    if (path.includes(id)) return 0.45;                 // faded higher level (breadcrumb)
    if (depthOf[id] > depthOf[current]) return 1;      // revealed deeper level
    return 0.15;                                        // out-of-focus siblings
  }, [current, path, depthOf]);

  const sel = selected ? NODES[selected] : null;
  const VP_W = 640, VP_H = 520;

  return (
    <div className="w-full h-full flex flex-col bg-slate-950 text-slate-100" style={{ minHeight: 600 }}>
      <div className="px-5 py-3 border-b border-slate-800 flex items-center gap-3">
        <div>
          <h1 className="text-base font-semibold tracking-wide">◌ The Europunk Digital Library ◌</h1>
          <p className="text-xs text-slate-400">
            Click = info · Double-click = zoom into connections · Click a faded node = go back up
          </p>
        </div>
        {focusId && (
          <button
            className="ml-auto text-xs bg-slate-800 hover\:bg-slate-700 rounded-md px-3 py-1.5 transition-colors"
            onClick={() => handleAncestorClick(ROOT)}
          >
            ↩ Overview
          </button>
        )}
      </div>

      <div className="flex flex-1 min-h-0">
        <div className="flex-1 relative overflow-hidden">
          <svg
            ref={svgRef}
            className="absolute inset-0 w-full h-full"
            viewBox={`${-VP_W / 2} ${-VP_H / 2} ${VP_W} ${VP_H}`}
            style={{ cursor: "grab" }}
            onPointerDown={(e) => {
              dragRef.current = { sx: e.clientX, sy: e.clientY, pan };
              movedRef.current = false;
            }}
            onPointerMove={(e) => {
              if (!dragRef.current) return;
              const rect = svgRef.current.getBoundingClientRect();
              const dx = ((e.clientX - dragRef.current.sx) / rect.width) * VP_W;
              const dy = ((e.clientY - dragRef.current.sy) / rect.height) * VP_H;
              if (Math.abs(dx) + Math.abs(dy) > 3) movedRef.current = true;
              setPan({ x: dragRef.current.pan.x + dx, y: dragRef.current.pan.y + dy });
            }}
            onPointerUp={() => { dragRef.current = null; }}
            onPointerLeave={() => { dragRef.current = null; }}
          >
            <defs>
              <marker id="arrow" markerWidth="8" markerHeight="8" refX="20" refY="4" orient="auto">
                <path d="M0,0 L8,4 L0,8 Z" fill="#475569" />
              </marker>
            </defs>

            <g transform={`translate(${pan.x},${pan.y}) scale(${userZoom})`}>
            <g
              key={anim}
              style={{ transition: "transform 600ms cubic-bezier(0.4, 0, 0.2, 1)" }}
              transform={`translate(${-cam.x * cam.zoom},${-cam.y * cam.zoom}) scale(${cam.zoom})`}
            >
              {edges.map(([p, c]) => {
                const a = positions[p], b = positions[c];
                const op = Math.min(opacityFor(p), opacityFor(c));
                const active = selected === p || selected === c;
                return (
                  <line
                    key={p + "-" + c}
                    x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                    stroke={active ? "#38bdf8" : "#475569"}
                    strokeWidth={active ? 2 / cam.zoom + 0.6 : 1.2}
                    markerEnd="url(#arrow)"
                    opacity={op}
                    style={{ transition: "opacity 600ms" }}
                  />
                );
              })}

              {Array.from(visible).map((id) => {
                const n = NODES[id];
                const p = positions[id];
                const op = opacityFor(id);
                const isCurrent = id === current;
                const hasKids = (LINKS[id] || []).length > 0;
                const r = id === ROOT ? 34 : 24;
                const inPath = path.includes(id) && id !== current;
                return (
                  <g
                    key={id}
                    transform={`translate(${p.x},${p.y})`}
                    opacity={op}
                    style={{ transition: "opacity 600ms, transform 600ms", cursor: "pointer" }}
                    onClick={() => (inPath ? handleAncestorClick(id) : handleClick(id))}
                    onDoubleClick={() => !inPath && handleDblClick(id)}
                  >
                    {isCurrent && (
                      <circle r={r + 8} fill="none" stroke={n.color} strokeWidth="1.5" opacity="0.5">
                        <animate attributeName="r" from={r + 2} to={r + 8} dur="1.2s" repeatCount="indefinite" />
                      </circle>
                    )}
                    <circle
                      r={r}
                      fill={selected === id ? n.color : "#1e293b"}
                      stroke={n.color}
                      strokeWidth={isCurrent ? 3 : 2.5}
                    />
                    <text
                      textAnchor="middle"
                      y={r + 18}
                      fill="#e2e8f0"
                      fontSize="11"
                      fontWeight="600"
                    >
                      {n.label}
                    </text>
                    {hasKids && depthOf[id] > depthOf[current] && (
                      <g>
                        <circle r="9" cx="18" cy="-18" fill={n.color} stroke="#0f172a" strokeWidth="1.5" />
                        <text textAnchor="middle" x="18" y="-14.5" fontSize="10" fontWeight="bold" fill="#0f172a">+</text>
                      </g>
                    )}
                    {inPath && (
                      <text textAnchor="middle" y={-r - 12} fontSize="9" fill="#94a3b8" fontStyle="italic">
                        ↩ back
                      </text>
                    )}
                  </g>
                );
              })}
            </g>
            </g>
          </svg>

          <div className="absolute bottom-3 left-3 text-[11px] text-slate-500 bg-slate-900/70 rounded px-3 py-2 backdrop-blur">
            <div><span className="text-slate-300 font-semibold">Click</span> → info panel</div>
            <div><span className="text-slate-300 font-semibold">Double-click</span> → zoom into node &amp; reveal next level</div>
            <div><span className="text-slate-300 font-semibold">Click faded node</span> → climb back up</div>
            <div><span className="text-slate-300 font-semibold">Drag / scroll</span> → pan &amp; zoom freely</div>
          </div>
        </div>

        <div className="w-72 shrink-0 border-l border-slate-800 bg-slate-900/60 p-4 overflow-y-auto">
          {sel ? (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-3 h-3 rounded-full inline-block" style={{ background: sel.color }} />
                <h2 className="text-sm font-semibold">{sel.label}</h2>
              </div>
              <p className="text-xs leading-relaxed text-slate-300">{sel.info}</p>
              <div className="mt-4 pt-3 border-t border-slate-800">
                <p className="text-[11px] text-slate-500">
                  {(LINKS[selected] || []).length > 0
                    ? `${LINKS[selected].length} linked node${LINKS[selected].length === 1 ? "" : "s"} · double-click to zoom in`
                    : "Leaf node — no further links."}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-xs text-slate-500 leading-relaxed">
              <p className="font-semibold text-slate-300 mb-2">Nothing selected</p>
              <p>Click a node for info. Double-click a <span className="text-slate-300">+</span> node to zoom in and reveal the next level — previous levels fade so you always know where you are. Click a faded node to go back.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}