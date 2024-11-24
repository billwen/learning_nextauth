"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from '@/components/ui/breadcrumb';
import { MobileSidebar } from '@/app/flow/_components/sidebar';

export function BreadcrumbHeader() {
  const pathname = usePathname();
  const paths = pathname ? pathname.split('/') : [];
  if (paths.length > 0) {
    // Remove the second path string
    paths.splice(1, 1);
  }

  console.log(paths);
  return (
    <div className="flex items-center flex-start">
      <MobileSidebar />
      <Breadcrumb>
        <BreadcrumbList>
          { paths.map((path, index) => (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                <BreadcrumbLink className="capitalize" href={`/flow/${path}`}>
                  {path.length > 0 ? path : 'Home'}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </React.Fragment>
          )) }
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}