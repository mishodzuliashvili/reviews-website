import { DataTable } from "./data-table";

async function getData() {
  const res = await import("../../api/users/route");

  const { users } = await (await res.GET()).json();
  return users;
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
