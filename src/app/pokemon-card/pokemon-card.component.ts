import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { Pokemon } from '../model/pokemon.model';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent {

  @Input() numero: number = 0;
  tipo: string = "";
  @Input() nomePokemon: string = "";

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.carregarTipoDoPokemon();
  }

  pegarImagemPokemon() {
    const numeroFormatado = this.leadingZero(this.numero);

    return `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${numeroFormatado}.png`;
  }

  leadingZero(str: string | number, size = 3): string {
    let s = String(str);

    while (s.length < (size || 2)) {
      s = '0' + s;
    }

    return s;
  }

  carregarTipoDoPokemon() {
    const pokemonInfo: Pokemon | undefined = this.pokemonService.getPokemonByName(this.nomePokemon);

    if (pokemonInfo) {
      this.nomePokemon = pokemonInfo.name;
      this.tipo = pokemonInfo.type;
    }
  }

}
