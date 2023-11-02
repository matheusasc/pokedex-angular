import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {

  public isLoading: boolean = true;

  private urlPokemon: string = 'https://pokeapi.co/api/v2/pokemon';
  private urlName: string = 'https://pokeapi.co/api/v2/pokemon-species';

  public pokemon: any;
  public apiError: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private pokemonService: PokemonService,
  ) { }

  ngOnInit(): void {
    this.getPokemon();
  }
  public getPokemon(){
    const id = this.activatedRoute.snapshot.params['id'];
   
    this.pokemonService.getPokemonById(id).subscribe(
      (pokemonData) => {
        this.pokemon = pokemonData;
        this.isLoading = false;
      },
      (error) => {
        this.apiError = true;
        console.error('Erro ao buscar dados do Pokémon:', error);
        this.isLoading = false;
      }
    );
  }
}
