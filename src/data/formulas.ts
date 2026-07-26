import { FormulaItem } from '../types';

export const FORMULA_SHEET: FormulaItem[] = [
  // Thermodynamics
  {
    id: 'f-thermo-1',
    subject: 'Thermodynamics',
    title: 'First Law of Thermodynamics (Closed System)',
    latex: 'Q - W = \\Delta U = m c_v (T_2 - T_1)',
    plainText: 'Q - W = ΔU = m * cv * (T2 - T1)',
    variables: [
      { symbol: 'Q', name: 'Heat Added to System', unit: 'kJ' },
      { symbol: 'W', name: 'Work Done by System', unit: 'kJ' },
      { symbol: 'm', name: 'Mass', unit: 'kg' },
      { symbol: 'c_v', name: 'Specific Heat at Constant Volume', unit: 'kJ/kg·K' },
      { symbol: 'T', name: 'Absolute Temperature', unit: 'K' },
    ],
    description: 'Conservation of energy for a closed stationary system.',
  },
  {
    id: 'f-thermo-2',
    subject: 'Thermodynamics',
    title: 'Ideal Gas Law',
    latex: 'P V = m R T = n R_u T',
    plainText: 'P * V = m * R * T',
    variables: [
      { symbol: 'P', name: 'Absolute Pressure', unit: 'kPa or Pa' },
      { symbol: 'V', name: 'Volume', unit: 'm³' },
      { symbol: 'R', name: 'Specific Gas Constant (R_u / MW)', unit: 'kJ/kg·K' },
      { symbol: 'T', name: 'Absolute Temperature', unit: 'K' },
    ],
    description: 'Equation of state relating pressure, volume, and temperature for ideal gases.',
  },
  {
    id: 'f-thermo-3',
    subject: 'Thermodynamics',
    title: 'Polytropic Process Relation',
    latex: 'P_1 V_1^n = P_2 V_2^n \\quad \\Rightarrow \\quad W = \\frac{P_1 V_1 - P_2 V_2}{n - 1}',
    plainText: 'P1 * V1^n = P2 * V2^n; W = (P1*V1 - P2*V2)/(n-1)',
    variables: [
      { symbol: 'n', name: 'Polytropic Exponent', unit: 'dimensionless' },
      { symbol: 'W', name: 'Polytropic Work', unit: 'kJ' },
    ],
    description: 'Work done during a quasistatic polytropic compression or expansion.',
  },
  {
    id: 'f-thermo-4',
    subject: 'Thermodynamics',
    title: 'Carnot Heat Engine Efficiency',
    latex: '\\eta_{th, Carnot} = 1 - \\frac{T_L}{T_H}',
    plainText: 'eta = 1 - (TL / TH)',
    variables: [
      { symbol: 'T_L', name: 'Low Reservoir Temperature', unit: 'K' },
      { symbol: 'T_H', name: 'High Reservoir Temperature', unit: 'K' },
    ],
    description: 'Maximum theoretical thermal efficiency achievable between two temperature limits.',
  },

  // Fluid Mechanics
  {
    id: 'f-fluids-1',
    subject: 'Fluid Mechanics',
    title: 'Bernoulli Equation (Incompressible, Inviscid)',
    latex: 'P_1 + \\frac{1}{2} \\rho V_1^2 + \\rho g z_1 = P_2 + \\frac{1}{2} \\rho V_2^2 + \\rho g z_2',
    plainText: 'P1 + 0.5*rho*V1^2 + rho*g*z1 = P2 + 0.5*rho*V2^2 + rho*g*z2',
    variables: [
      { symbol: 'P', name: 'Static Pressure', unit: 'Pa' },
      { symbol: '\\rho', name: 'Fluid Density', unit: 'kg/m³' },
      { symbol: 'V', name: 'Fluid Velocity', unit: 'm/s' },
      { symbol: 'g', name: 'Gravitational Acceleration (9.81)', unit: 'm/s²' },
      { symbol: 'z', name: 'Elevation Head', unit: 'm' },
    ],
    description: 'Energy conservation along a streamline for frictionless incompressible flow.',
  },
  {
    id: 'f-fluids-2',
    subject: 'Fluid Mechanics',
    title: 'Reynolds Number',
    latex: 'Re = \\frac{\\rho V D}{\\mu} = \\frac{V D}{\\nu}',
    plainText: 'Re = (rho * V * D) / mu',
    variables: [
      { symbol: 'D', name: 'Pipe Diameter / Characteristic Length', unit: 'm' },
      { symbol: '\\mu', name: 'Dynamic Viscosity', unit: 'Pa·s or N·s/m²' },
      { symbol: '\\nu', name: 'Kinematic Viscosity (mu/rho)', unit: 'm²/s' },
    ],
    description: 'Ratio of inertial forces to viscous forces; predicts laminar (Re < 2300) or turbulent flow in pipes.',
  },
  {
    id: 'f-fluids-3',
    subject: 'Fluid Mechanics',
    title: 'Darcy-Weisbach Major Head Loss',
    latex: 'h_f = f \\frac{L}{D} \\frac{V^2}{2g}, \\quad \\Delta P_f = f \\frac{L}{D} \\frac{\\rho V^2}{2}',
    plainText: 'hf = f * (L/D) * (V^2 / (2*g))',
    variables: [
      { symbol: 'f', name: 'Darcy Friction Factor', unit: 'dimensionless' },
      { symbol: 'L', name: 'Pipe Length', unit: 'm' },
      { symbol: 'h_f', name: 'Head Loss due to friction', unit: 'm' },
    ],
    description: 'Calculates pressure loss caused by friction in pipe flow.',
  },

  // Heat Transfer
  {
    id: 'f-ht-1',
    subject: 'Heat Transfer',
    title: 'Fourier\'s Law of Conduction',
    latex: 'q" = -k \\frac{dT}{dx} \\quad \\Rightarrow \\quad \\dot{Q} = k A \\frac{T_1 - T_2}{L}',
    plainText: 'Q_dot = k * A * (T1 - T2) / L',
    variables: [
      { symbol: 'k', name: 'Thermal Conductivity', unit: 'W/m·K' },
      { symbol: 'A', name: 'Heat Transfer Area', unit: 'm²' },
      { symbol: 'L', name: 'Wall Thickness', unit: 'm' },
    ],
    description: 'Rate of heat conduction through a material per unit area.',
  },
  {
    id: 'f-ht-2',
    subject: 'Heat Transfer',
    title: 'Newton\'s Law of Cooling (Convection)',
    latex: '\\dot{Q} = h A (T_s - T_\\infty)',
    plainText: 'Q_dot = h * A * (Ts - T_infinity)',
    variables: [
      { symbol: 'h', name: 'Convective Heat Transfer Coefficient', unit: 'W/m²·K' },
      { symbol: 'T_s', name: 'Surface Temperature', unit: '°C or K' },
      { symbol: 'T_\\infty', name: 'Fluid Bulk Temperature', unit: '°C or K' },
    ],
    description: 'Heat transfer rate between a solid surface and an adjacent moving fluid.',
  },
  {
    id: 'f-ht-3',
    subject: 'Heat Transfer',
    title: 'Log Mean Temperature Difference (LMTD)',
    latex: '\\Delta T_{lm} = \\frac{\\Delta T_1 - \\Delta T_2}{\\ln(\\Delta T_1 / \\Delta T_2)}, \\quad \\dot{Q} = U A \\Delta T_{lm}',
    plainText: 'dT_lm = (dT1 - dT2) / ln(dT1 / dT2)',
    variables: [
      { symbol: 'U', name: 'Overall Heat Transfer Coefficient', unit: 'W/m²·K' },
      { symbol: '\\Delta T_{lm}', name: 'LMTD', unit: '°C or K' },
    ],
    description: 'Logarithmic average temperature difference used in heat exchanger analysis.',
  },

  // Machine Design
  {
    id: 'f-design-1',
    subject: 'Machine Design',
    title: 'Von Mises Equivalent Distortion Energy Stress',
    latex: '\\sigma_v = \\sqrt{\\sigma_x^2 - \\sigma_x \\sigma_y + \\sigma_y^2 + 3 \\tau_{xy}^2}',
    plainText: 'sigma_v = sqrt(sigma_x^2 - sigma_x*sigma_y + sigma_y^2 + 3*tau_xy^2)',
    variables: [
      { symbol: '\\sigma_x, \\sigma_y', name: 'Normal Stresses in x and y', unit: 'MPa' },
      { symbol: '\\tau_{xy}', name: 'In-plane Shear Stress', unit: 'MPa' },
      { symbol: 'n', name: 'Factor of Safety (n = S_y / sigma_v)', unit: 'dimensionless' },
    ],
    description: 'Predicts yield failure under multi-axial stress state for ductile materials.',
  },
  {
    id: 'f-design-2',
    subject: 'Machine Design',
    title: 'Torsional Shear Stress in Circular Shaft',
    latex: '\\tau = \\frac{T r}{J} = \\frac{16 T}{\\pi d^3}',
    plainText: 'tau = (16 * T) / (pi * d^3)',
    variables: [
      { symbol: 'T', name: 'Applied Torque', unit: 'N·m' },
      { symbol: 'd', name: 'Solid Shaft Diameter', unit: 'm or mm' },
      { symbol: 'J', name: 'Polar Moment of Inertia (pi * d^4 / 32)', unit: 'm⁴' },
    ],
    description: 'Maximum shear stress on the outer surface of a circular shaft in torsion.',
  },
  {
    id: 'f-design-3',
    subject: 'Machine Design',
    title: 'Modified Goodman Fatigue Criterion',
    latex: '\\frac{\\sigma_a}{S_e} + \\frac{\\sigma_m}{S_{ut}} = \\frac{1}{n_f}',
    plainText: '(sigma_a / Se) + (sigma_m / Sut) = 1 / nf',
    variables: [
      { symbol: '\\sigma_a', name: 'Alternating Stress Amplitude', unit: 'MPa' },
      { symbol: '\\sigma_m', name: 'Mean Stress', unit: 'MPa' },
      { symbol: 'S_e', name: 'Endurance Limit', unit: 'MPa' },
      { symbol: 'S_{ut}', name: 'Ultimate Tensile Strength', unit: 'MPa' },
    ],
    description: 'Relates mean and alternating stresses to fatigue life and safety factor.',
  },

  // Manufacturing Processes
  {
    id: 'f-mfg-1',
    subject: 'Manufacturing Processes',
    title: 'Taylor\'s Tool Life Equation',
    latex: 'V T^n = C',
    plainText: 'V * T^n = C',
    variables: [
      { symbol: 'V', name: 'Cutting Velocity', unit: 'm/min or ft/min' },
      { symbol: 'T', name: 'Tool Life', unit: 'minutes' },
      { symbol: 'n', name: 'Exponent (depends on tool material)', unit: 'dimensionless' },
      { symbol: 'C', name: 'Constant (cutting speed for 1-min life)', unit: 'm/min' },
    ],
    description: 'Empirical model connecting cutting speed to tool wear rate.',
  },
  {
    id: 'f-mfg-2',
    subject: 'Manufacturing Processes',
    title: 'Merchant Shear Angle Relation',
    latex: '\\phi = 45^\\circ + \\frac{\\alpha}{2} - \\frac{\\beta}{2}',
    plainText: 'phi = 45 + (alpha/2) - (beta/2)',
    variables: [
      { symbol: '\\phi', name: 'Shear Angle', unit: 'degrees' },
      { symbol: '\\alpha', name: 'Tool Rake Angle', unit: 'degrees' },
      { symbol: '\\beta', name: 'Friction Angle', unit: 'degrees' },
    ],
    description: 'Optimum shear plane angle minimizing cutting energy in machining.',
  },
  {
    id: 'f-mfg-3',
    subject: 'Manufacturing Processes',
    title: 'Chvorinov\'s Rule for Solidification Time',
    latex: 't_s = C_m \\left( \\frac{V}{A} \\right)^2',
    plainText: 'ts = Cm * (V / A)^2',
    variables: [
      { symbol: 't_s', name: 'Total Solidification Time', unit: 'min or s' },
      { symbol: 'V', name: 'Casting Volume', unit: 'm³' },
      { symbol: 'A', name: 'Cooling Surface Area', unit: 'm²' },
      { symbol: 'C_m', name: 'Mold Constant', unit: 's/m² or min/cm²' },
    ],
    description: 'Estimates time required for a liquid metal casting to completely freeze.',
  },

  // Engineering Math
  {
    id: 'f-math-1',
    subject: 'Engineering Math',
    title: 'Damped Mechanical Vibration ODE',
    latex: 'm \\ddot{x} + c \\dot{x} + k x = F(t)',
    plainText: 'm*x\'\' + c*x\' + k*x = F(t)',
    variables: [
      { symbol: 'm', name: 'Mass', unit: 'kg' },
      { symbol: 'c', name: 'Damping Coefficient', unit: 'N·s/m' },
      { symbol: 'k', name: 'Spring Stiffness', unit: 'N/m' },
    ],
    description: 'Second-order linear ODE governing single degree-of-freedom mechanical dynamics.',
  },
  {
    id: 'f-math-2',
    subject: 'Engineering Math',
    title: 'Laplace Transform of First & Second Derivatives',
    latex: '\\mathcal{L}\\{y\'\\} = s Y(s) - y(0), \\quad \\mathcal{L}\\{y\'\'\\} = s^2 Y(s) - s y(0) - y\'(0)',
    plainText: 'L{y\'} = s*Y(s) - y(0); L{y\'\'} = s^2*Y(s) - s*y(0) - y\'(0)',
    variables: [
      { symbol: 's', name: 'Complex Frequency Domain Variable', unit: 's⁻¹' },
      { symbol: 'y(0)', name: 'Initial Position', unit: 'units' },
      { symbol: 'y\'(0)', name: 'Initial Velocity', unit: 'units/s' },
    ],
    description: 'Transforms ordinary differential equations into algebraic equations.',
  },
];
