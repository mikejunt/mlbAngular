
import { FormGroupDirective, FormControl, NgForm } from "@angular/forms";
import { ErrorStateMatcher } from '@angular/material/core';

export class CrossFieldMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const invalidCtrl = !!(control && control.invalid);
        const invalidParent = !!(control && control.parent && control.parent.hasError('mismatch') && control.parent.dirty);
        return (invalidCtrl || invalidParent);
    }
}