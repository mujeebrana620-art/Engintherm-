import { FormulaItem } from '../types';

export const FORMULA_SHEET: FormulaItem[] = [
  // ==================== THERMODYNAMICS ====================
  {
    id: 'f-thermo-1',
    subject: 'Thermodynamics',
    category: 'First Law & Energy',
    title: 'First Law of Thermodynamics (Closed System)',
    latex: 'Q - W = \\Delta U = m c_v (T_2 - T_1)',
    plainText: 'Q - W = ΔU = m * cv * (T2 - T1)',
    description: 'Conservation of energy for a closed stationary system with constant specific heats.',
    variables: [
      { symbol: 'Q', name: 'Heat Added to System', unit: 'kJ', defaultValue: 150 },
      { symbol: 'W', name: 'Work Done by System', unit: 'kJ', defaultValue: 50 },
      { symbol: 'm', name: 'Mass of Gas', unit: 'kg', defaultValue: 2 },
      { symbol: 'c_v', name: 'Specific Heat at Const. Volume', unit: 'kJ/kg·K', defaultValue: 0.718 },
      { symbol: 'T_1', name: 'Initial Temperature', unit: 'K', defaultValue: 300 },
      { symbol: 'T_2', name: 'Final Temperature', unit: 'K', defaultValue: 369.6 },
    ],
    evaluators: [
      {
        targetSymbol: 'Q',
        label: 'Calculate Heat Added (Q)',
        formulaExpr: 'Q = W + m * cv * (T2 - T1)',
        calculate: (inputs) => inputs['W'] + inputs['m'] * inputs['c_v'] * (inputs['T_2'] - inputs['T_1']),
      },
      {
        targetSymbol: 'T_2',
        label: 'Calculate Final Temperature (T2)',
        formulaExpr: 'T2 = T1 + (Q - W) / (m * cv)',
        calculate: (inputs) => {
          const denom = inputs['m'] * inputs['c_v'];
          return denom === 0 ? 0 : inputs['T_1'] + (inputs['Q'] - inputs['W']) / denom;
        },
      },
    ],
  },
  {
    id: 'f-thermo-2',
    subject: 'Thermodynamics',
    category: 'Ideal Gas',
    title: 'Ideal Gas Equation of State',
    latex: 'P V = m R T = n R_u T',
    plainText: 'P * V = m * R * T',
    description: 'Relates pressure, volume, mass, gas constant, and absolute temperature for ideal gases.',
    variables: [
      { symbol: 'P', name: 'Absolute Pressure', unit: 'kPa', defaultValue: 101.325 },
      { symbol: 'V', name: 'Volume', unit: 'm³', defaultValue: 0.5 },
      { symbol: 'm', name: 'Mass', unit: 'kg', defaultValue: 0.588 },
      { symbol: 'R', name: 'Specific Gas Constant (Air)', unit: 'kJ/kg·K', defaultValue: 0.287 },
      { symbol: 'T', name: 'Absolute Temperature', unit: 'K', defaultValue: 300 },
    ],
    evaluators: [
      {
        targetSymbol: 'P',
        label: 'Calculate Pressure (P)',
        formulaExpr: 'P = (m * R * T) / V',
        calculate: (inputs) => (inputs['V'] === 0 ? 0 : (inputs['m'] * inputs['R'] * inputs['T']) / inputs['V']),
      },
      {
        targetSymbol: 'V',
        label: 'Calculate Volume (V)',
        formulaExpr: 'V = (m * R * T) / P',
        calculate: (inputs) => (inputs['P'] === 0 ? 0 : (inputs['m'] * inputs['R'] * inputs['T']) / inputs['P']),
      },
      {
        targetSymbol: 'm',
        label: 'Calculate Mass (m)',
        formulaExpr: 'm = (P * V) / (R * T)',
        calculate: (inputs) => {
          const denom = inputs['R'] * inputs['T'];
          return denom === 0 ? 0 : (inputs['P'] * inputs['V']) / denom;
        },
      },
    ],
  },
  {
    id: 'f-thermo-3',
    subject: 'Thermodynamics',
    category: 'Processes & Cycles',
    title: 'Polytropic Compression & Work',
    latex: 'P_1 V_1^n = P_2 V_2^n, \\quad W = \\frac{P_1 V_1 - P_2 V_2}{n - 1}',
    plainText: 'P1*V1^n = P2*V2^n; W = (P1*V1 - P2*V2) / (n - 1)',
    description: 'Work done during a quasistatic polytropic compression or expansion process (n ≠ 1).',
    variables: [
      { symbol: 'P_1', name: 'Initial Pressure', unit: 'kPa', defaultValue: 100 },
      { symbol: 'V_1', name: 'Initial Volume', unit: 'm³', defaultValue: 0.1 },
      { symbol: 'P_2', name: 'Final Pressure', unit: 'kPa', defaultValue: 800 },
      { symbol: 'V_2', name: 'Final Volume', unit: 'm³', defaultValue: 0.021 },
      { symbol: 'n', name: 'Polytropic Exponent', unit: 'dimensionless', defaultValue: 1.3 },
    ],
    evaluators: [
      {
        targetSymbol: 'W',
        label: 'Calculate Polytropic Work (W)',
        formulaExpr: 'W = (P1*V1 - P2*V2) / (n - 1)',
        calculate: (inputs) => {
          const denom = inputs['n'] - 1;
          return Math.abs(denom) < 1e-6
            ? 0
            : (inputs['P_1'] * inputs['V_1'] - inputs['P_2'] * inputs['V_2']) / denom;
        },
      },
    ],
  },
  {
    id: 'f-thermo-4',
    subject: 'Thermodynamics',
    category: 'Cycles & Efficiency',
    title: 'Carnot Heat Engine Efficiency',
    latex: '\\eta_{Carnot} = 1 - \\frac{T_L}{T_H}',
    plainText: 'eta_Carnot = 1 - (TL / TH)',
    description: 'Maximum theoretical thermal efficiency of a reversible heat engine operating between two temperatures.',
    variables: [
      { symbol: 'T_L', name: 'Low Temp Reservoir', unit: 'K', defaultValue: 300 },
      { symbol: 'T_H', name: 'High Temp Reservoir', unit: 'K', defaultValue: 1000 },
    ],
    evaluators: [
      {
        targetSymbol: 'eta',
        label: 'Calculate Efficiency (eta)',
        formulaExpr: 'eta = (1 - TL/TH) * 100%',
        calculate: (inputs) => (inputs['T_H'] === 0 ? 0 : (1 - inputs['T_L'] / inputs['T_H']) * 100),
      },
    ],
  },
  {
    id: 'f-thermo-5',
    subject: 'Thermodynamics',
    category: 'First Law & Energy',
    title: 'Steady Flow Energy Equation (SFEE)',
    latex: '\\dot{Q} - \\dot{W} = \\dot{m} \\left[ (h_2 - h_1) + \\frac{V_2^2 - V_1^2}{2000} + \\frac{g(z_2 - z_1)}{1000} \\right]',
    plainText: 'Q_dot - W_dot = m_dot * [(h2 - h1) + (V2^2 - V1^2)/2000 + g*(z2 - z1)/1000]',
    description: 'First Law energy balance for open control volumes operating at steady state (nozzle, turbine, pump).',
    variables: [
      { symbol: 'm_dot', name: 'Mass Flow Rate', unit: 'kg/s', defaultValue: 5 },
      { symbol: 'h_1', name: 'Inlet Enthalpy', unit: 'kJ/kg', defaultValue: 3200 },
      { symbol: 'h_2', name: 'Exit Enthalpy', unit: 'kJ/kg', defaultValue: 2600 },
      { symbol: 'V_1', name: 'Inlet Velocity', unit: 'm/s', defaultValue: 20 },
      { symbol: 'V_2', name: 'Exit Velocity', unit: 'm/s', defaultValue: 100 },
      { symbol: 'Q_dot', name: 'Heat Transfer Rate', unit: 'kW', defaultValue: -10 },
    ],
    evaluators: [
      {
        targetSymbol: 'W_dot',
        label: 'Calculate Turbine/Compressor Work Power (W_dot)',
        formulaExpr: 'W_dot = Q_dot - m_dot * [(h2 - h1) + (V2^2 - V1^2)/2000]',
        calculate: (inputs) => {
          const deltaH = inputs['h_2'] - inputs['h_1'];
          const deltaKE = (Math.pow(inputs['V_2'], 2) - Math.pow(inputs['V_1'], 2)) / 2000;
          return inputs['Q_dot'] - inputs['m_dot'] * (deltaH + deltaKE);
        },
      },
    ],
  },
  {
    id: 'f-thermo-6',
    subject: 'Thermodynamics',
    category: 'Entropy',
    title: 'Ideal Gas Entropy Change',
    latex: '\\Delta s = c_p \\ln\\left(\\frac{T_2}{T_1}\\right) - R \\ln\\left(\\frac{P_2}{P_1}\\right)',
    plainText: 'ds = cp * ln(T2/T1) - R * ln(P2/P1)',
    description: 'Specific entropy change for ideal gas with constant specific heats.',
    variables: [
      { symbol: 'c_p', name: 'Specific Heat at Const. Pressure', unit: 'kJ/kg·K', defaultValue: 1.005 },
      { symbol: 'R', name: 'Gas Constant', unit: 'kJ/kg·K', defaultValue: 0.287 },
      { symbol: 'T_1', name: 'Initial Temp', unit: 'K', defaultValue: 300 },
      { symbol: 'T_2', name: 'Final Temp', unit: 'K', defaultValue: 450 },
      { symbol: 'P_1', name: 'Initial Pressure', unit: 'kPa', defaultValue: 100 },
      { symbol: 'P_2', name: 'Final Pressure', unit: 'kPa', defaultValue: 300 },
    ],
    evaluators: [
      {
        targetSymbol: 'ds',
        label: 'Calculate Specific Entropy Change (ds)',
        formulaExpr: 'ds = cp*ln(T2/T1) - R*ln(P2/P1)',
        calculate: (inputs) => {
          if (inputs['T_1'] <= 0 || inputs['T_2'] <= 0 || inputs['P_1'] <= 0 || inputs['P_2'] <= 0) return 0;
          return (
            inputs['c_p'] * Math.log(inputs['T_2'] / inputs['T_1']) -
            inputs['R'] * Math.log(inputs['P_2'] / inputs['P_1'])
          );
        },
      },
    ],
  },

  // ==================== FLUID MECHANICS ====================
  {
    id: 'f-fluids-1',
    subject: 'Fluid Mechanics',
    category: 'Fluid Statics & Dynamics',
    title: 'Bernoulli Equation (Incompressible)',
    latex: 'P_1 + \\frac{1}{2}\\rho V_1^2 + \\rho g z_1 = P_2 + \\frac{1}{2}\\rho V_2^2 + \\rho g z_2',
    plainText: 'P1 + 0.5*rho*V1^2 + rho*g*z1 = P2 + 0.5*rho*V2^2 + rho*g*z2',
    description: 'Energy conservation along a streamline for inviscid, steady, incompressible flow.',
    variables: [
      { symbol: 'P_1', name: 'Inlet Static Pressure', unit: 'Pa', defaultValue: 200000 },
      { symbol: '\\rho', name: 'Fluid Density', unit: 'kg/m³', defaultValue: 1000 },
      { symbol: 'V_1', name: 'Inlet Velocity', unit: 'm/s', defaultValue: 2 },
      { symbol: 'z_1', name: 'Inlet Elevation', unit: 'm', defaultValue: 0 },
      { symbol: 'V_2', name: 'Exit Velocity', unit: 'm/s', defaultValue: 10 },
      { symbol: 'z_2', name: 'Exit Elevation', unit: 'm', defaultValue: 5 },
      { symbol: 'g', name: 'Gravity', unit: 'm/s²', defaultValue: 9.81 },
    ],
    evaluators: [
      {
        targetSymbol: 'P_2',
        label: 'Calculate Exit Pressure (P2)',
        formulaExpr: 'P2 = P1 + 0.5*rho*(V1^2 - V2^2) + rho*g*(z1 - z2)',
        calculate: (inputs) => {
          const p1 = inputs['P_1'];
          const rho = inputs['\\rho'];
          const g = inputs['g'];
          const v1 = inputs['V_1'];
          const v2 = inputs['V_2'];
          const z1 = inputs['z_1'];
          const z2 = inputs['z_2'];
          return p1 + 0.5 * rho * (v1 * v1 - v2 * v2) + rho * g * (z1 - z2);
        },
      },
    ],
  },
  {
    id: 'f-fluids-2',
    subject: 'Fluid Mechanics',
    category: 'Pipe Flow & Friction',
    title: 'Reynolds Number',
    latex: 'Re = \\frac{\\rho V D}{\\mu} = \\frac{V D}{\\nu}',
    plainText: 'Re = (rho * V * D) / mu',
    description: 'Dimensionless ratio of inertial to viscous forces; predicts laminar (Re < 2300) vs turbulent pipe flow.',
    variables: [
      { symbol: '\\rho', name: 'Fluid Density', unit: 'kg/m³', defaultValue: 1000 },
      { symbol: 'V', name: 'Flow Velocity', unit: 'm/s', defaultValue: 1.5 },
      { symbol: 'D', name: 'Pipe Inner Diameter', unit: 'm', defaultValue: 0.05 },
      { symbol: '\\mu', name: 'Dynamic Viscosity', unit: 'Pa·s', defaultValue: 0.001 },
    ],
    evaluators: [
      {
        targetSymbol: 'Re',
        label: 'Calculate Reynolds Number (Re)',
        formulaExpr: 'Re = (rho * V * D) / mu',
        calculate: (inputs) =>
          inputs['\\mu'] === 0
            ? 0
            : (inputs['\\rho'] * inputs['V'] * inputs['D']) / inputs['\\mu'],
      },
    ],
  },
  {
    id: 'f-fluids-3',
    subject: 'Fluid Mechanics',
    category: 'Pipe Flow & Friction',
    title: 'Darcy-Weisbach Major Head Loss',
    latex: 'h_f = f \\frac{L}{D} \\frac{V^2}{2g}, \\quad \\Delta P_f = f \\frac{L}{D} \\frac{\\rho V^2}{2}',
    plainText: 'hf = f * (L/D) * (V^2 / (2*g))',
    description: 'Calculates frictional head loss and pressure drop along straight pipes.',
    variables: [
      { symbol: 'f', name: 'Darcy Friction Factor', unit: 'dimensionless', defaultValue: 0.02 },
      { symbol: 'L', name: 'Pipe Length', unit: 'm', defaultValue: 100 },
      { symbol: 'D', name: 'Pipe Diameter', unit: 'm', defaultValue: 0.1 },
      { symbol: 'V', name: 'Fluid Velocity', unit: 'm/s', defaultValue: 2 },
      { symbol: 'g', name: 'Gravitational Acceleration', unit: 'm/s²', defaultValue: 9.81 },
    ],
    evaluators: [
      {
        targetSymbol: 'h_f',
        label: 'Calculate Head Loss hf (m)',
        formulaExpr: 'hf = f * (L / D) * (V^2 / (2 * g))',
        calculate: (inputs) => {
          const denom = inputs['D'] * 2 * inputs['g'];
          return denom === 0
            ? 0
            : (inputs['f'] * inputs['L'] * Math.pow(inputs['V'], 2)) / denom;
        },
      },
    ],
  },
  {
    id: 'f-fluids-4',
    subject: 'Fluid Mechanics',
    category: 'Flow Measurement',
    title: 'Venturi Meter Mass / Volumetric Flow Rate',
    latex: 'Q = C_d A_2 \\sqrt{\\frac{2 \\Delta P}{\\rho \\left( 1 - (A_2/A_1)^2 \\right)}}',
    plainText: 'Q = Cd * A2 * sqrt( (2*dP) / (rho * (1 - (A2/A1)^2)) )',
    description: 'Measures discharge flow rate in pipes using a constricted throat and differential pressure.',
    variables: [
      { symbol: 'C_d', name: 'Discharge Coefficient', unit: 'dimensionless', defaultValue: 0.98 },
      { symbol: 'A_1', name: 'Inlet Area', unit: 'm²', defaultValue: 0.0314 },
      { symbol: 'A_2', name: 'Throat Area', unit: 'm²', defaultValue: 0.00785 },
      { symbol: '\\Delta P', name: 'Pressure Difference', unit: 'Pa', defaultValue: 25000 },
      { symbol: '\\rho', name: 'Fluid Density', unit: 'kg/m³', defaultValue: 1000 },
    ],
    evaluators: [
      {
        targetSymbol: 'Q',
        label: 'Calculate Flow Rate Q (m³/s)',
        formulaExpr: 'Q = Cd * A2 * sqrt((2*dP) / (rho * (1 - (A2/A1)^2)))',
        calculate: (inputs) => {
          const areaRatioSq = Math.pow(inputs['A_2'] / inputs['A_1'], 2);
          const denom = inputs['\\rho'] * (1 - areaRatioSq);
          if (denom <= 0 || inputs['\\Delta P'] < 0) return 0;
          return inputs['C_d'] * inputs['A_2'] * Math.sqrt((2 * inputs['\\Delta P']) / denom);
        },
      },
    ],
  },

  // ==================== HEAT TRANSFER ====================
  {
    id: 'f-ht-1',
    subject: 'Heat Transfer',
    category: 'Conduction',
    title: "Fourier's Law of Conduction",
    latex: 'q" = -k \\frac{dT}{dx} \\quad \\Rightarrow \\quad \\dot{Q} = k A \\frac{T_1 - T_2}{L}',
    plainText: 'Q_dot = k * A * (T1 - T2) / L',
    description: 'Heat conduction rate through a plane wall material of constant conductivity.',
    variables: [
      { symbol: 'k', name: 'Thermal Conductivity', unit: 'W/m·K', defaultValue: 45 },
      { symbol: 'A', name: 'Surface Area', unit: 'm²', defaultValue: 2 },
      { symbol: 'T_1', name: 'Hot Surface Temp', unit: '°C', defaultValue: 120 },
      { symbol: 'T_2', name: 'Cold Surface Temp', unit: '°C', defaultValue: 25 },
      { symbol: 'L', name: 'Wall Thickness', unit: 'm', defaultValue: 0.05 },
    ],
    evaluators: [
      {
        targetSymbol: 'Q_dot',
        label: 'Calculate Heat Conduction Rate (W)',
        formulaExpr: 'Q_dot = (k * A * (T1 - T2)) / L',
        calculate: (inputs) =>
          inputs['L'] === 0
            ? 0
            : (inputs['k'] * inputs['A'] * (inputs['T_1'] - inputs['T_2'])) / inputs['L'],
      },
    ],
  },
  {
    id: 'f-ht-2',
    subject: 'Heat Transfer',
    category: 'Convection',
    title: "Newton's Law of Cooling (Convection)",
    latex: '\\dot{Q} = h A (T_s - T_\\infty)',
    plainText: 'Q_dot = h * A * (Ts - T_infinity)',
    description: 'Heat transfer rate between a solid surface and an adjacent flowing fluid.',
    variables: [
      { symbol: 'h', name: 'Convective Coeff.', unit: 'W/m²·K', defaultValue: 25 },
      { symbol: 'A', name: 'Surface Area', unit: 'm²', defaultValue: 1.5 },
      { symbol: 'T_s', name: 'Surface Temp', unit: '°C', defaultValue: 80 },
      { symbol: 'T_\\infty', name: 'Ambient Fluid Temp', unit: '°C', defaultValue: 20 },
    ],
    evaluators: [
      {
        targetSymbol: 'Q_dot',
        label: 'Calculate Convective Heat Rate (W)',
        formulaExpr: 'Q_dot = h * A * (Ts - T_inf)',
        calculate: (inputs) => inputs['h'] * inputs['A'] * (inputs['T_s'] - inputs['T_\\infty']),
      },
    ],
  },
  {
    id: 'f-ht-3',
    subject: 'Heat Transfer',
    category: 'Radiation',
    title: 'Stefan-Boltzmann Radiation Law',
    latex: '\\dot{Q}_{rad} = \\varepsilon \\sigma A (T_1^4 - T_2^4)',
    plainText: 'Q_rad = epsilon * sigma * A * (T1^4 - T2^4)',
    description: 'Net thermal radiation exchange between a small surface and surrounding walls at absolute temperatures.',
    variables: [
      { symbol: '\\varepsilon', name: 'Emissivity', unit: 'dimensionless', defaultValue: 0.85 },
      { symbol: '\\sigma', name: 'Stefan-Boltzmann Const.', unit: 'W/m²·K⁴', defaultValue: 5.67e-8 },
      { symbol: 'A', name: 'Surface Area', unit: 'm²', defaultValue: 0.5 },
      { symbol: 'T_1', name: 'Surface Absolute Temp', unit: 'K', defaultValue: 600 },
      { symbol: 'T_2', name: 'Surrounding Temp', unit: 'K', defaultValue: 300 },
    ],
    evaluators: [
      {
        targetSymbol: 'Q_rad',
        label: 'Calculate Net Radiation Heat Rate (W)',
        formulaExpr: 'Q_rad = eps * sigma * A * (T1^4 - T2^4)',
        calculate: (inputs) => {
          const t1_4 = Math.pow(inputs['T_1'], 4);
          const t2_4 = Math.pow(inputs['T_2'], 4);
          return inputs['\\varepsilon'] * inputs['\\sigma'] * inputs['A'] * (t1_4 - t2_4);
        },
      },
    ],
  },
  {
    id: 'f-ht-4',
    subject: 'Heat Transfer',
    category: 'Heat Exchangers',
    title: 'Log Mean Temperature Difference (LMTD)',
    latex: '\\Delta T_{lm} = \\frac{\\Delta T_1 - \\Delta T_2}{\\ln(\\Delta T_1 / \\Delta T_2)}, \\quad \\dot{Q} = U A \\Delta T_{lm}',
    plainText: 'dT_lm = (dT1 - dT2) / ln(dT1 / dT2)',
    description: 'Logarithmic average temp difference for heat exchanger analysis.',
    variables: [
      { symbol: '\\Delta T_1', name: 'Inlet Temp Diff', unit: '°C', defaultValue: 40 },
      { symbol: '\\Delta T_2', name: 'Exit Temp Diff', unit: '°C', defaultValue: 15 },
      { symbol: 'U', name: 'Overall Heat Transfer Coeff.', unit: 'W/m²·K', defaultValue: 250 },
      { symbol: 'A', name: 'Exchanger Area', unit: 'm²', defaultValue: 10 },
    ],
    evaluators: [
      {
        targetSymbol: 'Q_dot',
        label: 'Calculate Heat Exchanger Duty Q_dot (W)',
        formulaExpr: 'dT_lm = (dT1 - dT2)/ln(dT1/dT2); Q = U * A * dT_lm',
        calculate: (inputs) => {
          const dt1 = inputs['\\Delta T_1'];
          const dt2 = inputs['\\Delta T_2'];
          if (dt1 <= 0 || dt2 <= 0 || dt1 === dt2) return 0;
          const lmtd = (dt1 - dt2) / Math.log(dt1 / dt2);
          return inputs['U'] * inputs['A'] * lmtd;
        },
      },
    ],
  },

  // ==================== MACHINE DESIGN ====================
  {
    id: 'f-design-1',
    subject: 'Machine Design',
    category: 'Failure Theories',
    title: 'Von Mises Distortion Energy Equivalent Stress',
    latex: '\\sigma_v = \\sqrt{\\sigma_x^2 - \\sigma_x \\sigma_y + \\sigma_y^2 + 3 \\tau_{xy}^2}',
    plainText: 'sigma_v = sqrt(sigma_x^2 - sigma_x*sigma_y + sigma_y^2 + 3*tau_xy^2)',
    description: 'Equivalent tensile stress predicting yielding under multi-axial stress states in ductile materials.',
    variables: [
      { symbol: '\\sigma_x', name: 'Normal Stress x', unit: 'MPa', defaultValue: 120 },
      { symbol: '\\sigma_y', name: 'Normal Stress y', unit: 'MPa', defaultValue: -40 },
      { symbol: '\\tau_{xy}', name: 'Shear Stress xy', unit: 'MPa', defaultValue: 60 },
      { symbol: 'S_y', name: 'Yield Strength', unit: 'MPa', defaultValue: 350 },
    ],
    evaluators: [
      {
        targetSymbol: 'sigma_v',
        label: 'Calculate Von Mises Stress & Safety Factor',
        formulaExpr: 'sigma_v = sqrt(sx^2 - sx*sy + sy^2 + 3*txy^2)',
        calculate: (inputs) => {
          const sx = inputs['\\sigma_x'];
          const sy = inputs['\\sigma_y'];
          const txy = inputs['\\tau_{xy}'];
          return Math.sqrt(sx * sx - sx * sy + sy * sy + 3 * txy * txy);
        },
      },
    ],
  },
  {
    id: 'f-design-2',
    subject: 'Machine Design',
    category: 'Shafts & Torsion',
    title: 'Torsional Shear Stress in Solid Shaft',
    latex: '\\tau = \\frac{T r}{J} = \\frac{16 T}{\\pi d^3}',
    plainText: 'tau = (16 * T) / (pi * d^3)',
    description: 'Maximum shear stress on the outer fiber of a solid circular shaft in torsion.',
    variables: [
      { symbol: 'T', name: 'Applied Torque', unit: 'N·m', defaultValue: 1500 },
      { symbol: 'd', name: 'Shaft Diameter', unit: 'm', defaultValue: 0.04 },
    ],
    evaluators: [
      {
        targetSymbol: 'tau',
        label: 'Calculate Maximum Shear Stress tau (MPa)',
        formulaExpr: 'tau = (16 * T) / (pi * d^3) / 1e6',
        calculate: (inputs) => {
          if (inputs['d'] <= 0) return 0;
          const tauPa = (16 * inputs['T']) / (Math.PI * Math.pow(inputs['d'], 3));
          return tauPa / 1e6; // Convert to MPa
        },
      },
    ],
  },
  {
    id: 'f-design-3',
    subject: 'Machine Design',
    category: 'Fatigue & Columns',
    title: 'Modified Goodman Fatigue Failure Criterion',
    latex: '\\frac{\\sigma_a}{S_e} + \\frac{\\sigma_m}{S_{ut}} = \\frac{1}{n_f}',
    plainText: '(sigma_a / Se) + (sigma_m / Sut) = 1 / nf',
    description: 'Fatigue safety factor accounting for fluctuating mean and alternating cyclic stresses.',
    variables: [
      { symbol: '\\sigma_a', name: 'Alternating Stress', unit: 'MPa', defaultValue: 80 },
      { symbol: '\\sigma_m', name: 'Mean Stress', unit: 'MPa', defaultValue: 120 },
      { symbol: 'S_e', name: 'Endurance Limit', unit: 'MPa', defaultValue: 200 },
      { symbol: 'S_{ut}', name: 'Ultimate Tensile Strength', unit: 'MPa', defaultValue: 600 },
    ],
    evaluators: [
      {
        targetSymbol: 'n_f',
        label: 'Calculate Fatigue Safety Factor (nf)',
        formulaExpr: 'nf = 1 / [ (sigma_a / Se) + (sigma_m / Sut) ]',
        calculate: (inputs) => {
          if (inputs['S_e'] <= 0 || inputs['S_{ut}'] <= 0) return 0;
          const term = inputs['\\sigma_a'] / inputs['S_e'] + inputs['\\sigma_m'] / inputs['S_{ut}'];
          return term <= 0 ? 0 : 1 / term;
        },
      },
    ],
  },
  {
    id: 'f-design-4',
    subject: 'Machine Design',
    category: 'Columns & Buckling',
    title: 'Euler Column Critical Buckling Load',
    latex: 'P_{cr} = \\frac{\\pi^2 E I}{(K L)^2}',
    plainText: 'Pcr = (pi^2 * E * I) / (K * L)^2',
    description: 'Maximum axial compression force a slender column can bear before elastic instability.',
    variables: [
      { symbol: 'E', name: 'Modulus of Elasticity', unit: 'GPa', defaultValue: 200 },
      { symbol: 'I', name: 'Area Moment of Inertia', unit: 'm⁴', defaultValue: 1.5e-6 },
      { symbol: 'K', name: 'Column Effective Length Factor', unit: 'dimensionless', defaultValue: 1.0 },
      { symbol: 'L', name: 'Unsupported Length', unit: 'm', defaultValue: 3.0 },
    ],
    evaluators: [
      {
        targetSymbol: 'P_cr',
        label: 'Calculate Critical Buckling Load (kN)',
        formulaExpr: 'Pcr = (pi^2 * E * 1e9 * I) / (K * L)^2 / 1000',
        calculate: (inputs) => {
          const kl = inputs['K'] * inputs['L'];
          if (kl <= 0) return 0;
          const pN = (Math.pow(Math.PI, 2) * (inputs['E'] * 1e9) * inputs['I']) / (kl * kl);
          return pN / 1000; // kN
        },
      },
    ],
  },

  // ==================== MANUFACTURING PROCESSES ====================
  {
    id: 'f-mfg-1',
    subject: 'Manufacturing Processes',
    category: 'Machining',
    title: "Taylor's Tool Life Equation",
    latex: 'V T^n = C',
    plainText: 'V * T^n = C',
    description: 'Connects cutting velocity to tool life expectancy in metal machining.',
    variables: [
      { symbol: 'V', name: 'Cutting Velocity', unit: 'm/min', defaultValue: 120 },
      { symbol: 'T', name: 'Tool Life', unit: 'min', defaultValue: 30 },
      { symbol: 'n', name: 'Tool Exponent (HSS=0.1, Carbide=0.25)', unit: 'dimensionless', defaultValue: 0.25 },
    ],
    evaluators: [
      {
        targetSymbol: 'C',
        label: 'Calculate Taylor Constant C',
        formulaExpr: 'C = V * (T^n)',
        calculate: (inputs) => inputs['V'] * Math.pow(inputs['T'], inputs['n']),
      },
      {
        targetSymbol: 'V_new',
        label: 'Calculate Velocity for 60-min Life',
        formulaExpr: 'V = C / (60^n)',
        calculate: (inputs) => {
          const C = inputs['V'] * Math.pow(inputs['T'], inputs['n']);
          return C / Math.pow(60, inputs['n']);
        },
      },
    ],
  },
  {
    id: 'f-mfg-2',
    subject: 'Manufacturing Processes',
    category: 'Metal Cutting',
    title: 'Merchant Shear Plane Angle',
    latex: '\\phi = 45^\\circ + \\frac{\\alpha}{2} - \\frac{\\beta}{2}',
    plainText: 'phi = 45 + (alpha/2) - (beta/2)',
    description: 'Optimum shear plane angle minimizing cutting power in orthogonal cutting.',
    variables: [
      { symbol: '\\alpha', name: 'Rake Angle', unit: 'degrees', defaultValue: 10 },
      { symbol: '\\beta', name: 'Friction Angle', unit: 'degrees', defaultValue: 30 },
    ],
    evaluators: [
      {
        targetSymbol: 'phi',
        label: 'Calculate Shear Angle phi (deg)',
        formulaExpr: 'phi = 45 + alpha/2 - beta/2',
        calculate: (inputs) => 45 + inputs['\\alpha'] / 2 - inputs['\\beta'] / 2,
      },
    ],
  },
  {
    id: 'f-mfg-3',
    subject: 'Manufacturing Processes',
    category: 'Casting',
    title: "Chvorinov's Solidification Time",
    latex: 't_s = C_m \\left( \\frac{V}{A} \\right)^2',
    plainText: 'ts = Cm * (V / A)^2',
    description: 'Estimates time required for molten metal casting to solidify fully.',
    variables: [
      { symbol: 'C_m', name: 'Mold Constant', unit: 'min/cm²', defaultValue: 2.5 },
      { symbol: 'V', name: 'Casting Volume', unit: 'cm³', defaultValue: 1000 },
      { symbol: 'A', name: 'Cooling Area', unit: 'cm²', defaultValue: 600 },
    ],
    evaluators: [
      {
        targetSymbol: 't_s',
        label: 'Calculate Solidification Time (min)',
        formulaExpr: 'ts = Cm * (V / A)^2',
        calculate: (inputs) => {
          if (inputs['A'] <= 0) return 0;
          return inputs['C_m'] * Math.pow(inputs['V'] / inputs['A'], 2);
        },
      },
    ],
  },

  // ==================== ENGINEERING MATH ====================
  {
    id: 'f-math-1',
    subject: 'Engineering Math',
    category: 'Differential Equations',
    title: 'Damped Mass-Spring-Damper 2nd Order ODE',
    latex: 'm \\ddot{x} + c \\dot{x} + k x = F(t), \\quad \\omega_n = \\sqrt{\\frac{k}{m}}, \\quad \\zeta = \\frac{c}{2 \\sqrt{k m}}',
    plainText: 'm*x" + c*x\' + k*x = F(t); w_n = sqrt(k/m); zeta = c / (2*sqrt(k*m))',
    description: 'Governs single-degree-of-freedom mechanical vibration and damping behavior.',
    variables: [
      { symbol: 'm', name: 'Mass', unit: 'kg', defaultValue: 10 },
      { symbol: 'c', name: 'Damping Coefficient', unit: 'N·s/m', defaultValue: 20 },
      { symbol: 'k', name: 'Spring Stiffness', unit: 'N/m', defaultValue: 1000 },
    ],
    evaluators: [
      {
        targetSymbol: 'omega_n',
        label: 'Calculate Natural Frequency (rad/s) & Damping Ratio',
        formulaExpr: 'wn = sqrt(k/m); zeta = c / (2*sqrt(k*m))',
        calculate: (inputs) => {
          if (inputs['m'] <= 0 || inputs['k'] <= 0) return 0;
          return Math.sqrt(inputs['k'] / inputs['m']);
        },
      },
    ],
  },
  {
    id: 'f-math-2',
    subject: 'Engineering Math',
    category: 'Transforms & Calculus',
    title: 'Laplace Transform of Derivatives',
    latex: '\\mathcal{L}\\{y\'\\} = s Y(s) - y(0), \\quad \\mathcal{L}\\{y\'\'\\} = s^2 Y(s) - s y(0) - y\'(0)',
    plainText: 'L{y\'} = s*Y(s) - y(0); L{y\'\'} = s^2*Y(s) - s*y(0) - y\'(0)',
    description: 'Transforms ordinary differential equations into algebraic equations for initial value problems.',
    variables: [
      { symbol: 's', name: 'Complex Frequency Variable', unit: 's⁻¹', defaultValue: 5 },
      { symbol: 'y(0)', name: 'Initial Position', unit: 'm', defaultValue: 0.1 },
      { symbol: "y'(0)", name: 'Initial Velocity', unit: 'm/s', defaultValue: 0.0 },
    ],
  },
  {
    id: 'f-math-3',
    subject: 'Engineering Math',
    category: 'Linear Algebra',
    title: 'Matrix Characteristic Equation & Eigenvalues',
    latex: '\\det(\\mathbf{A} - \\lambda \\mathbf{I}) = 0',
    plainText: 'det(A - lambda*I) = 0',
    description: 'Finds natural modes and principal directions for linear systems and vibration matrices.',
    variables: [
      { symbol: 'a_11', name: 'Matrix Entry a11', unit: 'dimensionless', defaultValue: 4 },
      { symbol: 'a_12', name: 'Matrix Entry a12', unit: 'dimensionless', defaultValue: 1 },
      { symbol: 'a_21', name: 'Matrix Entry a21', unit: 'dimensionless', defaultValue: 2 },
      { symbol: 'a_22', name: 'Matrix Entry a22', unit: 'dimensionless', defaultValue: 3 },
    ],
    evaluators: [
      {
        targetSymbol: 'lambda_max',
        label: 'Calculate Max Eigenvalue (lambda)',
        formulaExpr: 'trace = a11+a22; det = a11*a22 - a12*a21; lambda = trace/2 + sqrt((trace/2)^2 - det)',
        calculate: (inputs) => {
          const tr = inputs['a_11'] + inputs['a_22'];
          const det = inputs['a_11'] * inputs['a_22'] - inputs['a_12'] * inputs['a_21'];
          const disc = (tr * tr) / 4 - det;
          return disc < 0 ? tr / 2 : tr / 2 + Math.sqrt(disc);
        },
      },
    ],
  },
];
