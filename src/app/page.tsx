"use client";

import { useState } from "react";

export default function Home() {
  const [base, setBase] = useState<number>(10);
  const [numA, setNumA] = useState<string>("0");
  const [numB, setNumB] = useState<string>("0");

  // คำนวณผลรวม และขั้นตอน Carry
  const calculateResult = () => {
    const valA = parseInt(numA || "0", base);
    const valB = parseInt(numB || "0", base);

    if (isNaN(valA) || isNaN(valB)) {
      return {
        sumDecimal: 0,
        resultInBase: "Error",
        carrySteps: [],
        conversions: { b2: "0", b8: "0", b10: "0", b16: "0" }
      };
    }

    const sumDecimal = valA + valB;
    const resultInBase = sumDecimal.toString(base).toUpperCase();

    // ขั้นตอนการบวกลบเลขทีละหลัก (Carry Steps)
    const strA = (numA || "0").toUpperCase().split("").reverse();
    const strB = (numB || "0").toUpperCase().split("").reverse();
    const maxLen = Math.max(strA.length, strB.length);

    let carry = 0;
    const carrySteps = [];

    for (let i = 0; i < maxLen; i++) {
      const digitA = parseInt(strA[i] || "0", base) || 0;
      const digitB = parseInt(strB[i] || "0", base) || 0;
      const digitSum = digitA + digitB + carry;
      const recordedDigit = (digitSum % base).toString(base).toUpperCase();
      const nextCarry = Math.floor(digitSum / base);

      carrySteps.push({
        step: i + 1,
        expr: `${digitA.toString(base).toUpperCase()} + ${digitB.toString(base).toUpperCase()}`,
        carryIn: carry,
        sumDec: digitSum,
        recorded: recordedDigit,
        carryOut: nextCarry
      });

      carry = nextCarry;
    }

    return {
      sumDecimal,
      resultInBase,
      carrySteps,
      conversions: {
        b2: sumDecimal.toString(2).toUpperCase(),
        b8: sumDecimal.toString(8).toUpperCase(),
        b10: sumDecimal.toString(10),
        b16: sumDecimal.toString(16).toUpperCase()
      }
    };
  };

  const { resultInBase, carrySteps, conversions } = calculateResult();

  return (
    <main className="min-h-screen bg-[#0f0826] text-white flex flex-col items-center py-12 px-4 font-sans selection:bg-pink-500 selection:text-white">
      
      {/* Header โปรเจกต์ */}
      <div className="text-center mb-10">
        <div className="text-5xl mb-3 flex items-center justify-center gap-2">
          🏰 ✨
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-purple-200 to-indigo-100 tracking-wider">
          MY-BASE CALCULATOR
        </h1>
        <p className="text-purple-300/80 text-sm md:text-base mt-2 flex items-center justify-center gap-2">
          "Where Magic Meets Math" 🪄 ร่ายมนตร์คำนวณและแปลงเลขฐาน 2, 8, 10, 16
        </p>
        <div className="w-full max-w-4xl h-[1px] bg-purple-900/50 my-8 mx-auto" />
      </div>

      <div className="w-full max-w-4xl space-y-8">
        
        {/* 1. เลือกมิติฐานตัวเลข (Magic Realm) */}
        <div className="bg-[#1a0c38]/80 border border-purple-800/40 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl">
          <label className="text-purple-200 font-semibold mb-6 flex items-center gap-2 text-base">
            👑 เลือกมิติฐานตัวเลข (Magic Realm):
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "ฐาน 2", value: 2 },
              { label: "ฐาน 8", value: 8 },
              { label: "ฐาน 10", value: 10 },
              { label: "ฐาน 16", value: 16 }
            ].map((item) => (
              <button
                key={item.value}
                onClick={() => setBase(item.value)}
                className={`flex flex-col items-center justify-center py-5 rounded-2xl border transition-all duration-300 ${
                  base === item.value
                    ? "bg-gradient-to-r from-pink-500 to-purple-600 border-pink-400 text-white shadow-[0_0_25px_rgba(236,72,153,0.5)] scale-105"
                    : "bg-[#25104e]/50 border-purple-800/50 text-purple-200 hover:bg-[#321768]/60"
                }`}
              >
                <span className="text-xs opacity-70 mb-1">Realm</span>
                <span className="text-xl font-bold">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 2. กรอกคาถาตัวเลข (Spell Inputs) */}
        <div className="bg-[#1a0c38]/80 border border-purple-800/40 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl space-y-6">
          <label className="text-purple-200 font-semibold flex items-center gap-2 text-base pb-2 border-b border-purple-900/40">
            📜 กรอกคาถาตัวเลข (Spell Inputs)
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-purple-300 text-sm mb-2 font-medium">
                ตัวตั้ง (ฐาน {base})
              </label>
              <input
                type="text"
                value={numA}
                onChange={(e) => setNumA(e.target.value)}
                placeholder={`กรอกตัวเลขฐาน ${base}`}
                className="w-full bg-[#12072b] border border-purple-800/60 rounded-xl px-4 py-3.5 text-yellow-400 font-mono text-lg focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 placeholder-purple-900"
              />
            </div>

            <div>
              <label className="block text-purple-300 text-sm mb-2 font-medium">
                ตัวบวก (ฐาน {base})
              </label>
              <input
                type="text"
                value={numB}
                onChange={(e) => setNumB(e.target.value)}
                placeholder={`กรอกตัวเลขฐาน ${base}`}
                className="w-full bg-[#12072b] border border-purple-800/60 rounded-xl px-4 py-3.5 text-yellow-400 font-mono text-lg focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 placeholder-purple-900"
              />
            </div>
          </div>

          {/* ผลลัพธ์เวทมนตร์ */}
          <div className="bg-[#12072b] border border-purple-800/50 rounded-2xl p-5 flex items-center justify-between mt-6">
            <span className="text-purple-200 font-semibold flex items-center gap-2">
              🌟 ผลลัพธ์เวทมนตร์ (Bibbidi-Bobbidi-Boo!):
            </span>
            <span className="text-3xl font-extrabold text-amber-300 font-mono tracking-wider">
              {resultInBase}
            </span>
          </div>
        </div>

        {/* 3. ขั้นตอนการร่ายมนตร์ Carry */}
        <div className="bg-[#1a0c38]/80 border border-purple-800/40 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl">
          <label className="text-purple-200 font-semibold mb-6 flex items-center gap-2 text-base">
            🧚‍♂️ ขั้นตอนการร่ายมนตร์ Carry (ละอองดาวทีละหลัก)
          </label>

          <div className="overflow-x-auto rounded-2xl border border-purple-900/60">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#2a125c]/80 text-purple-200 text-xs md:text-sm border-b border-purple-900/60">
                  <th className="p-4 font-semibold">หลักที่</th>
                  <th className="p-4 font-semibold">เลขรวม (SPELL A + B)</th>
                  <th className="p-4 font-semibold">CARRY เข้า (ละอองทด)</th>
                  <th className="p-4 font-semibold">ผลรวมฐาน 10</th>
                  <th className="p-4 font-semibold">เลขที่บันทึก</th>
                  <th className="p-4 font-semibold">CARRY ออก (ทดไปหน้า)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-900/40 text-sm font-mono text-purple-100 bg-[#150930]/60">
                {carrySteps.length > 0 ? (
                  carrySteps.map((row) => (
                    <tr key={row.step} className="hover:bg-purple-900/20 transition-colors">
                      <td className="p-4 font-sans font-bold text-purple-300">#{row.step}</td>
                      <td className="p-4">{row.expr}</td>
                      <td className="p-4 text-pink-400">+{row.carryIn}</td>
                      <td className="p-4">{row.sumDec}</td>
                      <td className="p-4 text-amber-300 font-bold">{row.recorded}</td>
                      <td className="p-4 text-amber-400">{row.carryOut}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="p-4 text-center text-purple-400/60 font-sans">
                      ไม่มีข้อมูล
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* 4. กระจกวิเศษส่องผลลัพธ์ข้ามมิติ */}
        <div className="bg-[#1a0c38]/80 border border-purple-800/40 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl">
          <label className="text-purple-200 font-semibold mb-6 flex items-center gap-2 text-base">
            🪞 กระจกวิเศษส่องผลลัพธ์ข้ามมิติ (Base Conversion)
          </label>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: "มิติฐาน 2", sub: "Binary", val: conversions.b2 },
              { title: "มิติฐาน 8", sub: "Octal", val: conversions.b8 },
              { title: "มิติฐาน 10", sub: "Decimal", val: conversions.b10 },
              { title: "มิติฐาน 16", sub: "Hex", val: conversions.b16 }
            ].map((item) => (
              <div key={item.title} className="bg-[#12072b] border border-purple-800/50 rounded-2xl p-4 flex flex-col justify-between h-28">
                <div className="flex justify-between items-start">
                  <span className="text-purple-200 font-medium text-xs md:text-sm">{item.title}</span>
                  <span className="text-purple-400/60 text-[10px]">{item.sub}</span>
                </div>
                <div className="text-2xl font-bold text-amber-300 font-mono truncate">
                  {item.val}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. สมาชิกผู้จัดทำ (Team Members Section) */}
        <div className="bg-[#1a0c38]/80 border border-purple-800/40 rounded-3xl p-8 md:p-10 backdrop-blur-xl shadow-2xl text-center">
          
          <div className="text-3xl mb-2">👥 ✨</div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">
            สมาชิกผู้จัดทำ
          </h2>
          <p className="text-purple-300/70 text-xs md:text-sm mb-8">
            สมาชิกผู้พัฒนาระบบคำนวณและเรียนรู้เลขฐานแห่งเวทมนตร์
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* คนที่ 1: สิริมล ยืนยิ่ง */}
            <div className="bg-[#12072b]/90 border border-purple-800/50 rounded-2xl p-6 flex flex-col items-center justify-between hover:border-purple-500 transition-all duration-300 hover:-translate-y-1">
              <div className="text-5xl mb-4">🏰</div>
              <p className="font-bold text-white text-base md:text-lg mb-2">
                นางสาวสิริมล ยืนยิ่ง
              </p>
              <p className="text-amber-300 font-mono text-sm mb-4 font-semibold">
                056860405013-4
              </p>
            </div>

            {/* คนที่ 2: นรินทิพย์ อิ่มสวรรค์ */}
            <div className="bg-[#12072b]/90 border border-purple-800/50 rounded-2xl p-6 flex flex-col items-center justify-between hover:border-purple-500 transition-all duration-300 hover:-translate-y-1">
              <div className="text-5xl mb-4">👑</div>
              <p className="font-bold text-white text-base md:text-lg mb-2">
                นางสาวนรินทิพย์ อิ่มสวรรค์
              </p>
              <p className="text-amber-300 font-mono text-sm mb-4 font-semibold">
                056860405039-9
              </p>
            </div>

            {/* คนที่ 3: สิรินยา ยืนชีวิต */}
            <div className="bg-[#12072b]/90 border border-purple-800/50 rounded-2xl p-6 flex flex-col items-center justify-between hover:border-purple-500 transition-all duration-300 hover:-translate-y-1">
              <div className="text-5xl mb-4">✨</div>
              <p className="font-bold text-white text-base md:text-lg mb-2">
                นางสาวสิรินยา ยืนชีวิต
              </p>
              <p className="text-amber-300 font-mono text-sm mb-4 font-semibold">
                056860405063-9
              </p>
            </div>

          </div>

          <div className="w-full h-[1px] bg-purple-900/40 mt-10" />
        </div>

      </div>

    </main>
  );
}