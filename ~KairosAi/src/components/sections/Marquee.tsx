'use client'

const COMPANIES = [
  'Stripe', 'Vercel', 'Linear', 'Notion', 'Figma',
  'Shopify', 'Datadog', 'Snowflake', 'Databricks', 'Scale AI',
  'Anthropic', 'Cohere', 'Mistral', 'Hugging Face', 'Replicate',
]

const ALL_ITEMS = [...COMPANIES, ...COMPANIES]

function Separator() {
  return (
    <div className="flex-shrink-0 flex items-center justify-center mx-2 sm:mx-3">
      <div className="w-[3px] h-[3px] rotate-45 bg-black/[0.12] rounded-[0.5px]" />
    </div>
  )
}

export default function Marquee() {
  return (
    <section className="relative py-5 sm:py-6 overflow-hidden border-y border-black/[0.04]">
      {/* Fade edges — gradient from #FAFAF8 to transparent */}
      <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-[#FAFAF8] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-[#FAFAF8] to-transparent z-10 pointer-events-none" />

      {/* Scrolling track */}
      <div className="flex animate-marquee">
        {ALL_ITEMS.map((company, i) => (
          <div key={`${company}-${i}`} className="flex items-center flex-shrink-0">
            <div
              className="flex items-center gap-3 group px-4 sm:px-6 py-2"
              data-cursor-hover
            >
              {/* Icon/initial box — bg black/[0.03], border black/[0.05] */}
              <div className="w-7 h-7 rounded-md flex items-center justify-center bg-black/[0.03] border border-black/[0.05] group-hover:border-[#7C5CFC]/30 group-hover:bg-[#7C5CFC]/[0.06] transition-all duration-500">
                <span className="text-[9px] font-semibold text-[#A1A1AA] group-hover:text-[#7C5CFC] transition-colors duration-500">
                  {company[0]}
                </span>
              </div>

              {/* Company name — #71717A, hover #0F0F12 */}
              <span className="text-sm font-medium text-[#71717A] whitespace-nowrap tracking-tight group-hover:text-[#0F0F12] transition-colors duration-500">
                {company}
              </span>
            </div>

            {/* Diamond separator between items */}
            <Separator />
          </div>
        ))}
      </div>
    </section>
  )
}
