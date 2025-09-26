import { UpdateCategoryDto } from './dto/update-category.dto';
import { Categories } from './entities/category.entity';
import { Repository } from 'typeorm';
export declare class CategoriesService {
    private readonly categoriesRepository;
    constructor(categoriesRepository: Repository<Categories>);
    create(): Promise<string>;
    findAll(): Promise<Categories[]>;
    findOne(id: number): string;
    update(id: number, updateCategoryDto: UpdateCategoryDto): string;
    remove(id: number): string;
}
