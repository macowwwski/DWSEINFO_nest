import { BaseEntity } from "src/common/entities/base.entity";
import { Entity } from "typeorm";
import { Column, ManyToMany } from "typeorm";
import { MovieEntity } from "./movie.entity";

@Entity()
export class GenreEntity extends BaseEntity {
    @Column()
    name: string;

    @Column()
    description: string;

    @ManyToMany(() =>  MovieEntity, (movie) => movie.genres)
    movies: MovieEntity[];

}