import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ConversionEngineService } from '../../shared/conversion-engine.service';

@Component({
  selector: 'app-conversion-input',
  templateUrl: './conversion-input.component.html',
  styleUrl: './conversion-input.component.css'
})
export class ConversionInputComponent implements OnInit{
  @Input() parentForm!: FormGroup;

  conversionInUintText = "Input";

  constructor(private conversionEngineService: ConversionEngineService) {}
  
  ngOnInit(): void {
    // category change detection
    this.parentForm.get('categoryValue')?.valueChanges.subscribe((categoryValue) => {
      this.updateInUintText(categoryValue, this.parentForm.get('converterValue')?.value);
    });

    // conversion change detection
    this.parentForm.get('converterValue')?.valueChanges.subscribe((converterValue) => {
      this.updateInUintText(this.parentForm.get('categoryValue')?.value, converterValue);
    });

    // Call the update method when the page loads for the first time
    this.updateInUintText(this.parentForm.get('categoryValue')?.value, this.parentForm.get('converterValue')?.value);
  }

  private updateInUintText(categoryValue: string, converterValue: string): void {
    if (categoryValue !== "" && converterValue !== "") {
      const conversionDef = this.conversionEngineService.getCurrentConversionDef(categoryValue, converterValue);
      this.conversionInUintText = "Input as " + (conversionDef?.inUnit || "");
    } else {
      this.conversionInUintText = "Input";
    }
  }
}
