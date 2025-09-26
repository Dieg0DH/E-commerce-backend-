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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserDto = exports.LoginUserDto = exports.CreateUserDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const matchPassword_1 = require("../../helpers/matchPassword");
class CreateUserDto {
    name;
    email;
    password;
    confirmPassword;
    address;
    phone;
    city;
    country;
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String, description: "@description Este es el nombre del usuario", example: "Pepito Perez", minLength: 3 }, email: { required: true, type: () => String, description: "@description Este es el email del usuario", example: "pepito@gmail.com", format: "email" }, password: { required: true, type: () => String, description: "@description Este es el password del usuario", example: "Pepito123!", minLength: 8, maxLength: 15, pattern: "/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]+$/" }, confirmPassword: { required: true, type: () => String, description: "@description Este es el confirm password del usuario", example: "Pepito123!" }, address: { required: true, type: () => String, description: "@description Este es el address del usuario", example: "123 Mockingbird Lane ,Apt #4B,Testville, CA 90210", minLength: 3, maxLength: 80 }, phone: { required: true, type: () => Number, description: "@description Este es el phone number del usuario", example: 5550123456 }, city: { required: true, type: () => String, description: "@description Este es el city del usuario", example: "Testville", minLength: 5, maxLength: 20 }, country: { required: true, type: () => String, description: "@description Este es el country del usuario", example: "Republic of Eldoria", minLength: 5, maxLength: 20 } };
    }
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    __metadata("design:type", String)
], CreateUserDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/, {
        message: 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character.',
    }),
    (0, class_validator_1.Length)(8, 15),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Validate)(matchPassword_1.MatchPassword, ['password']),
    __metadata("design:type", String)
], CreateUserDto.prototype, "confirmPassword", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(3, 80),
    __metadata("design:type", String)
], CreateUserDto.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateUserDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(5, 20),
    __metadata("design:type", String)
], CreateUserDto.prototype, "city", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(5, 20),
    __metadata("design:type", String)
], CreateUserDto.prototype, "country", void 0);
class LoginUserDto extends (0, swagger_1.PickType)(CreateUserDto, [
    'password',
    'email',
]) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.LoginUserDto = LoginUserDto;
class UpdateUserDto extends (0, swagger_1.PartialType)(CreateUserDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateUserDto = UpdateUserDto;
//# sourceMappingURL=users.dto.js.map