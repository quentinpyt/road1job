"use client"

interface FilterTabsProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function FilterTabs({ activeTab, onTabChange }: FilterTabsProps) {
  const tabs = ["Nouveau", "Populaire", "Proche"]

  return (
    <div className="flex gap-4 border-b border-gray-200">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`px-4 py-3 font-medium transition-colors ${
            activeTab === tab
              ? "text-gray-900 border-b-2 border-gray-900"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}
