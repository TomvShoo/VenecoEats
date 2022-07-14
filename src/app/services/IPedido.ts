export interface IPedido {
  idPedido?: number;
  Estado: string;
  Fecha_p: string;
  Descripcion: string;
  Repartidor_idRepartidor: number;
  Cliente_idCliente: number;
  Metodo_Pago_idMetodo_Pago: number;
}
