import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose'

@modelOptions({
  schemaOptions: { timestamps: true },
})
export class Draw {
  @prop({ index: true, required: true })
  fid!: number
  @prop({ index: true, required: true })
  amount!: number
}

export const DrawModel = getModelForClass(Draw)
