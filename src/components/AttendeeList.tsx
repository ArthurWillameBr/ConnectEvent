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
import { ChangeEvent, useState } from "react";
import { Attendees } from "./data/Attendees";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
dayjs.locale("pt-br");
export function AttendeeList() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const TotalPages = Math.ceil(Attendees.length / 10);

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
  }

  function goToNextPage() {
    setPage(page + 1);
  }
  function goToFirstPage() {
    setPage(1);
  }
  function goToLastPage() {
    setPage(TotalPages);
  }
  function goToPreviousPage() {
    setPage(page - 1);
  }
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-5 items-center">
        <h1 className="text-2xl font-bold">Participantes</h1>
        <div className="flex items-center py-1.5 px-3 outline-none w-72 border border-white/10 rounded-lg text-sm gap-3">
          <Search className="h-4 text-emerald-300" />
          <input
            onChange={handleInputChange}
            className="bg-transparent flex-1 outline-none p-0 text-sm border-none"
            type="text"
            placeholder="Buscar participantes..."
          />
        </div>
        {search}
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
          {Attendees.slice((page - 1) * 10, page * 10).map((attendee) => {
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
                <TableCell>{dayjs().to(attendee.checkedInAt)}</TableCell>
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
              Mostrando 10 de {Attendees.length} itens
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
