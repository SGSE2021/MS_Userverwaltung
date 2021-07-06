export function parseGender( gender: string ) {
    if ( gender === "MALE" ) { return gender; }
    if ( gender === "FEMALE" ) { return gender; }
    if ( gender === "DIVERSE" ) { return gender; }
    throw new Error( "Unknown Gender" );
}