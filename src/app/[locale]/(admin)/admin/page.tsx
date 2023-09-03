import { prisma } from "@/lib/prisma";
import { DataTable } from "./data-table";

async function getData() {
  return await prisma.user.findMany({});
}

export default async function Admin() {
  const data = await getData();
  return (
    <div>
      <div className="p-5">
        <DataTable data={data} />
      </div>
    </div>
  );
}
