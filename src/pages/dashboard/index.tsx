import { UserNav } from "@/components/user-nav";
// import { users, groups } from "@/lib/data/users";
import { orders } from "@/lib/data/orders";
import { DataTable } from "@/components/DataTable/data-table";
// import { columns as userTable } from "@/components/DataTable/Columns/UsersTable";
// import { columns as groupTable } from "@/components/DataTable/Columns/GroupsTable";
import { columns as orderTable } from "@/components/DataTable/Columns/OrdersTable";

export default function Dashboard() {
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
      <div className="w-max">
        <DataTable
          data={orders[0].items}
          columns={orderTable}
          options={{
            searchCol: "date",
            pagination: true,
          }}
        />
      </div>
    </div>
  );
}

{
  /* <div className="w-2/5 mx-auto">
        <DataTable
          data={groups}
          columns={groupTable}
          options={{
            searchCol: "name",
            pagination: true,
          }}
        />
      </div>
      <div className="w-1/3 mx-auto">
        <DataTable
          data={users}
          columns={userTable}
          options={{
            searchCol: "name",
            pagination: true,
          }}
        />
      </div> */
}
