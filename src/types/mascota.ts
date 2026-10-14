export interface Mascota {
  id: number;
  nombre: string;
  raza: string;
  peso: number;
  sexo: "Macho" | "Hembra";
  caracteristicas: string;
  esterilizado: boolean;
  imagen: string;
}

export type NuevaMascota = Omit<Mascota, "id">;
