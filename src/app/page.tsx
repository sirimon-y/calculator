"use client";

import { useState } from "react";

export default function Home() {
  const [inputVal, setInputVal] = useState("");
  const [fromBase, setFromBase] = useState<number>(10);
  const [toBase, setToBase] = useState<number>(2);

  // ฟังก์ชันแปลงเลขฐาน
  const convertBase = (val: string, from: number, to: number) => {
    if (!val.trim()) return "0";
    try {
      const parsed = parseInt(val, from);
      if (isNaN(parsed)) return "ข้อผิดพลาด (รูปแบบไม่ถูกต้อง)";
      return parsed.toString(to).toUpperCase();
    } catch {
      return "ข้อผิดพลาด";
    }
  };

  const result = convertBase(inputVal, fromBase, toBase);

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 text-white flex flex-col items-center justify-center p-4 md:p-8 font-sans">
      
      {/* Container หลักของเครื่องคิดเลข */}
      <div className="w-full max-w-2xl bg-slate-800/80 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-purple-500/30 shadow-2xl relative overflow-hidden">
        
        {/* หัวข้อโปรเจกต์ */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-pink-300 to-purple-300 tracking-wider">
            MY-BASE CALCULATOR
          </h1>
          <p className="text-purple-200 text-xs md:text-sm mt-1 tracking-widest font-light">
            "Where Magic Meets Math" — ฐาน 2, 8, 10, 16
          </p>
        </div>

        {/* ส่วนเลือกฐานต้นทาง และ ฐานปลายทาง */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-purple-200 font-semibold mb-2 text-sm">
              ✨ แปลงจาก (From Base):
            </label>
            <select
              value={fromBase}
              onChange={(e) => setFromBase(Number(e.target.value))}
              className="w-full bg-slate-900/90 border border-purple-500/50 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value={2}>Realm 2 (ฐานสอง - Binary)</option>
              <option value={8}>Realm 8 (ฐานแปด - Octal)</option>
              <option value={10}>Realm 10 (ฐานสิบ - Decimal)</option>
              <option value={16}>Realm 16 (ฐานสิบหก - Hexadecimal)</option>
            </select>
          </div>

          <div>
            <label className="block text-purple-200 font-semibold mb-2 text-sm">
              🔮 แปลงเป็น (To Base):
            </label>
            <select
              value={toBase}
              onChange={(e) => setToBase(Number(e.target.value))}
              className="w-full bg-slate-900/90 border border-purple-500/50 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value={2}>Realm 2 (ฐานสอง - Binary)</option>
              <option value={8}>Realm 8 (ฐานแปด - Octal)</option>
              <option value={10}>Realm 10 (ฐานสิบ - Decimal)</option>
              <option value={16}>Realm 16 (ฐานสิบหก - Hexadecimal)</option>
            </select>
          </div>
        </div>

        {/* ช่องใส่ตัวเลข */}
        <div className="mb-6">
          <label className="block text-purple-200 font-semibold mb-2 text-sm">
            🪄 ป้อนตัวเลข (Spell Inputs):
          </label>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="กรอกตัวเลขที่ต้องการแปลง..."
            className="w-full bg-slate-900/90 border border-purple-500/50 rounded-xl p-4 text-white text-lg focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-slate-500"
          />
        </div>

        {/* แสดงผลลัพธ์ */}
        <div className="bg-gradient-to-r from-purple-900/60 to-pink-900/60 border border-purple-400/40 p-5 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-2">
          <span className="text-purple-200 text-sm font-medium">
            ✨ ผลลัพธ์เวทมนตร์ (Bibbidi-Bobbidi-Boo!):
          </span>
          <span className="text-2xl md:text-3xl font-bold text-amber-300 break-all">
            {result}
          </span>
        </div>

      </div>

      {/* --- ส่วนสมาชิกผู้จัดทำ (Royal Creators / Team Section) --- */}
      <div className="mt-12 w-full max-w-3xl p-8 rounded-3xl bg-white/95 backdrop-blur-md shadow-2xl border border-purple-100 text-center">
        
        {/* หัวข้อส่วนสมาชิก */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <span className="text-purple-400 text-xl">✨</span>
          <h2 className="text-3xl font-bold text-slate-800">
            สมาชิก<span className="text-purple-600">ผู้จัดทำ</span>
          </h2>
          <span className="text-purple-400 text-xl">✨</span>
        </div>

        {/* รายชื่อสมาชิก 3 คน พร้อมไอคอนและรหัสนักศึกษา */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
          
          {/* คนที่ 1: ปราสาท */}
          <div className="flex flex-col items-center group transition-transform duration-300 hover:-translate-y-2">
            <div className="text-6xl mb-4 filter drop-shadow-md">🏰</div>
            <p className="font-bold text-slate-800 text-lg mb-2">
              นางสาวสิริมล ยืนยิ่ง
            </p>
            <p className="text-purple-600 font-semibold text-xs bg-purple-50 px-3 py-1.5 rounded-full border border-purple-100 shadow-sm">
              รหัสนักศึกษา: 056860405013-4
            </p>
          </div>

          {/* คนที่ 2: มงกุฎ */}
          <div className="flex flex-col items-center group transition-transform duration-300 hover:-translate-y-2">
            <div className="text-6xl mb-4 filter drop-shadow-md">👑</div>
            <p className="font-bold text-slate-800 text-lg mb-2">
              นางสาวนรินทิพย์ อิ่มสรรค์
            </p>
            <p className="text-purple-600 font-semibold text-xs bg-purple-50 px-3 py-1.5 rounded-full border border-purple-100 shadow-sm">
              รหัสนักศึกษา: 056860405039-9
            </p>
          </div>

          {/* คนที่ 3: ไม้กายสิทธิ์ */}
          <div className="flex flex-col items-center group transition-transform duration-300 hover:-translate-y-2">
            <div className="text-6xl mb-4 filter drop-shadow-md">🪄</div>
            <p className="font-bold text-slate-800 text-lg mb-2">
              นางสาวสิรินยา ยืนชีวิต
            </p>
            <p className="text-purple-600 font-semibold text-xs bg-purple-50 px-3 py-1.5 rounded-full border border-purple-100 shadow-sm">
              รหัสนักศึกษา: 056860405063-9
            </p>
          </div>

        </div>
      </div>

    </main>
  );
}