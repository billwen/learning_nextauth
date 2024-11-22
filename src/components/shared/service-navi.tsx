import { GDService } from '@/global';
import { ServiceBlock } from '@/components/shared/service-block';


interface ServiceNaviProps {
  services: GDService[];
}

export function ServiceNavi({ services }: ServiceNaviProps) {
  return (
    <div className="w-[768px] flex flex-row items-center justify-center gap-6">
      {
        services.map((service) => (
          <ServiceBlock service={service} key={service.name} />
        ))
      }
    </div>
  );
}