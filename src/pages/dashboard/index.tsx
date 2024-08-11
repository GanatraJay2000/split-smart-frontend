import { UserNav } from "@/components/user-nav";
import { tasks } from "@/lib/data/task";
import { DataTable } from "@/components/DataTable/data-table";
import { columns } from "@/components/DataTable/columns";

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
      <DataTable data={tasks} columns={columns} />
    </div>
  );
}
