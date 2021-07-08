import { AddLecturerDTO } from "../../common/dto/addlecturer.dto";

export const mockAddLecturer:AddLecturerDTO={
    id:"",
    active:true,
    birthdate:new Date(),
    firstname:"Uwe",
    lastname:"Meier",
    gender:"MALE",
    mail:"uwe@mock.de",
    title:"Prof. Dr",
    phone:"",
    department:{
        id:1,
        name:"Campus Minden",
        description:"Campus in Minden"
    }
  }