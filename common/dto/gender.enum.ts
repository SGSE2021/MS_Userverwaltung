export const Gender= {
    MALE: 'MALE',
    FEMALE: 'FEMALE',
    DIVERSE: 'DIVERSE'
  };
  
  export type Gender = (typeof Gender)[keyof typeof Gender]
  