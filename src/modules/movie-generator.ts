import dayjs from 'dayjs';
import { MovieGeneratorInterface } from './movie-generator/movie-generator.interface';
import { MockData } from '../types/mock-data.type';
import { generateRandomValue, getRandomItem, getRandomItems } from '../core/helpers/index.js';

export default class MovieGenerator implements MovieGeneratorInterface{

  constructor(private readonly mockData: MockData) {}

  public generate(): string {
    const name = getRandomItem<string>(this.mockData.names);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const genre = getRandomItem<string>(this.mockData.genres);
    const previewVideoLink = getRandomItem<string>(this.mockData.previewVideoLinks);
    const videoLink = getRandomItem<string>(this.mockData.videoLinks);
    const starring = getRandomItems<string>(this.mockData.actors).join(';');
    const director = getRandomItem<string>(this.mockData.directors);
    const firstName = getRandomItem<string>(this.mockData.firstNames);
    const lastName = getRandomItem<string>(this.mockData.lastNames);
    const email = getRandomItem<string>(this.mockData.emails);
    const posterImage = getRandomItem<string>(this.mockData.posterImages);
    const backgroundImage = getRandomItem<string>(this.mockData.backgroundImages);
    const premiereDate = dayjs().format('DD-MM-YYYY');
    const released = generateRandomValue(1900, 2023);
    const rating = generateRandomValue (1, 10, 1);
    const runTime = generateRandomValue(10, 240);
    const backgroundColor = generateRandomValue(0, 2000000).toString(16);

    return [name, description, premiereDate, genre, released, rating, previewVideoLink, videoLink, starring, director, runTime, posterImage, backgroundImage, backgroundColor, firstName, lastName, email].join('\t');
  }

}
