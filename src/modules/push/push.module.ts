import { Module } from '@nestjs/common';
import { FirebaseModule } from 'src/integrations/firebase/firebase.module';

@Module({
  imports: [FirebaseModule],
})
export class PushModule {}
