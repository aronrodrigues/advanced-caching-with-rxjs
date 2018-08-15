import { Joke } from "./joke.model";

export interface JokeResponse {
  type: string;
  value: Array<Joke>;
}
