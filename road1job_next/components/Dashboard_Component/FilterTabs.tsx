"use client"

interface FilterTabsProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function FilterTabs({ activeTab, onTabChange }: FilterTabsProps) {
  const tabs = ["Nouveau", "Populaire", "Proche"]

  return (
    <div className="flex gap-4 border-b border-gray-700">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`px-4 py-3 font-medium transition-colors ${
            activeTab === tab
              ? "text-[var(--app-fg)] border-b-2 border-indigo-500"
              : "text-[var(--app-fg)] opacity-70 hover:opacity-100"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}
