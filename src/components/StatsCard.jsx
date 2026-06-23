export default function StatsCard({ title, value }) {
  return (
    <div className="bg-[#121214] border border-[#27272A] rounded-2xl p-5">
      <p className="text-sm text-[#71717A]">{title}</p>
      <p className="text-2xl font-bold text-[#FAFAFA] mt-1 tracking-tight">
        {value}
      </p>
    </div>
  )
}
