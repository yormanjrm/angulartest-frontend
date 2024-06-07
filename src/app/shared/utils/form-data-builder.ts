import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class FormDataBuilder {

    builder(paramsIn: any): FormData {
        const paramsOut = new FormData();
        for (const key in paramsIn) {
            if (paramsIn.hasOwnProperty(key)) {
                paramsOut.append(key, paramsIn[key]);
            }
        }
        return paramsOut;
    }

}