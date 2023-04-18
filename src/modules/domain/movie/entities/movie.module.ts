import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ArtistEntity } from "./artist.entity";
import { GenreEntity } from "./genre.entity";
import { MovieController } from "./movie.controller";
import { MovieEntity } from "./movie.entity";
import { MovieService } from "./movie.service";


@Module({
    imports: [
        TypeOrmModule.forFeature([MovieEntity, ArtistEntity, GenreEntity])],
    providers: [MovieService],
    controllers: [MovieController],
    exports: [TypeOrmModule],
})
export class MovieModule{}