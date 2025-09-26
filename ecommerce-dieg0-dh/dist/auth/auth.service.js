"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const typeorm_1 = require("@nestjs/typeorm");
const users_entity_1 = require("../users/enities/users.entity");
const typeorm_2 = require("typeorm");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    usersRepository;
    jwtService;
    constructor(usersRepository, jwtService) {
        this.usersRepository = usersRepository;
        this.jwtService = jwtService;
    }
    async signIn(credentials) {
        const findUser = await this.usersRepository.findOneBy({
            email: credentials.email,
        });
        if (!findUser) {
            throw new common_1.BadRequestException('Wrong Credentials');
        }
        const passwordMatch = await bcrypt.compare(credentials.password, findUser.password);
        if (!passwordMatch) {
            throw new common_1.BadRequestException('Wrong credentials');
        }
        const payload = {
            id: findUser.id,
            email: findUser.email,
            isAdmin: findUser.isAdmin,
        };
        const token = this.jwtService.sign(payload);
        return token;
    }
    async signUp(user) {
        const { confirmPassword, ...userWithoutPassword } = user;
        const findUser = await this.usersRepository.findOneBy({
            email: user.email,
        });
        if (findUser) {
            throw new common_1.BadRequestException('User already registered');
        }
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const newUser = await this.usersRepository.save({
            ...userWithoutPassword,
            password: hashedPassword,
        });
        const { password, isAdmin, ...cleanUser } = newUser;
        return cleanUser;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_entity_1.Users)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map