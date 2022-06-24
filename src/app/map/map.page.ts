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
        lat: null,
        lng: null,
      },
      title: 'Ver pedido',
      image:
        'https://lh5.googleusercontent.com/p/AF1QipOCgzq_0DYB9AxD-ItTG01x2csLsSfWsawBCypc=w408-h306-k-no',
      text: 'Animi voluptatem, aliquid impedit ratione placeat necessitatibus quisquam molestiae obcaecati laudantium?',
    },
    {
      position: {
        lat: -33.593272348076816,
        lng: -70.7058866272739,
      },
      title: 'McDonalds San Bernardo',
      image:
        'https://lh5.googleusercontent.com/p/AF1QipOCgzq_0DYB9AxD-ItTG01x2csLsSfWsawBCypc=w408-h306-k-no',
      text: 'Animi voluptatem, aliquid impedit ratione placeat necessitatibus quisquam molestiae obcaecati laudantium?',
    },
    {
      position: {
        lat: -33.60625792844903,
        lng: -70.68601806268747,
      },

      title: 'Destino pedido',
      image:
        'https://lh5.googleusercontent.com/p/AF1QipMGZeu88O8uZvFOX9PKug7gz-VRhhiXQ78hAFZU=w408-h306-k-no',
      text: 'Animi voluptatem, aliquid impedit ratione placeat necessitatibus quisquam molestiae obcaecati laudantium?',
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
