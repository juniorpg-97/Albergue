import type { Mascota } from "../types/mascota";

interface CardMascotaProps {
  mascota: Mascota;
  razas: string[];
  onCambiarRaza: (id: number, raza: string) => void;
  onEditar: (mascota: Mascota) => void;
  onEliminar: (id: number) => void;
}

export function CardMascota({
  mascota,
  razas,
  onCambiarRaza,
  onEditar,
  onEliminar,
}: CardMascotaProps) {
  const {
    id,
    nombre,
    raza,
    peso,
    sexo,
    caracteristicas,
    esterilizado,
    imagen,
  } = mascota;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#DCE5DC] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-56 overflow-hidden bg-[#EDF3ED]">
        <img
          src={imagen}
          alt={`Foto de ${nombre}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <span
          className={`absolute right-3 top-3 rounded-full px-3 py-1.5 text-xs font-bold ${
            sexo === "Macho"
              ? "bg-blue-50 text-blue-700"
              : "bg-pink-50 text-pink-700"
          }`}
        >
          {sexo === "Macho" ? "♂" : "♀"} {sexo}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h2 className="text-xl font-bold text-[#185C46]">{nombre}</h2>

        <p className="mt-1 text-sm font-semibold text-[#718078]">{raza}</p>

        <p className="mt-2 text-sm text-[#526158]">{peso} kg</p>

        <p className="my-3 text-sm leading-relaxed text-[#526158]">
          {caracteristicas}
        </p>

        <span
          className={`mb-4 inline-flex w-fit rounded-full px-3 py-2 text-xs font-bold ${
            esterilizado
              ? "bg-[#DCEFE2] text-[#24613D]"
              : "bg-[#FFF0D6] text-[#9A4D00]"
          }`}
        >
          {esterilizado ? "✓ Esterilizado/a" : "Pendiente de esterilización"}
        </span>

        <div className="mt-auto border-t border-[#E8EEE8] pt-4">
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Cambiar raza
          </label>

          <select
            value={raza}
            onChange={(event) => onCambiarRaza(id, event.target.value)}
            className="mb-4 w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 focus:border-[#397653] focus:outline-none"
          >
            {razas.map((opcion) => (
              <option key={opcion} value={opcion}>
                {opcion}
              </option>
            ))}
          </select>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => onEditar(mascota)}
              className="flex-1 rounded-lg bg-[#397653] px-3 py-2 font-semibold text-white transition hover:bg-[#2D6043]"
            >
              Editar
            </button>

            <button
              type="button"
              onClick={() => onEliminar(id)}
              className="flex-1 rounded-lg border border-red-200 px-3 py-2 font-semibold text-red-600 transition hover:bg-red-50"
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
