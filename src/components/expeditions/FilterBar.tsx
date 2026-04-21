'use client';

interface FilterState {
  difficulty: string;
  type: string;
  region: string;
}

interface FilterBarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
}

const difficulties = ['All', 'Easy', 'Easy/Moderate', 'Moderate', 'Difficult'];
const types = ['All', 'Trek', 'Expedition', 'Fun Activity'];
const regions = ['All', 'Garhwal', 'Kumaon'];

export default function FilterBar({ filters, onChange }: FilterBarProps) {
  const setFilter = (key: keyof FilterState, value: string) => {
    onChange({ ...filters, [key]: value });
  };

  const FilterGroup = ({
    label,
    options,
    value,
    filterKey,
  }: {
    label: string;
    options: string[];
    value: string;
    filterKey: keyof FilterState;
  }) => (
    <div className="flex items-center gap-2">
      <span className="font-body text-charcoal-light text-sm font-medium whitespace-nowrap flex-shrink-0">
        {label}:
      </span>
      <div className="flex gap-1 overflow-x-auto no-scrollbar">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => setFilter(filterKey, opt)}
            className={`px-3 py-1.5 rounded-lg text-xs font-body font-semibold whitespace-nowrap transition-all duration-200 ${
              value === opt
                ? 'bg-forest text-white shadow-sm'
                : 'bg-white text-charcoal-light hover:bg-snow border border-gray-200 hover:border-forest'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-snow border border-gray-200 rounded-2xl p-4 space-y-3">
      <FilterGroup
        label="Difficulty"
        options={difficulties}
        value={filters.difficulty}
        filterKey="difficulty"
      />
      <FilterGroup
        label="Type"
        options={types}
        value={filters.type}
        filterKey="type"
      />
      <FilterGroup
        label="Region"
        options={regions}
        value={filters.region}
        filterKey="region"
      />
    </div>
  );
}
