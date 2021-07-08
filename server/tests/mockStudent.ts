import { StudentDTO } from "../../common/dto/student.dto";

export const mockStudent:StudentDTO = {
    id: "5ujfBWeRemQEguNbFFdXNpM7Kyt2",
    active: true,
    firstname: "Dennis",
    lastname: "Eller",
    matriculationNumber: "452750",
    course: {
        id: 4,
        name: "Informatik",
        code: "MINF",
        degree: "Master",
        department: {
            id: 9,
            name: "Campus Minden",
            description: "Campus in Minden"
        }
    },
    birthdate: new Date(),
    gender: "MALE",
    mail: "dennis.eller@ilias20.de",
    title: "",
    phone: "01784239664",
    semester: 6
}
