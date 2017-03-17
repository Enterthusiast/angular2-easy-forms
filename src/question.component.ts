import {Component, EventEmitter, HostBinding, Input, Output} from '@angular/core'
import {FormGroup} from '@angular/forms';
import {Question} from './data.interface';


@Component({
    selector: 'ef-question',
    template: `
        <div [formGroup]="form" [hidden]="question.hidden">

            <div [ngSwitch]="settings.customTheme">

                <div *ngSwitchCase="'ng2Bootstrap3'">

                    <div [ngClass]="[question.classes?.wrapperGroup, bootstrapFeedbackDisplayClasses]" class="has-feedback">

                        <div [ngClass]="question.classes?.wrapperLabel">
                            <label
                                    *ngIf="question.label"
                                    [ngClass]="question.classes?.label"
                                    [attr.for]="question.key">
                                {{question.label}}
                            </label>
                        </div>

                        <div [ngSwitch]="question.type" [ngClass]="question.classes?.wrapperQuestion">

                            <select
                                    *ngSwitchCase="'dropdown'"
                                    [formControlName]="question.key"
                                    (ngModelChange)="onValueChange($event)"
                                    [ngClass]="question.classes?.question"
                                    [id]="question.key">
                                <option *ngFor="let o of question.options" [value]="o.value">{{o.name ? o.name : o.value}}</option>
                            </select>


                            <div *ngSwitchCase="'checkbox'" [ngClass]="question.classes?.question">
                                <div class="checkbox" *ngFor="let o of question.options">
                                    <label attr.for="{{o.name ? o.name : o.value}}">
                                        <input [id]="o.name ? o.name : o.value"
                                               [type]="question.type"
                                               [formControlName]="question.key"
                                               [name]="question.key"
                                               [value]="o.value"
                                               [checked]="isSelectActive(o)"
                                               (change)="checkboxValueChange()"
                                               [disabled]="o.disabled"
                                               (click)="setCheckbox(o)">
                                        {{o.name ? o.name : o.value}}
                                    </label>
                                </div>
                            </div>

                            <textarea
                                    *ngSwitchCase="'textarea'"
                                    [formControlName]="question.key"
                                    (ngModelChange)="onValueChange($event)"
                                    [id]="question.key"
                                    [ngClass]="question.classes?.question">   
                            </textarea>

                            <div *ngSwitchCase="'radio'" [ngClass]="question.classes?.question">
                                <div class="radio" *ngFor="let o of question.options">
                                    <label attr.for="{{o.name ? o.name : o.value}}">
                                        <input [id]="o.name ? o.name : o.value"
                                               [type]="question.type"
                                               [formControlName]="question.key"
                                               [name]="question.key"
                                               [value]="o.value"
                                               [checked]="question.value === o.value"
                                               (click)="setRadio(o)">
                                        {{o.name ? o.name : o.value}}
                                    </label>
                                </div>
                            </div>

                            <input
                                    *ngSwitchDefault
                                    [formControlName]="question.key"
                                    [attr.placeholder]="question.placeholder"
                                    [type]="question.type"
                                    (ngModelChange)="onValueChange($event)"
                                    [ngClass]="question.classes?.question"
                                    [id]="question.key">
                        </div>

                        <div *ngIf="settings.showValidation" [ngClass]="[question.classes?.error, bootstrapErrorClasses]" [hidden]="hideErrorMsg">
                            <span *ngFor="let e of errors()">{{e}}</span>
                        </div>
                        
                    </div>

                </div>

                <div *ngSwitchDefault>

                    <div [ngClass]="[question.classes?.wrapperGroup]">

                        <div [ngClass]="question.classes?.wrapperLabel">
                            <label
                                    *ngIf="question.label"
                                    [ngClass]="question.classes?.label"
                                    [attr.for]="question.key">
                                {{question.label}}
                            </label>
                        </div>

                        <div [ngSwitch]="question.type" [ngClass]="question.classes?.wrapperQuestion">

                            <select
                                    *ngSwitchCase="'dropdown'"
                                    [formControlName]="question.key"
                                    (ngModelChange)="onValueChange($event)"
                                    [ngClass]="question.classes?.question"
                                    [id]="question.key">
                                <option *ngFor="let o of question.options" [value]="o.value">{{o.name ? o.name : o.value}}</option>
                            </select>


                            <div *ngSwitchCase="'checkbox'" [ngClass]="question.classes?.question">
                                <div class="checkbox" *ngFor="let o of question.options">
                                    <label attr.for="{{o.name ? o.name : o.value}}">
                                        <input [id]="o.name ? o.name : o.value"
                                               [type]="question.type"
                                               [formControlName]="question.key"
                                               [name]="question.key"
                                               [value]="o.value"
                                               [checked]="isSelectActive(o)"
                                               (change)="checkboxValueChange()"
                                               [disabled]="o.disabled"
                                               (click)="setCheckbox(o)">
                                        {{o.name ? o.name : o.value}}
                                    </label>
                                </div>
                            </div>

                            <textarea
                                    *ngSwitchCase="'textarea'"
                                    [formControlName]="question.key"
                                    (ngModelChange)="onValueChange($event)"
                                    [id]="question.key"
                                    [ngClass]="question.classes?.question">   
                            </textarea>

                            <div *ngSwitchCase="'radio'" [ngClass]="question.classes?.question">
                                <div class="radio" *ngFor="let o of question.options">
                                    <label attr.for="{{o.name ? o.name : o.value}}">
                                        <input [id]="o.name ? o.name : o.value"
                                               [type]="question.type"
                                               [formControlName]="question.key"
                                               [name]="question.key"
                                               [value]="o.value"
                                               [checked]="question.value === o.value"
                                               (click)="setRadio(o)">
                                        {{o.name ? o.name : o.value}}
                                    </label>
                                </div>
                            </div>

                            <input
                                    *ngSwitchDefault
                                    [formControlName]="question.key"
                                    [attr.placeholder]="question.placeholder"
                                    [type]="question.type"
                                    (ngModelChange)="onValueChange($event)"
                                    [ngClass]="question.classes?.question"
                                    [id]="question.key">
                        </div>

                        <div *ngIf="settings.showValidation" [ngClass]="[question.classes?.error]" [hidden]="hideErrorMsg">
                            <span *ngFor="let e of errors()">{{e}}</span>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    `
})

export class QuestionComponent {

    // Add class to the wrapper
    @HostBinding('class') get toSet() {
        return this.question && this.question.classes && this.question.classes.wrapper ? this.question.classes.wrapper : '';
    }

    @Input() set info(value) {
        this.question = value.question;
        this.form = value.form;
        this.settings = value.settings;

        if (this.question.type === 'checkbox') {
            this.question.value = !this.question.value ? [] : this.question.value;
            this.checkboxIsRequired = this.question.validation && this.question.validation.find(a => a.type === 'required');
        }
    }

    @Output() valueChange: EventEmitter<any> = new EventEmitter();

    question: Question;
    form: FormGroup;

    private checkboxIsRequired: boolean = false;
    private settings: any;

    get hideErrorMsg() {
        if(this.settings.errorOnDirty) {
            if(this.form.controls[this.question.key].dirty) {
                return this.form.controls[this.question.key].valid;
            } else {
                return true;
            }
        } else {
            return this.form.controls[this.question.key].valid;
        }
    }
    
    errors() {
        if (this.question.validation && !this.form.controls[this.question.key].valid) {
            let temp: any = [],
                errors = this.form.controls[this.question.key].errors,
                errorKeys = Object.keys(errors);
            
            if (this.settings.singleErrorMessage) temp.push(this._setError(errorKeys[errorKeys.length - 1], errors));
            else errorKeys.forEach(a => temp.push(this._setError(a, errors)));

            return temp;
        }
    }

    get bootstrapFeedbackDisplayClasses() {
        if(this.settings.customTheme === 'ng2Bootstrap3' && !this.hideErrorMsg) {
            return 'has-error';
        } else if((this.form.controls[this.question.key].dirty || this.form.controls[this.question.key].touched) && this.form.controls[this.question.key].valid) {
            return 'has-success';
        } else {
            return '';
        }
    }

    get bootstrapErrorClasses() {
        if(this.settings.customTheme === 'ng2Bootstrap3' && !this.hideErrorMsg) {
            return 'help-block';
        } else {
            return '';
        }
    }

    setRadio(option) {
        this.form.controls[this.question.key].setValue(option.value);
        this.onValueChange(option.value)
    }

    setCheckbox(option) {
        let index = this.question.value.indexOf(option.value);

        if (index !== -1) this.question.value.splice(index, 1);
        else this.question.value.push(option.value);

        this.form.controls[this.question.key].setValue(this.question.value);
        this.onValueChange(this.question.value)
    }

    checkboxValueChange() {
        if (this.checkboxIsRequired) {
            if (this.question.value.length === 1) this.question.options.find(a => a.value === this.question.value[0]).disabled = true;
            else this.question.options.forEach(a => a.disabled = false)
        }
    }

    onValueChange(event) { if (this.question.emitChanges !== false) this.valueChange.emit({[this.question.key]: event}) }
    isSelectActive(option) { return this.question.value.find(a => a === option.value) ? true : false }

    private _setError(item, errors) {
        let errorMsg: string = this.question.validation.find(a => a.type.toLowerCase() === item).message,
            tag: string = this.question.label || this.question.key;
    
        if (!errorMsg) {
            switch (item) {
                // Set error messages
                case 'required':
                    errorMsg = `${tag} is required.`;
                    break;
    
                case 'minlength':
                    errorMsg = `${tag} has to be at least ${errors[item].requiredLength} characters long.`;
                    break;
    
                case 'maxlength':
                    errorMsg = `${tag} can't be longer then ${errors[item].requiredLength} characters.`;
                    break;
    
                case 'pattern':
                    errorMsg = `${tag} must match this pattern: ${errors[item].requiredPattern}.`;
                    break;
    
                case 'match':
                    errorMsg = `${tag} must match the ${errors[item].mustMatchField} field.`;
                    break;
            }
        }
    
        return errorMsg;
    }
}