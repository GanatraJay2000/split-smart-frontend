import { orders } from "@/lib/data/orders";
import { orderColumns } from "@/components/DataTable/Columns/OrdersTable";
import { DataTable } from "@/components/DataTable/data-table";
import Inner from "@/components/Inner";

export default function Dashboard() {
  return (
    <Inner>
      <div className="md:w-4/5 lg:w-3/5 xl:w-2/5 mx-auto mt-10">
        <DataTable
          data={orders}
          columns={orderColumns}
          options={{
            searchCol: "name",
            pagination: true,
          }}
          tableAcitons={{}}
        />
      </div>
    </Inner>
  );
}
