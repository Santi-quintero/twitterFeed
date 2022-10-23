export interface Character {
    id:       number;
    name:     string;
    status:   string;
    species:  string;
    type:     string;
    gender:   string;
    origin:   Origin;
    location: Location;
    image:    string;
    episode:  Episode[];
    url:      string;
    created:  Date;
}

export interface Episode{
    id:       number;
    name:     string;
    air_date: string;
    episode: string;
    characters: Character[];
    url: string;
    created: Date;

}

export interface Origin{
    name: string,
    url: string
}

export interface detailOrigin{
    id: number,
    name: string,
    type: string,
    dimension: string,
    residents: string,
    url: string;
    created: Date;
}

export interface CharacterList{
    id: number;
    image: string;
    name: string;
    type: string;
    dimension: string;
}