import { Body, Controller, Post } from "@nestjs/common";
import { JoiPipe } from "nestjs-joi";
import { CreateMovieDto } from "../dto/create_movie.dto";
import { MovieService } from "./movie.service";

@Controller('movies')
export class MovieController {
    constructor(private readonly movieService: MovieService) {}

    @Post('create')
    async create(
        @Body(new JoiPipe({group: 'CREATE' })) createMovieDto: CreateMovieDto,
    ) {
        return this.movieService.createMovie(createMovieDto);
    }
}