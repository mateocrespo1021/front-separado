import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-inactive-store',
  imports: [],
  templateUrl: './inactive-store.component.html',
  styleUrl: './inactive-store.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InactiveStoreComponent { }
