import { Ciudad } from "./ciudad";

export class Pais {
    codigo: number;
    nombre: string;
    ciudades = new Array<Ciudad>();
}
