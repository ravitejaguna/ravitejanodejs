import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';
import { Router, ActivatedRoute } from  '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroup!: FormGroup;
  constructor(
    private authService: AuthServiceService, 
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.initForm();
  }
  initForm(){
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }
  loginProcess() {
    // if(this.formGroup.valid) {
    //   this.authService.login(this.formGroup.value).subscribe(result => {
    //     if(result.success) {
    //       console.log("Login Successfull");
    //       alert(result.message);
    //     } else {
    //       alert(result.message)
    //     }
    //   })
    // } 
    //console.log("Hello");
    this.router.navigateByUrl('/home');
  }
}
