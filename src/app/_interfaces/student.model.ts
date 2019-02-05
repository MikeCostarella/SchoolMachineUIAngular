import { SchoolStudent } from './school-student.model';

export interface Student {
    id: string;
    firstName: string;
    lastName: string;
    middleName: string;
    birthDate: Date;

    schoolStudents?: SchoolStudent[];
}
