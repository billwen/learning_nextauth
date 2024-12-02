import { Loader2Icon } from 'lucide-react';

export default function LoadingWorkflowPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Loader2Icon size={30} className="animated-spin stroke-primary" />
    </div>
  );
}
