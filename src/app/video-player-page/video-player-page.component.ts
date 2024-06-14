import { Component } from '@angular/core';
import { VgApiService } from '@videogular/ngx-videogular/core';
import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-video-player-page',
  standalone: true,
  imports: [
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    CommonModule,
  ],
  templateUrl: './video-player-page.component.html',
  styleUrl: './video-player-page.component.scss',
})
export class VideoPlayerPageComponent {
  preload: string = 'auto';
  api: VgApiService | undefined;

  constructor() {}

  onPlayerReady(api: VgApiService) {
    this.api = api;
  }
}
