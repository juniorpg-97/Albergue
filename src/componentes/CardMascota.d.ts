interface Mascota {
    nombre: string;
    raza: string;
    peso: number;
    sexo: "Macho" | "Hembra";
    caracteristicas: string;
    esterilizado: boolean;
    imagen: string;
}
interface CardMascotaProps extends Mascota {
}
export declare function CardMascota({ nombre, raza, peso, sexo, caracteristicas, esterilizado, imagen, }: CardMascotaProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=CardMascota.d.ts.map