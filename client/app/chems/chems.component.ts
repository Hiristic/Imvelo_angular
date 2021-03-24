import { Component, OnInit } from '@angular/core';

import { ChemService } from '../services/chem.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Chem } from '../shared/models/chem.model';

@Component({
  selector: 'app-chems',
  templateUrl: './chems.component.html',
  styleUrls: ['./chems.component.scss']
})
export class ChemsComponent implements OnInit {

  chem = new Chem();
  chems: Chem[] = [];
  isLoading = true;
  isEditing = false;

  constructor(private chemService: ChemService,
              public toast: ToastComponent) { }

  ngOnInit(): void {
    this.getChems();
  }

  getChems(): void {
    this.chemService.getChems().subscribe(
      data => this.chems = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  enableEditing(chem: Chem): void {
    this.isEditing = true;
    this.chem = chem;
  }

  cancelEditing(): void {
    this.isEditing = false;
    this.chem = new Chem();
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the chems to reset the editing
    this.getChems();
  }

  editChem(chem: Chem): void {
    this.chemService.editChem(chem).subscribe(
      () => {
        this.isEditing = false;
        this.chem = chem;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  deleteChem(chem: Chem): void {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.chemService.deleteChem(chem).subscribe(
        () => {
          this.chems = this.chems.filter(elem => elem._id !== chem._id);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }

}
