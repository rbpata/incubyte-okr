import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OkrModule } from './okr/okr.module';
import { ObjectiveModule } from './models/objective/objective.module';

import { KeyResultModule } from './models/objective/key-result/key-result.module';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        OkrModule,
        ObjectiveModule,
        KeyResultModule,
        ConfigModule.forRoot({
            isGlobal: true,
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
