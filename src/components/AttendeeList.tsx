import {
  Search,
  MoreHorizontal,
  ChevronLeft,
  ChevronsLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";
import { IconButton } from "./IconButton";

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
      <div className="border border-white/10 rounded-lg">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10 ">
              <th
                style={{ width: 48 }}
                className="px-3 py-4 text-sm font-semibold text-left"
              >
                <input
                  type="checkbox"
                  className="size-4 bg-black/20 rounded border  border-white/10 accent-orange-400"
                />
              </th>
              <th className="px-3 py-4 text-sm font-semibold text-left">
                Código
              </th>
              <th className="px-3 py-4 text-sm font-semibold text-left">
                Participantes
              </th>
              <th className="px-3 py-4 text-sm font-semibold text-left">
                Data de inscrição
              </th>
              <th className="px-3 py-4 text-sm font-semibold text-left">
                Data do check-in
              </th>
              <th
                style={{ width: 64 }}
                className="px-3 py-4 text-sm font-semibold text-left"
              ></th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 6 }).map((_, i) => {
              return (
                <tr
                  key={i}
                  className="border-b  border-white/10 hover:bg-white/5"
                >
                  <td className="px-3 py-4 text-sm font-semibold text-left">
                    <input
                      type="checkbox"
                      className="size-4 bg-black/20 rounded border border-white/10 "
                    />
                  </td>
                  <td className="px-3 py-4 text-sm text-zinc-300">12334</td>
                  <td>
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold text-white">
                        Arthur Willame
                      </span>
                      <span className="text-sm text-zinc-400">
                        arthurwillame@gmail.com
                      </span>
                    </div>
                  </td>
                  <td className="px-3 py-4 text-sm text-zinc-300 ">
                    7 dias atrás
                  </td>
                  <td className="px-3 py-4 text-sm text-zinc-300 ">
                    3 dias atrás
                  </td>
                  <td className="px-3 py-4 text-sm text-zinc-300 ">
                    <IconButton transparent>
                      <MoreHorizontal className="size-4" />
                    </IconButton>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td className="px-3 py-4 text-sm text-zinc-300" colSpan={3}>
                Mostrando 10 de 228 itens
              </td>
              <td
                className="px-3 py-4 text-sm text-zinc-300 text-right"
                colSpan={3}
              >
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
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
