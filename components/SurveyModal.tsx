"use client";

import React, { useState } from "react";
import { X, Star, Send, CheckCircle2, Sparkles } from "lucide-react";
import { Survey } from "@/lib/mockData";

interface SurveyModalProps {
  survey: Survey | null;
  onClose: () => void;
  onSubmitResponse?: (surveyId: string) => void;
}

export default function SurveyModal({ survey, onClose, onSubmitResponse }: SurveyModalProps) {
  const [rating, setRating] = useState<number>(5);
  const [selectedTopic, setSelectedTopic] = useState<string>("Digital Port & Terminal Operating System (TOS)");
  const [feedback, setFeedback] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  if (!survey) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (onSubmitResponse) {
      onSubmitResponse(survey.id);
    }
    setTimeout(() => {
      onClose();
    }, 1600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden border border-slate-200">
        
        {/* Banner Header */}
        <div className="bg-gradient-to-r from-pelindo-700 to-pelindo-900 p-6 text-white relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-pelindo-200 hover:text-white p-1 rounded-lg hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 text-white text-[11px] font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Kuesioner Wajib Insan Pelindo
          </div>
          <h3 className="text-lg md:text-xl font-bold">{survey.judul}</h3>
          <p className="text-xs text-pelindo-200 mt-1">Inisiator: {survey.creator} &bull; Batas Waktu: {survey.tenggat_waktu}</p>
        </div>

        {submitted ? (
          <div className="p-10 text-center">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h4 className="text-xl font-bold text-slate-800">Terima Kasih!</h4>
            <p className="text-sm text-slate-500 mt-1">Jawaban Anda berhasil dikirim dan dienkripsi ke database survei.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <div className="text-xs text-slate-600 bg-slate-50 p-3.5 rounded-xl border border-slate-200 leading-relaxed">
              {survey.deskripsi}
            </div>

            {/* Question 1: Rating Stars */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                1. Seberapa tinggi tingkat kepuasan Anda terhadap program pelatihan di Portaverse tahun ini?
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1.5 rounded-lg hover:bg-slate-50 transition"
                  >
                    <Star 
                      className={`w-7 h-7 ${star <= rating ? "text-amber-400 fill-amber-400" : "text-slate-300"}`} 
                    />
                  </button>
                ))}
                <span className="self-center ml-2 text-xs font-bold text-slate-600">
                  {rating} dari 5 Bintang
                </span>
              </div>
            </div>

            {/* Question 2: Radio Topic */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                2. Manakah fokus topik kompetensi yang paling Anda butuhkan untuk akselerasi karier Anda?
              </label>
              <div className="space-y-2">
                {[
                  "Digital Port & Terminal Operating System (TOS)",
                  "K3 & Keselamatan Operasi Dermaga (ISPS Code)",
                  "Supply Chain Logistics & Freight Management",
                  "Leadership & Budaya Kerja AKHLAK"
                ].map((topic) => (
                  <label 
                    key={topic}
                    className={`flex items-center gap-3 p-3 rounded-xl border text-xs cursor-pointer transition ${selectedTopic === topic ? "border-pelindo-700 bg-pelindo-50/50 text-pelindo-900 font-semibold" : "border-slate-200 hover:bg-slate-50 text-slate-700"}`}
                  >
                    <input 
                      type="radio" 
                      name="survey_topic"
                      checked={selectedTopic === topic}
                      onChange={() => setSelectedTopic(topic)}
                      className="accent-pelindo-700"
                    />
                    {topic}
                  </label>
                ))}
              </div>
            </div>

            {/* Question 3: Feedback Essay */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                3. Tuliskan masukan spesifik untuk Corporate University Pelindo:
              </label>
              <textarea 
                rows={3}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Contoh: Mohon perbanyak simulasi praktik langsung di crane simulator lab PMLI..."
                className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-pelindo-700 focus:border-transparent resize-none"
              />
            </div>

            {/* Submit Buttons */}
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button 
                type="button" 
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
              >
                Tunda Pengisian
              </button>
              <button 
                type="submit"
                className="flex items-center gap-2 px-5 py-2.5 bg-pelindo-700 hover:bg-pelindo-800 text-white text-xs font-bold rounded-xl shadow-lg shadow-pelindo-700/20 transition"
              >
                <Send className="w-4 h-4" /> Kirim Jawaban Survei
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
