import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/shared/components/ui/button";
import { MoreHorizontal, Mail, Phone, Building } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { DateTimeDisplay } from "@/shared/components/custom/DateTimeDisplay";

export type SubmissionColumn = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_country_code: string;
  phone_number: string;
  organization_name: string;
  position: string;
  resource_title: string | null;
  submission_date: string;
};

export const submissionsColumns: ColumnDef<SubmissionColumn>[] = [
  {
    accessorKey: "first_name",
    header: "Name",
    cell: ({ row }) => {
      const firstName = row.getValue("first_name") as string;
      const lastName = row.original.last_name;
      return (
        <div className="font-medium">
          {firstName} {lastName}
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      const email = row.getValue("email") as string;
      return (
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-muted-foreground" />
          <a href={`mailto:${email}`} className="hover:underline">
            {email}
          </a>
        </div>
      );
    },
  },
  {
    accessorKey: "phone_number",
    header: "Phone",
    cell: ({ row }) => {
      const code = row.original.phone_country_code;
      const phone = row.getValue("phone_number") as string;
      return (
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-muted-foreground" />
          <span>{code} {phone}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "organization_name",
    header: "Organization",
    cell: ({ row }) => {
      const org = row.getValue("organization_name") as string;
      const position = row.original.position;
      return (
        <div className="flex items-center gap-2">
          <Building className="h-4 w-4 text-muted-foreground" />
          <div>
            <div className="font-medium">{org}</div>
            <div className="text-sm text-muted-foreground">{position}</div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "resource_title",
    header: "Resource",
    cell: ({ row }) => {
      const title = row.getValue("resource_title") as string | null;
      return title || <span className="text-muted-foreground">N/A</span>;
    },
  },
  {
    accessorKey: "submission_date",
    header: "Submitted",
    cell: ({ row }) => {
      const date = row.getValue("submission_date") as string;
      return <DateTimeDisplay date={date} />;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const submission = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(submission.email)}
            >
              Copy email
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(`${submission.phone_country_code} ${submission.phone_number}`)}
            >
              Copy phone
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
