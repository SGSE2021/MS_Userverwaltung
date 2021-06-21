import { Student } from "@prisma/client";
import { StudentPreviewDTO } from "../models/DTOs/student-preview.dto";

export class StudentPreviewMapper{

    toDTO(item: Student): StudentPreviewDTO {
        return {
                id:item.id,
                active:item.active,
                firstname:item.firstname,
                lastname:item.lastname,
                matriculationNumber:item.matriculationsNumber,
    }

    // toPersistence(u: RecipePreviewDTO): RecipePreview {
    //     return undefined;
    // }


}

}

module StudentPreviewMapper{

}