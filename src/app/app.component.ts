import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  right(): void {
    const last = Array.from(
      document.querySelectorAll(".in-view-port")
    ).pop() as HTMLElement;
    last?.nextElementSibling?.scrollIntoView({
      block: "end",
      behavior: "smooth"
    });
  }

  left(): void {
    const first = document.querySelector(".in-view-port") as HTMLElement;
    first?.previousElementSibling?.scrollIntoView({
      block: "start",
      behavior: "smooth"
    });
  }
}
