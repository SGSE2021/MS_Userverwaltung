import { AddStudentDTO } from "../../common/dto/addstudent.dto";

export const mockAddStudent:AddStudentDTO={
    id:"",
    active:true,
    birthdate:new Date(),
    firstname:"Dennis",
    lastname:"Eller",
    gender:"MALE",
    mail:"dennis@mock.de",
    matriculationNumber:"123456",
    semester:1,
    title:"",
    phone:"",
    course:{
        degree:"Master",
        id:1,
        name:"Informatik",
        code:"MINF",
        department:{
            id:1,
            name:"Campus Minden",
            description:"Campus in Minden"
        }
    }
  }