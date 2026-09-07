"use client";

import React, { useState } from "react";
import { 
  CalendarDays, 
  Clock, 
  MapPin, 
  Users, 
  Download, 
  RefreshCw, 
  CheckCircle2, 
  PlusCircle, 
  Bell 
} from "lucide-react";
import { CalendarEvent } from "@/lib/mockData";

interface CalendarModuleProps {
  events: CalendarEvent[];
  onAddEvent: (event: CalendarEvent) => void;
}

export default function CalendarModule({ events, onAddEvent }: CalendarModuleProps) {
  const [selectedCat, setSelectedCat] = useState<string>("Semua Kategori");
  const [syncDone, setSyncDone] = useState<boolean>(false);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);

  // New Event Form
  const [newTitle, setNewTitle] = useState("Workshop TOS Nusantara Digital Twin Batch 2");
  const [newCat, setNewCat] = useState<CalendarEvent["kategori"]>("Pelatihan LMS (Offline)");
  const [newLoc, setNewLoc] = useState("Pelindo Tower Lt. 18 & Zoom");
  const [newDate, setNewDate] = useState("2025-09-28");
  const [newTime, setNewTime] = useState("09:00 - 16:00 WIB");
  const [newAud, setNewAud] = useState("Divisi TI & Operasi Subholding");

  const filteredEvents = events.filter(e => 
    selectedCat === "Semua Kategori" || e.kategori === selectedCat
  );

  const handleSync = () => {
    setSyncDone(true);
    setTimeout(() => setSyncDone(false), 3000);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEv: CalendarEvent = {
      id: `EVT-${String(events.length + 1).padStart(2, '0')}`,
      tanggal: newDate,
      waktu: newTime,
      judul: newTitle,
      kategori: newCat,
      lokasi: newLoc,
      peserta: newAud,
      status: "Jadwal Terkonfirmasi"
    };
    onAddEvent(newEv);
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-pelindo-700 via-pelindo-800 to-pelindo-900 text-white rounded-2xl p-6 md:p-8 shadow-xl shadow-pelindo-900/10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-pelindo-100 text-xs font-bold mb-2">
              <CalendarDays className="w-3.5 h-3.5 text-sky-300" /> Agenda Terpadu
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Calendar & Agenda Terpadu
            </h1>
            <p className="text-xs md:text-sm text-pelindo-100 mt-1.5 opacity-90 max-w-2xl">
              Penyatuan jadwal Pelatihan LMS (Online & Offline), agenda Community of Practice (CoP), dan deadline Evaluasi Level 3.
            </p>
          </div>

          <button 
            onClick={handleSync}
            className="flex items-center gap-2 px-4 py-2 bg-white/15 hover:bg-white/25 border border-white/20 text-white text-xs font-bold rounded-xl backdrop-blur-sm transition"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Sync Outlook & Google
          </button>
        </div>
      </div>

      {syncDone && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          Seluruh agenda berhasil disinkronisasi ke Microsoft Outlook dan Google Calendar!
        </div>
      )}

      {/* Filter & Add Button */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-card">
        <div className="flex items-center gap-2 text-xs w-full sm:w-auto">
          <span className="font-bold text-slate-700 whitespace-nowrap">Filter Kategori:</span>
          <select 
            value={selectedCat}
            onChange={(e) => setSelectedCat(e.target.value)}
            className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-pelindo-700"
          >
            <option value="Semua Kategori">Semua Kategori Agenda</option>
            <option value="Pelatihan LMS (Offline)">Pelatihan LMS (Offline)</option>
            <option value="Community of Practice (CoP)">Community of Practice (CoP)</option>
            <option value="Tenggat Evaluasi Level 3">Tenggat Evaluasi Level 3</option>
            <option value="Agenda Korporat SDM">Agenda Korporat SDM</option>
          </select>
        </div>

        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2 bg-pelindo-700 hover:bg-pelindo-800 text-white text-xs font-bold rounded-xl transition"
        >
          <PlusCircle className="w-4 h-4" /> Tambah Agenda Baru
        </button>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <form onSubmit={handleAddSubmit} className="p-5 bg-white border border-slate-200 rounded-2xl shadow-card text-xs space-y-4 animate-in fade-in">
          <div className="font-bold text-sm text-slate-800 pb-2 border-b border-slate-100">
            ➕ Tambah Jadwal Pelatihan / Agenda Korporat Baru
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Nama Kegiatan:</label>
              <input 
                type="text" 
                value={newTitle} 
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full p-2 bg-slate-50 rounded-xl border border-slate-200" 
                required 
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Kategori Agenda:</label>
              <select 
                value={newCat} 
                onChange={(e: any) => setNewCat(e.target.value)}
                className="w-full p-2 bg-slate-50 rounded-xl border border-slate-200"
              >
                <option value="Pelatihan LMS (Offline)">Pelatihan LMS (Offline)</option>
                <option value="Pelatihan LMS (Online)">Pelatihan LMS (Online)</option>
                <option value="Community of Practice (CoP)">Community of Practice (CoP)</option>
                <option value="Tenggat Evaluasi Level 3">Tenggat Evaluasi Level 3</option>
                <option value="Agenda Korporat SDM">Agenda Korporat SDM</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Lokasi / URL Pertemuan:</label>
              <input 
                type="text" 
                value={newLoc} 
                onChange={(e) => setNewLoc(e.target.value)}
                className="w-full p-2 bg-slate-50 rounded-xl border border-slate-200" 
                required 
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Tanggal Pelaksanaan:</label>
              <input 
                type="date" 
                value={newDate} 
                onChange={(e) => setNewDate(e.target.value)}
                className="w-full p-2 bg-slate-50 rounded-xl border border-slate-200" 
                required 
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Waktu (Jam):</label>
              <input 
                type="text" 
                value={newTime} 
                onChange={(e) => setNewTime(e.target.value)}
                className="w-full p-2 bg-slate-50 rounded-xl border border-slate-200" 
                required 
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Sasaran Peserta:</label>
              <input 
                type="text" 
                value={newAud} 
                onChange={(e) => setNewAud(e.target.value)}
                className="w-full p-2 bg-slate-50 rounded-xl border border-slate-200" 
                required 
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button 
              type="button" 
              onClick={() => setShowAddForm(false)} 
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Batal
            </button>
            <button 
              type="submit" 
              className="px-5 py-2 bg-pelindo-700 hover:bg-pelindo-800 text-white font-bold rounded-xl"
            >
              Terbitkan Jadwal
            </button>
          </div>
        </form>
      )}

      {/* Timeline List */}
      <div className="space-y-4">
        {filteredEvents.map((ev) => {
          let badgeColor = "bg-sky-50 text-sky-700 border-sky-200";
          if (ev.kategori.includes("Offline")) badgeColor = "bg-emerald-50 text-emerald-700 border-emerald-200";
          if (ev.kategori.includes("Evaluasi")) badgeColor = "bg-red-50 text-red-700 border-red-200";
          if (ev.kategori.includes("CoP")) badgeColor = "bg-purple-50 text-purple-700 border-purple-200";

          return (
            <div key={ev.id} className="bg-white p-5 md:p-6 rounded-2xl border border-slate-200 shadow-card hover:shadow-card-hover transition flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              
              {/* Left Date Box */}
              <div className="flex items-center gap-4">
                <div className="w-24 p-3 bg-pelindo-50 border border-pelindo-100 rounded-xl text-center shrink-0">
                  <div className="text-[10px] font-extrabold text-pelindo-700 tracking-wider">TANGGAL</div>
                  <div className="text-sm font-black text-slate-900 mt-0.5">{ev.tanggal}</div>
                  <div className="text-[10px] text-slate-500 font-semibold mt-0.5">{ev.waktu}</div>
                </div>

                {/* Event Details */}
                <div className="space-y-1">
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${badgeColor}`}>
                    {ev.kategori}
                  </span>
                  <h3 className="text-sm md:text-base font-bold text-slate-900">{ev.judul}</h3>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-slate-400" /> {ev.lokasi}</span>
                    <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-slate-400" /> {ev.peserta}</span>
                  </div>
                </div>
              </div>

              {/* Right Status & Download */}
              <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                <div className="text-right hidden sm:block">
                  <span className="text-[10px] text-slate-400 block font-semibold">Status Pengingat:</span>
                  <span className="text-xs font-bold text-pelindo-700">{ev.status}</span>
                </div>

                <button 
                  onClick={() => alert(`Mengunduh file kalender Outlook ${ev.id}.ics...`)}
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition"
                >
                  <Download className="w-3.5 h-3.5" /> Unduh .ICS
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
