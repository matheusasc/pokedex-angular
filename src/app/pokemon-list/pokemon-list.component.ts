import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { Pokemon } from '../model/pokemon.model';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  @Output() public emmitSearch: EventEmitter<string> = new EventEmitter();
  pokemons$: Observable<Pokemon[]> = of([]);

  constructor(public pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.pokemons$ = this.pokemonService.getPokemons();
  }


  public search(value: string){
    this.emmitSearch.emit(value);
  }

}
