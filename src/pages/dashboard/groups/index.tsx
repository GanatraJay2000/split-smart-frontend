import { useEffect, useState } from "react";

import { groups as groupsData } from "@/lib/data/groups";
import { users } from "@/lib/data/users";

import { groupColumns } from "@/components/DataTable/Columns/GroupsTable";
import { DataTable } from "@/components/DataTable/data-table";
import { Group, GroupWithUsers } from "@/lib/types/dataTable/schema";
import { Row } from "@tanstack/react-table";
import GroupsModal from "@/components/DataTable/Modals/GroupsModal";
import Inner from "@/components/Inner";

export default function Groups() {
  const [groups, setGroups] = useState<GroupWithUsers[]>([]);

  useEffect(() => {
    const _groups = groupsData.map((group) => {
      const _users = group.users.map((userId) =>
        users.find((user) => user.id === userId)
      );

      return { ...group, users: _users };
    });
    setGroups(_groups);
  }, []);

  const deleteRow = (rowIndex: number) => {
    setGroups((g) => {
      const _g = [...g];
      _g.splice(rowIndex, 1);
      return _g;
    });
  };

  const editRow = (rowIndex: number, data: Partial<GroupWithUsers>) => {
    setGroups((g) => {
      const _g = [...g];
      _g[rowIndex] = { ..._g[rowIndex], ...data };
      return _g;
    });
  };

  return (
    <Inner>
      <div className="lg:w-4/5 xl:w-3/5 mx-auto mt-10">
        <DataTable
          data={groups}
          columns={groupColumns}
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
