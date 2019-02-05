import { SchoolStudent } from './school-student.model';

export interface School {
    id: string;
    name: string;

    schoolStudents?: SchoolStudent[];
}
