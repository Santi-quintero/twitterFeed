
//   export class Character {
//      info!:    Info;
//      results!: Result[];
// }

// export interface Info {
//       count: number;
//       pages: number;
//      next:  string;
//       prev:  null;
//  }

export interface Character {
    id:       number;
    name:     string;
    status:   string;
    species:  string;
    type:     string;
    gender:   string;
    origin:   string;
    location: string;
    image:    string;
    episode:  string[];
    url:      string;
    created:  string;
}
// export enum Gender {
//     Female = "Female",
//     Male = "Male",
//     Unknown = "unknown",
// }

// export class Location {
//     name!: string;
//     url!:  string;
// }

// export enum Species {
//     Alien = "Alien",
//     Human = "Human",
// }

// export enum Status {
//     Alive = "Alive",
//     Dead = "Dead",
//     Unknown = "unknown",
// }