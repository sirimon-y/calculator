"use client";

import { useState } from "react";
import {
  addBaseNumbers,
  convertBase,
  EnchantedResult,
  MagicStep,
} from "@/lib/calculator";

export default function Home() {
  const [base, setBase] = useState<number>(10);
  const [num1, setNum1] = useState<string>("");
  const [num2, setNum2] = useState<string>("");

  const handleBaseChange = (newBase: number) => {
    setBase(newBase);
  };

  const handleClear = () => {
    setNum1("");
    setNum2("");
  };

  const calcResult: EnchantedResult = addBaseNumbers(num1, num2, base);
  const activeNum =
    calcResult.isValid && calcResult.finalResult
      ? calcResult.finalResult
      : "0";

  // ข้อมูลผู้จัดทำ 3 คน
  const teamMembers = [
    {
      name: "นางสาวสิริมล ยืนยิ่ง",
      studentId: "056860405013-4",
      role: "ผู้จัดทำ",
      icon: "🏰",
    },
    {
      name: "นางสาวนรินทิพย์ อิ่มสรรค์",
      studentId: "056860405039-9",
      role: "ผู้จัดทำ",
      icon: "👑",
    },
    {
      name: "นางสาวสิรินยา ยืนชีวิต",
      studentId: "056860405063-9",
      role: "ผู้จัดทำ",
      icon: "✨",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#2d124d] via-[#1a0b2e] to-[#0d0517] text-purple-100 p-4 md:p-8 font-sans selection:bg-pink-500 selection:text-white">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header - Disney Castle Title */}
        <header className="text-center space-y-3 border-b border-purple-500/30 pb-8 relative">
          <div className="text-5xl animate-bounce mb-2">🏰✨</div>
          <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-pink-300 via-purple-200 to-amber-200 bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(236,72,153,0.3)]">
            MY-BASE CALCULATOR
          </h1>
          <p className="text-sm md:text-base text-pink-200/80 font-medium max-w-lg mx-auto">
            "Where Magic Meets Math" 🪄 ร่ายมนตร์คำนวณและแปลงเลขฐาน 2, 8, 10, 16
          </p>
        </header>

        {/* Base Selector - Magic Orbs */}
        <section className="bg-purple-950/40 backdrop-blur-md p-6 rounded-3xl border border-pink-500/20 shadow-[0_0_25px_rgba(168,85,247,0.15)]">
          <label className="block text-sm font-bold mb-3 text-pink-200 flex items-center gap-2">
            <span>👑</span> เลือกมิติฐานตัวเลข (Magic Realm):
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[2, 8, 10, 16].map((b) => (
              <button
                key={b}
                onClick={() => handleBaseChange(b)}
                className={`py-3 px-4 rounded-2xl font-bold transition-all duration-300 flex flex-col items-center justify-center gap-1 border ${
                  base === b
                    ? "bg-gradient-to-r from-pink-500 to-purple-600 border-pink-300 text-white shadow-[0_0_15px_rgba(236,72,153,0.5)] scale-105"
                    : "bg-purple-900/30 border-purple-400/20 text-purple-200 hover:bg-purple-800/40 hover:border-pink-400/40"
                }`}
              >
                <span className="text-xs opacity-75">Realm</span>
                <span className="text-lg">ฐาน {b}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Input Form - Spell Book */}
        <section className="bg-purple-900/20 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-pink-500/30 shadow-xl space-y-6 relative overflow-hidden">
          <div className="flex justify-between items-center border-b border-purple-500/20 pb-4">
            <span className="text-base font-bold text-pink-200 flex items-center gap-2">
              <span>📜</span> กรอกคาถาตัวเลข (Spell Inputs)
            </span>
            {(num1 || num2) && (
              <button
                onClick={handleClear}
                className="text-xs px-3 py-1.5 rounded-full bg-pink-500/20 hover:bg-pink-500/30 text-pink-300 transition-colors border border-pink-500/30 flex items-center gap-1"
              >
                <span>🧹</span> ล้างคาถา
              </button>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-purple-200">
                ตัวตั้ง (ฐาน {base})
              </label>
              <input
                type="text"
                value={num1}
                onChange={(e) => setNum1(e.target.value.toUpperCase())}
                placeholder={`กรอกตัวเลขฐาน ${base}`}
                className="w-full p-4 bg-purple-950/60 border border-pink-400/30 rounded-2xl focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-500/40 text-amber-200 placeholder-purple-400/50 uppercase font-mono tracking-wider font-bold transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-purple-200">
                ตัวบวก (ฐาน {base})
              </label>
              <input
                type="text"
                value={num2}
                onChange={(e) => setNum2(e.target.value.toUpperCase())}
                placeholder={`กรอกตัวเลขฐาน ${base}`}
                className="w-full p-4 bg-purple-950/60 border border-pink-400/30 rounded-2xl focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-500/40 text-amber-200 placeholder-purple-400/50 uppercase font-mono tracking-wider font-bold transition-all"
              />
            </div>
          </div>

          {/* Validation Error Notice */}
          {!calcResult.isValid && (num1 || num2) && (
            <div className="p-4 bg-red-950/50 border border-red-500/40 rounded-2xl text-red-200 text-sm font-medium animate-pulse flex items-center gap-2">
              <span>⚠️</span> {calcResult.errorMessage}
            </div>
          )}

          {/* Result Card */}
          {calcResult.isValid && (
            <div className="p-6 bg-gradient-to-r from-pink-900/40 via-purple-900/40 to-indigo-900/40 rounded-2xl border border-pink-400/40 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-[0_0_20px_rgba(236,72,153,0.15)]">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🌟</span>
                <span className="font-bold text-lg text-pink-200">
                  ผลลัพธ์เวทมนตร์ (Bibbidi-Bobbidi-Boo!):
                </span>
              </div>
              <span className="text-3xl md:text-4xl font-black font-mono text-amber-300 drop-shadow-[0_0_10px_rgba(252,211,77,0.5)] tracking-wider">
                {calcResult.finalResult || "0"}
              </span>
            </div>
          )}
        </section>

        {/* Step-by-Step Carry Visualization */}
        {calcResult.isValid && calcResult.steps.length > 0 && (
          <section className="bg-purple-900/20 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-pink-500/30 shadow-xl space-y-4">
            <h2 className="text-xl font-bold text-pink-200 flex items-center gap-2">
              <span>🧚‍♀️</span> ขั้นตอนการร่ายมนตร์ Carry (ละอองดาวทีละหลัก)
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-purple-500/20">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-purple-950/80 border-b border-purple-500/30 text-xs text-pink-300 uppercase tracking-wider font-semibold">
                    <th className="p-3">หลักที่</th>
                    <th className="p-3">เลขรวม (Spell A + B)</th>
                    <th className="p-3">Carry เข้า (ละอองทด)</th>
                    <th className="p-3">ผลรวมฐาน 10</th>
                    <th className="p-3">เลขที่บันทึก</th>
                    <th className="p-3">Carry ออก (ทดไปหน้า)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-purple-800/30 font-mono text-sm bg-purple-950/30">
                  {calcResult.steps.map((step: MagicStep) => (
                    <tr
                      key={step.position}
                      className="hover:bg-pink-500/10 transition-colors"
                    >
                      <td className="p-3 text-purple-300 font-bold">
                        #{step.position + 1}
                      </td>
                      <td className="p-3 text-purple-100">
                        {step.spellA} + {step.spellB}
                      </td>
                      <td className="p-3 text-pink-300 font-bold">
                        +{step.carryIn}
                      </td>
                      <td className="p-3 text-purple-200">{step.sumValue}</td>
                      <td className="p-3 font-black text-amber-300 text-base">
                        {step.resultDigit}
                      </td>
                      <td className="p-3 text-amber-400 font-bold">
                        {step.carryOut > 0 ? `✨ ${step.carryOut}` : "0"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Multi-Base Converter - Magic Mirrors */}
        <section className="bg-purple-950/40 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-pink-500/20 shadow-xl space-y-4">
          <h2 className="text-xl font-bold text-pink-200 flex items-center gap-2">
            <span>🪞</span> กระจกวิเศษส่องผลลัพธ์ข้ามมิติ (Base Conversion)
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono">
            {[2, 8, 10, 16].map((targetBase) => (
              <div
                key={targetBase}
                className="p-4 bg-purple-900/40 rounded-2xl border border-pink-500/20 flex flex-col justify-between hover:border-pink-400/50 transition-all shadow-inner"
              >
                <div className="text-xs text-pink-300 font-sans font-semibold mb-1 flex items-center justify-between">
                  <span>มิติฐาน {targetBase}</span>
                  <span className="text-[10px] opacity-60">
                    {targetBase === 2
                      ? "Binary"
                      : targetBase === 8
                      ? "Octal"
                      : targetBase === 10
                      ? "Decimal"
                      : "Hex"}
                  </span>
                </div>
                <div className="text-lg md:text-xl font-bold text-amber-300 truncate">
                  {convertBase(activeNum, base, targetBase)}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ผู้จัดทำ 3 คน */}
        <section className="bg-purple-900/20 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-pink-500/30 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="text-4xl animate-bounce">👥✨</div>
            <h2 className="text-2xl font-bold text-pink-200">
              สมาชิกผู้จัดทำ
            </h2>
            <p className="text-xs text-purple-300">
              สมาชิกผู้พัฒนาระบบคำนวณและเรียนรู้เลขฐานแห่งเวทมนตร์
            </p>
          </div>

          {/* สมาชิก 3 คน */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-purple-950/50 p-6 rounded-2xl border border-pink-500/20 text-center space-y-3 hover:border-pink-400/50 hover:bg-purple-900/40 transition-all duration-300 shadow-inner group"
              >
                <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                  {member.icon}
                </div>
                <div>
                  <h3 className="font-bold text-pink-100 text-sm md:text-base">
                    {member.name}
                  </h3>
                  <p className="text-xs text-amber-300/90 font-mono mt-1">
                    {member.studentId}
                  </p>
                </div>
                <div>
                  <span className="inline-block text-[11px] bg-pink-500/20 text-pink-300 border border-pink-500/30 px-3 py-1 rounded-full font-medium">
                    {member.role}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center border-t border-purple-500/20 pt-4">
            <p className="text-xs font-semibold text-amber-200/80 flex items-center justify-center gap-1">
            </p>
          </div>
        </section>

      </div>
    </main>
  );
}