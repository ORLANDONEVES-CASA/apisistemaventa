import { DetalleVenta } from "./detalle-venta"

export interface Venta {
    VentaId:number,
    NumeroDocumento:string,
    TipoPago:string,
    Stock:number,
    Total:string,
    FechaRegistro:string,
    detalleventa:DetalleVenta[]
}
