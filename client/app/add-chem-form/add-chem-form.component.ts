import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ChemService } from '../services/chem.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Chem } from '../shared/models/chem.model';

@Component({
  selector: 'app-add-chem-form',
  templateUrl: './add-chem-form.component.html',
  styleUrls: ['./add-chem-form.component.scss']
})

export class AddChemFormComponent implements OnInit {
  @Input() chems: Chem[];

  addChemForm: FormGroup;
  name = new FormControl('', Validators.required);
  type = new FormControl('', Validators.required);
  weight = new FormControl('', Validators.required);

  constructor(private chemService: ChemService,
              private formBuilder: FormBuilder,
              public toast: ToastComponent) { }

  ngOnInit(): void {
    this.addChemForm = this.formBuilder.group({
      name: this.name,
      type: this.type,
      weight: this.weight
    });
  }

  addChem(): void {
    this.chemService.addChem(this.addChemForm.value).subscribe(
      res => {
        this.chems.push(res);
        this.addChemForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error)
    );
  }

}
