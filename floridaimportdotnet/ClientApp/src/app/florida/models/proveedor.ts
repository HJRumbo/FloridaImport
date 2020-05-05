import { Persona } from "./persona";
import { Producto } from "./producto";

export class Proveedor extends Persona{

    descripcion: string;
    productos: Producto[];
    
}
