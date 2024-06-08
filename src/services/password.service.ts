import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { LoggerService } from 'src/logger/logger.service';

@Injectable()
export class PasswordService {
    private readonly saltRounds: number = 10;
    private readonly AppName: string = 'PasswordService';
    constructor(private readonly logger: LoggerService) {}

    async hashPassword(password: string): Promise<string> {
        this.logger.log('Hashing Password', `${this.AppName}`);
        try {
            const salt = await bcrypt.genSalt(this.saltRounds);
            const hashedPassword = await bcrypt.hash(password, salt);
            this.logger.log('Password hashed successfully', `${this.AppName}`);
            return hashedPassword;
        } catch (err) {
            this.logger.error('Error in hashing password', `${this.AppName}`);
            throw new HttpException(
                {
                    status: err?.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
                    message: err?.message ?? 'Something went wrong',
                },
                err?.status ?? HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    async comparePassword(password: string, hash: string): Promise<boolean> {
        this.logger.log('Comparing password', `${this.AppName}`);
        try {
            const result = await bcrypt.compare(password, hash);
            this.logger.log(
                result ? 'Password Matched' : 'Password Mismatch',
                `${this.AppName}`
            );
            return result;
        } catch (err) {
            this.logger.error('Error in comparing password', `${this.AppName}`);
            throw new HttpException(
                {
                    status: err?.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
                    message: err?.message ?? 'Something went wrong',
                },
                err?.status ?? HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
}
