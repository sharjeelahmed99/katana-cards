import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class AuditedEntity {
  @CreateDateColumn({ type: 'timestamptz' })
  createdDate: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedDate?: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deletedDate?: Date;
}
