import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('history_records')
export class HistoryRecord {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  battletime: string;

  @Column({ nullable: true })
  monstera: string;

  @Column({ nullable: true })
  monsterb: string;

  @Column({ nullable: true })
  winner: string;
}
