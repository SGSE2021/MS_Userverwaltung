import { LecturerDTO } from "../../common/dto/lecturer.dto";

export const mockLecturer: LecturerDTO = {
    id: "5ujfBWeRemQEguNbFFdXNpM7Kyt2",
    active: true,
    firstname: "Uwe",
    lastname: "Meier",
    department: {
        id: 9,
        name: "Campus Minden",
        description: "Campus in Minden"
    },
    birthdate: new Date(),
    gender: "MALE",
    mail: "uwe.meier@ilias20.de",
    title: "",
    phone: "01784239664",
}
