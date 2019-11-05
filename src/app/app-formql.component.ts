import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormQLMode } from '@formql/core';


@Component({
    selector: 'app-formql',
    template: `<formql [mode]="mode" [ids]="ids" [formName]="formName"></formql>`,
})
export class AppFormQLComponent {

    title = 'app';
    mode: FormQLMode = FormQLMode.View;
    ids: Array<string>;
    formName: string;

    constructor(
        private route: ActivatedRoute
    ) {
         let routeSnap = this.route.snapshot;
        if (this.isEditMode(routeSnap))
            this.mode = FormQLMode.Edit;
        
        if (this.formName == null)
            this.formName = routeSnap.params["name"];

        if (routeSnap.params["id"]) {
            this.ids = [routeSnap.params["id"]];
        }   

            
    }

    private isEditMode(routeSnap) {
        return (routeSnap.url.join("/").indexOf("/edit") != -1 || (routeSnap.parent != null && routeSnap.parent.url.join("/").indexOf("/edit") != -1));
    }
}
