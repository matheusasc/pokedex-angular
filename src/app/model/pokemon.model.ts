export interface Pokemon {
    name: string;
    type: string;
  }


export interface PokemonStat {
    stat: {
      name: string;
    };
    base_stat: number;
  }