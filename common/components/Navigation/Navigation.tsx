import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import React from "react";

type NavLink = {
  label: string;
  href: string;
};

type Props = {
  navLinks: NavLink[];
};

const Navigation = ({ navLinks }: Props) => {
  const pathname = usePathname();
  const session = useSession();

  console.log(session);

  return <></>;
};
