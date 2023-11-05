import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { Pokemon } from '../model/pokemon.model';
import { BehaviorSubject } from 'rxjs';
import { map, tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private urlPokemon: string = 'https://pokeapi.co/api/v2/pokemon';

  private pokemons = new BehaviorSubject<Pokemon[]>([]);  

  constructor(private httpClient: HttpClient) {
    this.carregarPokemons();
  }

  carregarPokemons() {
    const pokemonRequests: Observable<any>[] = [];

    for (let i = 1; i <= 151; i++) {
      const pokemonRequest = this.httpClient.get(`https://pokeapi.co/api/v2/pokemon/${i}`);
      pokemonRequests.push(pokemonRequest);
    }

    forkJoin(pokemonRequests).subscribe((responses: any[]) => {
      const updatedPokemons = responses.map((data: any) => {
        return {
          name: data.name,
          type: data.types[0].type.name // Obtém o primeiro tipo do Pokémon
        };
      });
    
      this.pokemons.next(updatedPokemons);
      console.log('Pokemons carregados:', updatedPokemons);
    });
  }

  getPokemons(): Observable<Pokemon[]> {
    return this.pokemons.asObservable();
  }

  getPokemonByName(name: string): Pokemon | undefined {
    return this.pokemons.getValue().find((pokemon) => pokemon.name === name);
  }

  getPokemonById(id: number): Observable<any> {
    const url = `${this.urlPokemon}/${id}`;
    return this.httpClient.get(url);
  }

  search(searchTerm: string): Observable<Pokemon[]> {
    searchTerm = searchTerm.toLowerCase();

    if (searchTerm === '') {
      return this.pokemons.asObservable();
    } else {
      return this.pokemons.pipe(
        map((pokemons) =>
          pokemons.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(searchTerm)
          )
        )
      );
    }
  }

  get apiListAllPokemons():Observable<any>{
    return this.httpClient.get<any>(this.urlPokemon).pipe(
      tap( res => res ),
      tap( res => {
        res.results.map( (resPokemons: any) => {

          this.apiGetPokemon(resPokemons.url).subscribe(
            res => resPokemons.status = res
          );

        })
      })
    )
  }

  public apiGetPokemon( url: string ):Observable<any>{
    return this.httpClient.get<any>( url ).pipe(
      map(
        res => res
      )
    )
  }
}
