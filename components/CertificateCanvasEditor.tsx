"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Undo2, Redo2, ZoomIn, ZoomOut, Maximize, Grid3x3, Magnet, Type, Image as ImageIcon,
  Square, Circle, Minus, QrCode, Trash2, Copy, Lock, Unlock, Eye, EyeOff, ArrowUp, ArrowDown,
  ChevronsUp, ChevronsDown, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight,
  Instagram, Twitter, Youtube, Facebook, Globe, Layers, SlidersHorizontal, UploadCloud,
  PenLine, Award, Hash, CalendarDays, CalendarClock, CalendarRange, User, FileText, RotateCcw, Ruler, Building2, Wallpaper
} from "lucide-react";

/* ============================================================================
   TYPES
   ========================================================================== */

export type ElType = "logo" | "text" | "signer" | "image" | "social" | "qr" | "shape" | "line";

export interface CanvasEl {
  id: string;
  type: ElType;
  name: string;
  /** Komponen tunggal (mis. logo_kiri_atas). Hanya boleh ada satu per template. */
  slot?: string;
  x: number; y: number; w: number; h: number;
  rotation: number;
  opacity: number;
  hidden?: boolean;
  locked?: boolean;
  text?: string;
  src?: string;
  fit?: "contain" | "cover";
  fontSize?: number;
  fontFamily?: string;
  color?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  uppercase?: boolean;
  align?: "left" | "center" | "right";
  valign?: "top" | "middle" | "bottom";
  lineHeight?: number;
  letterSpacing?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  radius?: number;
  shape?: "rect" | "ellipse";
  links?: Record<string, string>;
  dateFormat?: DateFormat;
  /** Padding horizontal teks (px halaman), berguna untuk teks berlatar seperti pita tagline. */
  padding?: number;
}

export interface CanvasDesign {
  elements: CanvasEl[];
  bgColor: string;
  bgImage?: string;
  /** Id preset background yang dibuat otomatis; dibuat ulang saat ukuran halaman berubah. Kosong = gambar unggahan. */
  bgPreset?: BgPresetId;
  bgOpacity?: number;
  bgFit?: "cover" | "contain" | "fill";
  company: string;
}

/* ============================================================================
   PRESET BACKGROUND (SVG yang dibuat sesuai ukuran halaman)
   ========================================================================== */

export type BgPresetId = "guilloche" | "ornamen" | "bingkai" | "gradasi";

export const BG_PRESETS: { id: BgPresetId; label: string }[] = [
  { id: "ornamen", label: "Ornamen Samping" },
  { id: "guilloche", label: "Guilloche" },
  { id: "bingkai", label: "Bingkai Klasik" },
  { id: "gradasi", label: "Gradasi Biru" },
];

const svgUri = (pw: number, ph: number, body: string) =>
  `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="${pw}" height="${ph}" viewBox="0 0 ${pw} ${ph}">${body}</svg>`)}`;

// Pola garis bergelombang halus khas sertifikat / uang kertas.
const guillocheSvg = (pw: number, ph: number) => `
  <defs>
    <pattern id="g1" width="64" height="7" patternUnits="userSpaceOnUse"><path d="M0 3.5 Q16 0 32 3.5 T64 3.5" fill="none" stroke="#d5deea" stroke-width="0.8"/></pattern>
    <pattern id="g2" width="90" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(-8)"><path d="M0 4.5 Q22.5 0 45 4.5 T90 4.5" fill="none" stroke="#dfe6f0" stroke-width="0.6"/></pattern>
  </defs>
  <rect width="${pw}" height="${ph}" fill="#f4f6f9"/>
  <rect width="${pw}" height="${ph}" fill="url(#g1)"/>
  <rect width="${pw}" height="${ph}" fill="url(#g2)"/>`;

// Motif bunga empat kelopak; S = isi penuh, O = garis luar, . = kosong.
const ORNAMENT_MAP = ["..OOO..", "..OOSS.", "OSSOO..", "SSSO...", "OSOO...", "OOSSO..", "..SSSS.", "..OSSO."];

const ornamentCluster = (ox: number, oy: number, cell: number, mirror: boolean) => {
  const r = cell * 0.27, k = cell * 0.22;
  let out = "";
  ORNAMENT_MAP.forEach((row, ri) => {
    const cols = mirror ? row.split("").reverse() : row.split("");
    cols.forEach((ch, ci) => {
      if (ch === ".") return;
      const cx = ox + ci * cell + cell / 2, cy = oy + ri * cell + cell / 2;
      const petals = [[k, 0], [-k, 0], [0, k], [0, -k]].map(([dx, dy]) => `<circle cx="${cx + dx}" cy="${cy + dy}" r="${r}"/>`).join("");
      out += ch === "S"
        ? `<g fill="#4aa3e6">${petals}<rect x="${cx - 2}" y="${cy - 2}" width="4" height="4" fill="#f4f6f9" transform="rotate(45 ${cx} ${cy})"/></g>`
        : `<g fill="none" stroke="#8cc6f0" stroke-width="1.6">${petals}</g>`;
    });
  });
  return out;
};

export function makeBgPreset(id: BgPresetId, pw: number, ph: number): string {
  if (id === "guilloche") return svgUri(pw, ph, guillocheSvg(pw, ph));
  if (id === "ornamen") {
    const cell = Math.round(Math.min(pw, ph) * 0.04);
    const w = ORNAMENT_MAP[0].length * cell, y = ph * 0.22;
    return svgUri(pw, ph, guillocheSvg(pw, ph) + ornamentCluster(4, y, cell, false) + ornamentCluster(pw - w - 4, y, cell, true));
  }
  if (id === "bingkai") {
    const c = (x: number, y: number) => `<rect x="${x - 7}" y="${y - 7}" width="14" height="14" fill="#c9a227" transform="rotate(45 ${x} ${y})"/>`;
    return svgUri(pw, ph, `
      <rect width="${pw}" height="${ph}" fill="#fffdf7"/>
      <rect x="18" y="18" width="${pw - 36}" height="${ph - 36}" fill="none" stroke="#016DB2" stroke-width="8"/>
      <rect x="32" y="32" width="${pw - 64}" height="${ph - 64}" fill="none" stroke="#c9a227" stroke-width="1.5"/>
      ${c(32, 32)}${c(pw - 32, 32)}${c(32, ph - 32)}${c(pw - 32, ph - 32)}`);
  }
  return svgUri(pw, ph, `
    <defs>
      <radialGradient id="a" cx="0" cy="0" r="0.75"><stop offset="0" stop-color="#bfe0fb"/><stop offset="1" stop-color="#ffffff" stop-opacity="0"/></radialGradient>
      <radialGradient id="b" cx="1" cy="1" r="0.75"><stop offset="0" stop-color="#9fcdf3"/><stop offset="1" stop-color="#ffffff" stop-opacity="0"/></radialGradient>
    </defs>
    <rect width="${pw}" height="${ph}" fill="#ffffff"/>
    <rect width="${pw}" height="${ph}" fill="url(#a)"/>
    <rect width="${pw}" height="${ph}" fill="url(#b)"/>`);
}

export const COMPANIES = ["PT Pelabuhan Indonesia", "PT Pelindo Terminal Petikemas", "PT Pelindo Jasa Maritim", "PT Pelindo Solusi Logistik"];

/* ============================================================================
   PAGE / DEFAULTS / HELPERS
   ========================================================================== */

export function getPageSize(orientation: string, size: string) {
  const letter = size.toLowerCase().startsWith("letter");
  const [a, b] = letter ? [1056, 816] : [1123, 794]; // px @96dpi (landscape)
  return orientation === "Portrait" ? { w: b, h: a } : { w: a, h: b };
}

/* ---------- Masa aktif sertifikat ---------- */

export interface Validity {
  lifetime: boolean;
  value: number;
  unit: "Tahun" | "Bulan";
}

export const DEFAULT_VALIDITY: Validity = { lifetime: false, value: 4, unit: "Tahun" };

export type DateFormat = "id_long" | "id_short" | "en_long";

const DATE_FORMATS: [DateFormat, string][] = [
  ["id_long", "30 Maret 2026"],
  ["id_short", "30/03/2026"],
  ["en_long", "March 30, 2026"],
];

const DATE_TOKENS = /\{\{\s*(tanggal_terbit|tanggal_berakhir|masa_berlaku)\s*\}\}/;

/** Tanggal berakhir = tanggal terbit + masa aktif. null bila seumur hidup. Input & output ISO (yyyy-mm-dd). */
export function addValidity(issueIso: string, v: Validity): string | null {
  if (v.lifetime || !issueIso) return null;
  const [y, m, d] = issueIso.split("-").map(Number);
  const months = v.unit === "Tahun" ? v.value * 12 : v.value;
  const target = new Date(Date.UTC(y, m - 1 + months, 1));
  const lastDay = new Date(Date.UTC(target.getUTCFullYear(), target.getUTCMonth() + 1, 0)).getUTCDate();
  target.setUTCDate(Math.min(d, lastDay));
  return target.toISOString().slice(0, 10);
}

export function formatDate(iso: string, fmt: DateFormat = "id_long") {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  if (fmt === "id_short") return `${String(d).padStart(2, "0")}/${String(m).padStart(2, "0")}/${y}`;
  return date.toLocaleDateString(fmt === "en_long" ? "en-US" : "id-ID", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

export const validityLabel = (v: Validity) => (v.lifetime ? "Seumur Hidup" : `${v.value} ${v.unit}`);

/* ---------- Data dinamis ---------- */

export const SAMPLE_DATA: Record<string, string> = {
  nama_peserta: "Yogi Muhammad Irshad",
  nipp: "11002753",
  judul_pelatihan: "Pelatihan Leadership Development",
  penyelenggara: "Pelindo Corporate University",
  tempat: "Jakarta",
  pendukung: "PT Pendidikan Maritim dan Logistik Indonesia",
  nomor_sertifikat: "PMLI/CERT/2026/0001",
  durasi: "16 Jam Pelajaran",
  nilai: "92",
};

export const SAMPLE_ISSUE_DATE = "2026-03-30";

export interface VarContext {
  data: Record<string, string>;
  issueDate: string;
  validity: Validity;
}

const VARIABLES: { key: string; label: string }[] = [
  { key: "nama_peserta", label: "Nama Peserta" },
  { key: "nipp", label: "NIPP" },
  { key: "judul_pelatihan", label: "Judul Pelatihan" },
  { key: "penyelenggara", label: "Penyelenggara" },
  { key: "tempat", label: "Tempat" },
  { key: "pendukung", label: "Pendukung" },
  { key: "nomor_sertifikat", label: "No. Sertifikat" },
  { key: "tanggal_terbit", label: "Tanggal Terbit" },
  { key: "tanggal_berakhir", label: "Tanggal Berakhir" },
  { key: "masa_berlaku", label: "Masa Aktif" },
  { key: "durasi", label: "Durasi" },
  { key: "nilai", label: "Nilai" },
];

const FONTS: { label: string; value: string }[] = [
  { label: "Sans Serif", value: "Inter, ui-sans-serif, system-ui, sans-serif" },
  { label: "Serif", value: "Georgia, 'Times New Roman', serif" },
  { label: "Monospace", value: "ui-monospace, Menlo, monospace" },
  { label: "Script", value: "'Brush Script MT', 'Segoe Script', cursive" },
];

const uid = () => `el_${Math.random().toString(36).slice(2, 9)}`;

const fillVars = (text: string, ctx: VarContext, fmt: DateFormat = "id_long") =>
  text.replace(/\{\{\s*(\w+)\s*\}\}/g, (m, k: string) => {
    if (k === "tanggal_terbit") return formatDate(ctx.issueDate, fmt);
    if (k === "tanggal_berakhir") {
      const exp = addValidity(ctx.issueDate, ctx.validity);
      return exp ? formatDate(exp, fmt) : "Seumur Hidup";
    }
    if (k === "masa_berlaku") return validityLabel(ctx.validity);
    return ctx.data[k] ?? m;
  });

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

const rotatePt = (x: number, y: number, deg: number) => {
  const r = (deg * Math.PI) / 180;
  return { x: x * Math.cos(r) - y * Math.sin(r), y: x * Math.sin(r) + y * Math.cos(r) };
};

type PaletteItem = { label: string; icon: React.ReactNode; make: (pw: number, ph: number) => Partial<CanvasEl> };

const logoSlot = (slot: string, name: string, pos: (pw: number, ph: number) => { x: number; y: number }) =>
  (pw: number, ph: number): Partial<CanvasEl> => ({
    type: "logo", slot, name, w: 150, h: 70, fit: "contain", ...pos(pw, ph),
  });

const textBase = (name: string, text: string, w: number, h: number, extra: Partial<CanvasEl> = {}) =>
  (pw: number, ph: number): Partial<CanvasEl> => ({
    type: "text", name, text, w: Math.min(w, pw - 80), h, x: (pw - Math.min(w, pw - 80)) / 2, y: ph / 2 - h / 2,
    fontSize: 20, color: "#0f172a", align: "center", valign: "middle", fontFamily: FONTS[0].value, ...extra,
  });

const dateText = (slot: string, name: string, text: string, _pw: number, ph: number): Partial<CanvasEl> => ({
  type: "text", slot, name, text, w: 280, h: 28, y: ph / 2 + 60,
  fontSize: 14, color: "#475569", valign: "middle", fontFamily: FONTS[0].value, dateFormat: "id_long",
});

export const PALETTE: { group: string; items: PaletteItem[] }[] = [
  {
    group: "Logo",
    items: [
      { label: "Logo Kiri Atas", icon: <ImageIcon className="w-4 h-4" />, make: logoSlot("logo_kiri_atas", "Logo Kiri Atas", () => ({ x: 48, y: 36 })) },
      { label: "Logo Kanan Atas", icon: <ImageIcon className="w-4 h-4" />, make: logoSlot("logo_kanan_atas", "Logo Kanan Atas", (pw) => ({ x: pw - 198, y: 36 })) },
      { label: "Logo Kiri Bawah", icon: <ImageIcon className="w-4 h-4" />, make: logoSlot("logo_kiri_bawah", "Logo Kiri Bawah", (_pw, ph) => ({ x: 48, y: ph - 190 })) },
      { label: "Logo Kanan Bawah", icon: <ImageIcon className="w-4 h-4" />, make: logoSlot("logo_kanan_bawah", "Logo Kanan Bawah", (pw, ph) => ({ x: pw - 198, y: ph - 190 })) },
    ],
  },
  {
    group: "Konten Sertifikat",
    items: [
      { label: "Judul Sertifikat", icon: <Award className="w-4 h-4" />, make: textBase("Judul Sertifikat", "CERTIFICATE", 520, 60, { fontSize: 52, bold: true, letterSpacing: 1, color: "#3f3f46", y: 112 }) },
      { label: "Sub Judul", icon: <Type className="w-4 h-4" />, make: textBase("Sub Judul", "OF ATTENDANCE", 520, 34, { fontSize: 26, color: "#27272a", y: 170 }) },
      { label: "Nama Peserta", icon: <User className="w-4 h-4" />, make: textBase("Nama Peserta", "{{nama_peserta}}", 640, 44, { fontSize: 32, bold: true, color: "#1e3a8a", y: 248 }) },
      { label: "NIPP Peserta", icon: <Hash className="w-4 h-4" />, make: textBase("NIPP Peserta", "{{nipp}}", 300, 26, { fontSize: 18, bold: true, y: 290 }) },
      { label: "Judul Pelatihan", icon: <FileText className="w-4 h-4" />, make: textBase("Judul Pelatihan", "Dalam pelatihan\n{{judul_pelatihan}}", 640, 46, { fontSize: 15, y: 362 }) },
      { label: "Penyelenggara", icon: <Building2 className="w-4 h-4" />, make: textBase("Penyelenggara", "Diselenggarakan oleh :\n{{penyelenggara}}\n{{tempat}}", 640, 62, { fontSize: 14, y: 418 }) },
      { label: "Pendukung", icon: <Building2 className="w-4 h-4" />, make: textBase("Pendukung", "Didukung oleh :\n{{pendukung}}", 640, 44, { fontSize: 14, y: 484 }) },
      { label: "Deskripsi", icon: <FileText className="w-4 h-4" />, make: textBase("Deskripsi", "telah mengikuti dan menyelesaikan {{judul_pelatihan}} dengan hasil memuaskan.", 640, 60, { fontSize: 15, y: 380 }) },
      { label: "Nomor Sertifikat", icon: <Hash className="w-4 h-4" />, make: textBase("Nomor Sertifikat", "No. {{nomor_sertifikat}}", 360, 30, { fontSize: 14, color: "#475569", y: 215 }) },
    ],
  },
  {
    group: "Masa Aktif",
    items: [
      { label: "Tanggal Terbit", icon: <CalendarDays className="w-4 h-4" />, make: (pw, ph) => ({ ...dateText("tanggal_terbit", "Tanggal Terbit", "Diterbitkan: {{tanggal_terbit}}", pw, ph), x: pw / 2 - 290, align: "right" }) },
      { label: "Tanggal Berakhir", icon: <CalendarClock className="w-4 h-4" />, make: (pw, ph) => ({ ...dateText("tanggal_berakhir", "Tanggal Berakhir", "Berlaku hingga: {{tanggal_berakhir}}", pw, ph), x: pw / 2 + 10, align: "left" }) },
      { label: "Masa Berlaku (Gabungan)", icon: <CalendarRange className="w-4 h-4" />, make: (pw, ph) => ({ ...dateText("masa_berlaku", "Masa Berlaku", "Berlaku {{tanggal_terbit}} s.d. {{tanggal_berakhir}}", pw, ph), w: 560, x: pw / 2 - 280, align: "center" }) },
    ],
  },
  {
    group: "Penandatangan",
    items: [
      { label: "Instansi Penandatangan", icon: <Building2 className="w-4 h-4" />, make: (pw, ph) => ({ type: "text", slot: "signer_heading", name: "Instansi Penandatangan", text: "PT PELABUHAN INDONESIA (PERSERO)\nDIREKTUR\nPelaksana Harian,", w: 420, h: 52, x: (pw - 420) / 2, y: ph - 260, fontSize: 12, lineHeight: 1.35, color: "#1f2937", align: "center", valign: "middle", fontFamily: FONTS[0].value }) },
      { label: "Nama & Jabatan", icon: <PenLine className="w-4 h-4" />, make: (pw, ph) => ({ type: "signer", slot: "signer", name: "Penandatangan", text: "Nama Penandatangan\nJabatan", w: 240, h: 70, x: (pw - 240) / 2, y: ph - 190, fontSize: 16, color: "#0f172a", align: "center", fontFamily: FONTS[0].value }) },
      { label: "Tanda Tangan", icon: <PenLine className="w-4 h-4" />, make: (pw, ph) => ({ type: "image", slot: "signature", name: "Tanda Tangan", text: "Nama Penandatangan", w: 280, h: 56, x: (pw - 280) / 2, y: ph - 200, fit: "contain" }) },
      { label: "QR Verifikasi", icon: <QrCode className="w-4 h-4" />, make: (pw, ph) => ({ type: "qr", slot: "qr", name: "QR Verifikasi", w: 90, h: 90, x: pw / 2 + 200, y: ph - 190 }) },
    ],
  },
  {
    group: "Footer",
    items: [
      { label: "Footer Data", icon: <Type className="w-4 h-4" />, make: (pw, ph) => ({ type: "text", slot: "footer", name: "Footer Data", text: "Sertifikat ini diterbitkan secara elektronik dan sah tanpa tanda tangan basah.", w: pw - 360, h: 44, x: 180, y: ph - 80, fontSize: 11, color: "#64748b", align: "center", valign: "middle", fontFamily: FONTS[0].value }) },
      { label: "Pita Tagline", icon: <Minus className="w-4 h-4" />, make: (pw, ph) => ({ type: "text", slot: "tagline", name: "Pita Tagline", text: "Energizing People. Energizing Indonesia", w: pw - 126, h: 20, x: 0, y: ph - 43, fontSize: 12, color: "#ffffff", fill: "#1f56b0", padding: 57, align: "left", valign: "middle", fontFamily: FONTS[0].value }) },
      { label: "Social Media Links", icon: <Globe className="w-4 h-4" />, make: (pw, ph) => ({ type: "social", slot: "social", name: "Social Media Links", w: pw - 360, h: 26, x: 180, y: ph - 38, fontSize: 11, color: "#475569", align: "center", links: { instagram: "instagram.com/kursus", twitter: "x.com/kursus", youtube: "youtube.com/kursus", facebook: "facebook.com/kursus", website: "kursusonline.com" } }) },
    ],
  },
  {
    group: "Elemen Bebas",
    items: [
      { label: "Teks", icon: <Type className="w-4 h-4" />, make: textBase("Teks", "Ketik teks di sini", 300, 50, { fontSize: 24 }) },
      { label: "Gambar", icon: <ImageIcon className="w-4 h-4" />, make: (pw, ph) => ({ type: "image", name: "Gambar", w: 200, h: 140, x: pw / 2 - 100, y: ph / 2 - 70, fit: "contain" }) },
      { label: "Kotak", icon: <Square className="w-4 h-4" />, make: (pw, ph) => ({ type: "shape", shape: "rect", name: "Kotak", w: 200, h: 120, x: pw / 2 - 100, y: ph / 2 - 60, fill: "#E0F2FE", stroke: "#016DB2", strokeWidth: 0, radius: 0 }) },
      { label: "Lingkaran", icon: <Circle className="w-4 h-4" />, make: (pw, ph) => ({ type: "shape", shape: "ellipse", name: "Lingkaran", w: 140, h: 140, x: pw / 2 - 70, y: ph / 2 - 70, fill: "#E0F2FE", stroke: "#016DB2", strokeWidth: 0 }) },
      { label: "Garis", icon: <Minus className="w-4 h-4" />, make: (pw, ph) => ({ type: "line", name: "Garis", w: 300, h: 4, x: pw / 2 - 150, y: ph / 2, fill: "#016DB2" }) },
    ],
  },
];

const newEl = (partial: Partial<CanvasEl>): CanvasEl => ({
  id: uid(), type: "text", name: "Elemen", x: 0, y: 0, w: 100, h: 50, rotation: 0, opacity: 1, ...partial,
});

/** Buat elemen untuk komponen tunggal (mis. "signer", "signature") dengan posisi default palet. */
export function createSlotElement(slot: string, orientation: string, size: string, extra: Partial<CanvasEl> = {}): CanvasEl | null {
  const { w: pw, h: ph } = getPageSize(orientation, size);
  for (const item of PALETTE.flatMap((g) => g.items)) {
    const base = item.make(pw, ph);
    if (base.slot === slot) return newEl({ ...base, ...extra });
  }
  return null;
}

/** Komponen kanvas yang terhubung dengan form Penandatangan. */
export const SIGNER_SLOTS = ["signer_heading", "signature", "signer"] as const;

/**
 * Susunan awal template, mengikuti sertifikat standar PMLI (Certificate of Attendance).
 * Koordinat ditulis untuk A4 landscape (1123×794) lalu diskalakan ke ukuran halaman aktif.
 */
export function createDefaultDesign(orientation: string, size: string, signerName: string, signerTitle: string): CanvasDesign {
  const { w: pw, h: ph } = getPageSize(orientation, size);
  const sx = pw / 1123, sy = ph / 794;
  const sans = FONTS[0].value;
  const mid = (w: number) => (1123 - w) / 2;
  const txt = (name: string, text: string, x: number, y: number, w: number, h: number, extra: Partial<CanvasEl> = {}) =>
    newEl({ type: "text", name, text, x, y, w, h, fontSize: 13, color: "#1f2937", align: "center", valign: "middle", fontFamily: sans, ...extra });

  const elements: CanvasEl[] = [
    newEl({ type: "logo", slot: "logo_kiri_atas", name: "Logo Kiri Atas", x: 45, y: 50, w: 330, h: 50, fit: "contain" }),
    newEl({ type: "logo", slot: "logo_kanan_atas", name: "Logo Kanan Atas", x: 857, y: 42, w: 215, h: 72, fit: "contain" }),

    txt("Judul Sertifikat", "CERTIFICATE", mid(520), 112, 520, 60, { fontSize: 52, bold: true, letterSpacing: 1, color: "#3f3f46" }),
    txt("Sub Judul", "OF ATTENDANCE", mid(520), 170, 520, 34, { fontSize: 26, color: "#27272a" }),
    txt("Label Penerima", "Diberikan kepada :", mid(400), 220, 400, 24, { fontSize: 15 }),
    txt("Nama Peserta", "{{nama_peserta}}", mid(640), 248, 640, 44, { fontSize: 32, bold: true, color: "#1e3a8a" }),
    txt("NIPP Peserta", "{{nipp}}", mid(300), 290, 300, 26, { fontSize: 18, bold: true, color: "#111827" }),
    newEl({ type: "line", name: "Garis Pemisah", x: mid(256), y: 319, w: 256, h: 1.5, fill: "#1f2937" }),
    txt("Keterangan", "Atas partisipasinya sebagai peserta", mid(500), 326, 500, 22),
    txt("Label Pelatihan", "Dalam pelatihan", mid(500), 362, 500, 20),
    txt("Judul Pelatihan", "{{judul_pelatihan}}", mid(640), 381, 640, 26, { fontSize: 16, bold: true }),
    txt("Label Penyelenggara", "Diselenggarakan oleh :", mid(500), 418, 500, 20),
    txt("Penyelenggara", "{{penyelenggara}}\n{{tempat}}", mid(640), 437, 640, 40, { fontSize: 15, bold: true, lineHeight: 1.25 }),
    txt("Label Pendukung", "Didukung oleh :", mid(500), 484, 500, 20),
    txt("Pendukung", "{{pendukung}}", mid(640), 502, 640, 24, { fontSize: 16, bold: true }),

    txt("Instansi Penandatangan", "PT PELABUHAN INDONESIA (PERSERO)\nDIREKTUR\nPelaksana Harian,", mid(420), 534, 420, 52, { slot: "signer_heading", fontSize: 12, lineHeight: 1.35 }),
    newEl({ type: "image", slot: "signature", name: "Tanda Tangan", text: signerName, x: mid(280), y: 594, w: 280, h: 56, fit: "contain" }),
    newEl({ type: "signer", slot: "signer", name: "Penandatangan", text: `${signerName}\n${signerTitle}`, x: mid(256), y: 652, w: 256, h: 46, fontSize: 14, color: "#1f2937", align: "center", fontFamily: sans }),

    txt("Tanggal Terbit", "Diterbitkan: {{tanggal_terbit}}", 850, 590, 230, 18, { slot: "tanggal_terbit", dateFormat: "id_long", fontSize: 10, align: "right", color: "#64748b" }),
    txt("Tanggal Berakhir", "Berlaku hingga: {{tanggal_berakhir}}", 850, 608, 230, 18, { slot: "tanggal_berakhir", dateFormat: "id_long", fontSize: 10, align: "right", color: "#64748b" }),

    newEl({ type: "logo", slot: "logo_kiri_bawah", name: "Logo Kiri Bawah", x: 55, y: 615, w: 130, h: 58, fit: "contain" }),
    txt("Nama Perusahaan Footer", "PT Pendidikan Maritim dan Logistik Indonesia", 57, 684, 380, 18, { fontSize: 13, bold: true, color: "#1e40af", align: "left" }),
    txt("Footer Data", "Jl. Raya Puncak – Jl. Beringin | No.1 Gadog,\nPandasari, Ciawi, Bogor 16720\nT +62 251 7555 622 / +62 251 7555 614  |  E corpsce@pmli.co.id", 57, 704, 420, 44,
      { slot: "footer", fontSize: 9.5, lineHeight: 1.4, color: "#334155", align: "left" }),
    newEl({ type: "social", slot: "social", name: "Social Media Links", x: 560, y: 726, w: 440, h: 20, fontSize: 9.5, color: "#1e40af", align: "right", fontFamily: sans,
      links: { instagram: "pt_pmli", twitter: "@pt_pmli", youtube: "PT PMLI", facebook: "PT PMLI", website: "www.pmli.co.id" } }),
    txt("Pita Tagline", "Energizing People. Energizing Indonesia", 0, 751, 997, 20, { slot: "tagline", fontSize: 12, color: "#ffffff", fill: "#1f56b0", padding: 57, align: "left" }),
    newEl({ type: "logo", slot: "logo_kanan_bawah", name: "Logo Kanan Bawah", x: 998, y: 698, w: 122, h: 76, fit: "contain" }),
  ];

  return {
    bgColor: "#f4f6f9",
    bgPreset: "ornamen",
    bgImage: makeBgPreset("ornamen", pw, ph),
    company: COMPANIES[0],
    elements: elements.map((e) => ({
      ...e, x: e.x * sx, w: e.w * sx, y: e.y * sy, h: e.h * sy,
      fontSize: e.fontSize && +(e.fontSize * Math.min(sx, sy)).toFixed(1),
      padding: e.padding && e.padding * sx,
    })),
  };
}

/* ============================================================================
   ELEMENT RENDERER (dipakai editor & preview)
   ========================================================================== */

const SOCIAL_META: { key: string; icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }> }[] = [
  { key: "instagram", icon: Instagram }, { key: "twitter", icon: Twitter }, { key: "youtube", icon: Youtube },
  { key: "facebook", icon: Facebook }, { key: "website", icon: Globe },
];

function FakeQr({ size }: { size: number }) {
  const cells = 21;
  const rects: React.ReactNode[] = [];
  for (let r = 0; r < cells; r++) for (let c = 0; c < cells; c++) {
    const finder = (r < 7 && c < 7) || (r < 7 && c >= cells - 7) || (r >= cells - 7 && c < 7);
    const lr = r < 7 ? r : r - (cells - 7), lc = c < 7 ? c : c - (cells - 7);
    const on = finder
      ? lr === 0 || lr === 6 || lc === 0 || lc === 6 || (lr >= 2 && lr <= 4 && lc >= 2 && lc <= 4)
      : (r * 7 + c * 13 + r * c) % 3 === 0;
    if (on) rects.push(<rect key={`${r}-${c}`} x={c} y={r} width={1} height={1} />);
  }
  return <svg viewBox={`0 0 ${cells} ${cells}`} width={size} height={size} fill="#0f172a" shapeRendering="crispEdges">{rects}</svg>;
}

function ElementBody({ el, preview, ctx }: { el: CanvasEl; preview: boolean; ctx: VarContext }) {
  const textStyle: React.CSSProperties = {
    fontSize: el.fontSize, fontFamily: el.fontFamily, color: el.color,
    fontWeight: el.bold ? 700 : 400, fontStyle: el.italic ? "italic" : "normal",
    textDecoration: el.underline ? "underline" : "none", textTransform: el.uppercase ? "uppercase" : "none",
    textAlign: el.align, lineHeight: el.lineHeight ?? 1.3, letterSpacing: el.letterSpacing ?? 0,
  };
  const justify = el.valign === "top" ? "flex-start" : el.valign === "bottom" ? "flex-end" : "center";

  switch (el.type) {
    case "text": {
      const t = preview ? fillVars(el.text ?? "", ctx, el.dateFormat) : el.text ?? "";
      return (
        <div className="w-full h-full flex flex-col overflow-hidden whitespace-pre-wrap break-words"
          style={{ ...textStyle, justifyContent: justify, background: el.fill, paddingLeft: el.padding, paddingRight: el.padding }}>
          {t}
        </div>
      );
    }
    case "signer": {
      const [name, ...rest] = (preview ? fillVars(el.text ?? "", ctx, el.dateFormat) : el.text ?? "").split("\n");
      return (
        <div className="w-full h-full flex flex-col justify-end overflow-hidden" style={textStyle}>
          <div className="font-bold border-t pt-1" style={{ borderColor: el.color }}>{name}</div>
          <div style={{ opacity: 0.8 }}>{rest.join("\n")}</div>
        </div>
      );
    }
    case "logo":
    case "image":
      if (el.src) return <img src={el.src} alt={el.name} draggable={false} className="w-full h-full select-none pointer-events-none" style={{ objectFit: el.fit ?? "contain" }} />;
      // Tanda tangan tanpa gambar: tampilkan nama dengan huruf script sebagai pengganti.
      if (el.slot === "signature" && el.text) {
        return (
          <div className="w-full h-full flex items-center justify-center overflow-hidden whitespace-nowrap" style={{ fontFamily: FONTS[3].value, fontSize: el.h * 0.62, color: "#111827" }}>
            {el.text}
          </div>
        );
      }
      if (preview) return null;
      return (
        <div className="w-full h-full border-2 border-dashed border-sky-300 bg-sky-50/60 flex flex-col items-center justify-center text-sky-600 gap-0.5 overflow-hidden" style={{ fontSize: 12 }}>
          <ImageIcon className="w-5 h-5" />
          <span className="font-bold text-center px-1">{el.name}</span>
          <span style={{ fontSize: 10 }} className="text-sky-500">Klik dua kali untuk unggah</span>
        </div>
      );
    case "qr":
      return <div className="w-full h-full flex items-center justify-center bg-white"><FakeQr size={Math.min(el.w, el.h)} /></div>;
    case "shape":
      return <div className="w-full h-full" style={{ background: el.fill, border: `${el.strokeWidth ?? 0}px solid ${el.stroke}`, borderRadius: el.shape === "ellipse" ? "50%" : el.radius ?? 0, boxSizing: "border-box" }} />;
    case "line":
      return <div className="w-full h-full" style={{ background: el.fill }} />;
    case "social": {
      const items = SOCIAL_META.filter((m) => (el.links?.[m.key] ?? "").trim());
      if (!items.length) return preview ? null : <div className="w-full h-full flex items-center justify-center text-slate-400 border border-dashed border-slate-300" style={{ fontSize: 11 }}>Social Media Links (kosong)</div>;
      return (
        <div className="w-full h-full flex items-center flex-wrap gap-x-4 gap-y-1 overflow-hidden" style={{ ...textStyle, justifyContent: el.align === "left" ? "flex-start" : el.align === "right" ? "flex-end" : "center" }}>
          {items.map(({ key, icon: Icon }) => (
            <span key={key} className="inline-flex items-center gap-1 whitespace-nowrap" style={key === "website" ? { fontWeight: 700, fontSize: (el.fontSize ?? 11) * 1.25 } : undefined}>
              {key !== "website" && <Icon className="shrink-0" style={{ width: (el.fontSize ?? 11) + 2, height: (el.fontSize ?? 11) + 2 }} />}{el.links?.[key]}
            </span>
          ))}
        </div>
      );
    }
  }
}

/** Render read-only satu halaman sertifikat, otomatis diskalakan ke lebar kontainer. */
export function CertificateCanvasView({ design, orientation, size, width, validity = DEFAULT_VALIDITY, issueDate = SAMPLE_ISSUE_DATE, data }: {
  design: CanvasDesign; orientation: string; size: string; width: number;
  validity?: Validity; issueDate?: string; data?: Record<string, string>;
}) {
  const { w: pw, h: ph } = getPageSize(orientation, size);
  const ctx: VarContext = { data: { ...SAMPLE_DATA, ...data }, issueDate, validity };
  const s = width / pw;
  return (
    <div style={{ width: pw * s, height: ph * s }} className="relative overflow-hidden shadow-lg bg-white">
      <div style={{ width: pw, height: ph, transform: `scale(${s})`, transformOrigin: "top left", background: design.bgColor, position: "relative" }}>
        {design.bgImage && <img src={design.bgImage} alt="" className="absolute inset-0 w-full h-full" style={{ objectFit: design.bgFit ?? "cover", opacity: design.bgOpacity ?? 1 }} />}
        {design.elements.filter((e) => !e.hidden).map((el) => (
          <div key={el.id} style={{ position: "absolute", left: el.x, top: el.y, width: el.w, height: el.h, transform: `rotate(${el.rotation}deg)`, opacity: el.opacity }}>
            <ElementBody el={el} preview ctx={ctx} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================================
   EDITOR
   ========================================================================== */

interface EditorProps {
  design: CanvasDesign;
  onChange: (d: CanvasDesign) => void;
  orientation: string;
  size: string;
  validity?: Validity;
  onToast?: (msg: string) => void;
  /** Dipanggil dari panel properti elemen penandatangan untuk membuka form Penandatangan. */
  onEditSigner?: () => void;
}

type Handle = { hx: -1 | 0 | 1; hy: -1 | 0 | 1; cursor: string };
const HANDLES: Handle[] = [
  { hx: -1, hy: -1, cursor: "nwse-resize" }, { hx: 0, hy: -1, cursor: "ns-resize" }, { hx: 1, hy: -1, cursor: "nesw-resize" },
  { hx: 1, hy: 0, cursor: "ew-resize" }, { hx: 1, hy: 1, cursor: "nwse-resize" }, { hx: 0, hy: 1, cursor: "ns-resize" },
  { hx: -1, hy: 1, cursor: "nesw-resize" }, { hx: -1, hy: 0, cursor: "ew-resize" },
];

type Drag =
  | { kind: "move"; id: string; sx: number; sy: number; ox: number; oy: number; moved: boolean }
  | { kind: "resize"; id: string; h: Handle; sx: number; sy: number; el: CanvasEl }
  | { kind: "rotate"; id: string; cx: number; cy: number };

export default function CertificateCanvasEditor({ design, onChange, orientation, size, validity = DEFAULT_VALIDITY, onToast, onEditSigner }: EditorProps) {
  const { w: pw, h: ph } = getPageSize(orientation, size);
  const ctx: VarContext = { data: SAMPLE_DATA, issueDate: SAMPLE_ISSUE_DATE, validity };

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [zoom, setZoom] = useState(0.6);
  const [showGrid, setShowGrid] = useState(false);
  const [snapOn, setSnapOn] = useState(true);
  const [showMargin, setShowMargin] = useState(true);
  const [tab, setTab] = useState<"props" | "layers" | "page">("props");
  const [guides, setGuides] = useState<{ v: number[]; h: number[] }>({ v: [], h: [] });
  const [past, setPast] = useState<CanvasDesign[]>([]);
  const [future, setFuture] = useState<CanvasDesign[]>([]);

  const designRef = useRef(design);
  designRef.current = design;
  const zoomRef = useRef(zoom);
  zoomRef.current = zoom;
  const dragRef = useRef<Drag | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const uploadTarget = useRef<{ id: string } | { bg: true } | null>(null);
  const presetThumbs = useMemo(() => BG_PRESETS.map((p) => ({ ...p, src: makeBgPreset(p.id, pw, ph) })), [pw, ph]);
  const lastPatch = useRef<{ key: string; t: number }>({ key: "", t: 0 });
  const prevDims = useRef({ pw, ph });

  const selected = design.elements.find((e) => e.id === selectedId) ?? null;

  /* ---------- history ---------- */
  const pushHistory = useCallback(() => {
    setPast((p) => [...p.slice(-49), designRef.current]);
    setFuture([]);
  }, []);

  const commit = useCallback((next: CanvasDesign, record = true) => {
    if (record) pushHistory();
    onChange(next);
  }, [onChange, pushHistory]);

  const undo = () => {
    if (!past.length) return;
    setFuture((f) => [designRef.current, ...f]);
    onChange(past[past.length - 1]);
    setPast((p) => p.slice(0, -1));
  };
  const redo = () => {
    if (!future.length) return;
    setPast((p) => [...p, designRef.current]);
    onChange(future[0]);
    setFuture((f) => f.slice(1));
  };

  const patch = useCallback((id: string, partial: Partial<CanvasEl>, coalesceKey?: string) => {
    const now = Date.now();
    const key = coalesceKey ? `${id}:${coalesceKey}` : "";
    const record = !(key && lastPatch.current.key === key && now - lastPatch.current.t < 700);
    lastPatch.current = { key, t: now };
    const d = designRef.current;
    commit({ ...d, elements: d.elements.map((e) => (e.id === id ? { ...e, ...partial } : e)) }, record);
  }, [commit]);

  /* ---------- fit zoom & rescale on orientation change ---------- */
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
    onChange({
      ...d,
      bgImage: d.bgPreset ? makeBgPreset(d.bgPreset, pw, ph) : d.bgImage,
      elements: d.elements.map((e) => ({ ...e, x: e.x * sx, w: e.w * sx, y: e.y * sy, h: e.h * sy })),
    });
  }, [pw, ph, onChange]);

  /* ---------- element ops ---------- */
  const addElement = (item: PaletteItem) => {
    const base = item.make(pw, ph);
    if (base.slot) {
      const exist = designRef.current.elements.find((e) => e.slot === base.slot);
      if (exist) {
        setSelectedId(exist.id);
        setTab("props");
        onToast?.(`"${exist.name}" sudah ada di kanvas — dipilih untuk diedit.`);
        return;
      }
    }
    const el = newEl(base);
    commit({ ...designRef.current, elements: [...designRef.current.elements, el] });
    setSelectedId(el.id);
    setTab("props");
  };

  const removeEl = (id: string) => {
    commit({ ...designRef.current, elements: designRef.current.elements.filter((e) => e.id !== id) });
    setSelectedId((s) => (s === id ? null : s));
  };

  const duplicateEl = (id: string) => {
    const src = designRef.current.elements.find((e) => e.id === id);
    if (!src) return;
    const copy: CanvasEl = { ...src, id: uid(), slot: undefined, name: `${src.name} (Salinan)`, x: src.x + 20, y: src.y + 20, locked: false };
    commit({ ...designRef.current, elements: [...designRef.current.elements, copy] });
    setSelectedId(copy.id);
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

  /* ---------- upload ---------- */
  const requestUpload = (target: { id: string } | { bg: true }) => {
    uploadTarget.current = target;
    fileRef.current?.click();
  };

  const readImage = (file: File, target: { id: string } | { bg: true } | { at: { x: number; y: number } }) => {
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
        setSelectedId(el.id);
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

  const [bgDragOver, setBgDragOver] = useState(false);

  /* ---------- pointer interactions ---------- */
  const pagePoint = (e: { clientX: number; clientY: number }) => {
    const r = pageRef.current!.getBoundingClientRect();
    return { x: (e.clientX - r.left) / zoomRef.current, y: (e.clientY - r.top) / zoomRef.current };
  };

  const snapMove = (id: string, x: number, y: number, w: number, h: number) => {
    if (!snapOn) { setGuides({ v: [], h: [] }); return { x, y }; }
    const T = 6 / zoomRef.current;
    const others = designRef.current.elements.filter((e) => e.id !== id && !e.hidden);
    const xs = [0, pw / 2, pw, ...others.flatMap((e) => [e.x, e.x + e.w / 2, e.x + e.w])];
    const ys = [0, ph / 2, ph, ...others.flatMap((e) => [e.y, e.y + e.h / 2, e.y + e.h])];
    const best = (cands: number[], pts: number[]) => {
      let d = Infinity, line = 0, off = 0;
      for (const p of pts) for (const c of cands) if (Math.abs(c - p) < Math.abs(d)) { d = c - p; line = c; off = d; }
      return Math.abs(d) <= T ? { off, line } : null;
    };
    const sx = best(xs, [x, x + w / 2, x + w]);
    const sy = best(ys, [y, y + h / 2, y + h]);
    setGuides({ v: sx ? [sx.line] : [], h: sy ? [sy.line] : [] });
    return { x: x + (sx?.off ?? 0), y: y + (sy?.off ?? 0) };
  };

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const d = dragRef.current;
      if (!d) return;
      const z = zoomRef.current;
      const els = designRef.current.elements;
      const cur = els.find((x) => x.id === d.id);
      if (!cur) return;
      let next: CanvasEl = cur;

      if (d.kind === "move") {
        const dx = (e.clientX - d.sx) / z, dy = (e.clientY - d.sy) / z;
        if (!d.moved && Math.hypot(dx, dy) < 2) return;
        if (!d.moved) { d.moved = true; pushHistory(); }
        const s = snapMove(d.id, d.ox + dx, d.oy + dy, cur.w, cur.h);
        next = { ...cur, x: s.x, y: s.y };
      } else if (d.kind === "resize") {
        const el = d.el;
        const loc = rotatePt((e.clientX - d.sx) / z, (e.clientY - d.sy) / z, -el.rotation);
        let nw = d.h.hx === 0 ? el.w : Math.max(16, el.w + d.h.hx * loc.x);
        let nh = d.h.hy === 0 ? el.h : Math.max(16, el.h + d.h.hy * loc.y);
        const keep = d.h.hx !== 0 && d.h.hy !== 0 && (el.type === "logo" || el.type === "image" || el.type === "qr" || e.shiftKey);
        if (keep) { const sc = Math.max(nw / el.w, nh / el.h); nw = el.w * sc; nh = el.h * sc; }
        const c = { x: el.x + el.w / 2, y: el.y + el.h / 2 };
        const a = rotatePt(-d.h.hx * el.w / 2, -d.h.hy * el.h / 2, el.rotation);
        const a2 = rotatePt(-d.h.hx * nw / 2, -d.h.hy * nh / 2, el.rotation);
        const nc = { x: c.x + a.x - a2.x, y: c.y + a.y - a2.y };
        next = { ...cur, w: nw, h: nh, x: nc.x - nw / 2, y: nc.y - nh / 2 };
      } else {
        const p = pagePoint(e);
        let deg = (Math.atan2(p.y - d.cy, p.x - d.cx) * 180) / Math.PI + 90;
        if (deg < 0) deg += 360;
        if (e.shiftKey || Math.abs(((deg + 7.5) % 90) - 7.5) < 4) deg = Math.round(deg / 15) * 15;
        next = { ...cur, rotation: Math.round(deg) % 360 };
      }
      onChange({ ...designRef.current, elements: els.map((x) => (x.id === d.id ? next : x)) });
    };
    const onUp = () => {
      dragRef.current = null;
      setGuides({ v: [], h: [] });
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => { window.removeEventListener("pointermove", onMove); window.removeEventListener("pointerup", onUp); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onChange, pushHistory, snapOn, pw, ph]);

  const startMove = (e: React.PointerEvent, el: CanvasEl) => {
    e.stopPropagation();
    if (editingId === el.id) return;
    setSelectedId(el.id);
    setEditingId(null);
    if (el.locked) return;
    dragRef.current = { kind: "move", id: el.id, sx: e.clientX, sy: e.clientY, ox: el.x, oy: el.y, moved: false };
  };

  const startResize = (e: React.PointerEvent, el: CanvasEl, h: Handle) => {
    e.stopPropagation();
    pushHistory();
    dragRef.current = { kind: "resize", id: el.id, h, sx: e.clientX, sy: e.clientY, el };
  };

  const startRotate = (e: React.PointerEvent, el: CanvasEl) => {
    e.stopPropagation();
    pushHistory();
    dragRef.current = { kind: "rotate", id: el.id, cx: el.x + el.w / 2, cy: el.y + el.h / 2 };
  };

  /* ---------- keyboard ---------- */
  const onKeyDown = (e: React.KeyboardEvent) => {
    const t = e.target as HTMLElement;
    if (["INPUT", "TEXTAREA", "SELECT"].includes(t.tagName) || t.isContentEditable) return;
    const meta = e.metaKey || e.ctrlKey;
    if (meta && e.key.toLowerCase() === "z") { e.preventDefault(); e.shiftKey ? redo() : undo(); return; }
    if (meta && e.key.toLowerCase() === "y") { e.preventDefault(); redo(); return; }
    if (!selected) return;
    if (meta && e.key.toLowerCase() === "d") { e.preventDefault(); duplicateEl(selected.id); return; }
    if (e.key === "Delete" || e.key === "Backspace") { e.preventDefault(); if (!selected.locked) removeEl(selected.id); return; }
    if (e.key === "Escape") { setSelectedId(null); return; }
    const step = e.shiftKey ? 10 : 1;
    const mv: Record<string, Partial<CanvasEl>> = {
      ArrowLeft: { x: selected.x - step }, ArrowRight: { x: selected.x + step },
      ArrowUp: { y: selected.y - step }, ArrowDown: { y: selected.y + step },
    };
    if (mv[e.key] && !selected.locked) { e.preventDefault(); patch(selected.id, mv[e.key], "nudge"); }
  };

  /* ---------- align helpers ---------- */
  const alignTo = (el: CanvasEl, how: "h" | "v") =>
    patch(el.id, how === "h" ? { x: (pw - el.w) / 2 } : { y: (ph - el.h) / 2 });

  const resetDesign = () => {
    if (!window.confirm("Kembalikan susunan kanvas ke default? Perubahan desain saat ini akan hilang.")) return;
    const signer = design.elements.find((e) => e.type === "signer")?.text?.split("\n") ?? ["Nama Penandatangan", "Jabatan"];
    const d = createDefaultDesign(orientation, size, signer[0], signer[1] ?? "");
    commit({ ...d, company: design.company });
    setSelectedId(null);
  };

  const bgDropzone = (
    <div
      onClick={() => requestUpload({ bg: true })}
      onDragOver={(e) => { e.preventDefault(); setBgDragOver(true); }}
      onDragLeave={() => setBgDragOver(false)}
      onDrop={(e) => { e.preventDefault(); setBgDragOver(false); const f = e.dataTransfer.files?.[0]; if (f) readImage(f, { bg: true }); }}
      className={`cursor-pointer rounded-xl border-2 border-dashed p-3 text-center transition ${bgDragOver ? "border-[#016DB2] bg-sky-100" : "border-sky-300 bg-sky-50/50 hover:bg-sky-50"}`}>
      <UploadCloud className="w-5 h-5 mx-auto text-[#016DB2]" />
      <div className="text-[11px] font-bold text-slate-700 mt-1">Unggah Background</div>
      <div className="text-[10px] text-slate-400">Klik / seret file ke sini</div>
      <div className="text-[10px] text-slate-400">png, jpg, jpeg • maks 5Mb</div>
    </div>
  );

  const bgPresetGrid = (
    <div className="grid grid-cols-2 gap-1.5">
      <button type="button" onClick={() => applyBgPreset(null)} title="Polos"
        className={`rounded-lg border-2 overflow-hidden text-left ${!design.bgImage ? "border-[#016DB2]" : "border-slate-200 hover:border-slate-300"}`}>
        <div className="w-full flex items-center justify-center text-[9px] text-slate-400" style={{ aspectRatio: `${pw} / ${ph}`, background: design.bgColor }}>Polos</div>
        <div className="px-1.5 py-1 text-[10px] font-semibold text-slate-600 truncate">Polos</div>
      </button>
      {presetThumbs.map((p) => (
        <button key={p.id} type="button" onClick={() => applyBgPreset(p.id)} title={p.label}
          className={`rounded-lg border-2 overflow-hidden text-left ${design.bgPreset === p.id ? "border-[#016DB2]" : "border-slate-200 hover:border-slate-300"}`}>
          <img src={p.src} alt={p.label} className="w-full block" style={{ aspectRatio: `${pw} / ${ph}` }} />
          <div className="px-1.5 py-1 text-[10px] font-semibold text-slate-600 truncate">{p.label}</div>
        </button>
      ))}
    </div>
  );

  const isTextual = selected && ["text", "signer", "social"].includes(selected.type);
  const hasImage = selected && ["logo", "image"].includes(selected.type);

  /* ============================== UI ===================================== */
  return (
    <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white outline-none" tabIndex={0} onKeyDown={onKeyDown}>
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
        <Sep />
        <button type="button" onClick={() => { setSelectedId(null); setTab("page"); }}
          className="h-7 px-2.5 inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 text-[11px] font-bold">
          <Wallpaper className="w-4 h-4" />Background
        </button>
        <div className="flex-1" />
        <span className="hidden lg:block text-[10px] text-slate-400">Klik 2× teks untuk edit • Panah = geser • Shift+panah = 10px • Ctrl+D = duplikat • Del = hapus</span>
        <TB title="Reset ke susunan default" onClick={resetDesign}><RotateCcw className="w-4 h-4" /></TB>
      </div>

      <div className="flex" style={{ height: 680 }}>
        {/* Palette */}
        <aside className="w-52 shrink-0 border-r border-slate-200 overflow-y-auto p-3 space-y-4 bg-white">
          <div>
            <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">Background</div>
            <div className="space-y-2">
              {bgDropzone}
              {design.bgImage && !design.bgPreset && (
                <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-2 py-1.5 text-[10px] font-semibold text-emerald-700">
                  <span className="flex-1">✓ Background unggahan aktif</span>
                  <button type="button" onClick={() => applyBgPreset(null)} className="text-rose-600 hover:underline">Hapus</button>
                </div>
              )}
              <div className="text-[10px] font-semibold text-slate-500">atau pilih preset:</div>
              {bgPresetGrid}
            </div>
          </div>
          {PALETTE.map((g) => (
            <div key={g.group}>
              <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">{g.group}</div>
              <div className="space-y-1">
                {g.items.map((it) => {
                  const used = !!it.make(pw, ph).slot && design.elements.some((e) => e.slot === it.make(pw, ph).slot);
                  return (
                    <button key={it.label} type="button" onClick={() => addElement(it)}
                      className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-lg border text-left text-[11px] font-semibold transition ${used ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-slate-200 text-slate-700 hover:border-[#016DB2] hover:bg-sky-50"}`}>
                      {it.icon}<span className="flex-1">{it.label}</span>
                      {used ? <span className="text-[9px] font-bold">✓</span> : <span className="text-slate-300">+</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </aside>

        {/* Stage */}
        <div ref={scrollRef} className="flex-1 min-w-0 overflow-auto bg-slate-200/70 p-6" onPointerDown={() => { setSelectedId(null); setEditingId(null); }}>
          <div ref={stageRef} style={{ width: pw * zoom, height: ph * zoom }} className="relative mx-auto shadow-xl">
            <div ref={pageRef} style={{ width: pw, height: ph, transform: `scale(${zoom})`, transformOrigin: "top left", background: design.bgColor, position: "absolute", left: 0, top: 0, overflow: "hidden" }}
              onPointerDown={(e) => { e.stopPropagation(); setSelectedId(null); setEditingId(null); }}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files?.[0]; if (f) readImage(f, { at: pagePoint(e) }); }}>
              {design.bgImage && <img src={design.bgImage} alt="" draggable={false} className="absolute inset-0 w-full h-full pointer-events-none" style={{ objectFit: design.bgFit ?? "cover", opacity: design.bgOpacity ?? 1 }} />}
              {showGrid && <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(to right, rgba(1,109,178,.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(1,109,178,.12) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />}
              {showMargin && <div className="absolute pointer-events-none border border-dashed border-rose-300" style={{ left: 40, top: 40, right: 40, bottom: 40 }} />}

              {design.elements.map((el) => {
                if (el.hidden) return null;
                const isSel = el.id === selectedId;
                const editing = editingId === el.id;
                const canEditText = el.type === "text" || el.type === "signer";
                return (
                  <div key={el.id}
                    style={{ position: "absolute", left: el.x, top: el.y, width: el.w, height: el.h, transform: `rotate(${el.rotation}deg)`, opacity: el.opacity, cursor: el.locked ? "default" : editing ? "text" : "move" }}
                    onPointerDown={(e) => startMove(e, el)}
                    onDoubleClick={(e) => {
                      e.stopPropagation();
                      if (el.locked) return;
                      if (canEditText) setEditingId(el.id);
                      else if (el.type === "logo" || el.type === "image") requestUpload({ id: el.id });
                    }}>
                    {editing ? (
                      <div contentEditable suppressContentEditableWarning autoFocus
                        ref={(n) => { if (n && document.activeElement !== n) { n.focus(); } }}
                        className="w-full h-full outline-none whitespace-pre-wrap break-words flex flex-col bg-white/60"
                        style={{ fontSize: el.fontSize, fontFamily: el.fontFamily, color: el.color, textAlign: el.align, fontWeight: el.bold ? 700 : 400, fontStyle: el.italic ? "italic" : "normal", textDecoration: el.underline ? "underline" : "none", lineHeight: el.lineHeight ?? 1.3, letterSpacing: el.letterSpacing ?? 0, justifyContent: el.valign === "top" ? "flex-start" : el.valign === "bottom" ? "flex-end" : "center" }}
                        onBlur={(e) => { patch(el.id, { text: e.currentTarget.innerText.replace(/\n$/, "") }); setEditingId(null); }}
                        onKeyDown={(e) => { if (e.key === "Escape") (e.currentTarget as HTMLElement).blur(); e.stopPropagation(); }}>
                        {el.text}
                      </div>
                    ) : <ElementBody el={el} preview={false} ctx={ctx} />}

                    {!isSel && <div className="absolute inset-0 hover:outline hover:outline-1 hover:outline-sky-400/70 pointer-events-none" />}

                    {isSel && !editing && (
                      <>
                        <div className="absolute inset-0 pointer-events-none" style={{ outline: `${2 / zoom}px solid #016DB2` }} />
                        {!el.locked && HANDLES.map((h) => (
                          <div key={`${h.hx}${h.hy}`} onPointerDown={(e) => startResize(e, el, h)}
                            style={{ position: "absolute", width: 10 / zoom, height: 10 / zoom, left: `calc(${(h.hx + 1) * 50}% - ${5 / zoom}px)`, top: `calc(${(h.hy + 1) * 50}% - ${5 / zoom}px)`, background: "#fff", border: `${1.5 / zoom}px solid #016DB2`, borderRadius: 2 / zoom, cursor: h.cursor }} />
                        ))}
                        {!el.locked && (
                          <div onPointerDown={(e) => startRotate(e, el)}
                            style={{ position: "absolute", width: 12 / zoom, height: 12 / zoom, left: `calc(50% - ${6 / zoom}px)`, top: -28 / zoom, background: "#fff", border: `${1.5 / zoom}px solid #016DB2`, borderRadius: "50%", cursor: "grab" }} />
                        )}
                        {el.locked && <div className="absolute -top-1 -right-1 bg-[#016DB2] text-white rounded-full p-0.5" style={{ transform: `scale(${1 / zoom})`, transformOrigin: "top right" }}><Lock className="w-3 h-3" /></div>}
                      </>
                    )}
                  </div>
                );
              })}

              {guides.v.map((x) => <div key={`v${x}`} className="absolute top-0 bottom-0 pointer-events-none" style={{ left: x, width: 1 / zoom, background: "#f43f5e" }} />)}
              {guides.h.map((y) => <div key={`h${y}`} className="absolute left-0 right-0 pointer-events-none" style={{ top: y, height: 1 / zoom, background: "#f43f5e" }} />)}
            </div>
          </div>
        </div>

        {/* Right panel */}
        <aside className="w-72 shrink-0 border-l border-slate-200 bg-white flex flex-col">
          <div className="flex border-b border-slate-200 text-[11px] font-bold">
            {([["props", "Properti", SlidersHorizontal], ["layers", "Layer", Layers], ["page", "Halaman", Building2]] as const).map(([k, label, Icon]) => (
              <button key={k} type="button" onClick={() => setTab(k)}
                className={`flex-1 flex items-center justify-center gap-1 py-2.5 border-b-2 transition ${tab === k ? "border-[#016DB2] text-[#016DB2]" : "border-transparent text-slate-500 hover:text-slate-800"}`}>
                <Icon className="w-3.5 h-3.5" />{label}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-3 text-xs space-y-4">
            {/* ---- PROPERTI ---- */}
            {tab === "props" && !selected && (
              <div className="text-center text-slate-400 py-10 space-y-2">
                <SlidersHorizontal className="w-6 h-6 mx-auto" />
                <p className="font-semibold">Pilih elemen di kanvas</p>
                <p className="text-[11px]">atau tambahkan komponen dari panel kiri.</p>
              </div>
            )}

            {tab === "props" && selected && (
              <>
                <div>
                  <input value={selected.name} onChange={(e) => patch(selected.id, { name: e.target.value }, "name")}
                    className="w-full font-bold text-slate-900 text-sm border border-transparent hover:border-slate-200 focus:border-[#016DB2] rounded-lg px-1.5 py-1 outline-none" />
                  <div className="flex gap-1 mt-1.5">
                    <TB title="Duplikat (Ctrl+D)" onClick={() => duplicateEl(selected.id)}><Copy className="w-3.5 h-3.5" /></TB>
                    <TB title={selected.locked ? "Buka kunci" : "Kunci"} active={!!selected.locked} onClick={() => patch(selected.id, { locked: !selected.locked })}>{selected.locked ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}</TB>
                    <TB title={selected.hidden ? "Tampilkan" : "Sembunyikan"} onClick={() => patch(selected.id, { hidden: !selected.hidden })}>{selected.hidden ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}</TB>
                    <TB title="Ke paling depan" onClick={() => reorder(selected.id, "front")}><ChevronsUp className="w-3.5 h-3.5" /></TB>
                    <TB title="Maju satu layer" onClick={() => reorder(selected.id, "up")}><ArrowUp className="w-3.5 h-3.5" /></TB>
                    <TB title="Mundur satu layer" onClick={() => reorder(selected.id, "down")}><ArrowDown className="w-3.5 h-3.5" /></TB>
                    <TB title="Ke paling belakang" onClick={() => reorder(selected.id, "back")}><ChevronsDown className="w-3.5 h-3.5" /></TB>
                    <TB title="Hapus (Del)" danger onClick={() => removeEl(selected.id)}><Trash2 className="w-3.5 h-3.5" /></TB>
                  </div>
                </div>

                <Section title="Posisi & Ukuran">
                  <div className="grid grid-cols-2 gap-2">
                    <Num label="X" value={selected.x} onChange={(v) => patch(selected.id, { x: v }, "x")} />
                    <Num label="Y" value={selected.y} onChange={(v) => patch(selected.id, { y: v }, "y")} />
                    <Num label="Lebar" value={selected.w} min={8} onChange={(v) => patch(selected.id, { w: v }, "w")} />
                    <Num label="Tinggi" value={selected.h} min={2} onChange={(v) => patch(selected.id, { h: v }, "h")} />
                    <Num label="Rotasi °" value={selected.rotation} onChange={(v) => patch(selected.id, { rotation: ((v % 360) + 360) % 360 }, "rot")} />
                    <Num label="Opacity %" value={Math.round(selected.opacity * 100)} min={0} max={100} onChange={(v) => patch(selected.id, { opacity: clamp(v, 0, 100) / 100 }, "op")} />
                  </div>
                  <div className="flex gap-2 mt-2">
                    <button type="button" onClick={() => alignTo(selected, "h")} className="flex-1 py-1.5 border border-slate-200 rounded-lg font-semibold hover:bg-slate-50">Tengah Horizontal</button>
                    <button type="button" onClick={() => alignTo(selected, "v")} className="flex-1 py-1.5 border border-slate-200 rounded-lg font-semibold hover:bg-slate-50">Tengah Vertikal</button>
                  </div>
                </Section>

                {hasImage && (
                  <Section title={selected.type === "logo" ? "File Logo" : "Gambar"}>
                    <div className="flex items-center gap-2 border border-slate-200 rounded-xl p-1.5 pl-3">
                      <span className="flex-1 truncate text-slate-600">{selected.src ? "File terpilih" : "Belum ada file"}</span>
                      <button type="button" onClick={() => requestUpload({ id: selected.id })} className="px-3 py-1.5 bg-[#016DB2] hover:bg-blue-700 text-white rounded-lg font-bold flex items-center gap-1"><UploadCloud className="w-3.5 h-3.5" />Choose File</button>
                    </div>
                    <div className="text-[11px] text-slate-400">*Max Size: 5Mb, Format: png, jpg, dan jpeg.</div>
                    <div className="flex gap-2 items-center">
                      <Select label="Mode" value={selected.fit ?? "contain"} onChange={(v) => patch(selected.id, { fit: v as "contain" | "cover" })} options={[["contain", "Muat (contain)"], ["cover", "Penuh (cover)"]]} />
                      {selected.src && <button type="button" onClick={() => patch(selected.id, { src: undefined })} className="self-end px-2.5 py-2 text-rose-600 border border-rose-200 rounded-lg font-semibold hover:bg-rose-50">Hapus</button>}
                    </div>
                  </Section>
                )}

                {isTextual && selected.type !== "social" && (
                  <Section title="Isi Teks">
                    <textarea rows={selected.type === "signer" ? 3 : 4} value={selected.text ?? ""} onChange={(e) => patch(selected.id, { text: e.target.value }, "text")}
                      className="w-full p-2 border border-slate-200 rounded-xl focus:outline-none focus:border-[#016DB2] resize-y" />
                    {selected.type === "signer" && <div className="text-[11px] text-slate-400">Baris pertama = nama (tebal), baris berikutnya = jabatan.</div>}
                    <div className="text-[11px] text-slate-500 font-semibold mt-1">Sisipkan data dinamis:</div>
                    <div className="flex flex-wrap gap-1">
                      {VARIABLES.map((v) => (
                        <button key={v.key} type="button" onClick={() => patch(selected.id, { text: `${selected.text ?? ""}{{${v.key}}}` })}
                          className="px-2 py-1 rounded-full bg-sky-50 text-[#016DB2] border border-sky-200 text-[10px] font-bold hover:bg-sky-100">{v.label}</button>
                      ))}
                    </div>
                  </Section>
                )}

                {selected.slot && (SIGNER_SLOTS as readonly string[]).includes(selected.slot) && onEditSigner && (
                  <div className="rounded-xl bg-amber-50 border border-amber-200 p-2.5 text-[11px] text-amber-800 space-y-1.5">
                    <div><b>Terhubung dengan form Penandatangan.</b> Perubahan di sini ikut mengubah form, dan sebaliknya.</div>
                    <button type="button" onClick={onEditSigner} className="font-bold text-[#016DB2] hover:underline">Edit di form Penandatangan ↓</button>
                  </div>
                )}

                {selected.slot === "signature" && !selected.src && (
                  <Section title="Tanda Tangan (Teks)">
                    <input value={selected.text ?? ""} onChange={(e) => patch(selected.id, { text: e.target.value }, "sig")}
                      className="w-full p-2 border border-slate-200 rounded-lg focus:outline-none focus:border-[#016DB2]" />
                    <div className="text-[11px] text-slate-400">Ditampilkan dengan huruf script selama gambar tanda tangan belum diunggah.</div>
                  </Section>
                )}

                {selected.type === "text" && (
                  <Section title="Latar Teks">
                    <div className="grid grid-cols-2 gap-2">
                      <label className="block"><span className="text-[11px] text-slate-500 font-semibold">Warna latar</span>
                        <input type="color" value={selected.fill && selected.fill !== "transparent" ? selected.fill : "#ffffff"} onChange={(e) => patch(selected.id, { fill: e.target.value }, "tfill")} className="w-full h-8 border border-slate-200 rounded-lg p-0.5 bg-white" />
                      </label>
                      <Num label="Padding" value={selected.padding ?? 0} min={0} onChange={(v) => patch(selected.id, { padding: v }, "pad")} />
                    </div>
                    {selected.fill && selected.fill !== "transparent" && (
                      <button type="button" onClick={() => patch(selected.id, { fill: undefined })} className="px-2.5 py-1.5 border border-slate-200 rounded-lg font-semibold hover:bg-slate-50">Hapus latar</button>
                    )}
                  </Section>
                )}

                {isTextual && DATE_TOKENS.test(selected.text ?? "") && (
                  <Section title="Tanggal & Masa Aktif">
                    <Select label="Format tanggal" value={selected.dateFormat ?? "id_long"} onChange={(v) => patch(selected.id, { dateFormat: v as DateFormat })} options={DATE_FORMATS} />
                    <div className="rounded-xl bg-sky-50 border border-sky-200 p-2.5 space-y-1 text-[11px] text-slate-600">
                      <div className="flex justify-between"><span>Masa aktif template</span><b className="text-[#016DB2]">{validityLabel(validity)}</b></div>
                      <div className="flex justify-between"><span>Contoh terbit</span><b>{formatDate(SAMPLE_ISSUE_DATE, selected.dateFormat)}</b></div>
                      <div className="flex justify-between"><span>Contoh berakhir</span><b>{(() => { const exp = addValidity(SAMPLE_ISSUE_DATE, validity); return exp ? formatDate(exp, selected.dateFormat) : "Seumur Hidup"; })()}</b></div>
                      <div className="pt-1 border-t border-sky-200 text-slate-500">Hasil: <span className="text-slate-800 font-semibold">{fillVars(selected.text ?? "", ctx, selected.dateFormat)}</span></div>
                    </div>
                    <div className="text-[11px] text-slate-400">Tanggal berakhir = tanggal terbit + masa aktif. Ubah masa aktif di <b>Pengaturan Template</b>.</div>
                  </Section>
                )}

                {selected.type === "social" && (
                  <Section title="Social Media Links">
                    {SOCIAL_META.map(({ key, icon: Icon }) => (
                      <label key={key} className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-slate-500 shrink-0" />
                        <input value={selected.links?.[key] ?? ""} placeholder={key === "website" ? "kursusonline.com" : `${key}.com/kursus`}
                          onChange={(e) => patch(selected.id, { links: { ...selected.links, [key]: e.target.value } }, `l${key}`)}
                          className="flex-1 p-2 border border-slate-200 rounded-lg focus:outline-none focus:border-[#016DB2]" />
                      </label>
                    ))}
                  </Section>
                )}

                {isTextual && (
                  <Section title="Tipografi">
                    <Select label="Font" value={selected.fontFamily ?? FONTS[0].value} onChange={(v) => patch(selected.id, { fontFamily: v })} options={FONTS.map((f) => [f.value, f.label])} />
                    <div className="grid grid-cols-2 gap-2">
                      <Num label="Ukuran" value={selected.fontSize ?? 16} min={6} max={200} onChange={(v) => patch(selected.id, { fontSize: v }, "fs")} />
                      <Num label="Spasi huruf" value={selected.letterSpacing ?? 0} step={0.5} onChange={(v) => patch(selected.id, { letterSpacing: v }, "ls")} />
                      <Num label="Tinggi baris" value={selected.lineHeight ?? 1.3} step={0.1} min={0.8} max={3} onChange={(v) => patch(selected.id, { lineHeight: v }, "lh")} />
                      <label className="block"><span className="text-[11px] text-slate-500 font-semibold">Warna</span>
                        <input type="color" value={selected.color ?? "#000000"} onChange={(e) => patch(selected.id, { color: e.target.value }, "color")} className="w-full h-8 border border-slate-200 rounded-lg p-0.5 bg-white" />
                      </label>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      <TB title="Tebal" active={!!selected.bold} onClick={() => patch(selected.id, { bold: !selected.bold })}><Bold className="w-3.5 h-3.5" /></TB>
                      <TB title="Miring" active={!!selected.italic} onClick={() => patch(selected.id, { italic: !selected.italic })}><Italic className="w-3.5 h-3.5" /></TB>
                      <TB title="Garis bawah" active={!!selected.underline} onClick={() => patch(selected.id, { underline: !selected.underline })}><Underline className="w-3.5 h-3.5" /></TB>
                      <TB title="HURUF BESAR" active={!!selected.uppercase} onClick={() => patch(selected.id, { uppercase: !selected.uppercase })}><span className="text-[10px] font-black">Aa</span></TB>
                      <Sep />
                      <TB title="Rata kiri" active={selected.align === "left"} onClick={() => patch(selected.id, { align: "left" })}><AlignLeft className="w-3.5 h-3.5" /></TB>
                      <TB title="Rata tengah" active={selected.align === "center"} onClick={() => patch(selected.id, { align: "center" })}><AlignCenter className="w-3.5 h-3.5" /></TB>
                      <TB title="Rata kanan" active={selected.align === "right"} onClick={() => patch(selected.id, { align: "right" })}><AlignRight className="w-3.5 h-3.5" /></TB>
                    </div>
                    {selected.type !== "social" && (
                      <Select label="Posisi vertikal" value={selected.valign ?? "middle"} onChange={(v) => patch(selected.id, { valign: v as CanvasEl["valign"] })} options={[["top", "Atas"], ["middle", "Tengah"], ["bottom", "Bawah"]]} />
                    )}
                  </Section>
                )}

                {(selected.type === "shape" || selected.type === "line") && (
                  <Section title="Warna & Garis Tepi">
                    <div className="grid grid-cols-2 gap-2">
                      <label className="block"><span className="text-[11px] text-slate-500 font-semibold">Isi</span>
                        <input type="color" value={selected.fill && selected.fill !== "transparent" ? selected.fill : "#ffffff"} onChange={(e) => patch(selected.id, { fill: e.target.value }, "fill")} className="w-full h-8 border border-slate-200 rounded-lg p-0.5 bg-white" />
                      </label>
                      {selected.type === "shape" && (
                        <label className="block"><span className="text-[11px] text-slate-500 font-semibold">Warna tepi</span>
                          <input type="color" value={selected.stroke ?? "#016DB2"} onChange={(e) => patch(selected.id, { stroke: e.target.value }, "stroke")} className="w-full h-8 border border-slate-200 rounded-lg p-0.5 bg-white" />
                        </label>
                      )}
                      {selected.type === "shape" && <Num label="Tebal tepi" value={selected.strokeWidth ?? 0} min={0} onChange={(v) => patch(selected.id, { strokeWidth: v }, "sw")} />}
                      {selected.type === "shape" && selected.shape === "rect" && <Num label="Sudut" value={selected.radius ?? 0} min={0} onChange={(v) => patch(selected.id, { radius: v }, "rad")} />}
                    </div>
                    <button type="button" onClick={() => patch(selected.id, { fill: "transparent" })} className="px-2.5 py-1.5 border border-slate-200 rounded-lg font-semibold hover:bg-slate-50">Isi transparan</button>
                  </Section>
                )}
              </>
            )}

            {/* ---- LAYER ---- */}
            {tab === "layers" && (
              <div className="space-y-1">
                {[...design.elements].reverse().map((el) => (
                  <div key={el.id} onClick={() => { setSelectedId(el.id); }}
                    className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg border cursor-pointer ${el.id === selectedId ? "border-[#016DB2] bg-sky-50" : "border-slate-200 hover:bg-slate-50"} ${el.hidden ? "opacity-50" : ""}`}>
                    <span className="flex-1 truncate font-semibold text-slate-700">{el.name}</span>
                    <button type="button" title="Sembunyikan" onClick={(e) => { e.stopPropagation(); patch(el.id, { hidden: !el.hidden }); }} className="text-slate-400 hover:text-slate-700">{el.hidden ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}</button>
                    <button type="button" title="Kunci" onClick={(e) => { e.stopPropagation(); patch(el.id, { locked: !el.locked }); }} className="text-slate-400 hover:text-slate-700">{el.locked ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}</button>
                    <button type="button" title="Naik" onClick={(e) => { e.stopPropagation(); reorder(el.id, "up"); }} className="text-slate-400 hover:text-slate-700"><ArrowUp className="w-3.5 h-3.5" /></button>
                    <button type="button" title="Turun" onClick={(e) => { e.stopPropagation(); reorder(el.id, "down"); }} className="text-slate-400 hover:text-slate-700"><ArrowDown className="w-3.5 h-3.5" /></button>
                  </div>
                ))}
                {!design.elements.length && <div className="text-center text-slate-400 py-8">Kanvas masih kosong.</div>}
              </div>
            )}

            {/* ---- HALAMAN ---- */}
            {tab === "page" && (
              <>
                <Section title="Company">
                  <Select label="" value={design.company} onChange={(v) => commit({ ...design, company: v })} options={COMPANIES.map((c) => [c, c])} />
                </Section>
                <Section title="Background Halaman">
                  {bgDropzone}
                  <div className="text-[11px] text-slate-400">
                    Disarankan ukuran {pw * 2} × {ph * 2} px ({orientation}) agar tajam saat dicetak. Background boleh sudah berisi ornamen/pola; teks & logo diletakkan di atasnya.
                  </div>
                  <div className="text-[10px] font-semibold text-slate-500 pt-1">Preset siap pakai</div>
                  {bgPresetGrid}
                  {design.bgImage && (
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <Num label="Opacity %" value={Math.round((design.bgOpacity ?? 1) * 100)} min={0} max={100}
                        onChange={(v) => commit({ ...designRef.current, bgOpacity: clamp(v, 0, 100) / 100 }, false)} />
                      {!design.bgPreset && (
                        <Select label="Mode" value={design.bgFit ?? "cover"} onChange={(v) => commit({ ...design, bgFit: v as CanvasDesign["bgFit"] })}
                          options={[["cover", "Penuh (crop)"], ["contain", "Muat utuh"], ["fill", "Regangkan"]]} />
                      )}
                    </div>
                  )}
                  <label className="block"><span className="text-[11px] text-slate-500 font-semibold">Warna dasar</span>
                    <input type="color" value={design.bgColor} onChange={(e) => commit({ ...designRef.current, bgColor: e.target.value }, false)} className="w-full h-8 border border-slate-200 rounded-lg p-0.5 bg-white" />
                  </label>
                  {design.bgImage && <button type="button" onClick={() => applyBgPreset(null)} className="px-2.5 py-1.5 text-rose-600 border border-rose-200 rounded-lg font-semibold hover:bg-rose-50">Hapus background</button>}
                </Section>
                <Section title="Ukuran Kanvas">
                  <div className="text-slate-500">{orientation} • {size}<br />{pw} × {ph} px. Ubah di bagian <b>Pengaturan Template</b> di atas; posisi elemen otomatis menyesuaikan.</div>
                </Section>
              </>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

/* ============================================================================
   SMALL UI PIECES
   ========================================================================== */

function TB({ children, onClick, title, active, disabled, danger }: { children: React.ReactNode; onClick?: () => void; title?: string; active?: boolean; disabled?: boolean; danger?: boolean }) {
  return (
    <button type="button" title={title} disabled={disabled} onClick={onClick}
      className={`min-w-7 h-7 px-1.5 inline-flex items-center justify-center rounded-lg border transition disabled:opacity-30 disabled:cursor-not-allowed ${active ? "bg-[#E0F2FE] border-[#016DB2] text-[#016DB2]" : danger ? "border-slate-200 bg-white text-rose-600 hover:bg-rose-50" : "border-slate-200 bg-white text-slate-600 hover:bg-slate-100"}`}>
      {children}
    </button>
  );
}

const Sep = () => <span className="w-px h-5 bg-slate-200 mx-0.5" />;

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2 pt-3 border-t border-slate-100 first:border-0 first:pt-0">
      <div className="text-[10px] font-black uppercase tracking-wider text-slate-400">{title}</div>
      {children}
    </div>
  );
}

function Num({ label, value, onChange, min, max, step = 1 }: { label: string; value: number; onChange: (v: number) => void; min?: number; max?: number; step?: number }) {
  return (
    <label className="block">
      <span className="text-[11px] text-slate-500 font-semibold">{label}</span>
      <input type="number" step={step} min={min} max={max} value={Number.isFinite(value) ? +value.toFixed(1) : 0}
        onChange={(e) => { const v = parseFloat(e.target.value); if (!Number.isNaN(v)) onChange(clamp(v, min ?? -Infinity, max ?? Infinity)); }}
        className="w-full p-1.5 border border-slate-200 rounded-lg focus:outline-none focus:border-[#016DB2]" />
    </label>
  );
}

function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: [string, string][] }) {
  return (
    <label className="block flex-1">
      {label && <span className="text-[11px] text-slate-500 font-semibold">{label}</span>}
      <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full p-2 border border-slate-200 rounded-lg bg-white focus:outline-none focus:border-[#016DB2]">
        {options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
      </select>
    </label>
  );
}
