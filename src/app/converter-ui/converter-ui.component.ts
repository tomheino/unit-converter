import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ConversionEngineService } from '../shared/conversion-engine.service';

@Component({
  selector: 'app-converter-ui',
  templateUrl: './converter-ui.component.html',
  styleUrl: './converter-ui.component.css'
})
export class ConverterUiComponent implements OnInit {
  parentForm!: FormGroup;
  cols: number = 3;
  rows: string = '1:2';

  constructor(
    private fb: FormBuilder,
    private conversionEngineService: ConversionEngineService
  ) {}

  ngOnInit(): void {
    // If window width is <= 650 px, show one column instead of three
    this.cols = (window.innerWidth <= 650) ? 1 : 3;
    // If mat-grid-list column value is 1, lower row hight.
    this.rows = (this.cols === 1) ? '2:0.5' : '2:1';

    let converterCategoryDefs = this.conversionEngineService.getConverterCategoryDefs();
    this.parentForm = this.fb.group({
      categoryValue: new FormControl(converterCategoryDefs[0].name),
      converterValue: new FormControl(converterCategoryDefs[0].conversions[0].name),
      conversionInput: new FormControl(""),
      conversionOutput: new FormControl(""),
      iconValue: new FormControl(converterCategoryDefs[0].icon)
    });
  }

  onSubmit() {
    console.log(`Submit: ${JSON.stringify(this.parentForm.value)}`);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    if (event.target instanceof Window) {
      this.cols = (event.target.innerWidth <= 650) ? 1 : 3;
      this.rows = (this.cols === 1) ? '2:0.5' : '2:1';
    }
  }
}



