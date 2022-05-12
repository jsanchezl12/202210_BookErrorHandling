import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; //http interceptors
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr'; // Toast

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthorModule } from './author/author.module';
import { BookModule } from './book/book.module';
import { EditorialModule } from './editorial/editorial.module';
import { HttpErrorInterceptorService } from './interceptors/http-error-interceptor.service'; //http Error interceptor service

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BookModule,
    EditorialModule,
    AuthorModule,
    HttpClientModule,
    //toast module
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      }
    ),
    //browser animations module
    BrowserAnimationsModule
  ],
  //providers
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
