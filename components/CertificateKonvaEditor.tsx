"use client";

/**
 * Editor template sertifikat versi Konva.js (react-konva).
 *
 * Memakai model data, palet komponen, dan panel yang sama dengan editor DOM
 * (CertificateCanvasEditor.tsx); yang berbeda hanya mesin kanvasnya:
 * elemen digambar di <canvas>, sedangkan pilih / geser / ubah ukuran / putar
 * ditangani Konva.Transformer.
 */

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { flushSync } from "react-dom";
import Konva from "konva";
import type { KonvaEventObject } from "konva/lib/Node";
import { Stage, Layer, Group, Rect, Ellipse, Text, Image as KonvaImage, Path, Line, Shape, Transformer } from "react-konva";
import {
  Undo2, Redo2, ZoomIn, ZoomOut, Maximize, Grid3x3, Magnet, Ruler, Wallpaper, RotateCcw, Eye, Download, Copy, Trash2,
  AlignStartVertical, AlignCenterVertical, AlignEndVertical, AlignStartHorizontal, AlignCenterHorizontal, AlignEndHorizontal,
} from "lucide-react";
import {
  CanvasDesign, CanvasEl, BgPresetId, makeBgPreset, getPageSize, Validity, DEFAULT_VALIDITY, SAMPLE_DATA, SAMPLE_ISSUE_DATE,
  VarContext, PaletteItem, createDefaultDesign, EditorProps, EditorPanelApi, EditorPalette, EditorSidePanel, PanelTab, UploadTarget,
  FONTS, fillVars, clamp, uid, newEl, TB, Sep, Section,
} from "./CertificateCanvasEditor";

/* ============================================================================
   HELPERS
   ========================================================================== */

type KEvt = KonvaEventObject<MouseEvent | TouchEvent | Event>;

/** Muat gambar (data URL / SVG) menjadi HTMLImageElement untuk Konva.Image. */
function useImage(src?: string) {
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  useEffect(() => {
    if (!src) { setImg(null); return; }
    let alive = true;
    const i = new window.Image();
    i.onload = () => { if (alive) setImg(i); };
    i.src = src;
    return () => { alive = false; };
  }, [src]);
  return src ? img : null;
}

/** Posisi gambar di dalam kotak w×h, meniru object-fit CSS. */
function fitImage(img: HTMLImageElement, w: number, h: number, mode: "contain" | "cover" | "fill") {
  const iw = img.naturalWidth || img.width || 1, ih = img.naturalHeight || img.height || 1;
  if (mode === "fill") return { x: 0, y: 0, width: w, height: h };
  if (mode === "contain") {
    const s = Math.min(w / iw, h / ih);
    return { x: (w - iw * s) / 2, y: (h - ih * s) / 2, width: iw * s, height: ih * s };
  }
  const s = Math.max(w / iw, h / ih);
  const cw = w / s, ch = h / s;
  return { x: 0, y: 0, width: w, height: h, crop: { x: (iw - cw) / 2, y: (ih - ch) / 2, width: cw, height: ch } };
}

const fontStyleOf = (el: CanvasEl, forceBold = false) =>
  [el.italic && "italic", (el.bold || forceBold) && "bold"].filter(Boolean).join(" ") || "normal";

const textAttrs = (el: CanvasEl) => ({
  fontSize: el.fontSize ?? 16,
  fontFamily: el.fontFamily ?? FONTS[0].value,
  fontStyle: fontStyleOf(el),
  textDecoration: el.underline ? "underline" : "",
  fill: el.color ?? "#0f172a",
  align: el.align ?? "left",
  lineHeight: el.lineHeight ?? 1.3,
  letterSpacing: el.letterSpacing ?? 0,
  wrap: "word",
});

/** Tinggi teks setelah dibungkus Konva (dipakai untuk perataan vertikal). */
const measureHeight = (attrs: Konva.TextConfig) => new Konva.Text(attrs).height();

let measureCtx: CanvasRenderingContext2D | null = null;
const measureWidth = (text: string, font: string) => {
  measureCtx = measureCtx ?? document.createElement("canvas").getContext("2d");
  if (!measureCtx) return text.length * 6;
  measureCtx.font = font;
  return measureCtx.measureText(text).width;
};

/**
 * Isi elemen dipotong sebesar kotaknya (seperti overflow:hidden) dan tidak ikut
 * dihitung ke bounding box, sehingga Transformer selalu mengikuti ukuran w×h elemen.
 */
const zeroRect = () => ({ x: 0, y: 0, width: 0, height: 0 });
const clipRef = (n: Konva.Group | null) => { if (n) n.getClientRect = zeroRect; };

function Clip({ w, h, children }: { w: number; h: number; children: React.ReactNode }) {
  return <Group ref={clipRef} listening={false} clipX={0} clipY={0} clipWidth={w} clipHeight={h}>{children}</Group>;
}

/* ============================================================================
   ISI ELEMEN (padanan ElementBody pada editor DOM)
   ========================================================================== */

function TextBlock({ el, text }: { el: CanvasEl; text: string }) {
  const pad = el.padding ?? 0;
  const attrs = { ...textAttrs(el), text: el.uppercase ? text.toUpperCase() : text, width: Math.max(1, el.w - pad * 2) };
  const key = JSON.stringify(attrs);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const th = useMemo(() => measureHeight(attrs), [key]);
  const y = el.valign === "top" ? 0 : el.valign === "bottom" ? el.h - th : (el.h - th) / 2;
  return <Text {...attrs} x={pad} y={y} />;
}

function SignerBlock({ el, text }: { el: CanvasEl; text: string }) {
  const shown = el.uppercase ? text.toUpperCase() : text;
  const [name, ...rest] = shown.split("\n");
  const restText = rest.join("\n");
  const base = { ...textAttrs(el), width: Math.max(1, el.w) };
  const nameAttrs = { ...base, fontStyle: fontStyleOf(el, true), text: name || " " };
  const restAttrs = { ...base, text: restText };
  const key = JSON.stringify([nameAttrs, restAttrs]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const [nameH, restH] = useMemo(() => [measureHeight(nameAttrs), restText ? measureHeight(restAttrs) : 0], [key]);
  const top = el.h - (5 + nameH + restH); // garis 1px + jarak 4px, menempel ke bawah kotak
  return (
    <>
      <Line points={[0, top + 0.5, el.w, top + 0.5]} stroke={base.fill} strokeWidth={1} />
      <Text {...nameAttrs} y={top + 5} />
      {restText && <Text {...restAttrs} y={top + 5 + nameH} opacity={0.8} />}
    </>
  );
}

function ImageBlock({ el, preview }: { el: CanvasEl; preview: boolean }) {
  const img = useImage(el.src);
  const { w, h } = el;
  if (el.src) return img ? <KonvaImage image={img} {...fitImage(img, w, h, el.fit ?? "contain")} /> : null;
  // Tanda tangan tanpa gambar: nama dengan huruf script sebagai pengganti.
  if (el.slot === "signature" && el.text) {
    return <Text text={el.text} width={w} height={h} align="center" verticalAlign="middle" wrap="none" fontFamily={FONTS[3].value} fontSize={h * 0.62} fill="#111827" />;
  }
  if (preview) return null;
  const tall = h >= 36;
  return (
    <>
      <Rect x={1} y={1} width={Math.max(1, w - 2)} height={Math.max(1, h - 2)} fill="rgba(240,249,255,0.7)" stroke="#7dd3fc" strokeWidth={2} dash={[6, 4]} />
      <Text text={el.name} width={w} y={tall ? h / 2 - 14 : 0} height={tall ? 14 : h} align="center" verticalAlign="middle" wrap="none" fontSize={12} fontStyle="bold" fontFamily={FONTS[0].value} fill="#0284c7" />
      {tall && <Text text="Klik dua kali untuk unggah" width={w} y={h / 2 + 2} height={12} align="center" verticalAlign="middle" wrap="none" fontSize={10} fontFamily={FONTS[0].value} fill="#0ea5e9" />}
    </>
  );
}

/* QR tiruan 21×21, pola yang sama dengan editor DOM. */
const QR_CELLS = 21;
const QR_PATH = (() => {
  let d = "";
  for (let r = 0; r < QR_CELLS; r++) for (let c = 0; c < QR_CELLS; c++) {
    const finder = (r < 7 && c < 7) || (r < 7 && c >= QR_CELLS - 7) || (r >= QR_CELLS - 7 && c < 7);
    const lr = r < 7 ? r : r - (QR_CELLS - 7), lc = c < 7 ? c : c - (QR_CELLS - 7);
    const on = finder
      ? lr === 0 || lr === 6 || lc === 0 || lc === 6 || (lr >= 2 && lr <= 4 && lc >= 2 && lc <= 4)
      : (r * 7 + c * 13 + r * c) % 3 === 0;
    if (on) d += `M${c} ${r}h1v1h-1z`;
  }
  return d;
})();

/* Ikon social media (path Lucide, viewBox 24×24) agar bisa digambar di kanvas. */
const SOCIAL_ICONS: { key: string; paths: string[] }[] = [
  { key: "instagram", paths: ["M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z", "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z", "M17.5 6.5h.01"] },
  { key: "twitter", paths: ["M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"] },
  { key: "youtube", paths: ["M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17", "m10 15 5-3-5-3z"] },
  { key: "facebook", paths: ["M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"] },
  { key: "website", paths: [] },
];

function SocialBlock({ el, preview }: { el: CanvasEl; preview: boolean }) {
  const { w, h } = el;
  const fs = el.fontSize ?? 11;
  const family = el.fontFamily ?? FONTS[0].value;
  const color = el.color ?? "#475569";
  const spacing = el.letterSpacing ?? 0;
  const linksKey = JSON.stringify(el.links ?? {});

  const placed = useMemo(() => {
    const gapX = 16, gapY = 4;
    const items = SOCIAL_ICONS.filter((m) => (el.links?.[m.key] ?? "").trim()).map((m) => {
      const web = m.key === "website";
      const size = web ? fs * 1.25 : fs;
      const label = el.links![m.key];
      const bold = web || !!el.bold;
      const icon = web ? 0 : fs + 2;
      const tw = measureWidth(label, `${el.italic ? "italic " : ""}${bold ? "bold " : ""}${size}px ${family}`) + spacing * label.length;
      return { ...m, label, size, bold, icon, tw, w: icon + (icon ? 4 : 0) + tw, h: Math.max(icon, size * 1.3) };
    });
    // Susun seperti flex-wrap: pindah baris bila melebihi lebar kotak.
    const rows: (typeof items)[] = [];
    let rowW = 0;
    items.forEach((it) => {
      const cur = rows[rows.length - 1];
      if (!cur || rowW + gapX + it.w > w) { rows.push([it]); rowW = it.w; }
      else { cur.push(it); rowW += gapX + it.w; }
    });
    const rowH = rows.map((r) => Math.max(...r.map((i) => i.h)));
    const total = rowH.reduce((a, b) => a + b, 0) + gapY * Math.max(0, rows.length - 1);
    let y = (h - total) / 2;
    const out: ((typeof items)[number] & { x: number; y: number; rowH: number })[] = [];
    rows.forEach((r, ri) => {
      const rw = r.reduce((a, i) => a + i.w, 0) + gapX * (r.length - 1);
      let x = el.align === "left" ? 0 : el.align === "right" ? w - rw : (w - rw) / 2;
      r.forEach((it) => { out.push({ ...it, x, y, rowH: rowH[ri] }); x += it.w + gapX; });
      y += rowH[ri] + gapY;
    });
    return out;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [linksKey, fs, family, spacing, el.bold, el.italic, el.align, w, h]);

  if (!placed.length) {
    if (preview) return null;
    return (
      <>
        <Rect x={0.5} y={0.5} width={Math.max(1, w - 1)} height={Math.max(1, h - 1)} stroke="#cbd5e1" strokeWidth={1} dash={[4, 3]} />
        <Text text="Social Media Links (kosong)" width={w} height={h} align="center" verticalAlign="middle" wrap="none" fontSize={11} fontFamily={FONTS[0].value} fill="#94a3b8" />
      </>
    );
  }

  return (
    <>
      {placed.map((it) => (
        <Group key={it.key} x={it.x} y={it.y}>
          {it.icon > 0 && (
            <Group y={(it.rowH - it.icon) / 2} scaleX={it.icon / 24} scaleY={it.icon / 24}>
              {it.paths.map((d, i) => <Path key={i} data={d} stroke={color} strokeWidth={2} lineCap="round" lineJoin="round" />)}
            </Group>
          )}
          <Text text={it.label} x={it.icon ? it.icon + 4 : 0} y={(it.rowH - it.size) / 2} fontSize={it.size} lineHeight={1} fontFamily={family}
            fontStyle={[el.italic && "italic", it.bold && "bold"].filter(Boolean).join(" ") || "normal"}
            textDecoration={el.underline ? "underline" : ""} letterSpacing={spacing} fill={color} />
        </Group>
      ))}
    </>
  );
}

const ElBody = React.memo(function ElBody({ el, preview, ctx, editing }: { el: CanvasEl; preview: boolean; ctx: VarContext; editing: boolean }) {
  const { w, h } = el;
  const raw = el.text ?? "";
  const text = preview ? fillVars(raw, ctx, el.dateFormat) : raw;
  switch (el.type) {
    case "text":
      return <>{el.fill && el.fill !== "transparent" && <Rect width={w} height={h} fill={el.fill} />}{!editing && <TextBlock el={el} text={text} />}</>;
    case "signer":
      return editing ? null : <SignerBlock el={el} text={text} />;
    case "logo":
    case "image":
      return <ImageBlock el={el} preview={preview} />;
    case "qr": {
      const s = Math.min(w, h);
      return <><Rect width={w} height={h} fill="#ffffff" /><Path data={QR_PATH} x={(w - s) / 2} y={(h - s) / 2} scaleX={s / QR_CELLS} scaleY={s / QR_CELLS} fill="#0f172a" /></>;
    }
    case "shape": {
      // Garis tepi digambar di sisi dalam kotak, seperti border CSS.
      const sw = Math.min(el.strokeWidth ?? 0, w / 2, h / 2);
      const common = { fill: el.fill, stroke: el.stroke, strokeWidth: sw, strokeEnabled: sw > 0 };
      return el.shape === "ellipse"
        ? <Ellipse x={w / 2} y={h / 2} radiusX={Math.max(0, (w - sw) / 2)} radiusY={Math.max(0, (h - sw) / 2)} {...common} />
        : <Rect x={sw / 2} y={sw / 2} width={Math.max(0, w - sw)} height={Math.max(0, h - sw)} cornerRadius={Math.max(0, (el.radius ?? 0) - sw / 2)} {...common} />;
    }
    case "line":
      return <Rect width={w} height={h} fill={el.fill} />;
    case "social":
      return <SocialBlock el={el} preview={preview} />;
    default:
      return null;
  }
});

/* ============================================================================
   EDITOR
   ========================================================================== */

const ALL_ANCHORS = ["top-left", "top-center", "top-right", "middle-right", "middle-left", "bottom-left", "bottom-center", "bottom-right"];
const CORNER_ANCHORS = ["top-left", "top-right", "bottom-left", "bottom-right"];
const SIDE_ANCHORS = ["middle-left", "middle-right"];
const NO_GUIDES: { v: number[]; h: number[] } = { v: [], h: [] };

type Marquee = { x1: number; y1: number; x2: number; y2: number; additive: boolean };

export default function CertificateKonvaEditor({ design, onChange, orientation, size, validity = DEFAULT_VALIDITY, onToast, onEditSigner }: EditorProps) {
  const { w: pw, h: ph } = getPageSize(orientation, size);
  const ctx: VarContext = useMemo(() => ({ data: SAMPLE_DATA, issueDate: SAMPLE_ISSUE_DATE, validity }), [validity]);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [zoom, setZoom] = useState(0.6);
  const [showGrid, setShowGrid] = useState(false);
  const [snapOn, setSnapOn] = useState(true);
  const [showMargin, setShowMargin] = useState(true);
  const [previewData, setPreviewData] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [tab, setTab] = useState<PanelTab>("props");
  const [guides, setGuides] = useState(NO_GUIDES);
  const [marquee, setMarquee] = useState<Marquee | null>(null);
  const [past, setPast] = useState<CanvasDesign[]>([]);
  const [future, setFuture] = useState<CanvasDesign[]>([]);

  const designRef = useRef(design);
  designRef.current = design;
  const selRef = useRef(selectedIds);
  selRef.current = selectedIds;
  const zoomRef = useRef(zoom);
  zoomRef.current = zoom;
  const rootRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<Konva.Stage>(null);
  const trRef = useRef<Konva.Transformer>(null);
  const nodeRefs = useRef<Record<string, Konva.Group>>({});
  const refCbs = useRef<Record<string, (n: Konva.Group | null) => void>>({});
  const marqueeRef = useRef<Marquee | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const uploadTarget = useRef<{ id: string } | { bg: true } | null>(null);
  const lastPatch = useRef<{ key: string; t: number }>({ key: "", t: 0 });
  const prevDims = useRef({ pw, ph });

  const bgImg = useImage(design.bgImage);
  const selectedEls = design.elements.filter((e) => selectedIds.includes(e.id));
  const selected = selectedEls.length === 1 ? selectedEls[0] : null;
  const editingEl = editingId ? design.elements.find((e) => e.id === editingId) ?? null : null;
  const showData = previewData || exporting;

  const find = (id: string) => designRef.current.elements.find((e) => e.id === id);
  const nodeRef = (id: string) =>
    (refCbs.current[id] = refCbs.current[id] ?? ((n) => { if (n) nodeRefs.current[id] = n; else delete nodeRefs.current[id]; }));

  /* ---------- state & history ---------- */
  // designRef diperbarui langsung agar beberapa event Konva dalam satu tick tidak saling menimpa.
  const apply = useCallback((next: CanvasDesign) => {
    designRef.current = next;
    onChange(next);
  }, [onChange]);

  const mapEls = (fn: (e: CanvasEl) => CanvasEl): CanvasDesign => ({ ...designRef.current, elements: designRef.current.elements.map(fn) });

  const pushHistory = useCallback(() => {
    const cur = designRef.current;
    setPast((p) => (p[p.length - 1] === cur ? p : [...p.slice(-49), cur]));
    setFuture([]);
  }, []);

  // Satu gerakan (geser / transform, termasuk banyak elemen sekaligus) = satu langkah undo.
  const gestureRef = useRef(false);
  const beginGesture = useCallback(() => {
    if (gestureRef.current) return;
    gestureRef.current = true;
    pushHistory();
  }, [pushHistory]);

  const commit = useCallback((next: CanvasDesign, record = true) => {
    if (record) pushHistory();
    apply(next);
  }, [apply, pushHistory]);

  const undo = () => {
    if (!past.length) return;
    setFuture((f) => [designRef.current, ...f]);
    apply(past[past.length - 1]);
    setPast((p) => p.slice(0, -1));
  };
  const redo = () => {
    if (!future.length) return;
    setPast((p) => [...p, designRef.current]);
    apply(future[0]);
    setFuture((f) => f.slice(1));
  };

  const patchMany = useCallback((ids: string[], fn: (e: CanvasEl) => Partial<CanvasEl>, coalesceKey?: string) => {
    const now = Date.now();
    const key = coalesceKey ? `${ids.join(",")}:${coalesceKey}` : "";
    const record = !(key && lastPatch.current.key === key && now - lastPatch.current.t < 700);
    lastPatch.current = { key, t: now };
    const d = designRef.current;
    commit({ ...d, elements: d.elements.map((e) => (ids.includes(e.id) ? { ...e, ...fn(e) } : e)) }, record);
  }, [commit]);

  const patch = useCallback((id: string, partial: Partial<CanvasEl>, coalesceKey?: string) => patchMany([id], () => partial, coalesceKey), [patchMany]);

  // Buang id terpilih yang elemennya sudah tidak ada (mis. setelah undo).
  useEffect(() => {
    setSelectedIds((ids) => {
      const next = ids.filter((id) => design.elements.some((e) => e.id === id));
      return next.length === ids.length ? ids : next;
    });
  }, [design.elements]);

  /* ---------- zoom & skala ulang saat ukuran halaman berubah ---------- */
  const fit = useCallback(() => {
    const box = scrollRef.current;
    if (!box) return;
    setZoom(clamp(Math.min((box.clientWidth - 48) / pw, (box.clientHeight - 48) / ph), 0.2, 1.5));
  }, [pw, ph]);

  useEffect(() => { fit(); }, [fit]);

  useEffect(() => {
    const prev = prevDims.current;
    if (prev.pw === pw && prev.ph === ph) return;
    const sx = pw / prev.pw, sy = ph / prev.ph;
    prevDims.current = { pw, ph };
    const d = designRef.current;
    apply({
      ...d,
      bgImage: d.bgPreset ? makeBgPreset(d.bgPreset, pw, ph) : d.bgImage,
      elements: d.elements.map((e) => ({ ...e, x: e.x * sx, w: e.w * sx, y: e.y * sy, h: e.h * sy })),
    });
  }, [pw, ph, apply]);

  /* ---------- operasi elemen ---------- */
  const addElement = (item: PaletteItem) => {
    const base = item.make(pw, ph);
    if (base.slot) {
      const exist = designRef.current.elements.find((e) => e.slot === base.slot);
      if (exist) {
        setSelectedIds([exist.id]);
        setTab("props");
        onToast?.(`"${exist.name}" sudah ada di kanvas — dipilih untuk diedit.`);
        return;
      }
    }
    const el = newEl(base);
    commit({ ...designRef.current, elements: [...designRef.current.elements, el] });
    setSelectedIds([el.id]);
    setTab("props");
  };

  const removeEls = (ids: string[]) => {
    if (!ids.length) return;
    commit({ ...designRef.current, elements: designRef.current.elements.filter((e) => !ids.includes(e.id)) });
    setSelectedIds((s) => s.filter((id) => !ids.includes(id)));
  };

  const duplicateEls = (ids: string[]) => {
    const copies = designRef.current.elements.filter((e) => ids.includes(e.id))
      .map((src): CanvasEl => ({ ...src, id: uid(), slot: undefined, name: `${src.name} (Salinan)`, x: src.x + 20, y: src.y + 20, locked: false }));
    if (!copies.length) return;
    commit({ ...designRef.current, elements: [...designRef.current.elements, ...copies] });
    setSelectedIds(copies.map((c) => c.id));
  };

  const reorder = (id: string, mode: "front" | "back" | "up" | "down") => {
    const els = [...designRef.current.elements];
    const i = els.findIndex((e) => e.id === id);
    if (i < 0) return;
    const [it] = els.splice(i, 1);
    const j = mode === "front" ? els.length : mode === "back" ? 0 : mode === "up" ? Math.min(els.length, i + 1) : Math.max(0, i - 1);
    els.splice(j, 0, it);
    commit({ ...designRef.current, elements: els });
  };

  /** Ratakan elemen terpilih terhadap kotak pembatas seleksi. */
  const alignSelection = (mode: "left" | "hcenter" | "right" | "top" | "vcenter" | "bottom") => {
    const els = designRef.current.elements.filter((e) => selRef.current.includes(e.id));
    if (els.length < 2) return;
    const x1 = Math.min(...els.map((e) => e.x)), x2 = Math.max(...els.map((e) => e.x + e.w));
    const y1 = Math.min(...els.map((e) => e.y)), y2 = Math.max(...els.map((e) => e.y + e.h));
    patchMany(els.map((e) => e.id), (e) =>
      mode === "left" ? { x: x1 } : mode === "right" ? { x: x2 - e.w } : mode === "hcenter" ? { x: (x1 + x2 - e.w) / 2 }
        : mode === "top" ? { y: y1 } : mode === "bottom" ? { y: y2 - e.h } : { y: (y1 + y2 - e.h) / 2 });
  };

  /* ---------- unggah ---------- */
  const requestUpload = (target: { id: string } | { bg: true }) => {
    uploadTarget.current = target;
    fileRef.current?.click();
  };

  const readImage = (file: File, target: UploadTarget) => {
    if (!["image/png", "image/jpeg"].includes(file.type)) { onToast?.("Format file harus png, jpg, atau jpeg."); return; }
    if (file.size > 5 * 1024 * 1024) { onToast?.("Ukuran file maksimal 5Mb."); return; }
    const reader = new FileReader();
    reader.onload = () => {
      const src = String(reader.result);
      if ("bg" in target) {
        commit({ ...designRef.current, bgImage: src, bgPreset: undefined, bgFit: designRef.current.bgFit ?? "cover" });
        onToast?.("Background berhasil diunggah.");
      } else if ("at" in target) {
        const el = newEl({ type: "image", name: file.name.replace(/\.\w+$/, ""), src, fit: "contain", w: 220, h: 160, x: target.at.x - 110, y: target.at.y - 80 });
        commit({ ...designRef.current, elements: [...designRef.current.elements, el] });
        setSelectedIds([el.id]);
      } else patch(target.id, { src });
    };
    reader.readAsDataURL(file);
  };

  const onFilePicked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (file && uploadTarget.current) readImage(file, uploadTarget.current);
  };

  const applyBgPreset = (id: BgPresetId | null) =>
    commit({ ...designRef.current, bgPreset: id ?? undefined, bgImage: id ? makeBgPreset(id, pw, ph) : undefined });

  /* ---------- snap & garis bantu ---------- */
  const snapMove = (id: string, x: number, y: number, w: number, h: number) => {
    if (!snapOn) return { x, y };
    const T = 6 / zoomRef.current;
    const others = designRef.current.elements.filter((e) => e.id !== id && !e.hidden);
    const xs = [0, pw / 2, pw, ...others.flatMap((e) => [e.x, e.x + e.w / 2, e.x + e.w])];
    const ys = [0, ph / 2, ph, ...others.flatMap((e) => [e.y, e.y + e.h / 2, e.y + e.h])];
    const best = (cands: number[], pts: number[]) => {
      let d = Infinity, line = 0;
      for (const p of pts) for (const c of cands) if (Math.abs(c - p) < Math.abs(d)) { d = c - p; line = c; }
      return Math.abs(d) <= T ? { off: d, line } : null;
    };
    const sx = best(xs, [x, x + w / 2, x + w]);
    const sy = best(ys, [y, y + h / 2, y + h]);
    setGuides({ v: sx ? [sx.line] : [], h: sy ? [sy.line] : [] });
    return { x: x + (sx?.off ?? 0), y: y + (sy?.off ?? 0) };
  };

  /* ---------- event Konva: pilih, geser, transform ---------- */
  const focusRoot = () => rootRef.current?.focus({ preventScroll: true });
  const isAdditive = (e: KEvt) => { const m = e.evt as MouseEvent; return !!(m.shiftKey || m.metaKey || m.ctrlKey); };

  const onElDown = (e: KEvt, id: string) => {
    e.cancelBubble = true; // jangan sampai ke stage (yang memulai seleksi area)
    focusRoot();
    const el = find(id);
    if (!el) return;
    const cur = selRef.current;
    if (isAdditive(e)) {
      if (el.locked) return;
      const base = cur.filter((x) => !find(x)?.locked);
      setSelectedIds(base.includes(id) ? base.filter((x) => x !== id) : [...base, id]);
    } else if (!cur.includes(id)) setSelectedIds([id]);
  };

  // Klik (tanpa geser) pada salah satu elemen dari seleksi banyak: pilih elemen itu saja.
  const onElClick = (e: KEvt, id: string) => {
    if (!isAdditive(e) && selRef.current.length > 1 && selRef.current.includes(id)) setSelectedIds([id]);
  };

  const onElDblClick = (id: string) => {
    const el = find(id);
    if (!el || el.locked) return;
    if (el.type === "text" || el.type === "signer") {
      setSelectedIds([id]);
      setEditText(el.text ?? "");
      setEditingId(id);
    } else if (el.type === "logo" || el.type === "image") requestUpload({ id });
  };

  const onDragMove = (e: KonvaEventObject<DragEvent>, id: string) => {
    const node = nodeRefs.current[id];
    const el = find(id);
    if (!node || !el || e.target !== node) return;
    let x = node.x() - el.w / 2, y = node.y() - el.h / 2;
    if (selRef.current.length <= 1) {
      const s = snapMove(id, x, y, el.w, el.h);
      if (s.x !== x || s.y !== y) { x = s.x; y = s.y; node.position({ x: x + el.w / 2, y: y + el.h / 2 }); }
    }
    apply(mapEls((it) => (it.id === id ? { ...it, x, y } : it)));
  };

  /**
   * Transformer mengubah scale node. Ukurannya dipindahkan ke w/h lalu scale dikembalikan ke 1,
   * supaya teks dibungkus ulang (bukan melar) selama handle masih ditarik. flushSync membuat
   * React menggambar ulang sebelum Transformer menghitung kotaknya lagi.
   */
  const onTransform = (id: string, final: boolean) => {
    const node = nodeRefs.current[id];
    const el = find(id);
    if (!node || !el) return;
    const w = Math.max(4, el.w * Math.abs(node.scaleX())), h = Math.max(1, el.h * Math.abs(node.scaleY()));
    node.scaleX(1);
    node.scaleY(1);
    node.skewX(0);
    node.skewY(0);
    let rotation = ((node.rotation() % 360) + 360) % 360;
    if (final) rotation = Math.round(rotation) % 360;
    const next = mapEls((it) => (it.id === id ? { ...it, w, h, x: node.x() - w / 2, y: node.y() - h / 2, rotation } : it));
    flushSync(() => apply(next));
  };

  // Seleksi area: mulai dari klik di area kosong halaman.
  const onStageDown = (e: KEvt) => {
    const stage = e.target.getStage();
    if (!stage || e.target !== stage) return;
    focusRoot();
    const p = stage.getRelativePointerPosition();
    if (!p) return;
    const m: Marquee = { x1: p.x, y1: p.y, x2: p.x, y2: p.y, additive: isAdditive(e) };
    marqueeRef.current = m;
    setMarquee(m);
  };

  const onStageMove = (e: KEvt) => {
    const m = marqueeRef.current;
    const p = e.target.getStage()?.getRelativePointerPosition();
    if (!m || !p) return;
    marqueeRef.current = { ...m, x2: p.x, y2: p.y };
    setMarquee(marqueeRef.current);
  };

  useEffect(() => {
    const finish = () => {
      gestureRef.current = false;
      const m = marqueeRef.current;
      if (!m) return;
      marqueeRef.current = null;
      setMarquee(null);
      const z = zoomRef.current;
      const box = { x: Math.min(m.x1, m.x2) * z, y: Math.min(m.y1, m.y2) * z, width: Math.abs(m.x2 - m.x1) * z, height: Math.abs(m.y2 - m.y1) * z };
      if (box.width < 4 && box.height < 4) { if (!m.additive) setSelectedIds([]); return; }
      const hit = designRef.current.elements
        .filter((el) => !el.hidden && !el.locked && nodeRefs.current[el.id] && Konva.Util.haveIntersection(box, nodeRefs.current[el.id].getClientRect()))
        .map((el) => el.id);
      setSelectedIds((prev) => (m.additive ? Array.from(new Set([...prev, ...hit])) : hit));
    };
    window.addEventListener("mouseup", finish);
    window.addEventListener("touchend", finish);
    return () => { window.removeEventListener("mouseup", finish); window.removeEventListener("touchend", finish); };
  }, []);

  /* ---------- Transformer mengikuti seleksi ---------- */
  const visibleKey = design.elements.map((e) => `${e.id}${e.hidden ? "h" : ""}`).join("|");
  useEffect(() => {
    const tr = trRef.current;
    if (!tr) return;
    const nodes = editingId || exporting ? [] : selectedIds.map((id) => nodeRefs.current[id]).filter(Boolean);
    tr.nodes(nodes);
    tr.getLayer()?.batchDraw();
  }, [selectedIds, editingId, exporting, visibleKey]);

  /* ---------- ekspor PNG ---------- */
  useEffect(() => {
    if (!exporting) return;
    const raf = requestAnimationFrame(() => {
      try {
        // Hasil 2× ukuran halaman (≈192 dpi); +0.5 agar pembulatan kanvas tidak membuang 1 piksel.
        const stage = stageRef.current!;
        const uri = stage.toDataURL({ pixelRatio: (pw * 2 + 0.5) / stage.width(), mimeType: "image/png" });
        const a = document.createElement("a");
        a.href = uri;
        a.download = "template-sertifikat.png";
        a.click();
        onToast?.(`PNG ${pw * 2} × ${ph * 2} px berhasil diunduh.`);
      } catch {
        onToast?.("Gagal mengekspor PNG.");
      }
      setExporting(false);
    });
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exporting]);

  /* ---------- edit teks langsung di kanvas ---------- */
  const finishEdit = () => {
    if (editingId && find(editingId) && (find(editingId)!.text ?? "") !== editText) patch(editingId, { text: editText });
    setEditingId(null);
  };

  /* ---------- keyboard ---------- */
  const onKeyDown = (e: React.KeyboardEvent) => {
    const t = e.target as HTMLElement;
    if (["INPUT", "TEXTAREA", "SELECT"].includes(t.tagName) || t.isContentEditable) return;
    const meta = e.metaKey || e.ctrlKey;
    const k = e.key.toLowerCase();
    if (meta && k === "z") { e.preventDefault(); e.shiftKey ? redo() : undo(); return; }
    if (meta && k === "y") { e.preventDefault(); redo(); return; }
    if (meta && k === "a") { e.preventDefault(); setSelectedIds(design.elements.filter((x) => !x.hidden && !x.locked).map((x) => x.id)); return; }
    if (!selectedEls.length) return;
    const free = selectedEls.filter((x) => !x.locked).map((x) => x.id);
    if (meta && k === "d") { e.preventDefault(); duplicateEls(selectedIds); return; }
    if (e.key === "Delete" || e.key === "Backspace") { e.preventDefault(); removeEls(free); return; }
    if (e.key === "Escape") { setSelectedIds([]); return; }
    const step = e.shiftKey ? 10 : 1;
    const mv: Record<string, [number, number]> = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] };
    if (mv[e.key] && free.length) { e.preventDefault(); patchMany(free, (x) => ({ x: x.x + mv[e.key][0], y: x.y + mv[e.key][1] }), "nudge"); }
  };

  const resetDesign = () => {
    if (!window.confirm("Kembalikan susunan kanvas ke default? Perubahan desain saat ini akan hilang.")) return;
    const signer = design.elements.find((e) => e.type === "signer")?.text?.split("\n") ?? ["Nama Penandatangan", "Jabatan"];
    const d = createDefaultDesign(orientation, size, signer[0], signer[1] ?? "");
    commit({ ...d, company: design.company });
    setSelectedIds([]);
  };

  /* ---------- panel bersama ---------- */
  const multiPanel = selectedEls.length > 1 ? (
    <div className="space-y-4">
      <div className="font-bold text-sm text-slate-900">{selectedEls.length} elemen dipilih</div>
      <Section title="Ratakan">
        <div className="flex flex-wrap gap-1">
          <TB title="Rata kiri" onClick={() => alignSelection("left")}><AlignStartVertical className="w-3.5 h-3.5" /></TB>
          <TB title="Rata tengah horizontal" onClick={() => alignSelection("hcenter")}><AlignCenterVertical className="w-3.5 h-3.5" /></TB>
          <TB title="Rata kanan" onClick={() => alignSelection("right")}><AlignEndVertical className="w-3.5 h-3.5" /></TB>
          <Sep />
          <TB title="Rata atas" onClick={() => alignSelection("top")}><AlignStartHorizontal className="w-3.5 h-3.5" /></TB>
          <TB title="Rata tengah vertikal" onClick={() => alignSelection("vcenter")}><AlignCenterHorizontal className="w-3.5 h-3.5" /></TB>
          <TB title="Rata bawah" onClick={() => alignSelection("bottom")}><AlignEndHorizontal className="w-3.5 h-3.5" /></TB>
        </div>
      </Section>
      <Section title="Aksi">
        <div className="flex gap-2">
          <button type="button" onClick={() => duplicateEls(selectedIds)} className="flex-1 py-1.5 border border-slate-200 rounded-lg font-semibold hover:bg-slate-50 inline-flex items-center justify-center gap-1"><Copy className="w-3.5 h-3.5" />Duplikat</button>
          <button type="button" onClick={() => removeEls(selectedIds)} className="flex-1 py-1.5 border border-rose-200 text-rose-600 rounded-lg font-semibold hover:bg-rose-50 inline-flex items-center justify-center gap-1"><Trash2 className="w-3.5 h-3.5" />Hapus</button>
        </div>
      </Section>
      <div className="text-[11px] text-slate-400">Seret salah satu elemen untuk memindahkan semuanya. Tarik sudut kotak seleksi untuk mengubah ukuran bersama-sama, atau gagang di atasnya untuk memutar.</div>
    </div>
  ) : undefined;

  const api: EditorPanelApi = {
    design, pw, ph, orientation, size, validity, ctx, selected, selectedIds,
    select: (id) => setSelectedIds(id ? [id] : []),
    tab, setTab, patch, commit, addElement,
    removeEl: (id) => removeEls([id]),
    duplicateEl: (id) => duplicateEls([id]),
    reorder, requestUpload, readImage, applyBgPreset, onEditSigner, multiPanel,
  };

  const multi = selectedEls.length > 1;
  const lockedSel = selectedEls.some((e) => e.locked);
  const keepRatio = multi || (!!selected && ["logo", "image", "qr"].includes(selected.type));
  const anchors = multi ? CORNER_ANCHORS : selected?.type === "line" ? SIDE_ANCHORS : ALL_ANCHORS;
  const bgFit = bgImg ? fitImage(bgImg, pw, ph, design.bgFit ?? "cover") : null;
  const setCursor = (c: string) => { const s = stageRef.current; if (s) s.container().style.cursor = c; };

  /* ============================== UI ===================================== */
  return (
    <div ref={rootRef} className="border border-slate-200 rounded-2xl overflow-hidden bg-white outline-none" tabIndex={0} onKeyDown={onKeyDown}>
      <input ref={fileRef} type="file" accept="image/png,image/jpeg" className="hidden" onChange={onFilePicked} />

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1.5 px-3 py-2 border-b border-slate-200 bg-slate-50 text-slate-600">
        <TB title="Undo (Ctrl+Z)" onClick={undo} disabled={!past.length}><Undo2 className="w-4 h-4" /></TB>
        <TB title="Redo (Ctrl+Shift+Z)" onClick={redo} disabled={!future.length}><Redo2 className="w-4 h-4" /></TB>
        <Sep />
        <TB title="Perkecil" onClick={() => setZoom((z) => clamp(+(z - 0.1).toFixed(2), 0.2, 2))}><ZoomOut className="w-4 h-4" /></TB>
        <span className="w-11 text-center text-[11px] font-bold tabular-nums">{Math.round(zoom * 100)}%</span>
        <TB title="Perbesar" onClick={() => setZoom((z) => clamp(+(z + 0.1).toFixed(2), 0.2, 2))}><ZoomIn className="w-4 h-4" /></TB>
        <TB title="Sesuaikan layar" onClick={fit}><Maximize className="w-4 h-4" /></TB>
        <Sep />
        <TB title="Grid" active={showGrid} onClick={() => setShowGrid((v) => !v)}><Grid3x3 className="w-4 h-4" /></TB>
        <TB title="Snap / garis bantu" active={snapOn} onClick={() => setSnapOn((v) => !v)}><Magnet className="w-4 h-4" /></TB>
        <TB title="Garis margin aman" active={showMargin} onClick={() => setShowMargin((v) => !v)}><Ruler className="w-4 h-4" /></TB>
        <TB title="Tampilkan contoh data peserta" active={previewData} onClick={() => setPreviewData((v) => !v)}><Eye className="w-4 h-4" /></TB>
        <Sep />
        <button type="button" onClick={() => { setSelectedIds([]); setTab("page"); }}
          className="h-7 px-2.5 inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 text-[11px] font-bold">
          <Wallpaper className="w-4 h-4" />Background
        </button>
        <button type="button" onClick={() => setExporting(true)} disabled={exporting}
          className="h-7 px-2.5 inline-flex items-center gap-1.5 rounded-lg border border-[#016DB2] bg-[#016DB2] text-white hover:bg-blue-700 text-[11px] font-bold disabled:opacity-50">
          <Download className="w-4 h-4" />Unduh PNG
        </button>
        <div className="flex-1" />
        <span className="hidden xl:block text-[10px] text-slate-400">Klik 2× teks untuk edit • Shift+klik atau seret area kosong = pilih banyak • Ctrl+D = duplikat • Del = hapus</span>
        <TB title="Reset ke susunan default" onClick={resetDesign}><RotateCcw className="w-4 h-4" /></TB>
      </div>

      <div className="flex" style={{ height: 680 }}>
        <EditorPalette api={api} />

        {/* Stage */}
        <div ref={scrollRef} className="flex-1 min-w-0 overflow-auto bg-slate-200/70 p-6"
          onMouseDown={(e) => { if (e.target === e.currentTarget) { setSelectedIds([]); if (editingId) finishEdit(); } }}>
          <div className="relative mx-auto shadow-xl" style={{ width: pw * zoom, height: ph * zoom }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const f = e.dataTransfer.files?.[0];
              if (!f) return;
              const r = e.currentTarget.getBoundingClientRect();
              readImage(f, { at: { x: (e.clientX - r.left) / zoom, y: (e.clientY - r.top) / zoom } });
            }}>
            <Stage ref={stageRef} width={pw * zoom} height={ph * zoom} scaleX={zoom} scaleY={zoom}
              onMouseDown={onStageDown} onTouchStart={onStageDown} onMouseMove={onStageMove} onTouchMove={onStageMove}>
              {/* Latar halaman */}
              <Layer listening={false}>
                <Rect width={pw} height={ph} fill={design.bgColor} />
                {bgImg && bgFit && <KonvaImage image={bgImg} {...bgFit} opacity={design.bgOpacity ?? 1} />}
                {showGrid && !exporting && (
                  <Shape stroke="rgba(1,109,178,0.12)" strokeWidth={1}
                    sceneFunc={(c, shape) => {
                      c.beginPath();
                      for (let x = 40; x < pw; x += 40) { c.moveTo(x, 0); c.lineTo(x, ph); }
                      for (let y = 40; y < ph; y += 40) { c.moveTo(0, y); c.lineTo(pw, y); }
                      c.strokeShape(shape);
                    }} />
                )}
                {showMargin && !exporting && <Rect x={40} y={40} width={pw - 80} height={ph - 80} stroke="#fda4af" strokeWidth={1 / zoom} dash={[6 / zoom, 4 / zoom]} />}
              </Layer>

              {/* Elemen */}
              <Layer>
                {design.elements.map((el) => el.hidden ? null : (
                  <Group key={el.id} ref={nodeRef(el.id)}
                    x={el.x + el.w / 2} y={el.y + el.h / 2} offsetX={el.w / 2} offsetY={el.h / 2} width={el.w} height={el.h}
                    rotation={el.rotation} opacity={el.opacity}
                    draggable={!el.locked && editingId !== el.id && !exporting}
                    onMouseDown={(e) => onElDown(e, el.id)} onTouchStart={(e) => onElDown(e, el.id)}
                    onClick={(e) => onElClick(e, el.id)} onTap={(e) => onElClick(e, el.id)}
                    onDblClick={() => onElDblClick(el.id)} onDblTap={() => onElDblClick(el.id)}
                    onMouseEnter={() => setCursor(el.locked ? "default" : "move")} onMouseLeave={() => setCursor("default")}
                    onDragStart={beginGesture} onDragMove={(e) => onDragMove(e, el.id)} onDragEnd={() => setGuides(NO_GUIDES)}
                    onTransformStart={beginGesture} onTransform={() => onTransform(el.id, false)} onTransformEnd={() => onTransform(el.id, true)}>
                    {/* Kotak transparan: area klik sekaligus ukuran elemen bagi Transformer. Elemen tipis diberi area klik lebih lebar. */}
                    <Rect width={el.w} height={el.h} fill="transparent" hitStrokeWidth={Math.min(el.w, el.h) < 8 ? 10 / zoom : 0} />
                    <Clip w={el.w} h={el.h}>
                      <ElBody el={el} preview={showData} ctx={ctx} editing={editingId === el.id} />
                    </Clip>
                  </Group>
                ))}

                {marquee && (
                  <Rect listening={false} x={Math.min(marquee.x1, marquee.x2)} y={Math.min(marquee.y1, marquee.y2)}
                    width={Math.abs(marquee.x2 - marquee.x1)} height={Math.abs(marquee.y2 - marquee.y1)}
                    fill="rgba(1,109,178,0.08)" stroke="#016DB2" strokeWidth={1 / zoom} />
                )}
                {!exporting && guides.v.map((x) => <Line key={`v${x}`} listening={false} points={[x, 0, x, ph]} stroke="#f43f5e" strokeWidth={1 / zoom} />)}
                {!exporting && guides.h.map((y) => <Line key={`h${y}`} listening={false} points={[0, y, pw, y]} stroke="#f43f5e" strokeWidth={1 / zoom} />)}

                <Transformer ref={trRef}
                  resizeEnabled={!lockedSel} rotateEnabled={!lockedSel}
                  keepRatio={keepRatio} enabledAnchors={anchors} flipEnabled={false} ignoreStroke
                  rotationSnaps={[0, 45, 90, 135, 180, 225, 270, 315]} rotationSnapTolerance={4} rotateAnchorOffset={28}
                  anchorSize={9} anchorCornerRadius={2} anchorFill="#ffffff" anchorStroke="#016DB2" borderStroke="#016DB2" borderStrokeWidth={1.5}
                  boundBoxFunc={(o, n) => ((n.width < 8 && n.width < o.width) || (n.height < 3 && n.height < o.height) ? o : n)} />
              </Layer>
            </Stage>

            {/* Edit teks: textarea HTML ditumpuk di atas kanvas, cara yang dianjurkan Konva. */}
            {editingEl && (
              <textarea autoFocus value={editText} onChange={(e) => setEditText(e.target.value)} onBlur={finishEdit}
                onFocus={(e) => e.currentTarget.select()}
                onKeyDown={(e) => { e.stopPropagation(); if (e.key === "Escape") e.currentTarget.blur(); }}
                className="absolute m-0 outline-none resize-none overflow-hidden"
                style={{
                  left: editingEl.x * zoom, top: editingEl.y * zoom, width: editingEl.w * zoom, height: editingEl.h * zoom,
                  transform: `rotate(${editingEl.rotation}deg)`, padding: `0 ${(editingEl.padding ?? 0) * zoom}px`,
                  border: "1.5px solid #016DB2", background: editingEl.fill && editingEl.fill !== "transparent" ? editingEl.fill : "rgba(255,255,255,0.9)",
                  fontSize: (editingEl.fontSize ?? 16) * zoom, fontFamily: editingEl.fontFamily, color: editingEl.color,
                  fontWeight: editingEl.bold ? 700 : 400, fontStyle: editingEl.italic ? "italic" : "normal", textAlign: editingEl.align,
                  lineHeight: editingEl.lineHeight ?? 1.3, letterSpacing: (editingEl.letterSpacing ?? 0) * zoom,
                }} />
            )}
          </div>
        </div>

        <EditorSidePanel api={api} />
      </div>
    </div>
  );
}
