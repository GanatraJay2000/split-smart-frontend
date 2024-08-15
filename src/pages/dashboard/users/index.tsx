import { useState } from "react";

import { users as usersData } from "@/lib/data/users";
import { User } from "@/lib/types/dataTable/schema";

import Inner from "@/components/Inner";
import { DataTable } from "@/components/DataTable/data-table";
import { userColumns } from "@/components/DataTable/Columns/UsersTable";

export default function Users() {
  const [users, setUsers] = useState<User[]>(usersData);

  const deleteRow = (rowIndex: number) => {
    setUsers((u) => {
      const _u = [...u];
      _u.splice(rowIndex, 1);
      return _u;
    });
  };

  const editRow = (rowIndex: number, data: Partial<User>) => {
    setUsers((u) => {
      const _u = [...u];
      _u[rowIndex] = { ..._u[rowIndex], ...data };
      return _u;
    });
  };

  return (
    <Inner>
      <div className="md:w-4/5 lg:w-3/5 xl:w-2/5 mx-auto mt-10">
        <DataTable
          data={users}
          columns={userColumns}
          options={{
            searchCol: "name",
            pagination: true,
          }}
          tableAcitons={{
            deleteRow,
            editRow,
          }}
        />
      </div>
    </Inner>
  );
}
