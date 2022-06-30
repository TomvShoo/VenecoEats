import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';
import { GoogleMap } from '@angular/google-maps';

interface MyPoint {
  position: {
    lat: number;
    lng: number;
  };
  title: string;
  image: string;
  text: string;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;
  @ViewChild(IonSlides, { static: false }) slides: IonSlides;

  center: google.maps.LatLngLiteral;
  points: MyPoint[] = [
    {
      position: {
        lat: -33.440172,
        lng: -70.6564448,
      },
      title: 'Ver pedido',
      image: 'https://cdn-icons-png.flaticon.com/512/4645/4645316.png',
      text: 'Deslize para ver retiro del pedido y lugar de despacho',
    },
    {
      position: {
        lat: -33.593272348076816,
        lng: -70.7058866272739,
      },
      title: 'McDonalds San Bernardo',
      image: 'https://cdn-icons-png.flaticon.com/512/857/857681.png',
      text: 'Descripcion de la direccion, osea calle y esas weas',
    },
    {
      position: {
        lat: -33.60625792844903,
        lng: -70.68601806268747,
      },

      title: 'Destino pedido',
      image:
        'https://www.pngall.com/wp-content/uploads/12/Delivery-PNG-Free-Image.png',
      text: 'Descripcion de la direccion, osea calle y esas weas',
    },
  ];

  constructor() {}

  ngOnInit() {
    this.getPosition();
  }

  async getPosition() {
    const coordinates = await Geolocation.getCurrentPosition();
    this.center = {
      lat: coordinates.coords.latitude,
      lng: coordinates.coords.longitude,
    };
  }

  async onSlideDidChange() {
    const currentSlide = await this.slides.getActiveIndex();
    const point = this.points[currentSlide];
    this.map.panTo(point.position);
  }
}
