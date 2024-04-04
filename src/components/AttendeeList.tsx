import {
  Search,
  MoreHorizontal,
  ChevronLeft,
  ChevronsLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";
import { IconButton } from "./IconButton";
import { Table } from "./table/Table";
import { TableHeader } from "./table/TableHeader";
import { TableCell } from "./table/TableCell";
import { TableRow } from "./table/TableRow";
import { ChangeEvent, useState, useEffect } from "react";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
dayjs.locale("pt-br");

interface Attendee {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  checkedInAt: string | null;
}

export function AttendeeList() {
  const [search, setSearch] = useState(() => {
    const url = new URL(window.location.toString());

    if (url.searchParams.has("search")) {
      return url.searchParams.get("search") ?? "";
    }
    return "";

  });
  const [page, setPage] = useState(() => {
    const url = new URL(window.location.toString());

    if (url.searchParams.has("page")) {
      return Number(url.searchParams.get("page"));
    }
    return 1;
  });
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [total, setTotal] = useState(0);

  const TotalPages = Math.ceil(total / 10);

  useEffect(() => {
    const url = new URL(
      "http://localhost:3333/events/9e9bd979-9d10-4915-b339-3786b1634f33/attendees"
    );

    url.searchParams.set("pageIndex", String(page - 1));

    //para filtrar pelo nome do participante
    if (search.length > 0) {
      url.searchParams.set("query", search);
    }
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setAttendees(data.attendees);
        setTotal(data.total);
      });
  }, [page, search]);

  function setCurrentSearch(search: string) {
    const url = new URL(window.location.toString());

    url.searchParams.set("search", search);

    window.history.pushState({}, "", url);
    setSearch(search);
  }

  function setCurrentPage(page: number) {
    const url = new URL(window.location.toString());

    url.searchParams.set("page", String(page));

    window.history.pushState({}, "", url);
    setPage(page);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setCurrentSearch(event.target.value);
    setCurrentPage(1);
  }

  function goToNextPage() {
    setCurrentPage(page + 1);
  }
  function goToFirstPage() {
    setCurrentPage(1);
  }
  function goToLastPage() {
    setCurrentPage(TotalPages);
  }
  function goToPreviousPage() {
    setCurrentPage(page - 1);
  }
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-5 items-center">
        <h1 className="text-2xl font-bold">Participantes</h1>
        <div className="flex items-center py-1.5 px-3 outline-none w-72 border border-white/10 rounded-lg text-sm gap-3">
          <Search className="h-4 text-emerald-300" />
          <input
            onChange={handleInputChange}
            value={search}
            className="bg-transparent flex-1 outline-none p-0 text-sm border-none focus:ring-0"
            type="text"
            placeholder="Buscar participantes..."
          />
        </div>
      </div>
      <Table>
        <thead>
          <tr className="border-b border-white/10 ">
            <TableHeader style={{ width: 48 }}>
              <input
                type="checkbox"
                className="size-4 cursor-pointer bg-black/20 rounded border  border-white/10"
              />
            </TableHeader>
            <TableHeader>Código</TableHeader>
            <TableHeader>Participantes</TableHeader>
            <TableHeader>Data de inscrição</TableHeader>
            <TableHeader>Data do check-in</TableHeader>
            <th
              style={{ width: 64 }}
              className="px-3 py-4 text-sm font-semibold text-left"
            ></th>
          </tr>
        </thead>
        <tbody>
          {attendees.map((attendee) => {
            return (
              <TableRow
                key={attendee.id}
                className="border-b border-white/10 hover:bg-white/5"
              >
                <td className="px-3 py-4 text-sm font-semibold text-left">
                  <input
                    type="checkbox"
                    className="size-4 cursor-pointer bg-black/20 rounded border border-white/10 "
                  />
                </td>
                <TableCell>{attendee.id}</TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-white">
                      {attendee.name}
                    </span>
                    <span className="text-sm text-zinc-400">
                      {attendee.email}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{dayjs().to(attendee.createdAt)}</TableCell>
                <TableCell>
                  {attendee.checkedInAt === null ? (
                    <span className="text-zinc-400">Não fez check-in</span>
                  ) : (
                    dayjs().to(attendee.checkedInAt)
                  )}
                </TableCell>
                <TableCell>
                  <IconButton transparent>
                    <MoreHorizontal className="size-4" />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <TableCell className="px-3 py-4 text-sm text-zinc-300" colSpan={3}>
              Mostrando {attendees.length} de {total} itens
            </TableCell>
            <TableCell className=" text-right" colSpan={3}>
              <div className="inline-flex gap-8 items-center">
                <span>
                  Página {page} de {TotalPages}
                </span>
                <div className="flex gap-1.5">
                  <IconButton onClick={goToFirstPage} disabled={page === 1}>
                    <ChevronsLeft className="size-4" />
                  </IconButton>
                  <IconButton onClick={goToPreviousPage} disabled={page === 1}>
                    <ChevronLeft className="size-4" />
                  </IconButton>
                  <IconButton
                    onClick={goToNextPage}
                    disabled={page === TotalPages}
                  >
                    <ChevronRight className="size-4" />
                  </IconButton>
                  <IconButton
                    onClick={goToLastPage}
                    disabled={page === TotalPages}
                  >
                    <ChevronsRight className="size-4" />
                  </IconButton>
                </div>
              </div>
            </TableCell>
          </tr>
        </tfoot>
      </Table>
    </div>
  );
}
