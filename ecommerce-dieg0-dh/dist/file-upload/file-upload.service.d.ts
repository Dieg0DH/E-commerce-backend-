import { FileUploadRepository } from './file-upload.repository';
import { Repository } from 'typeorm';
import { Products } from 'src/products/entities/product.entity';
export declare class FileUploadService {
    private readonly fileUploadRepository;
    private readonly productsRepository;
    constructor(fileUploadRepository: FileUploadRepository, productsRepository: Repository<Products>);
    uploadImage(file: Express.Multer.File, productId: string): Promise<string>;
}
