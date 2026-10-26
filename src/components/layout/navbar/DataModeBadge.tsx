import { Cloud, HardDrive } from 'lucide-react';
import { useNotesStore } from '../../../store/notesStore';

const DataModeBadge = ({ className = '' }: { className?: string }) => {
  const dataMode = useNotesStore((s) => s.dataMode);
  const isCloud = dataMode === 'api';
  const Icon = isCloud ? Cloud : HardDrive;

  return (
    <span
      title={isCloud ? 'Synced to the cloud' : 'Saved on this device only'}
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
        isCloud
          ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300'
          : 'bg-amber-500/15 text-amber-800 dark:text-amber-300'
      } ${className}`}
    >
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      {isCloud ? 'Cloud' : 'Local'}
    </span>
  );
};

export default DataModeBadge;
