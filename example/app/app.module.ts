import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {EasyFormsModule} from 'angular2-easy-forms';
import {
    AlertModule, AccordionModule, ButtonsModule, CarouselModule, CollapseModule, DatepickerModule,
    DropdownModule, ModalModule, PaginationModule, PopoverModule, ProgressbarModule, RatingModule, SortableModule,
    TabsModule, TimepickerModule, TooltipModule, TypeaheadModule
} from 'ng2-bootstrap';

@NgModule({
    imports: [
        BrowserModule,
        EasyFormsModule,
        AccordionModule,
        AlertModule,
        ButtonsModule,
        CarouselModule,
        CollapseModule,
        DatepickerModule,
        DropdownModule,
        ModalModule,
        PaginationModule,
        PopoverModule,
        ProgressbarModule,
        RatingModule,
        SortableModule,
        TabsModule,
        TimepickerModule,
        TooltipModule,
        TypeaheadModule
    ],
    providers: [],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {}
