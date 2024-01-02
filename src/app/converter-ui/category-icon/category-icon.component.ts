import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ConversionEngineService } from '../../shared/conversion-engine.service';

@Component({
  selector: 'app-category-icon',
  templateUrl: './category-icon.component.html',
  styleUrls: ['./category-icon.component.css']
})
export class CategoryIconComponent implements OnInit {
  @Input() parentForm!: FormGroup;
  @Input() icon: string = "";

  constructor(private conversionEngineService: ConversionEngineService) {}

  ngOnInit(): void {
    // Initialize icon
    this.updateIconAndIconValue(this.parentForm.get('iconValue')?.value);

    // Subscribe to changes in categoryValue
    this.parentForm.get('categoryValue')?.valueChanges.subscribe((categoryValue: string) => {
      // Update the iconValue based on the new categoryValue
      const updatedIconValue = this.conversionEngineService.getCategoryIcon(categoryValue);
      this.parentForm.get('iconValue')?.setValue(updatedIconValue);

      // Update the icon based on the iconValue
      this.updateIconAndIconValue(updatedIconValue);
    });

    // Subscribe to changes in iconValue
    this.parentForm.get('iconValue')?.valueChanges.subscribe((iconValue: string) => {
      // Update the icon based on the new iconValue
      this.updateIconAndIconValue(iconValue);
    });
  }

  private updateIconAndIconValue(iconValue: string | undefined): void {
    this.icon = iconValue || "";
  }
}





