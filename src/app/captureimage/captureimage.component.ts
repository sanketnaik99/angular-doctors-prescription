import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer2
} from "@angular/core";
import { Observable } from "rxjs";

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

  constraints = {
    video: {
      facingMode: "environment",
      width: { ideal: 4096 },
      height: { ideal: 2160 }
    }
  };
  constructor(private renderer: Renderer2) {
    this.capture_image = [];
  }

  ngOnInit() {
    this.startCamera();
  }
  attachVideo(stream) {
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
    this.capture_image.push(this.canvas.nativeElement.toDataURL("image/png"));
  }
}
