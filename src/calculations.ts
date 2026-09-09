export const UIT = 5350;
export const UITx7 = UIT * 7;
export const RMV = 1025;

export const TASAS_IR_5TA: { desde: number; hasta: number; tasa: number }[] = [
  { desde: 0, hasta: UIT * 5, tasa: 0 },
  { desde: UIT * 5, hasta: UIT * 20, tasa: 0.08 },
  { desde: UIT * 20, hasta: UIT * 35, tasa: 0.14 },
  { desde: UIT * 35, hasta: UIT * 45, tasa: 0.17 },
  { desde: UIT * 45, hasta: UIT * 50, tasa: 0.20 },
  { desde: UIT * 50, hasta: Infinity, tasa: 0.30 },
];

export interface AFPComision {
  nombre: string;
  flujo: number;
  mixta: number;
  seguro: number;
}

export const AFP_COMISIONES: Record<string, AFPComision> = {
  "AFP Integra": { nombre: "AFP Integra", flujo: 0.0169, mixta: 0.0169, seguro: 0.0093 },
  "AFP Prima": { nombre: "AFP Prima", flujo: 0.0163, mixta: 0.0163, seguro: 0.0093 },
  "AFP Profuturo": { nombre: "AFP Profuturo", flujo: 0.0165, mixta: 0.0165, seguro: 0.0093 },
  "AFP Habitat": { nombre: "AFP Habitat", flujo: 0.0167, mixta: 0.0167, seguro: 0.0093 },
};

export type SistemaPension = "ONP" | "AFP Integra" | "AFP Prima" | "AFP Profuturo" | "AFP Habitat";

export function calcularDescuentoPension(sueldo: number, sistema: SistemaPension, tipoComision: "flujo" | "mixta" = "flujo"): number {
  if (sistema === "ONP") {
    return sueldo * 0.13;
  }
  const afp = AFP_COMISIONES[sistema];
  const comision = tipoComision === "flujo" ? afp.flujo : afp.mixta;
  return sueldo * (comision + afp.seguro);
}

export function calcularIR5ta(anualBruto: number): number {
  let impuesto = 0;
  for (const tramo of TASAS_IR_5TA) {
    const tope = Math.min(anualBruto, tramo.hasta);
    if (tope > tramo.desde) {
      impuesto += (tope - tramo.desde) * tramo.tasa;
    }
  }
  return impuesto;
}

export function calcularSueldoNeto(
  sueldo: number,
  sistema: SistemaPension,
  asignacionFamiliar: boolean,
  horasExtras: number = 0,
  tipoComision: "flujo" | "mixta" = "flujo",
  mes: number = new Date().getMonth() + 1
) {
  const asignacion = asignacionFamiliar ? RMV * 0.10 : 0;
  const sueldoBruto = sueldo + asignacion;
  const totalIngresos = sueldoBruto + horasExtras;

  const descuentoPension = calcularDescuentoPension(totalIngresos, sistema, tipoComision);

  const gratificacionMensual = (sueldo * 12) / 14;
  const remuneracionAnual = totalIngresos * 12 + sueldoBruto * 2;
  const rentaNeta = Math.max(0, remuneracionAnual - UITx7);
  const irAnual = calcularIR5ta(rentaNeta);
  const irMensual = irAnual / 12;

  const descuentos = descuentoPension + irMensual;
  const sueldoNeto = totalIngresos - descuentos;

  return {
    sueldoBruto,
    asignacion,
    horasExtras,
    totalIngresos,
    descuentoPension,
    sistema,
    descuentoIR: irMensual,
    sueldoNeto,
    gratificacionMensual,
    remuneracionAnual,
    rentaNeta,
    irAnual,
  };
}

export function calcularGratificacion(sueldo: number) {
  const gratificacion = Math.min(sueldo * 6, UIT * 6);
  const bonificacion = gratificacion * 0.09;
  const essalud = gratificacion * 0.09;
  const total = gratificacion + bonificacion;
  const costoTotal = total + essalud;

  return {
    sueldo,
    gratificacion,
    bonificacion,
    essalud,
    total,
    costoTotal,
    tope: UIT * 6,
    aplicaTope: sueldo * 6 > UIT * 6,
  };
}

export function calcularCTS(sueldo: number, gratificaciones: number = 0) {
  const remuneracionMensual = sueldo + gratificaciones / 12;
  const remuneracionAnual = remuneracionMensual * 12;
  const cts = remuneracionAnual / 12;

  return {
    sueldo,
    gratificaciones,
    remuneracionMensual,
    remuneracionAnual,
    cts,
    ctsMensual: cts,
  };
}

export function calcularIGV(monto: number, esConIGV: boolean = false) {
  if (esConIGV) {
    const base = monto / 1.18;
    const igv = monto - base;
    return { base, igv, total: monto };
  }
  const igv = monto * 0.18;
  const total = monto + igv;
  return { base: monto, igv, total };
}

export function formatSoles(monto: number): string {
  return `S/ ${monto.toFixed(2)}`;
}

export function formatPorcentaje(pct: number): string {
  return `${(pct * 100).toFixed(2)}%`;
}
