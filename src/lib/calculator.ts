export interface MagicStep {
  position: number;
  spellA: string;
  spellB: string;
  carryIn: number;
  sumValue: number;
  resultDigit: string;
  carryOut: number;
}

export interface EnchantedResult {
  steps: MagicStep[];
  finalResult: string;
  isValid: boolean;
  errorMessage?: string;
}

export function validateBaseInput(val: string, base: number): boolean {
  if (!val) return true;
  const magicChars = "0123456789ABCDEF".slice(0, base);
  const regex = new RegExp(`^[${magicChars}]+$`, "i");
  return regex.test(val);
}

export function addBaseNumbers(
  numA: string,
  numB: string,
  base: number
): EnchantedResult {
  const cleanA = numA.trim().toUpperCase() || "0";
  const cleanB = numB.trim().toUpperCase() || "0";

  if (!validateBaseInput(cleanA, base) || !validateBaseInput(cleanB, base)) {
    return {
      steps: [],
      finalResult: "",
      isValid: false,
      errorMessage: `✨ มนต์ผิดพลาด! กรุณาร่ายคาถาตัวเลขให้ถูกต้องตามฐาน ${base} ✨`,
    };
  }

  const maxLen = Math.max(cleanA.length, cleanB.length);
  const padA = cleanA.padStart(maxLen, "0");
  const padB = cleanB.padStart(maxLen, "0");

  const steps: MagicStep[] = [];
  let carry = 0;
  let rawResult = "";

  for (let i = maxLen - 1; i >= 0; i--) {
    const dAVal = parseInt(padA[i], base);
    const dBVal = parseInt(padB[i], base);
    const sum = dAVal + dBVal + carry;
    const outDigitVal = sum % base;
    const carryOut = Math.floor(sum / base);

    const resultDigitStr = outDigitVal.toString(base).toUpperCase();
    rawResult = resultDigitStr + rawResult;

    steps.unshift({
      position: maxLen - i - 1,
      spellA: padA[i],
      spellB: padB[i],
      carryIn: carry,
      sumValue: sum,
      resultDigit: resultDigitStr,
      carryOut: carryOut,
    });

    carry = carryOut;
  }

  if (carry > 0) {
    const carryStr = carry.toString(base).toUpperCase();
    rawResult = carryStr + rawResult;
  }

  return {
    steps,
    finalResult: rawResult,
    isValid: true,
  };
}

export function convertBase(val: string, fromBase: number, toBase: number): string {
  if (!val || !validateBaseInput(val, fromBase)) return "✨";
  const dec = parseInt(val, fromBase);
  if (isNaN(dec)) return "✨";
  return dec.toString(toBase).toUpperCase();
}