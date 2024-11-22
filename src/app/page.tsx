import { Poppins } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { LoginButton } from '@/components/auth/login-button';
import { GDService } from '@/global';
import { ServiceNavi } from '@/components/shared/service-navi';

const popFonts = Poppins({
  subsets: ['latin'],
  weight: ['600'],
});

const services: GDService[] = [
  {
    name: 'Main Server',
    description: 'Debian 12 Server as platform',
    url: 'https://192.168.66.9:9090/',
    startedAt: new Date(),
    clickCount: 0,
  },
  {
    name: 'Docker Server',
    description: 'Services on Docker',
    url: 'http://192.168.66.9:9000/',
    startedAt: new Date(),
    clickCount: 0,
  },
  {
    name: 'Web Server',
    description: 'Web Portal',
    url: 'http://192.168.66.9:81/',
    startedAt: new Date(),
    clickCount: 0,
  },
  {
    name: 'Plex',
    description: 'Internal Media Server',
    url: 'http://192.168.66.9:32400/web/',
    startedAt: new Date(),
    clickCount: 0,
  },
  {
    name: 'Xiao Ya',
    description: 'Xiao Ya Alist',
    url: 'http://192.168.66.9:5678/',
    startedAt: new Date(),
    clickCount: 0,
  },
  {
    name: 'DSM',
    description: 'Synology DSM',
    url: 'http://192.168.66.8:5000/',
    startedAt: new Date(),
    clickCount: 0,
  },
  {
    name: 'Youtube',
    description: 'Youtube Downloader',
    url: 'http://192.168.66.9:17442/',
    startedAt: new Date(),
    clickCount: 0,
  },
  {
    name: 'DB',
    description: 'Postgres DB',
    url: 'http://192.168.66.9:7080/',
    startedAt: new Date(),
    clickCount: 0,
  },
];

export default async function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center ">
      <div className="space-y-6 text-center mb-4">
        <h1 className={cn("text-6xl font-semibold text-gray-800 drop-shadow-md", popFonts.className)}>
         GuluDoc
        </h1>

        <p className="text-white text-lg ">
          A Simple Authentication System
        </p>

        <div>
          <LoginButton mode="modal" asChild>
            <Button variant="default" className="size-lg">
              Sign In
            </Button>
          </LoginButton>
        </div>
      </div>

      <ServiceNavi services={services} />
    </main>
  );
}
