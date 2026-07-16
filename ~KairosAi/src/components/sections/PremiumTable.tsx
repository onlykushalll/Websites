'use client'

import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  MoreHorizontal,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
} from 'lucide-react'

type Status = 'active' | 'completed' | 'running' | 'queued' | 'failed'

interface TableRow {
  id: string
  agent: string
  task: string
  status: Status
  duration: string
  efficiency: number
  lastRun: string
}

const STATUS_CONFIG: Record<
  Status,
  { label: string; color: string; bg: string; icon: React.ElementType }
> = {
  active: {
    label: 'Active',
    color: '#8B7EC8',
    bg: 'rgba(139,126,200,0.08)',
    icon: CheckCircle,
  },
  completed: {
    label: 'Completed',
    color: '#22C55E',
    bg: 'rgba(34,197,94,0.08)',
    icon: CheckCircle,
  },
  running: {
    label: 'Running',
    color: '#6366F1',
    bg: 'rgba(99,102,241,0.08)',
    icon: Clock,
  },
  queued: {
    label: 'Queued',
    color: '#8B8B9A',
    bg: 'rgba(139,139,154,0.08)',
    icon: Clock,
  },
  failed: {
    label: 'Failed',
    color: '#EF4444',
    bg: 'rgba(239,68,68,0.08)',
    icon: XCircle,
  },
}

const DATA: TableRow[] = [
  {
    id: 'AGT-2847',
    agent: 'Revenue Analyst',
    task: 'Q4 revenue pattern analysis',
    status: 'running',
    duration: '2m 14s',
    efficiency: 94,
    lastRun: '2 min ago',
  },
  {
    id: 'AGT-1923',
    agent: 'Risk Assessor',
    task: 'Portfolio risk evaluation',
    status: 'completed',
    duration: '8m 32s',
    efficiency: 98,
    lastRun: '15 min ago',
  },
  {
    id: 'AGT-3102',
    agent: 'Supply Optimizer',
    task: 'Demand forecast generation',
    status: 'active',
    duration: '1m 05s',
    efficiency: 87,
    lastRun: '1 min ago',
  },
  {
    id: 'AGT-1456',
    agent: 'Compliance Bot',
    task: 'Regulatory compliance scan',
    status: 'queued',
    duration: '—',
    efficiency: 0,
    lastRun: '45 min ago',
  },
  {
    id: 'AGT-2891',
    agent: 'Customer Agent',
    task: 'Support ticket routing',
    status: 'active',
    duration: '5m 18s',
    efficiency: 91,
    lastRun: '30s ago',
  },
  {
    id: 'AGT-4001',
    agent: 'Data Pipeline',
    task: 'ETL job optimization',
    status: 'failed',
    duration: '12m 03s',
    efficiency: 23,
    lastRun: '1 hr ago',
  },
  {
    id: 'AGT-2210',
    agent: 'Market Scanner',
    task: 'Real-time trend detection',
    status: 'running',
    duration: '3m 45s',
    efficiency: 89,
    lastRun: '5 min ago',
  },
]

function StatusBadge({ status }: { status: Status }) {
  const config = STATUS_CONFIG[status]
  const Icon = config.icon
  const isRunning = status === 'running'

  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium tracking-wide"
      style={{ backgroundColor: config.bg, color: config.color }}
    >
      <Icon
        size={10}
        className={isRunning ? 'animate-pulse' : ''}
      />
      {config.label}
    </span>
  )
}

function EfficiencyBar({ value }: { value: number }) {
  const color =
    value >= 90
      ? '#22C55E'
      : value >= 70
        ? '#8B7EC8'
        : value >= 40
          ? '#C4A882'
          : '#EF4444'

  return (
    <div className="flex items-center gap-2.5">
      <div className="flex-1 h-1.5 bg-[#E8E8EC] rounded-full overflow-hidden max-w-[80px]">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <span
        className="type-mono text-[11px] font-medium min-w-[32px]"
        style={{ color }}
      >
        {value > 0 ? `${value}%` : '—'}
      </span>
    </div>
  )
}

export default function PremiumTable() {
  const sectionRef = useScrollAnimation()

  return (
    <section
      ref={sectionRef}
      className="section-reveal relative py-24 sm:py-32 px-6 overflow-hidden section-bg-solid"
    >
      <div className="absolute inset-0 gradient-mesh pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        {/* Table container with premium glass wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-2xl p-[1px]"
          style={{
            background:
              'linear-gradient(135deg, rgba(139,126,200,0.15), rgba(0,0,0,0.02), rgba(107,184,224,0.15))',
          }}
        >
          <div
            className="rounded-[15px] overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.85)',
              backdropFilter: 'blur(20px) saturate(160%)',
              WebkitBackdropFilter: 'blur(20px) saturate(160%)',
            }}
          >
            {/* Table header bar */}
            <div className="px-5 sm:px-6 py-4 border-b border-black/[0.04] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#8B7EC8] animate-pulse" />
                <span className="text-sm font-semibold text-[#0F0F12]">
                  Agent Activity
                </span>
                <span className="type-mono text-[10px] text-[#8B8B9A] bg-[#F3F2EF] px-2 py-0.5 rounded">
                  Live
                </span>
              </div>
              <span className="type-mono text-[10px] text-[#8B8B9A]">
                {DATA.length} agents
              </span>
            </div>

            {/* The actual table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                {/* Frosted glass sticky header */}
                <thead>
                  <tr className="border-b border-black/[0.06]">
                    {[
                      'AGENT',
                      'CURRENT TASK',
                      'STATUS',
                      'DURATION',
                      'EFFICIENCY',
                      'LAST RUN',
                    ].map((header) => (
                      <th
                        key={header}
                        className="px-5 sm:px-6 py-3 text-left"
                        style={{
                          background: 'rgba(255, 255, 255, 0.72)',
                          backdropFilter: 'blur(12px) saturate(180%)',
                          WebkitBackdropFilter:
                            'blur(12px) saturate(180%)',
                        }}
                      >
                        <span className="type-label text-[9px] inline-flex items-center gap-1 cursor-pointer hover:text-[#8B7EC8] transition-colors">
                          {header}
                          <ArrowUpDown
                            size={8}
                            className="opacity-30"
                          />
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {DATA.map((row, i) => (
                    <motion.tr
                      key={row.id}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.4,
                        delay: i * 0.05,
                      }}
                      className="group relative cursor-pointer transition-all duration-300 border-l-2 border-l-transparent hover:border-l-[#8B7EC8]"
                      style={{
                        backgroundColor:
                          i % 2 === 1
                            ? 'rgba(250, 250, 248, 0.5)'
                            : 'transparent',
                      }}
                      onMouseEnter={(e) => {
                        ;(
                          e.currentTarget as HTMLTableRowElement
                        ).style.backgroundColor = 'rgba(139, 126, 200, 0.04)'
                      }}
                      onMouseLeave={(e) => {
                        ;(
                          e.currentTarget as HTMLTableRowElement
                        ).style.backgroundColor =
                          i % 2 === 1
                            ? 'rgba(250, 250, 248, 0.5)'
                            : 'transparent'
                      }}
                    >
                      <td className="px-5 sm:px-6 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <div
                            className="w-7 h-7 rounded-lg flex items-center justify-center"
                            style={{
                              backgroundColor: `${STATUS_CONFIG[row.status].color}10`,
                            }}
                          >
                            <span
                              className="type-mono text-[9px] font-bold"
                              style={{
                                color: STATUS_CONFIG[row.status].color,
                              }}
                            >
                              {row.id.split('-')[1]?.slice(0, 2)}
                            </span>
                          </div>
                          <div>
                            <div className="text-xs font-semibold text-[#0F0F12]">
                              {row.agent}
                            </div>
                            <div className="type-mono text-[9px] text-[#8B8B9A]">
                              {row.id}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 sm:px-6 py-3.5">
                        <span className="text-[12px] text-[#3A3A4A]">
                          {row.task}
                        </span>
                      </td>

                      <td className="px-5 sm:px-6 py-3.5">
                        <StatusBadge status={row.status} />
                      </td>

                      <td className="px-5 sm:px-6 py-3.5">
                        <span className="type-mono text-[11px] text-[#5A5A6A]">
                          {row.duration}
                        </span>
                      </td>

                      <td className="px-5 sm:px-6 py-3.5">
                        <EfficiencyBar value={row.efficiency} />
                      </td>

                      <td className="px-5 sm:px-6 py-3.5">
                        <span className="type-mono text-[10px] text-[#8B8B9A]">
                          {row.lastRun}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
