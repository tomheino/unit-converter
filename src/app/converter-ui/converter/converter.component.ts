import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ConversionDef } from '../../shared/conversion-def.class';
import { ConversionEngineService } from '../../shared/conversion-engine.service';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrl: './converter.component.css'
})
export class ConverterComponent implements OnInit {
  @Input() parentForm!: FormGroup;

  conversionDefs!: ConversionDef[];
  
  constructor(private conversionEngineService: ConversionEngineService) {}

  ngOnInit(): void {
    let catName = this.parentForm.get('categoryValue')?.value
    this.conversionDefs = this.conversionEngineService.getConversionsDefs(catName);

    this.parentForm.get("categoryValue")?.valueChanges.subscribe((value) => {
      this.conversionDefs = this.conversionEngineService.getConversionsDefs(value);

      // Select the 1st in the list
      this.parentForm.get('converterValue')?.setValue(this.conversionDefs[0].name);
      console.log(`Category changed in the converter: ${value} ${JSON.stringify(this.conversionDefs[0])}`);
    });
  }
}
