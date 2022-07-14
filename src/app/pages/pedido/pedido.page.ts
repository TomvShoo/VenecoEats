import { Component, OnInit } from '@angular/core';
import { IPedido } from '../../services/IPedido';
import { HttpClient } from '@angular/common/http';
import { PedidoService } from 'app/services/pedido.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.page.html',
  styleUrls: ['./pedido.page.scss'],
})
export class PedidoPage implements OnInit {
  public pedido: IPedido = {
    Estado: '',
    Fecha_p: '',
    Descripcion: '',
    Repartidor_idRepartidor: 0,
    Cliente_idCliente: 0,
    Metodo_Pago_idMetodo_Pago: 0,
  };

  public cards: Array<IPedido>;
  public listar: Array<IPedido>;

  private idRepartidorLocalStorage = JSON.parse(
    localStorage.getItem('currentUserId')
  );

  private date: string;

  constructor(private service: PedidoService, private http: HttpClient) {}

  ngOnInit() {
    this.service.getPedido(this.idRepartidorLocalStorage).then((res) => {
      this.pedido = res.order[0];
      this.date = res.order[0].Fecha_p.slice(0, 10);
      this.cards = res.order;
      this.listar = res.order;
      console.log(res.order);
    });
  }

  // public llamarComida() {
  //   let listaComidas = []
  //   if (this.productoSeleccionada) {
  //     listaComidas = this.comida.filter(x => x.Categoria == this.productoSeleccionada)
  //     this.mostrarComida = listaComidas
  //   }else if(!this.productoSeleccionada){
  //     this.mostrarComida = this.comida
  //   }
  // }

  public getCards() {
    let listaPedidos = [];
    listaPedidos = this.cards;
    this.listar = listaPedidos;
  }
}
