import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl
} from "@angular/forms";
import {
  AngularFireStorage,
  AngularFireUploadTask
} from "@angular/fire/storage";
import "firebase/storage";
import { finalize } from "rxjs/operators";
import "firebase/firestore";
@Component({
  selector: "app-admin-add-medicine",
  templateUrl: "./admin-add-medicine.component.html",
  styleUrls: ["./admin-add-medicine.component.css"]
})
export class AdminAddMedicineComponent implements OnInit {
  imageToUpload: File;
  imagePreview;
  submitted: boolean = false;
  task: AngularFireUploadTask;
  URL: Observable<string>;
  downloadURL: string;
  isUploading: boolean;
  isLoading: boolean = false;
  uploadSuccess: boolean = false;

  medicineForm = this.fb.group({
    name: ["", [Validators.required, Validators.minLength(3)]],
    weight: ["", Validators.required],
    id: ["", Validators.required],
    category: ["", Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private storage: AngularFireStorage,
    private afs: AngularFirestore
  ) {}

  ngOnInit() {}

  get f() {
    return this.medicineForm.controls;
  }

  onFileChange(event) {
    this.imageToUpload = event.target.files[0];

    var reader = new FileReader();
    reader.readAsDataURL(this.imageToUpload);
    reader.onload = res => {
      console.log("Done");
      console.log(this.imagePreview);
      this.imagePreview = reader.result;
    };
  }

  uploadImage() {
    this.isUploading = true;

    const path = `Medicines/${this.medicineForm.value["id"]}`;

    const ref = this.storage.ref(path);

    this.task = this.storage.upload(path, this.imageToUpload);

    this.task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          console.log("FINALIZED");

          this.URL = ref.getDownloadURL();
          this.URL.subscribe(res => {
            this.downloadURL = res;
            this.isUploading = false;
            this.uploadSuccess = true;
          });
        })
      )
      .subscribe();
  }

  submitForm() {
    this.isLoading = true;
    this.submitted = true;
    const { value, valid, touched } = this.medicineForm;
    console.log("Submitted => ", valid);
    if (valid && touched) {
      console.log(value);
      this.afs
        .collection("Medicines")
        .doc(value["id"])
        .set({ ...value, image: this.downloadURL })
        .then(res => {
          console.log("Success!");
          this.isLoading = false;
        })
        .catch(err => {
          console.log("Error!");
          this.isLoading = false;
        });
    } else {
      console.log("HAS ERRORS");
      this.isLoading = false;
    }
  }
}
