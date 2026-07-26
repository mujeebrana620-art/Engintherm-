import { UnitCategory } from '../types';

export const UNIT_CATEGORIES: UnitCategory[] = [
  {
    id: 'pressure',
    name: 'Pressure & Stress',
    icon: 'Gauge',
    baseUnit: 'Pa',
    units: [
      { id: 'Pa', name: 'Pascal', symbol: 'Pa', factorToBase: 1 },
      { id: 'kPa', name: 'Kilopascal', symbol: 'kPa', factorToBase: 1000 },
      { id: 'MPa', name: 'Megapascal', symbol: 'MPa', factorToBase: 1e6 },
      { id: 'bar', name: 'Bar', symbol: 'bar', factorToBase: 100000 },
      { id: 'psi', name: 'Pounds per sq inch', symbol: 'psi', factorToBase: 6894.76 },
      { id: 'atm', name: 'Standard Atmosphere', symbol: 'atm', factorToBase: 101325 },
      { id: 'mmHg', name: 'Millimeters of Mercury', symbol: 'mmHg', factorToBase: 133.322 },
    ],
  },
  {
    id: 'power',
    name: 'Power & Heat Flow',
    icon: 'Zap',
    baseUnit: 'W',
    units: [
      { id: 'W', name: 'Watt', symbol: 'W', factorToBase: 1 },
      { id: 'kW', name: 'Kilowatt', symbol: 'kW', factorToBase: 1000 },
      { id: 'MW', name: 'Megawatt', symbol: 'MW', factorToBase: 1e6 },
      { id: 'hp', name: 'Horsepower (Mechanical)', symbol: 'hp', factorToBase: 745.7 },
      { id: 'btuh', name: 'BTU per hour', symbol: 'BTU/h', factorToBase: 0.293071 },
      { id: 'ftlbfs', name: 'Foot-pound per sec', symbol: 'ft·lbf/s', factorToBase: 1.35582 },
    ],
  },
  {
    id: 'energy',
    name: 'Energy & Work',
    icon: 'Flame',
    baseUnit: 'J',
    units: [
      { id: 'J', name: 'Joule', symbol: 'J', factorToBase: 1 },
      { id: 'kJ', name: 'Kilojoule', symbol: 'kJ', factorToBase: 1000 },
      { id: 'MJ', name: 'Megajoule', symbol: 'MJ', factorToBase: 1e6 },
      { id: 'BTU', name: 'British Thermal Unit', symbol: 'BTU', factorToBase: 1055.06 },
      { id: 'kWh', name: 'Kilowatt-hour', symbol: 'kWh', factorToBase: 3.6e6 },
      { id: 'ftlbf', name: 'Foot-pound force', symbol: 'ft·lbf', factorToBase: 1.35582 },
      { id: 'cal', name: 'Calorie', symbol: 'cal', factorToBase: 4.184 },
    ],
  },
  {
    id: 'temperature',
    name: 'Temperature',
    icon: 'Thermometer',
    baseUnit: 'K',
    units: [
      { id: 'C', name: 'Celsius', symbol: '°C', factorToBase: 1, offsetToBase: 273.15 },
      { id: 'K', name: 'Kelvin', symbol: 'K', factorToBase: 1, offsetToBase: 0 },
      { id: 'F', name: 'Fahrenheit', symbol: '°F', factorToBase: 1 / 1.8, offsetToBase: 255.37222 },
      { id: 'R', name: 'Rankine', symbol: '°R', factorToBase: 5 / 9, offsetToBase: 0 },
    ],
  },
  {
    id: 'viscosity_dynamic',
    name: 'Dynamic Viscosity',
    icon: 'Droplets',
    baseUnit: 'Pa_s',
    units: [
      { id: 'Pa_s', name: 'Pascal-second', symbol: 'Pa·s', factorToBase: 1 },
      { id: 'cP', name: 'Centipoise', symbol: 'cP', factorToBase: 0.001 },
      { id: 'poise', name: 'Poise', symbol: 'P', factorToBase: 0.1 },
      { id: 'lb_fts', name: 'Pound / (ft·s)', symbol: 'lb/(ft·s)', factorToBase: 1.48816 },
      { id: 'lbf_s_ft2', name: 'lbf·s / ft²', symbol: 'lbf·s/ft²', factorToBase: 47.8803 },
    ],
  },
  {
    id: 'mass_flow',
    name: 'Mass Flow Rate',
    icon: 'Activity',
    baseUnit: 'kgs',
    units: [
      { id: 'kgs', name: 'Kilogram per sec', symbol: 'kg/s', factorToBase: 1 },
      { id: 'kgh', name: 'Kilogram per hour', symbol: 'kg/h', factorToBase: 1 / 3600 },
      { id: 'lbs', name: 'Pound per sec', symbol: 'lb/s', factorToBase: 0.453592 },
      { id: 'lbh', name: 'Pound per hour', symbol: 'lb/h', factorToBase: 0.000125998 },
    ],
  },
  {
    id: 'density',
    name: 'Density',
    icon: 'Box',
    baseUnit: 'kgm3',
    units: [
      { id: 'kgm3', name: 'Kilogram per m³', symbol: 'kg/m³', factorToBase: 1 },
      { id: 'gcm3', name: 'Gram per cm³', symbol: 'g/cm³', factorToBase: 1000 },
      { id: 'lbft3', name: 'Pound per ft³', symbol: 'lb/ft³', factorToBase: 16.0185 },
      { id: 'lbin3', name: 'Pound per in³', symbol: 'lb/in³', factorToBase: 27679.9 },
    ],
  },
  {
    id: 'torque',
    name: 'Torque & Bending Moment',
    icon: 'RotateCw',
    baseUnit: 'Nm',
    units: [
      { id: 'Nm', name: 'Newton-meter', symbol: 'N·m', factorToBase: 1 },
      { id: 'kNm', name: 'Kilonewton-meter', symbol: 'kN·m', factorToBase: 1000 },
      { id: 'ftlbf_t', name: 'Foot-pound force', symbol: 'ft·lbf', factorToBase: 1.35582 },
      { id: 'inlbf_t', name: 'Inch-pound force', symbol: 'in·lbf', factorToBase: 0.112985 },
    ],
  },
];

export function convertUnits(
  val: number,
  category: UnitCategory,
  fromUnitId: string,
  toUnitId: string
): number {
  if (isNaN(val)) return 0;

  const fromUnit = category.units.find((u) => u.id === fromUnitId);
  const toUnit = category.units.find((u) => u.id === toUnitId);

  if (!fromUnit || !toUnit) return val;

  // Temperature special case due to offsets
  if (category.id === 'temperature') {
    let kelvin = 0;
    if (fromUnitId === 'K') kelvin = val;
    else if (fromUnitId === 'C') kelvin = val + 273.15;
    else if (fromUnitId === 'F') kelvin = (val - 32) * (5 / 9) + 273.15;
    else if (fromUnitId === 'R') kelvin = val * (5 / 9);

    if (toUnitId === 'K') return kelvin;
    if (toUnitId === 'C') return kelvin - 273.15;
    if (toUnitId === 'F') return (kelvin - 273.15) * (9 / 5) + 32;
    if (toUnitId === 'R') return kelvin * (9 / 5);
  }

  // Standard multiplicative conversions
  const valueInBase = val * fromUnit.factorToBase;
  return valueInBase / toUnit.factorToBase;
}
