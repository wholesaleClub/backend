import { Global, Module, Logger } from '@nestjs/common';
import { LoggerService } from './logger.service';

@Global()
@Module({
    imports: [],
    controllers: [],
    providers: [LoggerService, Logger],
    exports: [LoggerService],
})
export class LoggerModule {}
