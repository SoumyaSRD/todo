export interface ITodo {
    _id?: string;
    title: string;
    description?: string;
    completed: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
