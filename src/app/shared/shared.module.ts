import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


//Components
import { HeaderComponent } from './header/header.component';
import { PokemonSearchComponent } from './pokemon-search/pokemon-search.component';
import { PokemonListComponent } from '../pokemon-list/pokemon-list.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoadingComponent } from './loading/loading/loading.component';

@NgModule({
  declarations: [
    HeaderComponent,
    PokemonSearchComponent,
    PokemonListComponent,
    LoadingComponent
  ],
  exports: [
    HeaderComponent,
    PokemonSearchComponent,
    PokemonListComponent,
    MatFormFieldModule, MatInputModule, MatIconModule
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule { }