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

export function AttendeeList() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-5 items-center">
        <h1 className="text-2xl font-bold">Participantes</h1>
        <div className="flex items-center py-1.5 px-3 outline-none w-72 border border-white/10 rounded-lg text-sm gap-3">
          <Search className="h-4 text-emerald-300" />
          <input
            className="bg-transparent flex-1 outline-none p-0 text-sm border-none"
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
                className="size-4 bg-black/20 rounded border  border-white/10"
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
          {Array.from({ length: 6 }).map((_, i) => {
            return (
              <TableRow
                key={i}
                className="border-b border-white/10 hover:bg-white/5"
              >
                <td className="px-3 py-4 text-sm font-semibold text-left">
                  <input
                    type="checkbox"
                    className="size-4 bg-black/20 rounded border border-white/10 "
                  />
                </td>
                <TableCell>12334</TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-white">
                      Arthur Willame
                    </span>
                    <span className="text-sm text-zinc-400">
                      arthurwillame@gmail.com
                    </span>
                  </div>
                </TableCell>
                <TableCell>7 dias atrás</TableCell>
                <TableCell>3 dias atrás</TableCell>
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
              Mostrando 10 de 228 itens
            </TableCell>
            <TableCell className=" text-right" colSpan={3}>
              <div className="inline-flex gap-8 items-center">
                <span>Página 1 de 23</span>
                <div className="flex gap-1.5">
                  <IconButton>
                    <ChevronsLeft className="size-4" />
                  </IconButton>
                  <IconButton>
                    <ChevronLeft className="size-4" />
                  </IconButton>
                  <IconButton>
                    <ChevronRight className="size-4" />
                  </IconButton>
                  <IconButton>
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
