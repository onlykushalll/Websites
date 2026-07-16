/**
 * Kairos AI - Global Constants
 */

export const BRAND = {
  name: 'Kairos AI',
  tagline: 'Autonomous Intelligence',
  description: 'AI agents that think, adapt, and execute — transforming how businesses operate with intelligent automation.',
  url: 'https://kairos.ai',
} as const

export const COLORS = {
  gold: '#D4A853',
  amber: '#F59E0B',
  cream: '#FFFBF0',
  warm: '#FEF3C7',
  deep: '#1A1A2E',
  surface: '#FAFAF8',
  white: '#FFFFFF',
  glow: 'rgba(212, 168, 83, 0.15)',
} as const

export const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Features', href: '#features' },
  { label: 'Process', href: '#process' },
  { label: 'Use Cases', href: '#use-cases' },
  { label: 'Contact', href: '#contact' },
] as const

export const FEATURES = [
  {
    icon: 'Brain',
    title: 'Autonomous Thinking',
    description: 'Self-directed reasoning that processes complex scenarios, weighs outcomes, and makes intelligent decisions without human intervention.',
  },
  {
    icon: 'Zap',
    title: 'Real-Time Adaptation',
    description: 'Continuously learns from data streams and environmental changes, adapting strategies in real-time for optimal performance.',
  },
  {
    icon: 'Shield',
    title: 'Secure Execution',
    description: 'Enterprise-grade security with built-in guardrails, audit trails, and compliance controls for safe autonomous operations.',
  },
  {
    icon: 'Workflow',
    title: 'Seamless Integration',
    description: 'Connects with your existing tools and workflows through native APIs, requiring zero infrastructure changes.',
  },
  {
    icon: 'BarChart3',
    title: 'Predictive Analytics',
    description: 'Anticipates trends and outcomes using advanced pattern recognition, enabling proactive rather than reactive strategies.',
  },
  {
    icon: 'Globe',
    title: 'Scalable Deployment',
    description: 'From single-task agents to enterprise fleets — scale autonomously with consistent performance and reliability.',
  },
] as const

export const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Define',
    description: 'Specify your objectives and constraints. Kairos understands context, goals, and boundaries to operate within your parameters.',
  },
  {
    step: '02',
    title: 'Deploy',
    description: 'Launch your autonomous agent with one click. It immediately begins analyzing your data landscape and formulating strategies.',
  },
  {
    step: '03',
    title: 'Execute',
    description: 'The agent operates autonomously — making decisions, taking actions, and adapting in real-time while keeping you informed.',
  },
  {
    step: '04',
    title: 'Evolve',
    description: 'Continuous learning improves performance over time. The agent refines its approach based on outcomes and feedback loops.',
  },
] as const

export const USE_CASES = [
  {
    title: 'Financial Operations',
    description: 'Autonomous trading, risk assessment, and compliance monitoring with millisecond decision-making.',
    metric: '10x',
    metricLabel: 'Faster Processing',
  },
  {
    title: 'Supply Chain',
    description: 'Predictive logistics, demand forecasting, and automated vendor negotiations across global networks.',
    metric: '45%',
    metricLabel: 'Cost Reduction',
  },
  {
    title: 'Customer Experience',
    description: 'Personalized engagement, proactive support, and intelligent routing that anticipates customer needs.',
    metric: '98%',
    metricLabel: 'Satisfaction Rate',
  },
  {
    title: 'Data Engineering',
    description: 'Automated pipeline management, anomaly detection, and self-healing data infrastructure.',
    metric: '99.9%',
    metricLabel: 'Uptime',
  },
] as const

export const STATS = [
  { value: '99.9', suffix: '%', label: 'Uptime SLA' },
  { value: '50', suffix: 'ms', label: 'Avg Response' },
  { value: '10M', suffix: '+', label: 'Tasks Completed' },
  { value: '500', suffix: '+', label: 'Enterprise Clients' },
] as const

export const ANIMATION = {
  duration: {
    fast: 0.3,
    normal: 0.6,
    slow: 0.9,
    slower: 1.2,
  },
  ease: {
    smooth: [0.25, 0.1, 0.25, 1] as const,
    out: [0, 0, 0.2, 1] as const,
    inOut: [0.4, 0, 0.2, 1] as const,
    spring: { type: 'spring', stiffness: 100, damping: 20 } as const,
  },
} as const
