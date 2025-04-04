export interface ITodo extends Document {
    _id?: string;
    title: string;
    description?: string;
    completed: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
