"use client";

import { useTransition } from "react";
import { UserRole } from "@prisma/client";
import { toast } from "sonner";

import { UserData, updateUserRole } from "@/actions/user.action";
import { TableRow, TableCell } from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UserTableProps {
  users: UserData[];
}

export const UserTable = ({ users }: UserTableProps) => {
  const [isPending, startTransition] = useTransition();

  const onRoleChange = (userId: string, newRole: UserRole) => {
    startTransition(async () => {
      const result = await updateUserRole(userId, newRole);
      if (result.error) {
        toast.error("Error al actualizar", { description: result.error });
      } else {
        toast.success("Rol actualizado", { description: result.success });
      }
    });
  };

  return (
    <>
      {users.map((user) => (
        <TableRow key={user.id}>
          <TableCell className="font-medium">{user.name}</TableCell>
          <TableCell>{user.email}</TableCell>
          <TableCell>
            <span
              className={`px-2 py-1 text-xs font-semibold rounded-full ${
                user.role === "manager"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {user.role}
            </span>
          </TableCell>
          <TableCell>
            {new Date(user.createdAt).toLocaleDateString("es-PE")}
          </TableCell>
          <TableCell className="text-right">
            <Select
              defaultValue={user.role}
              onValueChange={(value) =>
                onRoleChange(user.id, value as UserRole)
              }
              disabled={isPending}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Seleccionar rol" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="manager">manager</SelectItem>
                <SelectItem value="revisor">revisor</SelectItem>
              </SelectContent>
            </Select>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};
