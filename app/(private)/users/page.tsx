import { getUsers } from "@/actions/user.action";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
} from "@/components/ui/table";
import { UserTable } from "@/components/users/UserTable";

const UsersPage = async () => {
  const result = await getUsers();

  if ("error" in result) {
    return (
      <p className="text-red-500 text-center mt-10">
        {JSON.stringify(result.error)}
      </p>
    );
  }

  return (
    <div className="container mx-auto pb-10">
      <h4 className="text-xl font-bold mb-6">Gestión de Usuarios</h4>
      <div className="w-full overflow-hidden grid grid-cols-1">
        <ScrollArea>
          <Table className="min-w-full table-auto">
            <TableCaption>
              Una lista de todos los usuarios registrados.
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold">Nombre</TableHead>
                <TableHead className="font-semibold">Email</TableHead>
                <TableHead className="font-semibold">Rol Actual</TableHead>
                <TableHead className="font-semibold">
                  Fecha de Registro
                </TableHead>
                <TableHead className="font-semibold">Cambiar Rol</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <UserTable users={result} />
            </TableBody>
          </Table>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
};
export default UsersPage;
