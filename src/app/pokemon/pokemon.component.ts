import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { PokemonService } from '../services/pokemon.service';
import { trigger, state, style, animate, transition } from '@angular/animations'; // Importe a animação
import { Pokemon, PokemonStat } from '../model/pokemon.model';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {

  public isLoading: boolean = true; 
  public pokemon: any;
  public apiError: boolean = false;
  public animationState: string = 'initial';

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.getPokemonDetails(id);
    });
  }

  getPokemonDetails(id: number) {
    this.pokemonService.getPokemonById(id).subscribe(
      (pokemonData) => {
        this.pokemon = pokemonData;
      },
      (error) => {
        console.error('Erro ao buscar dados do Pokémon:', error);
      }
    );
  }

  getPokemonStat(statName: string): number {
    const stat = this.pokemon.stats.find((stat: PokemonStat) => stat.stat.name === statName);
    return stat ? stat.base_stat : 0;
  }

  public getStatValue(statName: string): number | undefined {
    if (this.pokemon) {
      const stat = this.pokemon.stats.find((s: PokemonStat) => s.stat.name === statName);
      return stat ? stat.base_stat : undefined;
    }
    return undefined;
  }
}
