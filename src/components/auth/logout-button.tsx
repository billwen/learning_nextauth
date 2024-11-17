"use client";

import { logout } from '@/server-action/sa-logout';

export const LogoutButton = ({children}: { children: React.ReactNode}) => {
  const onClick = () => {
    logout();
  };

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>

  );
};
