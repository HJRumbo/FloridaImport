import { Detalle } from "./detalle";

export class Pedido {

    codigoPedido: number;
    fechaPedido: string;
    horaPedido: string;
    totalPedido: number;
    idCliente: string;
    detalles = new Array<Detalle>();
    estado: string;
}
