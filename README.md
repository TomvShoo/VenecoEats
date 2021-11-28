# Create project

```sh
ionic start
ionic serve
```

# Install

```sh
npm install @angular/google-maps
```

# Load Sdk

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Map</title>
    <base href="/" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/x-icon" href="favicon.ico" />
    <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY"></script> // 👈
  </head>
  <body>
    <app-root></app-root>
  </body>
</html>
```

# Create map compontent/module

```sh
ionic g page map
```

// src/app/map/map.module.ts
```ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';  // 👈

import { IonicModule } from '@ionic/angular';

import { MapPageRoutingModule } from './map-routing.module';

import { MapPage } from './map.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapPageRoutingModule,
    GoogleMapsModule, // 👈
  ],
  declarations: [MapPage]
})
export class MapPageModule {}
```
# Render Map

// src/app/home/home.page.html
```html

<ion-content>
  <ion-button routerLink="/map">Go to Map</ion-button>
</ion-content>
```

// src/app/map/map.page.html
```html
<ion-header>
  <ion-toolbar>
    <ion-title>map</ion-title>
    <ion-buttons slot="start">
      <ion-back-button></ion-back-button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>

<ion-content>
  <google-map
    height="100%"
    width="100%"
  ></google-map>
</ion-content>
```

# Get Current postion

```sh
npm install @capacitor/geolocation
```

```ts
import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  center: google.maps.LatLngLiteral;

  constructor() { }

  ngOnInit() {
    this.getPosition();
  }

  async getPosition() {
    const coordinates = await Geolocation.getCurrentPosition();
    this.center = {
      lat: coordinates.coords.latitude,
      lng: coordinates.coords.longitude
    }
  }

}

```

```html
<ion-content>
  <google-map
    height="100%"
    width="100%"
    [center]="center"
  ></google-map>
</ion-content>
```

# Markers

// src/app/map/map.page.ts
```ts
interface MyPoint {
  position: {
    lat: number;
    lng: number;
  };
  title: string;
  image: string;
  text: string;
}
points: MyPoint[] = [
    {
      position: {
        lat: -17.386378,
        lng: -66.1628018,
      },
      title: 'Parque De la Familia',
      image:
        'https://lh5.googleusercontent.com/p/AF1QipOCgzq_0DYB9AxD-ItTG01x2csLsSfWsawBCypc=w408-h306-k-no',
      text: 'Animi voluptatem, aliquid impedit ratione placeat necessitatibus quisquam molestiae obcaecati laudantium?',
    },
    {
      position: {
        lat: -17.4005556,
        lng: -66.1741667,
      },

      title: 'Mariscal Santa Cruz',
      image:
        'https://lh5.googleusercontent.com/p/AF1QipMGZeu88O8uZvFOX9PKug7gz-VRhhiXQ78hAFZU=w408-h306-k-no',
      text: 'Animi voluptatem, aliquid impedit ratione placeat necessitatibus quisquam molestiae obcaecati laudantium?',
    },
    {
      position: {
        lat: -17.3810618,
        lng: -66.1550974,
      },
      title: 'Parque de Educación Vial',
      image:
        'https://lh5.googleusercontent.com/p/AF1QipPIXxrXfshAD6eHbkGScPdNqYBwfJ6ol4qriq2n=w408-h306-k-no',
      text: 'Animi voluptatem, aliquid impedit ratione placeat necessitatibus quisquam molestiae obcaecati laudantium?',
    },
    {
      position: {
        lat: -17.4128145,
        lng: -66.158299,
      },
      title: 'Parque Kanata',
      image:
        'https://lh5.googleusercontent.com/p/AF1QipOJOq3vm1Gfpa3d4dPR_ca2C240J_PBv701zRAE=w408-h544-k-no',
      text: 'Animi voluptatem, aliquid impedit ratione placeat necessitatibus quisquam molestiae obcaecati laudantium?',
    },
  ];
```
// src/app/map/map.page.html
```html
<google-map>
  <map-marker
    *ngFor="let point of points"
    [position]="point.position"
    [title]="point.title"
  >
  </map-marker>
</google-map>
```

# Slides
// src/app/map/map.page.ts
```ts
import { GoogleMap } from '@angular/google-maps';
import { IonSlides } from '@ionic/angular';

@ViewChild(GoogleMap, { static: false }) map: GoogleMap;
@ViewChild(IonSlides, { static: false }) slides: IonSlides;

async onSlideDidChange() {
  const currentSlide = await this.slides.getActiveIndex();
  const point = this.points[currentSlide];
  this.map.panTo(point.position);
}
```

```html
<ion-slides (ionSlideDidChange)="onSlideDidChange()">
  <ion-slide *ngFor="let point of points">
    <ion-card>
      <ion-item>
        <ion-thumbnail slot="start">
          <img [src]="point.image">
        </ion-thumbnail>
        <ion-label class="ion-text-wrap">
          <h2>{{ point.title }}</h2>
          <p>{{ point.text }}</p>
        </ion-label>
      </ion-item>
    </ion-card>
  </ion-slide>
</ion-slides>
```

```css
ion-slides {
  height: 200px;
  position: absolute;
  bottom: 0px;
  width: 100%;
}
```

