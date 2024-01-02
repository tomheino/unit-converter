import { ConversionDef } from "./conversion-def.class";

export class ConverterCategoryDef {
    constructor(
        public name: string,
        public description: string,
        public conversions: ConversionDef[],
        public icon: string,
    ) {}
}