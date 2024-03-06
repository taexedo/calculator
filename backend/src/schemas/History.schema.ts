import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class History {
  @Prop({ required: true })
  expression: string;
  @Prop({ required: true })
  result: string;
}

export const HistorySchema = SchemaFactory.createForClass(History);
