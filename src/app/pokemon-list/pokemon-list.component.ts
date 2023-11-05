import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { Pokemon } from '../model/pokemon.model';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  pokemonss$: Observable<Pokemon[]> = of([]);
  filteredPokemons$ = new BehaviorSubject<Pokemon[]>([]);
  public isLoading: boolean = true;

  private setAllPokemons: any;
  public getAllPokemons: any;

  public apiError: boolean = false;

  constructor(
    public pokemonService: PokemonService,
    private router: Router) {}

  ngOnInit(): void {
    this.pokemonss$ = this.pokemonService.getPokemons();
    this.pokemonService.apiListAllPokemons.subscribe(
      res => {
        this.setAllPokemons = res.results;
        this.getAllPokemons = this.setAllPokemons;
      },
      error => {
        this.apiError = true;
      }
    );
  }

  acessarPokemon(pokemonId: number): void {
    this.router.navigate(['/pokemon', pokemonId]);
  }


  public getSearch(value: string){
    const filter = this.setAllPokemons.filter( (res: any ) => {
      return !res.name.indexOf(value.toLowerCase());
    });

    this.getAllPokemons = filter;
  }
}
