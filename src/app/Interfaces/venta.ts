import { DetalleVenta } from "./detalle-venta"

export interface Venta {
    VentaID?:number,
    NumeroDocumento:string,
    TipoPago:string,
    Stock:number,
    Total:string,
    FechaRegistro:string,
    detalleventa:DetalleVenta[]
}
