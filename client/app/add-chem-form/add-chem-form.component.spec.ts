import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';

import { ToastComponent } from '../shared/toast/toast.component';
import { ChemService } from '../services/chem.service';
import { AddChemFormComponent } from './add-chem-form.component';

class ChemServiceMock { }

describe('Component: AddChemForm', () => {
  let component: AddChemFormComponent;
  let fixture: ComponentFixture<AddChemFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [ AddChemFormComponent ],
      providers: [
        ToastComponent, FormBuilder,
        { provide: ChemService, useClass: ChemServiceMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddChemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display header text', () => {
    const el = fixture.debugElement.query(By.css('h4')).nativeElement;
    expect(el.textContent).toContain('Add new chem');
  });

  it('should display the add form', () => {
    const formEl = fixture.debugElement.query(By.css('form')).nativeElement;
    expect(formEl).toBeTruthy();
    const [inputName, inputType, inputWeight] = fixture.debugElement.queryAll(By.css('input'));
    expect(inputName.nativeElement).toBeTruthy();
    expect(inputType.nativeElement).toBeTruthy();
    expect(inputWeight.nativeElement).toBeTruthy();
    expect(inputName.nativeElement.value).toBeFalsy();
    expect(inputType.nativeElement.value).toBeFalsy();
    expect(inputWeight.nativeElement.value).toBeFalsy();
    const btnAdd = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(btnAdd).toBeTruthy();
  });

});
