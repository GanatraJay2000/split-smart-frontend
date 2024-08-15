import { useEffect, useMemo, useState } from "react";

import { orders as ordersData } from "@/lib/data/orders";
import { users } from "@/lib/data/users";
import { groups } from "@/lib/data/groups";

import { columns as specificOrderTable } from "@/components/DataTable/Columns/SpecificOrderTable";
import { DataTable } from "@/components/DataTable/data-table";
import { UserNav } from "@/components/user-nav";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Row } from "@tanstack/react-table";
import { Order as OrderSchema } from "@/lib/types/dataTable/schema";
import Inner from "@/components/Inner";

export default function Order() {
  const [order, setOrder] = useState(ordersData[0].items);
  const [shared, setShared] = useState<
    undefined | Array<{ user: number; value: number }>
  >(undefined);

  const total_cost = useMemo(() => {
    return (
      Math.round(order.reduce((acc, item) => acc + item.cost, 0) * 1000) / 1000
    );
  }, [order]);

  const verify_cost = useMemo(() => {
    return shared?.reduce((acc, user) => acc + user.value, 0);
  }, [shared]);

  useEffect(() => {
    if (order) {
      const sharedUsers: Array<{ user: number; value: number }> = users.map(
        (user) => ({ user: user.id, value: 0 })
      );
      order.forEach((item) => {
        item.users.concat(item.extras).forEach((user) => {
          const sharedUser = sharedUsers.find((u) => u.user === user);
          if (sharedUser) {
            sharedUser.value +=
              item.cost / item.users.concat(item.extras).length;
          } else {
            sharedUsers.push({
              user,
              value: item.cost / item.users.concat(item.extras).length,
            });
          }
        });
      });
      setShared(sharedUsers);
    }
  }, [order]);

  const updateUsers = (rowIndex: number, users: number[]) => {
    const gs = groups
      .filter((g) => g.users.every((u) => users.includes(u)))
      .map((g) => g.id);
    setOrder((prev) => {
      const newOrder = [...prev];
      newOrder[rowIndex].users = users;
      newOrder[rowIndex].groups = gs;
      return newOrder;
    });
  };

  const updateGroups = (rowIndex: number, _groups: number[]) => {
    const set1 = new Set(
      groups
        .filter((g) => _groups.includes(g.id))
        .reduce((acc: number[], g) => [...acc, ...g.users], [])
    );
    setOrder((prev) => {
      const newOrder = [...prev];
      newOrder[rowIndex].users = Array.from(set1);
      newOrder[rowIndex].groups = _groups;
      return newOrder;
    });
  };

  const updateExtras = (rowIndex: number, extras: number[]) => {
    setOrder((prev) => {
      const newOrder = [...prev];
      newOrder[rowIndex].extras = extras;
      return newOrder;
    });
  };

  const deleteRow = (rowIndex: number) => {
    setOrder((prev) => {
      const newOrder = [...prev];
      newOrder.splice(rowIndex, 1);
      return newOrder;
    });
  };

  const editRow = (
    rowIndex: number,
    data: Partial<OrderSchema["items"][number]>
  ) => {
    setOrder((prev) => {
      const newOrder = [...prev];
      newOrder[rowIndex].name = data.name ?? newOrder[rowIndex].name;
      newOrder[rowIndex].cost = data.cost ?? newOrder[rowIndex].cost;
      return newOrder;
    });
  };

  const onPublish = () => {
    if (verify_cost?.toFixed(4) === total_cost?.toFixed(4)) {
      alert("Published");
    } else {
      alert("Verify cost is not equal to total cost");
    }
  };

  return (
    <Inner>
      <div className="flex gap-10">
        <div className="grow">
          <DataTable
            data={order}
            columns={specificOrderTable}
            options={{
              searchCol: "name",
              pagination: true,
            }}
            tableAcitons={{
              updateUsers,
              updateGroups,
              updateExtras,
              deleteRow,
              editRow,
            }}
          />
        </div>
        <div className="mt-10">
          <div className="bg-white rounded-lg border p-3 s">
            <Table className="w-max">
              <TableCaption>User based Cost.</TableCaption>
              <TableHeader>
                <TableRow className="bg-muted hover:bg-muted">
                  <TableCell>Order Cost</TableCell>
                  <TableCell className="text-right">${total_cost}</TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="">User</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {shared?.map((user, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium">
                      {users.find((u) => u.id === user.user)?.name}
                    </TableCell>
                    <TableCell className="text-right">
                      ${user.value.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow className="font-bold">
                  <TableCell>Verify</TableCell>
                  <TableCell className="text-right">
                    ${verify_cost?.toFixed(4)}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </div>
      </div>
      <Button
        variant="outline"
        onClick={onPublish}
        className="border-dashed border-2 w-max px-10 py-1 hover:border-solid"
      >
        Publish
      </Button>
    </Inner>
  );
}
