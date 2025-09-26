type User = {
    id: number;
    email: string;
    name: string;
    password: string;
    address: string;
    phone: string;
    country?: string | undefined;
    city?: string | undefined;
};
export declare class UsersRepository {
    private users;
    getUsers(): User[];
    addUser(user: User): {
        id: number;
        email: string;
        name: string;
        address: string;
        phone: string;
        country?: string | undefined;
        city?: string | undefined;
    };
    updateUser(id: number, user: User): {
        id: number;
        email: string;
        name: string;
        address: string;
        phone: string;
        country?: string | undefined;
        city?: string | undefined;
    } | null;
    deleteUser(id: number): {
        id: number;
        email: string;
        name: string;
        address: string;
        phone: string;
        country?: string | undefined;
        city?: string | undefined;
    };
}
export {};
