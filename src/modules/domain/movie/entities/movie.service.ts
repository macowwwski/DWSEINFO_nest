import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ArrayContains, Repository } from "typeorm";
import { CreateMovieDto } from "../dto/create_movie.dto";
import { ArtistEntity } from "./artist.entity";
import { GenreEntity } from "./genre.entity";
import { MovieEntity } from "./movie.entity";


@Injectable()
export class MovieService {
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>

    @InjectRepository(ArtistEntity)
    private readonly artistRepository: Repository<ArtistEntity>

    @InjectRepository(GenreEntity)
    private readonly genreRepository: Repository<GenreEntity>
    
    async createMovie(createMovieDto: CreateMovieDto){
        const director = await this.artistRepository.findOneBy({
            id: createMovieDto.directorId,
        });

        if (!director)
            throw new HttpException("Director not found.", HttpStatus.BAD_REQUEST);

        const cast = await this.artistRepository.findBy({
            id: ArrayContains(createMovieDto.castIds),
        });

        if (createMovieDto.castIds.length !== cast.length)
            throw new HttpException('Some actors were not found', HttpStatus.BAD_REQUEST);

        const genres = await this.genreRepository.findBy({
            id: ArrayContains(createMovieDto.castIds),
        });
        
        if (createMovieDto.genresIds.length !== genres.length)
            throw new HttpException('Some genres were not found', HttpStatus.BAD_REQUEST);
            const newEntity = this.movieRepository.create({
                ...createMovieDto,
                director,
                cast,
                genres,
              });
              return await this.movieRepository.save(newEntity);
            }
          }