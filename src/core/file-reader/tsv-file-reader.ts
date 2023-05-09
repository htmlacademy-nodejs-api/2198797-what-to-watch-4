import { readFileSync } from 'node:fs';
import { FileReaderInterface } from './file-reader.interface.js';
import { Movie } from '../../types/movie.type.js';

export default class TSVFileReader implements FileReaderInterface {
  private rawData = '';

  constructor(public filename: string) { }

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf8' });
  }

  public toArray(): Movie[] {
    if (!this.rawData) {
      return [];
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim() !== '')
      .map((line) => line.split('\t'))
      .map(([name, description, premiereDate, genre, released, rating, previewVideoLink, videoLink, starring, director, runTime, posterImage, backgroundImage, backgroundColor, firstname, lastname, email]) => ({
        name,
        description,
        premiereDate: new Date(premiereDate),
        genre,
        released: Number.parseInt(released, 10),
        rating: Number.parseFloat(rating),
        previewVideoLink,
        videoLink,
        starring: starring.split(';')
          .map((artistName) => (artistName)),
        director,
        runTime: Number.parseInt(runTime, 10),
        user: {email, firstname, lastname},
        posterImage,
        backgroundImage,
        backgroundColor: Number.parseInt(backgroundColor, 16),
      }));
  }
}
