"use client";

import { GDService } from '@/global';

import { Button } from '@/components/ui/button';

interface ServiceBlockProps {
  service: GDService;
}

export function ServiceBlock({ service }: ServiceBlockProps) {

  const onClickServiceBlock = () => {
    // TODO: Increment click count

    // Open the service in a new tab
    window.open(service.url, '_blank');
  };

  return (
    <Button variant="outline" onClick={onClickServiceBlock} asChild>
      <div className="w-[200px] h-[150px] flex flex-col justify-between border-2 text-gray-500 rounded-3xl p-4">
        <div>
          <h1 className="w-full text-center text-xl text-gray-800 font-semibold">
            {service.name}
          </h1>
          <p className="w-full text-center text-sm text-gray-400 ">
            {service.description}
          </p>
        </div>

        <div className="flex flex-row justify-between">
          <p className="text-xs text-gray-400 ">
            {service.clickCount}
          </p>
          <p className="text-xs text-gray-400 ">
            Since: {service.startedAt.toDateString()}
          </p>
        </div>
      </div>
    </Button>
  );
}
