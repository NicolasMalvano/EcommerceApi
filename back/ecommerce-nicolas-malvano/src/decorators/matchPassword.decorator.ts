import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint()
export class MatchPassword implements ValidatorConstraintInterface {
    validate(confirmPassword: string, args: ValidationArguments):  boolean {
        const obj = args.object as Record<string, unknown>
        const key = args.constraints[0];
        const password = obj[key] as string

        if(confirmPassword !== password){
            return false
        }
        
        return true
    }
    defaultMessage(validationArguments?: ValidationArguments): string {
        return 'Las passwords no coinciden'
    }
}