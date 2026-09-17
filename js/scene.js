import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { CSS2DObject, CSS2DRenderer } from "three/addons/renderers/CSS2DRenderer.js";
import { DOMAIN_COLORS, TRAITS, TREE } from "./data.js";

const GOLD = 0xe2b84a;
const GOLD_GLOW = 0xf3d27a;
const GHOST = 0xb7cbb8;

function hash01(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i += 1) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return ((h >>> 0) % 10000) / 10000;
}

function toVec(arr) {
  return new THREE.Vector3(arr[0], arr[1], arr[2]).normalize();
}

function orthonormal(axis) {
  const helper =
    Math.abs(axis.y) < 0.92 ? new THREE.Vector3(0, 1, 0) : new THREE.Vector3(1, 0, 0);
  const right = new THREE.Vector3().crossVectors(axis, helper).normalize();
  const up = new THREE.Vector3().crossVectors(right, axis).normalize();
  return { right, up };
}

function layout(node, parentPos, parentDir, depth) {
  const dir = node.direction ? toVec(node.direction) : parentDir.clone().normalize();
  const length = node.length ?? 1;
  const pos = parentPos.clone().add(dir.clone().multiplyScalar(length));
  node.pos = pos;
  node.depth = depth;
  node.parentDir = dir;

  const children = node.children ?? [];
  if (!children.length) return;

  const { right, up } = orthonormal(dir);
  const spread = node.spread ?? Math.max(0.22, 0.92 / Math.sqrt(depth + 1.15));
  const golden = Math.PI * (3 - Math.sqrt(5));

  children.forEach((child, i) => {
    child.parentId = node.id;
    child.domain = child.domain ?? node.domain;
    if (child.direction) {
      layout(child, pos, toVec(child.direction), depth + 1);
      return;
    }
    const t = (i + 0.55) / children.length;
    const angle = i * golden + hash01(child.id) * 0.7;
    const radius = spread * Math.sqrt(t);
    const jitter = 0.22;
    const childDir = dir
      .clone()
      .add(right.clone().multiplyScalar(Math.cos(angle) * radius))
      .add(up.clone().multiplyScalar(Math.sin(angle) * radius))
      .add(
        new THREE.Vector3(
          (hash01(child.id) - 0.5) * jitter,
          (hash01(`${child.id}-y`) - 0.5) * jitter,
          (hash01(`${child.id}-z`) - 0.5) * jitter
        )
      )
      .normalize();
    layout(child, pos, childDir, depth + 1);
  });
}

function flatten(node, list = []) {
  list.push(node);
  (node.children ?? []).forEach((child) => flatten(child, list));
  return list;
}

function ancestorsOf(byId, id) {
  const list = [];
  let cur = byId.get(id);
  while (cur) {
    list.push(cur.id);
    cur = cur.parentId ? byId.get(cur.parentId) : null;
  }
  return list;
}

function mrcaId(byId, ids) {
  const lists = ids.map((id) => ancestorsOf(byId, id));
  for (const candidate of lists[0] ?? []) {
    if (lists.every((list) => list.includes(candidate))) return candidate;
  }
  return "root";
}

function firstNonRootAncestor(byId, tipId) {
  const chain = ancestorsOf(byId, tipId).filter((id) => id !== "root");
  return chain[chain.length - 1] ?? tipId;
}

function pathBetween(byId, ancestorId, tipId) {
  const ids = new Set();
  let cur = byId.get(tipId);
  while (cur) {
    ids.add(cur.id);
    if (cur.id === ancestorId) break;
    cur = cur.parentId ? byId.get(cur.parentId) : null;
  }
  return ids;
}

function descendantTips(node) {
  const tips = [];
  const walk = (n) => {
    const kids = n.children ?? [];
    if (!kids.length) tips.push(n);
    else kids.forEach(walk);
  };
  walk(node);
  return tips;
}

function floorTexture() {
  const size = 1024;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  const cx = size * 0.5;
  const cy = size * 0.5;

  const wash = ctx.createRadialGradient(cx, cy, size * 0.12, cx, cy, size * 0.5);
  wash.addColorStop(0, "rgba(148, 180, 150, 0.26)");
  wash.addColorStop(0.38, "rgba(108, 148, 114, 0.12)");
  wash.addColorStop(0.7, "rgba(48, 78, 56, 0.045)");
  wash.addColorStop(1, "rgba(11, 24, 16, 0)");
  ctx.fillStyle = wash;
  ctx.fillRect(0, 0, size, size);

  const shadow = ctx.createRadialGradient(
    size * 0.44,
    size * 0.56,
    size * 0.04,
    size * 0.44,
    size * 0.56,
    size * 0.32
  );
  shadow.addColorStop(0, "rgba(8, 16, 10, 0.2)");
  shadow.addColorStop(0.4, "rgba(10, 20, 12, 0.08)");
  shadow.addColorStop(1, "rgba(11, 24, 16, 0)");
  ctx.fillStyle = shadow;
  ctx.fillRect(0, 0, size, size);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function makeCurve(start, end, id) {
  const mid = start.clone().lerp(end, 0.5);
  const dir = end.clone().sub(start);
  const len = dir.length();
  const { right, up } = orthonormal(dir.clone().normalize());
  const bend = 0.16 + hash01(id) * 0.18;
  const angle = hash01(`${id}-a`) * Math.PI * 2;
  mid.add(right.multiplyScalar(Math.cos(angle) * len * bend));
  mid.add(up.multiplyScalar(Math.sin(angle) * len * bend * 0.8));
  return new THREE.QuadraticBezierCurve3(start, mid, end);
}

function branchRadius(depth, isTip) {
  const base = 0.016 * Math.pow(0.76, depth);
  return Math.max(isTip ? 0.0038 : 0.005, base);
}

export function createTreeScene(container, { onTraitChange } = {}) {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const stageHint = document.querySelector(".stage-hint");

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x111f16, 0.018);
  scene.background = null;

  const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 120);
  camera.position.set(7.4, 4.6, 10.2);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);

  const labelRenderer = new CSS2DRenderer();
  labelRenderer.domElement.className = "label-renderer";
  container.appendChild(labelRenderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.enablePan = false;
  controls.minDistance = 6;
  controls.maxDistance = 28;
  controls.autoRotate = !reducedMotion;
  controls.autoRotateSpeed = 0.48;
  controls.target.set(0, 0.2, 0);
  renderer.domElement.style.cursor = "grab";
  controls.addEventListener("start", () => {
    renderer.domElement.style.cursor = "grabbing";
  });
  controls.addEventListener("end", () => {
    renderer.domElement.style.cursor = activeTrait ? "pointer" : "grab";
  });

  scene.add(new THREE.AmbientLight(0xb7c4b0, 0.55));
  const key = new THREE.DirectionalLight(0xf4efe2, 0.85);
  key.position.set(4, 8, 6);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xe2b84a, 0.35);
  rim.position.set(-6, 2, -4);
  scene.add(rim);
  const floorFill = new THREE.HemisphereLight(0xc5dcc4, 0x111f16, 0.22);
  scene.add(floorFill);

  TREE.direction = [0, 1, 0];
  TREE.length = 0;
  layout(TREE, new THREE.Vector3(0, 0.15, 0), new THREE.Vector3(0, 1, 0), 0);

  const nodes = flatten(TREE);
  const byId = new Map(nodes.map((n) => [n.id, n]));
  nodes.forEach((n) => {
    if (n.parentId) n.parent = byId.get(n.parentId);
  });

  const treeGroup = new THREE.Group();
  scene.add(treeGroup);

  const baseMat = new THREE.MeshStandardMaterial({
    color: 0x7fb389,
    roughness: 0.48,
    metalness: 0.08,
    transparent: true,
    opacity: 1,
  });
  const ghostMat = new THREE.MeshStandardMaterial({
    color: GHOST,
    roughness: 0.7,
    metalness: 0,
    transparent: true,
    opacity: 0.11,
    depthWrite: false,
  });
  const glowMat = new THREE.MeshBasicMaterial({
    color: GOLD,
    transparent: true,
    opacity: 0,
    depthWrite: false,
  });
  const haloMat = new THREE.MeshBasicMaterial({
    color: GOLD_GLOW,
    transparent: true,
    opacity: 0,
    depthWrite: false,
  });

  const branches = [];
  const tipMeshes = [];

  function addBranch(parentPos, node) {
    const curve = makeCurve(parentPos, node.pos, node.id);
    const isTip = !node.children?.length;
    const radius = branchRadius(node.depth, isTip);
    const geo = new THREE.TubeGeometry(curve, 22, radius, 6, false);
    const glowGeo = new THREE.TubeGeometry(curve, 18, radius * 1.8, 5, false);
    const haloGeo = new THREE.TubeGeometry(curve, 12, radius * 3.2, 5, false);

    const mat = baseMat.clone();
    mat.color.setHex(DOMAIN_COLORS[node.domain] ?? DOMAIN_COLORS.eukaryotes);

    const mesh = new THREE.Mesh(geo, mat);
    const glow = new THREE.Mesh(glowGeo, glowMat.clone());
    const halo = new THREE.Mesh(haloGeo, haloMat.clone());
    glow.visible = false;
    halo.visible = false;

    treeGroup.add(mesh, glow, halo);
    branches.push({
      id: node.id,
      parentId: node.parentId,
      domain: node.domain,
      mesh,
      glow,
      halo,
      baseColor: mat.color.clone(),
    });

    const cap = new THREE.Mesh(
      new THREE.SphereGeometry(isTip ? Math.max(radius * 2.1, 0.012) : radius * 1.2, 10, 8),
      mat.clone()
    );
    cap.position.copy(node.pos);
    treeGroup.add(cap);
    node.cap = cap;
    if (isTip) tipMeshes.push({ id: node.id, mesh: cap });
  }

  nodes.forEach((node) => {
    if (node.id === "root") return;
    const parent = node.parentId ? byId.get(node.parentId) : TREE;
    addBranch(parent.pos, node);
  });

  const rootCap = new THREE.Mesh(
    new THREE.SphereGeometry(0.048, 18, 14),
    new THREE.MeshStandardMaterial({
      color: GOLD,
      emissive: GOLD,
      emissiveIntensity: 0.55,
      roughness: 0.32,
    })
  );
  rootCap.position.copy(TREE.pos);
  treeGroup.add(rootCap);

  const burst = new THREE.Group();
  burst.position.copy(TREE.pos);
  const rayMat = new THREE.MeshBasicMaterial({
    color: GOLD,
    transparent: true,
    opacity: 0.62,
    depthWrite: false,
  });
  const rayMatSoft = new THREE.MeshBasicMaterial({
    color: 0xf3d27a,
    transparent: true,
    opacity: 0.28,
    depthWrite: false,
  });
  const rayCount = 24;
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < rayCount; i += 1) {
    const y = 1 - (i / (rayCount - 1)) * 2;
    const radius = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = goldenAngle * i;
    const dir = new THREE.Vector3(
      Math.cos(theta) * radius,
      y,
      Math.sin(theta) * radius
    ).normalize();
    const len = 0.11 + (i % 4) * 0.055;
    const ray = new THREE.Mesh(
      new THREE.CylinderGeometry(0.0032, 0.0008, len, 5),
      i % 2 === 0 ? rayMat : rayMatSoft
    );
    ray.position.copy(dir.clone().multiplyScalar(len * 0.58 + 0.04));
    ray.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
    burst.add(ray);
  }
  const burstHalo = new THREE.Mesh(
    new THREE.SphereGeometry(0.09, 16, 12),
    new THREE.MeshBasicMaterial({
      color: GOLD,
      transparent: true,
      opacity: 0.18,
      depthWrite: false,
    })
  );
  burst.add(burstHalo);
  treeGroup.add(burst);

  const rootLabelEl = document.createElement("div");
  rootLabelEl.className = "root-label";
  rootLabelEl.innerHTML = "<span>LUCA</span>";
  const rootLabel = new CSS2DObject(rootLabelEl);
  rootLabel.position.copy(TREE.pos.clone().add(new THREE.Vector3(0, -0.58, 0)));
  treeGroup.add(rootLabel);

  function attachLabel(node, text, className, towardTips, lift = 0.12) {
    const tips = descendantTips(node);
    const centroid = new THREE.Vector3();
    tips.forEach((tip) => centroid.add(tip.pos));
    if (tips.length) centroid.multiplyScalar(1 / tips.length);
    else centroid.copy(node.pos);
    const el = document.createElement("div");
    el.className = className;
    el.innerHTML = `<span>${text}</span>`;
    const obj = new CSS2DObject(el);
    const pos = node.pos.clone().lerp(centroid, towardTips);
    const out = centroid.clone().sub(node.pos);
    if (out.lengthSq() < 0.0004) out.copy(node.pos);
    out.normalize().multiplyScalar(0.22);
    obj.position.copy(pos.add(out).add(new THREE.Vector3(0, lift, 0)));
    treeGroup.add(obj);
    return { id: node.id, el, obj };
  }

  const domainLabels = ["eukaryotes", "archaea", "bacteria"].map((id) => {
    const node = byId.get(id);
    if (id === "eukaryotes") {
      const parent = byId.get(node.parentId) ?? TREE;
      const el = document.createElement("div");
      el.className = "domain-label";
      el.innerHTML = `<span>${node.name}</span>`;
      const obj = new CSS2DObject(el);
      const pos = parent.pos.clone().lerp(node.pos, 0.78);
      pos.y -= 0.48;
      obj.position.copy(pos);
      treeGroup.add(obj);
      return { id: node.id, el, obj };
    }
    return attachLabel(node, node.name, "domain-label", 0.32, 0.18);
  });

  const CLADE_LABELS = [
    { id: "plants", name: "Plants", toward: 0.48 },
    { id: "animals", name: "Animals", toward: 0.22 },
    { id: "insects", name: "Insects", toward: 0.62 },
    { id: "fishes", name: "Fish", toward: 0.58 },
    { id: "birds", name: "Birds", toward: 0.58 },
    { id: "mammals", name: "Mammals", toward: 0.55 },
  ];
  const cladeLabels = CLADE_LABELS.flatMap(({ id, name, toward }) => {
    const node = byId.get(id);
    return node ? [attachLabel(node, name, "clade-label", toward, 0.08)] : [];
  });
  const orbitLabels = [...domainLabels, ...cladeLabels];

  function frameTree() {
    const box = new THREE.Box3().setFromObject(treeGroup);
    const center = box.getCenter(new THREE.Vector3());
    treeGroup.position.sub(center);
    treeGroup.position.x -= 1.35;
    const fitted = new THREE.Box3().setFromObject(treeGroup);
    const size = fitted.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const dist = (maxDim / 2 / Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2)) * 1.18;
    camera.position.set(dist * 0.62, dist * 0.34, dist * 0.82);
    controls.target.set(0, 0.05, 0);
    controls.minDistance = dist * 0.55;
    controls.maxDistance = dist * 1.8;
    controls.update();
  }
  frameTree();

  const fitted = new THREE.Box3().setFromObject(treeGroup);
  const treeSize = fitted.getSize(new THREE.Vector3());
  const floorY = fitted.min.y - 0.22;
  const floorR = Math.max(treeSize.x, treeSize.z) * 0.9;
  const lucaWorld = TREE.pos.clone();
  treeGroup.localToWorld(lucaWorld);

  const floorMesh = new THREE.Mesh(
    new THREE.CircleGeometry(floorR, 80),
    new THREE.MeshBasicMaterial({
      map: floorTexture(),
      transparent: true,
      opacity: 1,
      depthWrite: false,
      depthTest: false,
      side: THREE.DoubleSide,
    })
  );
  floorMesh.renderOrder = -2;
  floorMesh.rotation.x = -Math.PI / 2;
  floorMesh.position.set(lucaWorld.x, floorY, lucaWorld.z);
  scene.add(floorMesh);

  const speciesLayer = document.querySelector("#species-layer");
  const cardsWrap = speciesLayer.querySelector(".species-cards");
  const leaderSvg = speciesLayer.querySelector(".leader-svg");
  const headline = speciesLayer.querySelector(".trait-headline");
  const headlineTitle = headline.querySelector("h2");
  const headlineDek = headline.querySelector(".trait-dek");
  let speciesPins = [];

  function clearSpeciesCards() {
    speciesPins = [];
    cardsWrap.innerHTML = "";
    leaderSvg.innerHTML = "";
    headlineTitle.textContent = "";
    headlineDek.textContent = "";
    speciesLayer.hidden = true;
  }

  function projectNode(node) {
    const world = node.pos.clone();
    treeGroup.localToWorld(world);
    world.project(camera);
    const w = container.clientWidth;
    const h = container.clientHeight;
    return {
      x: (world.x * 0.5 + 0.5) * w,
      y: (-world.y * 0.5 + 0.5) * h,
      behind: world.z > 1,
    };
  }

  function placeSpeciesCards(traitId, examples) {
    clearSpeciesCards();
    const trait = TRAITS[traitId];
    speciesLayer.hidden = false;
    headlineTitle.textContent = trait.label;
    headlineDek.textContent = trait.help;
    const ns = "http://www.w3.org/2000/svg";
    examples.forEach((species, index) => {
      const node = byId.get(species.tip);
      if (!node) return;
      const card = document.createElement("article");
      card.className = "species-card";
      card.style.animationDelay = `${index * 80}ms`;
      card.innerHTML = `
        ${species.image ? `<img src="${species.image}" alt="${species.name}">` : ""}
        <div class="species-copy">
          <h3>${species.name}</h3>
          <p class="latin">${species.latin}</p>
          <p class="blurb">${species.blurb}</p>
        </div>
      `;
      cardsWrap.appendChild(card);
      const line = document.createElementNS(ns, "path");
      line.setAttribute("class", "leader-line");
      const dot = document.createElementNS(ns, "circle");
      dot.setAttribute("class", "leader-dot");
      dot.setAttribute("r", "3.5");
      leaderSvg.append(line, dot);
      speciesPins.push({ node, card, line, dot });
    });
    layoutSpeciesPins();
  }

  function layoutSpeciesPins() {
    if (!speciesPins.length) return;
    const layer = speciesLayer.getBoundingClientRect();
    const margin = 16;
    const gap = 12;
    const cardW = 196;
    const headH = headline.offsetHeight || 90;
    let y = margin + headH + 12;
    speciesPins.forEach((pin) => {
      pin.screen = projectNode(pin.node);
      pin.card.style.left = `${layer.width - margin - cardW}px`;
      pin.card.style.top = `${y}px`;
      y += (pin.card.offsetHeight || 168) + gap;
    });

    speciesPins.forEach((pin) => {
      const cr = pin.card.getBoundingClientRect();
      const x1 = cr.left - layer.left;
      const y1 = cr.top + Math.min(cr.height * 0.38, 70) - layer.top;
      const x2 = pin.screen.x;
      const y2 = pin.screen.y;
      const midX = x1 - Math.max(40, (x1 - x2) * 0.4);
      pin.line.setAttribute("d", `M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`);
      pin.dot.setAttribute("cx", x2);
      pin.dot.setAttribute("cy", y2);
      pin.dot.setAttribute("opacity", pin.screen.behind ? "0.12" : "0.4");
      pin.line.setAttribute("opacity", pin.screen.behind ? "0.12" : "0.35");
    });
  }

  let activeTrait = null;
  let highlightSet = new Set();
  let distalSet = new Set();
  let highlightT = 0;

  function setHint(active) {
    if (!stageHint) return;
    stageHint.textContent = active
      ? "Drag to turn · Click the tree to reset"
      : "Drag to turn";
  }

  function setCursor() {
    renderer.domElement.style.cursor = activeTrait ? "pointer" : "grab";
  }

  function clearTrait() {
    if (!activeTrait) return null;
    activeTrait = null;
    highlightSet = new Set();
    distalSet = new Set();
    highlightT = 0;
    clearSpeciesCards();
    orbitLabels.forEach(({ el }) => el.classList.remove("is-dim"));
    setHint(false);
    setCursor();
    onTraitChange?.(null);
    return null;
  }

  function setTrait(traitId) {
    if (!traitId || activeTrait === traitId) return clearTrait();
    const trait = TRAITS[traitId];
    if (!trait) return null;
    activeTrait = traitId;
    const tipIds = trait.examples.map((ex) => ex.tip);
    const ancestor = mrcaId(byId, tipIds);
    highlightSet = new Set();
    distalSet = new Set();
    const startId = ancestor === "root" ? null : ancestor;
    tipIds.forEach((tip) => {
      const from = startId ?? firstNonRootAncestor(byId, tip);
      pathBetween(byId, from, tip).forEach((id) => {
        if (id !== "root") highlightSet.add(id);
      });
      distalSet.add(tip);
      const parent = byId.get(tip)?.parentId;
      if (parent && parent !== "root" && parent !== from) distalSet.add(parent);
    });
    placeSpeciesCards(traitId, trait.examples);
    orbitLabels.forEach(({ id, el }) => {
      const related = tipIds.some((tip) => ancestorsOf(byId, tip).includes(id));
      el.classList.toggle("is-dim", !related);
    });
    highlightT = 0;
    setHint(true);
    setCursor();
    onTraitChange?.(trait);
    return trait;
  }

  const pointer = { x: 0, y: 0, moved: false, down: false };
  renderer.domElement.addEventListener("pointerdown", (event) => {
    if (event.button !== 0) return;
    pointer.down = true;
    pointer.moved = false;
    pointer.x = event.clientX;
    pointer.y = event.clientY;
  });
  renderer.domElement.addEventListener("pointermove", (event) => {
    if (!pointer.down) return;
    if (Math.hypot(event.clientX - pointer.x, event.clientY - pointer.y) > 6) {
      pointer.moved = true;
    }
  });
  renderer.domElement.addEventListener("pointerup", (event) => {
    const wasClick = pointer.down && !pointer.moved;
    pointer.down = false;
    if (event.button !== 0 || !wasClick || !activeTrait) return;
    clearTrait();
  });
  renderer.domElement.addEventListener("pointercancel", () => {
    pointer.down = false;
  });

  const goldColor = new THREE.Color(GOLD);
  const ghostColor = new THREE.Color(GHOST);

  function applyHighlight(dt) {
    const active = highlightSet.size > 0;
    highlightT = THREE.MathUtils.clamp(highlightT + dt * (active ? 2.4 : 3.2), 0, 1);
    const t = highlightT;

    branches.forEach((branch) => {
      const on = !active || highlightSet.has(branch.id);
      const distal = distalSet.has(branch.id);
      const mat = branch.mesh.material;
      if (on && active) {
        mat.color.lerpColors(branch.baseColor, goldColor, distal ? t : 0.45 * t);
        mat.emissive = mat.emissive || new THREE.Color();
        mat.emissive.setHex(GOLD);
        mat.emissiveIntensity = (distal ? 0.55 : 0.12) * t;
        mat.opacity = 1;
        mat.transparent = false;
        mat.depthWrite = true;
        branch.glow.visible = distal;
        branch.halo.visible = distal;
        branch.glow.material.opacity = 0.9 * t;
        branch.halo.material.opacity = 0.2 * t;
      } else if (active) {
        mat.color.copy(branch.baseColor).lerp(ghostColor, 0.62 * t);
        mat.emissiveIntensity = 0;
        mat.transparent = true;
        mat.opacity = THREE.MathUtils.lerp(1, 0.5, t);
        mat.depthWrite = false;
        branch.glow.visible = false;
        branch.halo.visible = false;
      } else {
        mat.color.copy(branch.baseColor);
        mat.emissiveIntensity = 0;
        mat.transparent = true;
        mat.opacity = 1;
        mat.depthWrite = true;
        branch.glow.visible = false;
        branch.halo.visible = false;
      }
    });

    nodes.forEach((node) => {
      if (!node.cap) return;
      const on = !active || highlightSet.has(node.id);
      const distal = distalSet.has(node.id);
      const mat = node.cap.material;
      const base = new THREE.Color(DOMAIN_COLORS[node.domain] ?? GOLD);
      if (on && active) {
        mat.color.lerpColors(base, goldColor, t);
        mat.emissive = mat.emissive || new THREE.Color(GOLD);
        mat.emissive.setHex(GOLD);
        mat.emissiveIntensity = (distal ? 0.8 : 0.2) * t;
        mat.opacity = 1;
        mat.transparent = false;
        node.cap.scale.setScalar(distal ? 1 + 1.4 * t : 1 + 0.2 * t);
      } else if (active) {
        mat.color.copy(base).lerp(ghostColor, 0.55 * t);
        mat.emissiveIntensity = 0;
        mat.transparent = true;
        mat.opacity = THREE.MathUtils.lerp(1, 0.48, t);
        node.cap.scale.setScalar(1);
      } else {
        mat.color.copy(base);
        mat.emissiveIntensity = 0;
        mat.opacity = 1;
        mat.transparent = false;
        node.cap.scale.setScalar(1);
      }
    });

    const lucaOn = !active;
    if (lucaOn) {
      rootCap.material.color.setHex(GOLD);
      rootCap.material.emissive.setHex(GOLD);
      rootCap.material.emissiveIntensity = 0.55;
      rootCap.material.transparent = false;
      rootCap.material.opacity = 1;
      rootCap.material.depthWrite = true;
      rayMat.opacity = 0.62;
      rayMatSoft.opacity = 0.28;
      burstHalo.material.opacity = 0.18;
      burst.visible = true;
      rootLabelEl.classList.remove("is-dim");
    } else {
      rootCap.material.color.lerpColors(goldColor, ghostColor, 0.58 * t);
      rootCap.material.emissiveIntensity = 0.55 * (1 - t);
      rootCap.material.transparent = true;
      rootCap.material.opacity = THREE.MathUtils.lerp(1, 0.42, t);
      rootCap.material.depthWrite = false;
      rayMat.opacity = 0.62 * (1 - 0.82 * t);
      rayMatSoft.opacity = 0.28 * (1 - 0.82 * t);
      burstHalo.material.opacity = 0.18 * (1 - 0.85 * t);
      rootLabelEl.classList.toggle("is-dim", t > 0.35);
    }
  }

  function resize() {
    const { clientWidth: w, clientHeight: h } = container;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
    labelRenderer.setSize(w, h);
  }

  const clock = new THREE.Clock();
  let frame = 0;

  function tick() {
    frame = requestAnimationFrame(tick);
    const dt = clock.getDelta();
    controls.update();
    applyHighlight(dt);
    layoutSpeciesPins();
    renderer.render(scene, camera);
    labelRenderer.render(scene, camera);
  }

  const ro = new ResizeObserver(resize);
  ro.observe(container);
  resize();
  tick();

  return {
    setTrait,
    clearTrait,
    getActiveTrait: () => activeTrait,
    dispose() {
      cancelAnimationFrame(frame);
      ro.disconnect();
      controls.dispose();
      renderer.dispose();
      clearSpeciesCards();
    },
  };
}
