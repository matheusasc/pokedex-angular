import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { Pokemon } from '../model/pokemon.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

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

}
