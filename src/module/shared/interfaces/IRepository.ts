export interface IRepository<T extends Document> {
    findAll(): Promise<T[]>;
    findById(id: string): Promise<T | null>;
    create(item: T): Promise<T>;
    update(id: string, item: T): Promise<T | null>;
    delete(id: string): Promise<T | null>;
}