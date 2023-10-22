import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { SharedModule } from './shared/shared.module';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

@Module({
  imports: [SharedModule],
  controllers: [AppController],
  providers: [AuthGuard, RoleGuard],
})
export class AppModule {}
