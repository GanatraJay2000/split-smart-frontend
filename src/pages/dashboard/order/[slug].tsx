import { UserNav } from "@/components/user-nav";
import { DataTable } from "@/components/DataTable/data-table";
import { columns as specificOrderTable } from "@/components/DataTable/Columns/SpecificOrderTable";
import { orders as ordersData } from "@/lib/data/orders";
import { useEffect, useMemo, useState } from "react";
import { groups, users } from "@/lib/data/users";

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

export default function Order() {
  const [order, setOrder] = useState(ordersData[0].items);
  const [shared, setShared] = useState<
    undefined | Array<{ user: number; value: number }>
  >(undefined);

  const total_cost = useMemo(() => {
    return (
      Math.round(order.reduce((acc, item) => acc + item.cost, 0) * 1000) / 1000
    );
  }, []);

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

  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 flex md:w-11/12 mx-auto">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of your recent payments!
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <UserNav />
        </div>
      </div>
      <div className="flex gap-10">
        <div className="md:w-max">
          <DataTable
            data={order}
            updateUsers={(rowIndex: number, users: number[]) => {
              const gs = groups
                .filter((g) => g.users.every((u) => users.includes(u)))
                .map((g) => g.id);
              setOrder((prev) => {
                const newOrder = [...prev];
                newOrder[rowIndex].users = users;
                newOrder[rowIndex].groups = gs;
                return newOrder;
              });
            }}
            updateGroups={(rowIndex: number, _groups: number[]) => {
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
            }}
            updateExtras={(rowIndex: number, extras: number[]) => {
              console.log(extras);
              setOrder((prev) => {
                const newOrder = [...prev];
                newOrder[rowIndex].extras = extras;
                return newOrder;
              });
            }}
            columns={specificOrderTable}
            options={{
              searchCol: "name",
              pagination: true,
            }}
          />
        </div>
        <div className="mt-10">
          <div className="bg-white rounded-lg border p-4 s">
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
    </div>
  );
}
