import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


// Services
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.css']
})
export class EmailConfirmationComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const accessToken = this.route.snapshot.paramMap.get('accessToken');
    console.log(accessToken);
    this.authService.emailConfirmations(accessToken);
  }

}
