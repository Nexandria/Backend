import { Gender } from '../../../generated/prisma';

export class CompleteProfileDto {
  fullName!: string;
  dni!: number;
  address!: string;
  birth!: string;
  gender!: Gender;
}
