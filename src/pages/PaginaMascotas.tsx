import { useState } from "react";
import type { FormEvent } from "react";
import { CardMascota } from "../componentes/CardMascota";
import type { Mascota, NuevaMascota } from "../types/mascota";

const mascotasIniciales: Mascota[] = [
  {
    id: 1,
    nombre: "Firulais",
    raza: "Labrador",
    peso: 25,
    sexo: "Macho",
    caracteristicas: "Amigable y juguetón",
    esterilizado: true,
    imagen: "https://images.dog.ceo/breeds/labrador/labrador_zack_01.jpg",
  },
  {
    id: 2,
    nombre: "Luna",
    raza: "Husky",
    peso: 30,
    sexo: "Hembra",
    caracteristicas: "Cariñosa y obediente",
    esterilizado: false,
    imagen: "https://images.dog.ceo/breeds/malamute/n02110063_14425.jpg",
  },
  {
    id: 3,
    nombre: "Max",
    raza: "Bulldog Francés",
    peso: 12,
    sexo: "Macho",
    caracteristicas: "Tranquilo y leal",
    esterilizado: true,
    imagen: "https://images.dog.ceo/breeds/bulldog-boston/n02096585_8323.jpg",
  },
  {
    id: 4,
    nombre: "Bella",
    raza: "Pastor Alemán",
    peso: 28,
    sexo: "Hembra",
    caracteristicas: "Inteligente y protectora",
    esterilizado: false,
    imagen: "https://images.dog.ceo/breeds/german-shepherd/n02106662_5169.jpg",
  },
  {
    id: 5,
    nombre: "Rocky",
    raza: "Beagle",
    peso: 15,
    sexo: "Macho",
    caracteristicas: "Curioso y activo",
    esterilizado: true,
    imagen: "https://images.dog.ceo/breeds/bluetick/n02088632_2364.jpg",
  },
  {
    id: 6,
    nombre: "Daisy",
    raza: "Golden Retriever",
    peso: 27,
    sexo: "Hembra",
    caracteristicas: "Dulce, paciente y disfruta jugar al aire libre.",
    esterilizado: true,
    imagen: "https://images.dog.ceo/breeds/retriever-golden/n02099601_3004.jpg",
  },
  {
    id: 7,
    nombre: "Toby",
    raza: "Poodle",
    peso: 8,
    sexo: "Macho",
    caracteristicas: "Inteligente, alegre y aprende rápidamente.",
    esterilizado: false,
    imagen: "https://images.dog.ceo/breeds/poodle-standard/n02113799_2280.jpg",
  },
  {
    id: 8,
    nombre: "Luna",
    raza: "Mestizo",
    peso: 9,
    sexo: "Hembra",
    caracteristicas: "Tierna, juguetona y busca una familia amorosa.",
    esterilizado: true,
    imagen:
      "https://somosmaka.com/cdn/shop/articles/perro_mestizo.jpg?v=1697855331",
  },
  {
    id: 9,
    nombre: "Coco",
    raza: "Cocker",
    peso: 12,
    sexo: "Macho",
    caracteristicas: "Alegre, cariñoso y disfruta de los paseos.",
    esterilizado: false,
    imagen:
      "https://cockerspanielcorralet.com/wp-content/uploads/2025/10/cocker-spaniel-cachorro-5-meses-cocker-spaniel-corralet-cesped-1024x687.png",
  },
  {
    id: 10,
    nombre: "Salchi",
    raza: "salchicha",
    peso: 7,
    sexo: "Hembra",
    caracteristicas: "Valiente, curiosa y de patas cortas.",
    esterilizado: true,
    imagen: "https://images.dog.ceo/breeds/dachshund/dachshund-6.jpg",
  },
  {
    id: 11,
    nombre: "Chispa",
    raza: "chihuahua",
    peso: 3,
    sexo: "Macho",
    caracteristicas: "Pequeño, vivaz y muy apegado a las personas.",
    esterilizado: false,
    imagen:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxDT6zbnoTdJFXMdTJOjZ2BCAL2rOq07zNfk7dDgBuzJQzI4TR3sEI2ULO&s=10",
  },
];

const formularioInicial: NuevaMascota = {
  nombre: "",
  raza: "",
  peso: 0,
  sexo: "Macho",
  caracteristicas: "",
  esterilizado: false,
  imagen: "",
};

const razasIniciales: string[] = [
  "Labrador",
  "Husky",
  "Bulldog Francés",
  "Pastor Alemán",
  "Beagle",
  "Golden Retriever",
  "Poodle",
  "Mestizo",
  "Cocker",
  "salchicha",
  "chihuahua",
];

export function PaginaMascotas() {
  // Estado de las mascotas
  const [mascotas, setMascotas] = useState<Mascota[]>(mascotasIniciales);

  // Estados de los filtros
  const [buscarNombre, setBuscarNombre] = useState("");
  const [razaFiltro, setRazaFiltro] = useState("");
  const [sexoFiltro, setSexoFiltro] = useState("");
  const [esterilizadoFiltro, setEsterilizadoFiltro] = useState("");
  const [pesoMinimo, setPesoMinimo] = useState("");
  const [pesoMaximo, setPesoMaximo] = useState("");

  // Estados del formulario
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [formulario, setFormulario] = useState<NuevaMascota>(formularioInicial);
  const [errores, setErrores] = useState<string[]>([]);
  const [mensaje, setMensaje] = useState("");
  const [editandoId, setEditandoId] = useState<number | null>(null);

  // Obtener las razas sin repetir
  const razasDisponibles = [
    ...new Set([...razasIniciales, ...mascotas.map((mascota) => mascota.raza)]),
  ];

  // EJERCICIO 1: FILTROS COMBINADOS
  const mascotasFiltradas = mascotas.filter((mascota) => {
    const coincideNombre = mascota.nombre
      .toLowerCase()
      .includes(buscarNombre.trim().toLowerCase());

    const coincideRaza = razaFiltro === "" || mascota.raza === razaFiltro;

    const coincideSexo = sexoFiltro === "" || mascota.sexo === sexoFiltro;

    const coincideEsterilizacion =
      esterilizadoFiltro === "" ||
      String(mascota.esterilizado) === esterilizadoFiltro;

    const coincidePesoMinimo =
      pesoMinimo === "" || mascota.peso >= Number(pesoMinimo);

    const coincidePesoMaximo =
      pesoMaximo === "" || mascota.peso <= Number(pesoMaximo);

    return (
      coincideNombre &&
      coincideRaza &&
      coincideSexo &&
      coincideEsterilizacion &&
      coincidePesoMinimo &&
      coincidePesoMaximo
    );
  });

  // Actualizar un campo del formulario usando spread
  function cambiarCampo<K extends keyof NuevaMascota>(
    campo: K,
    valor: NuevaMascota[K],
  ) {
    setFormulario((actual) => ({
      ...actual,
      [campo]: valor,
    }));
  }

  // Limpiar el formulario
  function limpiarFormulario() {
    setFormulario({ ...formularioInicial });
    setErrores([]);
    setEditandoId(null);
  }

  // EJERCICIO 2: REGISTRAR Y EDITAR MASCOTAS
  function guardarMascota(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nuevosErrores: string[] = [];

    if (!formulario.nombre.trim()) {
      nuevosErrores.push("El nombre es obligatorio.");
    }

    if (!formulario.raza.trim()) {
      nuevosErrores.push("Debes seleccionar una raza.");
    }

    if (!Number.isFinite(formulario.peso) || formulario.peso <= 0) {
      nuevosErrores.push("El peso debe ser mayor que cero.");
    }

    if (!formulario.caracteristicas.trim()) {
      nuevosErrores.push("Las características son obligatorias.");
    }

    if (!formulario.imagen.trim()) {
      nuevosErrores.push("La URL de la imagen es obligatoria.");
    } else {
      try {
        const url = new URL(formulario.imagen);

        if (url.protocol !== "https:" && url.protocol !== "http:") {
          nuevosErrores.push("La imagen debe tener una URL HTTP o HTTPS.");
        }
      } catch {
        nuevosErrores.push("Ingresa una URL de imagen válida.");
      }
    }

    if (nuevosErrores.length > 0) {
      setErrores(nuevosErrores);
      setMensaje("");
      return;
    }

    if (editandoId !== null) {
      // Editar: actualizar solo la mascota correspondiente
      setMascotas((actuales) =>
        actuales.map((mascota) =>
          mascota.id === editandoId
            ? {
                ...mascota,
                ...formulario,
                nombre: formulario.nombre.trim(),
                raza: formulario.raza.trim(),
                caracteristicas: formulario.caracteristicas.trim(),
                imagen: formulario.imagen.trim(),
              }
            : mascota,
        ),
      );

      setMensaje("Mascota actualizada correctamente.");
    } else {
      // Registrar: añadir una mascota con un ID nuevo
      const nuevaMascota: Mascota = {
        ...formulario,
        id: Math.max(0, ...mascotas.map((mascota) => mascota.id)) + 1,
        nombre: formulario.nombre.trim(),
        raza: formulario.raza.trim(),
        caracteristicas: formulario.caracteristicas.trim(),
        imagen: formulario.imagen.trim(),
      };

      setMascotas((actuales) => [...actuales, nuevaMascota]);

      setMensaje("Mascota registrada correctamente.");
    }

    // Limpiar después de guardar correctamente
    limpiarFormulario();
    setMostrarFormulario(false);
  }

  // EJERCICIO 3: CAMBIAR RAZA CON map() Y SPREAD
  function cambiarRaza(id: number, nuevaRaza: string) {
    setMascotas((actuales) =>
      actuales.map((mascota) =>
        mascota.id === id ? { ...mascota, raza: nuevaRaza } : mascota,
      ),
    );
  }

  // Cargar los datos en el formulario para editar
  function editarMascota(mascota: Mascota) {
    setFormulario({
      nombre: mascota.nombre,
      raza: mascota.raza,
      peso: mascota.peso,
      sexo: mascota.sexo,
      caracteristicas: mascota.caracteristicas,
      esterilizado: mascota.esterilizado,
      imagen: mascota.imagen,
    });

    setEditandoId(mascota.id);
    setErrores([]);
    setMensaje("");
    setMostrarFormulario(true);

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Eliminar con filter()
  function eliminarMascota(id: number) {
    const confirmar = window.confirm(
      "¿Estás seguro de que deseas eliminar esta mascota?",
    );

    if (!confirmar) return;

    setMascotas((actuales) => actuales.filter((mascota) => mascota.id !== id));

    if (editandoId === id) {
      limpiarFormulario();
      setMostrarFormulario(false);
    }

    setMensaje("Mascota eliminada correctamente.");
  }

  // Restablecer los filtros
  function limpiarFiltros() {
    setBuscarNombre("");
    setRazaFiltro("");
    setSexoFiltro("");
    setEsterilizadoFiltro("");
    setPesoMinimo("");
    setPesoMaximo("");
  }

  return (
    <main className="min-h-screen bg-[#F8FAF7] p-6 sm:p-8">
      <header className="mx-auto mb-8 max-w-5xl text-center">
        <h1 className="text-3xl font-bold text-[#397653] sm:text-4xl">
          🐾 Albergue de Mascotas 🐾
        </h1>

        <p className="mt-3 text-[#718078]">
          Cada mascota merece una familia llena de amor.
        </p>
      </header>

      {/* Botón para mostrar el formulario */}
      <div className="mx-auto mb-6 max-w-6xl text-center">
        <button
          type="button"
          onClick={() => {
            if (mostrarFormulario) {
              limpiarFormulario();
            }

            setMostrarFormulario((actual) => !actual);
            setMensaje("");
          }}
          className="rounded-xl bg-[#397653] px-5 py-3 font-semibold text-white transition hover:bg-[#2D6043]"
        >
          {mostrarFormulario
            ? "Cancelar registro"
            : "+ Registrar una nueva mascota"}
        </button>
      </div>

      {mensaje && (
        <p
          role="status"
          className="mx-auto mb-5 max-w-2xl rounded-lg bg-[#DCEFE2] p-3 text-center font-medium text-[#24613D]"
        >
          {mensaje}
        </p>
      )}

      {/* Formulario de registro y edición */}
      {mostrarFormulario && (
        <form
          onSubmit={guardarMascota}
          className="mx-auto mb-10 grid max-w-2xl grid-cols-1 gap-4 rounded-2xl border border-[#DCE5DC] bg-white p-6 shadow-sm sm:grid-cols-2"
        >
          <h2 className="text-xl font-bold text-[#397653] sm:col-span-2">
            {editandoId !== null ? "Editar mascota" : "Registrar mascota"}
          </h2>

          <div>
            <label className="mb-1 block text-sm font-semibold text-gray-700">
              Nombre
            </label>
            <input
              required
              maxLength={80}
              value={formulario.nombre}
              onChange={(event) => cambiarCampo("nombre", event.target.value)}
              placeholder="Nombre de la mascota"
              className="w-full rounded-lg border border-gray-300 p-3 text-gray-900"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-gray-700">
              Raza
            </label>
            <select
              required
              value={formulario.raza}
              onChange={(event) => cambiarCampo("raza", event.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900"
            >
              <option value="">Selecciona una raza</option>
              {razasDisponibles.map((raza) => (
                <option key={raza} value={raza}>
                  {raza}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-gray-700">
              Peso (kg)
            </label>
            <input
              required
              type="number"
              min="0.1"
              max="500"
              step="0.1"
              value={formulario.peso || ""}
              onChange={(event) =>
                cambiarCampo("peso", Number(event.target.value))
              }
              placeholder="Ej. 12.5"
              className="w-full rounded-lg border border-gray-300 p-3 text-gray-900"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-gray-700">
              Sexo
            </label>
            <select
              required
              value={formulario.sexo}
              onChange={(event) =>
                cambiarCampo("sexo", event.target.value as "Macho" | "Hembra")
              }
              className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900"
            >
              <option value="Macho">Macho</option>
              <option value="Hembra">Hembra</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-semibold text-gray-700">
              Características
            </label>
            <textarea
              required
              maxLength={300}
              value={formulario.caracteristicas}
              onChange={(event) =>
                cambiarCampo("caracteristicas", event.target.value)
              }
              placeholder="Describe el carácter de la mascota"
              className="min-h-24 w-full rounded-lg border border-gray-300 p-3 text-gray-900"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-semibold text-gray-700">
              URL de la imagen
            </label>
            <input
              required
              type="url"
              value={formulario.imagen}
              onChange={(event) => cambiarCampo("imagen", event.target.value)}
              placeholder="https://ejemplo.com/perrito.jpg"
              className="w-full rounded-lg border border-gray-300 p-3 text-gray-900"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-semibold text-gray-700">
              ¿Está esterilizado/a?
            </label>
            <select
              required
              value={String(formulario.esterilizado)}
              onChange={(event) =>
                cambiarCampo("esterilizado", event.target.value === "true")
              }
              className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900"
            >
              <option value="false">No, pendiente</option>
              <option value="true">Sí, esterilizado/a</option>
            </select>
          </div>

          {errores.length > 0 && (
            <ul
              role="alert"
              className="list-inside list-disc rounded-lg bg-red-50 p-3 text-sm text-red-700 sm:col-span-2"
            >
              {errores.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          )}

          <div className="flex gap-3 sm:col-span-2">
            <button
              type="submit"
              className="flex-1 rounded-xl bg-[#397653] px-5 py-3 font-semibold text-white hover:bg-[#2D6043]"
            >
              {editandoId !== null ? "Guardar cambios" : "Guardar mascota"}
            </button>

            <button
              type="button"
              onClick={() => {
                limpiarFormulario();
                setMostrarFormulario(false);
              }}
              className="rounded-xl border border-gray-300 px-4 py-3 font-semibold text-gray-700"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      {/* EJERCICIO 1: FILTROS COMBINADOS */}
      <section className="mx-auto mb-8 max-w-6xl rounded-2xl border border-[#DCE5DC] bg-white p-5 shadow-sm">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-[#397653]">
              Buscar mascotas
            </h2>
            <p className="mt-1 text-sm text-[#718078]">
              Combina los filtros para encontrar una mascota.
            </p>
          </div>

          <button
            type="button"
            onClick={limpiarFiltros}
            className="rounded-lg border border-[#DCE5DC] px-4 py-2 text-sm font-semibold text-[#397653] hover:bg-[#F0F6F0]"
          >
            Limpiar filtros
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <label className="mb-1 block text-sm font-semibold text-gray-700">
              Nombre
            </label>
            <input
              type="search"
              value={buscarNombre}
              onChange={(event) => setBuscarNombre(event.target.value)}
              placeholder="Buscar por nombre"
              className="w-full rounded-lg border border-gray-300 p-3 text-gray-900"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-gray-700">
              Raza
            </label>
            <select
              value={razaFiltro}
              onChange={(event) => setRazaFiltro(event.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900"
            >
              <option value="">Todas las razas</option>
              {razasDisponibles.map((raza) => (
                <option key={raza} value={raza}>
                  {raza}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-gray-700">
              Sexo
            </label>
            <select
              value={sexoFiltro}
              onChange={(event) => setSexoFiltro(event.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900"
            >
              <option value="">Todos</option>
              <option value="Macho">Macho</option>
              <option value="Hembra">Hembra</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-gray-700">
              Esterilización
            </label>
            <select
              value={esterilizadoFiltro}
              onChange={(event) => setEsterilizadoFiltro(event.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900"
            >
              <option value="">Todos los estados</option>
              <option value="true">Esterilizado/a</option>
              <option value="false">Pendiente</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-gray-700">
              Peso mínimo (kg)
            </label>
            <input
              type="number"
              min="0"
              step="0.1"
              value={pesoMinimo}
              onChange={(event) => setPesoMinimo(event.target.value)}
              placeholder="Ej. 10"
              className="w-full rounded-lg border border-gray-300 p-3 text-gray-900"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-gray-700">
              Peso máximo (kg)
            </label>
            <input
              type="number"
              min="0"
              step="0.1"
              value={pesoMaximo}
              onChange={(event) => setPesoMaximo(event.target.value)}
              placeholder="Ej. 30"
              className="w-full rounded-lg border border-gray-300 p-3 text-gray-900"
            />
          </div>
        </div>
      </section>

      {/* CATÁLOGO */}
      <section className="mx-auto max-w-6xl">
        <p className="mb-4 text-sm text-[#718078]">
          Mostrando{" "}
          <span className="font-bold text-[#397653]">
            {mascotasFiltradas.length}
          </span>{" "}
          de {mascotas.length} mascotas
        </p>

        {mascotasFiltradas.length > 0 ? (
          <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {mascotasFiltradas.map((mascota) => (
              <CardMascota
                key={mascota.id}
                mascota={mascota}
                razas={razasDisponibles}
                onCambiarRaza={cambiarRaza}
                onEditar={editarMascota}
                onEliminar={eliminarMascota}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-[#DCE5DC] bg-white p-10 text-center">
            <p className="text-4xl">🐶</p>
            <h3 className="mt-3 text-lg font-bold text-[#397653]">
              No encontramos mascotas
            </h3>
            <p className="mt-2 text-sm text-[#718078]">
              Prueba con otros filtros o límpialos para ver todas las mascotas.
            </p>
          </div>
        )}
      </section>

      <footer className="mx-auto mt-8 max-w-6xl border-t border-[#DCE5DC] pt-5 text-center">
        <p className="text-sm text-[#718078]">
          Total de mascotas registradas:{" "}
          <span className="font-bold text-[#397653]">{mascotas.length}</span>
        </p>
      </footer>
    </main>
  );
}
