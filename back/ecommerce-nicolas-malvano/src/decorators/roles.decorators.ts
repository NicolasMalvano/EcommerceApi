import { SetMetadata } from "@nestjs/common";
import { Roles } from "../roles.enum";


export const Role = (...roles: Roles[]) => SetMetadata('roles', roles); 
// METADATA: Diccionario asociado a cada request recibida