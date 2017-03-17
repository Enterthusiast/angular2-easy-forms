import {Component} from "@angular/core";


// workaround: fake export to prevent typescript compilation quirk
// more info: without real export here, typescript export a half backed export making javascript crash in the browser
@Component({})
export class dataInterface {}

// real useful stuff here
export interface EasyFormData {
    questions: Question[]
    settings?: Settings
    classes?: Classes
}

export interface Question {
    type: 'text' | 'password' | 'number' | 'dropdown' | 'radio' | 'checkbox' | 'textarea'
    key: string
    label?: string
    placeholder?: string
    value?: string | number | Array<string>
    order?: number
    emitChanges?: boolean
    options?: Array<{value: string | number, name: string, disabled: boolean}>
    classes?: {
        wrapper?: string | Array<string>
        wrapperGroup?: string | Array<string>
        wrapperLabel?: string | Array<string>
        wrapperQuestion?: string | Array<string>
        label?: string | Array<string>
        question?: string | Array<string>
        error?: string | Array<string>
    }
    validation?: Validation | Array<Validation>
    hidden?: boolean
}

export interface Settings {
    submitButton?: boolean
    submitButtonText?: string
    submitButtonExtraValidation?: boolean
    singleErrorMessage?: boolean
    showValidation?: boolean
    errorOnDirty?: boolean
    customTheme?: string
}

export interface Classes {
    wrapper?: string | Array<string>
    form?: string | Array<string>
    wrapperSubmit?: string | Array<string>
    submit?: string | Array<string>
    submitButton?: string | Array<string>
}

export interface Validation {
    type: 'required' | 'minLength' | 'maxLength' | 'patter' | 'custom' | 'match'
    value?: any
    message?: string
}
