import ListFormFilter from "./components/form";
import { ProvinceCombobox } from "./components/form/province";

export default function ListPage() {
  return (
    <main className="container text-sky-950 pb-8">
      <section className="bg-sky-50/50 pt-6 p-8 rounded-3xl mb-8">
        <ListFormFilter />
      </section>
      <section className="flex flex-row h-96">
        <div className="grow border-2 border-r-0 p-8 rounded-tl-3xl rounded-bl-3xl ">
          Danh sách
        </div>
        <div className="grow border-2 p-8 rounded-tr-3xl rounded-br-3xl bg-sky-50">
          Map box
        </div>
      </section>
    </main>
  );
}
