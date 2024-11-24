"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FaUser } from 'react-icons/fa';
import { useCurrentUser } from '@/hooks/use-current-user';
import { LogoutButton } from '@/components/auth/logout-button';
import { ExitIcon } from '@radix-ui/react-icons';

interface UserButtonProps {
  size?: number;
}

export function UserButton({ size }: UserButtonProps) {
  const user = useCurrentUser();

  const avatarClass = size ? `w-${size} h-${size}` : undefined;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className={avatarClass}>

          <AvatarImage src={user?.image ?? ""} />
          <AvatarFallback className="bg-sky-500">
            <FaUser className="text-white" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-40" align="end">
        <LogoutButton>
          <DropdownMenuItem>
            <ExitIcon className="h-4 w-4 mr-2" />
           Logout
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}