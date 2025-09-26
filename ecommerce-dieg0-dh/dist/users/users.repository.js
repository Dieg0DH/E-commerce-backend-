"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRepository = void 0;
const common_1 = require("@nestjs/common");
let UsersRepository = class UsersRepository {
    users = [
        {
            id: 1,
            email: 'john.doe@example.com',
            name: 'John Doe',
            password: 'password123',
            address: '123 Main St',
            phone: '555-123-4567',
            country: 'USA',
            city: 'New York',
        },
        {
            id: 2,
            email: 'maria.garcia@example.com',
            name: 'Maria Garcia',
            password: 'secure456',
            address: '456 Oak Avenue',
            phone: '555-234-5678',
            country: 'Spain',
            city: 'Madrid',
        },
        {
            id: 3,
            email: 'ahmed.khan@example.com',
            name: 'Ahmed Khan',
            password: 'khan789',
            address: '789 Pine Road',
            phone: '555-345-6789',
            country: 'UAE',
            city: 'Dubai',
        },
        {
            id: 4,
            email: 'yuki.tanaka@example.com',
            name: 'Yuki Tanaka',
            password: 'tokyo2023',
            address: '101 Cherry Blossom St',
            phone: '555-456-7890',
            country: 'Japan',
            city: 'Tokyo',
        },
        {
            id: 5,
            email: 'carlos.silva@example.com',
            name: 'Carlos Silva',
            password: 'brazil2022',
            address: '202 Beach Road',
            phone: '555-567-8901',
            country: 'Brazil',
            city: 'Rio de Janeiro',
        },
        {
            id: 6,
            email: 'sophie.martin@example.com',
            name: 'Sophie Martin',
            password: 'paris1234',
            address: '303 River Lane',
            phone: '555-678-9012',
            country: 'France',
            city: 'Paris',
        },
    ];
    getUsers() {
        return this.users;
    }
    addUser(user) {
        const id = this.users.length + 1;
        user.id = id;
        this.users.push(user);
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
    updateUser(id, user) {
        const oldUser = this.users.find((user) => user.id === id);
        if (!oldUser) {
            return null;
        }
        const updatedUser = { ...oldUser, ...user };
        const index = this.users.findIndex((user) => user.id === id);
        this.users[index] = updatedUser;
        const { password, ...userWithoutPassword } = updatedUser;
        return userWithoutPassword;
    }
    deleteUser(id) {
        const index = this.users.findIndex((user) => user.id === id);
        const user = this.users[index];
        this.users.splice(index, 1);
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
};
exports.UsersRepository = UsersRepository;
exports.UsersRepository = UsersRepository = __decorate([
    (0, common_1.Injectable)()
], UsersRepository);
//# sourceMappingURL=users.repository.js.map