interface DifficultyBadgeProps {
  difficulty: string;
  size?: 'sm' | 'md';
}

export default function DifficultyBadge({ difficulty, size = 'md' }: DifficultyBadgeProps) {
  const colorMap: Record<string, string> = {
    'Easy': 'bg-emerald-100 text-emerald-800 border border-emerald-200',
    'Easy/Moderate': 'bg-blue-100 text-blue-800 border border-blue-200',
    'Moderate': 'bg-amber-100 text-amber-800 border border-amber-200',
    'Difficult': 'bg-red-100 text-red-800 border border-red-200',
  };

  const sizeMap = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
  };

  const colorClass = colorMap[difficulty] || 'bg-gray-100 text-gray-800 border border-gray-200';

  return (
    <span className={`inline-flex items-center font-body font-semibold rounded-full ${colorClass} ${sizeMap[size]}`}>
      {difficulty}
    </span>
  );
}
