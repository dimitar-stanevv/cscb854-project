import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { AnimatedTextBoxComponent } from './components/animated-text-box/animated-text-box.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomButtonComponent } from './components/custom-button/custom-button.component';
import { CustomLinkComponent } from './components/custom-link/custom-link.component';
import { ScrollAnimationDirective } from './directives/scroll-animation.directive';
import { IconComponent } from './components/icon/icon.component';
import { TrailingLinesAnimationComponent } from './components/trailing-lines-animation/trailing-lines-animation.component';
import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TrailingLinesAnimationComponent,
    CustomButtonComponent,
    CustomLinkComponent,
    CustomInputComponent,
    IconComponent,
    AnimatedTextBoxComponent,
    ScrollAnimationDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularSvgIconModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
