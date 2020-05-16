import {
  NgModule,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
  ElementRef,
  Renderer2,
  HostListener
} from "@angular/core";
import { Observable } from "rxjs";
import {
  AngularFireStorage,
  AngularFireUploadTask
} from "@angular/fire/storage";
import * as M from "materialize-css";
import { ImageCroppedEvent } from "ngx-image-cropper";
import "firebase/storage";
import { finalize } from "rxjs/operators";
import { HttpClient, HttpParams } from "@angular/common/http";

@Component({
  selector: "app-captureimage",
  templateUrl: "./captureimage.component.html",
  styleUrls: ["./captureimage.component.css"]
})
export class CaptureimageComponent implements OnInit {
  @ViewChild("video", { static: true }) videoElement: ElementRef;
  @ViewChild("canvas", { static: true }) canvas: ElementRef;
  videoWidth = 0;
  videoHeight = 0;
  capture_image = [];
  base64 = "";
  stopcamera = true;
  stream: MediaStream;
  image_file;
  scrHeight: any;
  scrWidth: any;
  croppedImage: any = "";
  iscropping = true;
  convert_image;
  task: AngularFireUploadTask;
  URL: Observable<String>;
  imageURL: String;
  baseurl = "https://handwriting-recognition-api.herokuapp.com/api/v1";
  prescription;

  constraints = {
    video: {
      facingMode: "environment",
      width: { ideal: 4096 },
      height: { ideal: 2160 }
    }
  };
  constructor(
    private renderer: Renderer2,
    private storage: AngularFireStorage,
    private httpclient: HttpClient
  ) {
    this.capture_image = [];
  }

  sendurltoapi(url) {
    let params = new HttpParams({
      fromObject: {
        imageURL: url
      }
    });
    this.httpclient
      .post(`${this.baseurl}/predict-medicine`, params)
      .subscribe(data => {
        this.prescription = data;
        console.log(this.prescription);
      });
  }

  upload(image) {
    let timestamp = Date.now().toString();

    const path = `captures/test`;
    console.log("Starting upload");

    let ref = this.storage.ref(path);
    this.task = this.storage.upload(path, image);
    this.task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          console.log("Image Uploaded");

          this.URL = ref.getDownloadURL();
          this.URL.subscribe(res => {
            this.imageURL = res;
            console.log("IMAGE URL", this.imageURL);
            this.sendurltoapi(this.imageURL);
          });
        })
      )
      .subscribe();
  }

  ngOnInit() {
    this.startCamera();
  }
  attachVideo(stream) {
    this.stream = stream;

    this.renderer.setProperty(
      this.videoElement.nativeElement,
      "srcObject",
      stream
    );

    this.renderer.listen(this.videoElement.nativeElement, "play", event => {
      this.videoHeight = this.videoElement.nativeElement.videoHeight;
      this.videoWidth = this.videoElement.nativeElement.videoWidth;
    });
  }
  handleError(error) {
    console.log("Error: ", error);
  }
  startCamera() {
    if (!!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
      navigator.mediaDevices
        .getUserMedia(this.constraints)
        .then(this.attachVideo.bind(this))
        .catch(this.handleError);
    } else {
      alert("Sorry, camera not available.");
    }
  }
  closeCamera() {
    console.log(this.renderer.data);
    this.renderer.destroy();
    console.log("Is Stream Active? ", this.stream.active);
    this.stream.getTracks().forEach(track => track.stop());
    console.log(this.stream.active);
    this.stopcamera = false;
  }

  ngOnDestroy() {
    console.log("Is Stream Active? ", this.stream.active);
    if (this.stream.active) {
      this.stream.getTracks().forEach(track => track.stop());
      console.log(this.renderer.data);
      this.renderer.destroy();
      setTimeout(() => {
        console.log("Exiting");
      }, 10000);
    }
  }

  capture() {
    this.renderer.setProperty(
      this.canvas.nativeElement,
      "width",
      this.videoWidth
    );
    this.renderer.setProperty(
      this.canvas.nativeElement,
      "height",
      this.videoHeight
    );
    this.canvas.nativeElement
      .getContext("2d")
      .drawImage(this.videoElement.nativeElement, 0, 0);
    this.base64 = this.canvas.nativeElement.toDataURL("image/png");
    //this.capture_image.push(this.canvas.nativeElement.toDataURL("image/png"));
    const imageBlob = this.dataURItoBlob(this.base64);
    console.log(imageBlob);
    this.capture_image.push(imageBlob);
    this.image_file = new File([imageBlob], "image", { type: "image/jpeg" });
    //this.upload(this.image_file);
    this.closeCamera();
    this.iscropping = false;
    // this.retry = false;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    const imageBlob = this.dataURItoBlob(this.croppedImage);
    this.convert_image = new File([imageBlob], "image", { type: "image/jpeg" });
  }

  uploadonclick() {
    this.upload(this.convert_image);
  }

  dataURItoBlob(dataURI) {
    dataURI = dataURI.slice(22);
    console.log(dataURI);

    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: "image/jpeg" });
    return blob;
  }

  ngAfterViewInit(): void {
    setTimeout(function() {
      var elem = document.querySelector(".sidenav");
      var instance = M.Sidenav.init(elem);
      var instance = M.AutoInit();
    }, 0);
  }
}
