import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Pokemon } from 'src/app/model/pokemon.model';

@Component({
  selector: 'app-pokemon-search',
  templateUrl: './pokemon-search.component.html',
  styleUrls: ['./pokemon-search.component.scss']
})
export class PokemonSearchComponent implements OnInit {
 
  @Output() public emmitSearch: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  public search(value: string){
    this.emmitSearch.emit(value);
  }

  // search(searchTerm: string) {
  //   searchTerm = searchTerm.toLowerCase(); // Converta o termo de pesquisa para minúsculas

  //   if (searchTerm === '') {
  //     this.filteredPokemons$.next(this.pokemonss$.value);
  //   } else {
  //     const filteredPokemons = this.pokemonss$.value.filter(pokemon => {
  //       return pokemon.name.toLowerCase().includes(searchTerm);
  //     });
  //     this.filteredPokemons$.next(filteredPokemons);
  //   }
  // }


}