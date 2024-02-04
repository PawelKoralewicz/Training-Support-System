import { Directive, HostListener } from "@angular/core";

@Directive({
    selector: '[pTableArrowDisable]'
})
export class PTableArrowDisableDirective {
    @HostListener('keydown.arrowLeft', ['$event']) onArrowLeft(event: KeyboardEvent) {
        event.stopPropagation();
    }

    @HostListener('keydown.arrowRight', ['$event']) onArrowRight(event: KeyboardEvent) {
        event.stopPropagation();
    }
}