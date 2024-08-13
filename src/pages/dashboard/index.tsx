import { UserNav } from "@/components/user-nav";
import { DataTable } from "@/components/DataTable/data-table";
import { columns as specificOrderTable } from "@/components/DataTable/Columns/SpecificOrderTable";
import { orders as ordersData } from "@/lib/data/orders";
import { useEffect, useMemo, useState } from "react";
import { users } from "@/lib/data/users";

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

export default function Dashboard() {
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
        item.users.forEach((user) => {
          const sharedUser = sharedUsers.find((u) => u.user === user);
          if (sharedUser) {
            sharedUser.value += item.cost / item.users.length;
          } else {
            sharedUsers.push({ user, value: item.cost / item.users.length });
          }
        });
      });
      setShared(sharedUsers);
    }
  }, [order]);

  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 flex">
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
        <div className="w-max">
          <DataTable
            data={order}
            updateUsers={(rowIndex: number, users: number[]) => {
              setOrder((prev) => {
                const newOrder = [...prev];
                newOrder[rowIndex].users = users;
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
            {/* <h3 className="text-lg font-semibold">Order Summary</h3>
            <div className="flex items-center justify-between space-x-2 mt-4">
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">
                  Total Items
                </span>
                <span className="text-lg font-semibold">{order.length}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">
                  Total Cost
                </span>
                <span className="text-lg font-semibold">${total_cost}</span>
              </div>
            </div> */}
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
