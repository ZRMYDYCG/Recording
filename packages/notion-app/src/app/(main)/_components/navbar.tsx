"use client";

import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { api } from "@/../convex/_generated/api";
import { Id } from "@/../convex/_generated/dataModel";
import { MenuIcon } from "lucide-react";
import Title from "./title";
import Banner from "./banner";
import Menu from "./menu";
import Publish from "./publish";

interface NavbarProps {
  isCollapsed: boolean;
  onResizeWidth: () => void;
}

const Navbar = ({ isCollapsed, onResizeWidth }: NavbarProps) => {
  const params = useParams();

  const document = useQuery(api.documents.getById, {
    documentId: params.documentId as Id<"documents">,
  });

  if (document === undefined) {
    return (
      <nav className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center justify-between">
        <Title.Skeleton />
        <div className="flex items-center gap-x-2">
          <Menu.Skeleton />
        </div>
      </nav>
    );
  }

  if (document === null) {
    return null;
  }

  return (
    <>
      <nav className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center gap-x-4 ">
        {isCollapsed && (
          <MenuIcon
            role="button"
            onClick={onResizeWidth}
            className="h-6 w-6 text-muted-foreground"
          />
        )}
        <div className="flex items-center justify-between w-full">
          <Title initialData={document}></Title>
          <div className="flex items-center gap-x-2">
            <Publish initialData={document}></Publish>
            <Menu documentId={document._id} />
          </div>
        </div>
      </nav>
      {document.isArchived && <Banner documentId={document._id} />}
    </>
  );
};

export default Navbar;
