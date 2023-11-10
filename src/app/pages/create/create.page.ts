import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validator, Validators} from "@angular/forms";
import { LoadingController,AlertController} from "@ionic/angular";
import {FirestoreService  } from "../../services/data/firestore.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  
   public createSongForm: any;  

  constructor(public lc:LoadingController, 
    public ac:AlertController, 
    public fs:FirestoreService,
    public fb:FormBuilder,
    public r:Router  ) {

     this.createSongForm=fb.group({
     albumName:['',Validators.required],
     artistName:['',Validators.required],
     songDescription:['',Validators.required],
     songName:['',Validators.required], 
     });


     }

  ngOnInit() {
  }
   
  async createSong(){
   const loading= await this.lc.create();
   const albumName= this.createSongForm.value.albumName;
   const artistName= this.createSongForm.value.artistName;
   const songDescription= this.createSongForm.value.songDescription;
   const songName= this.createSongForm.value.songName;
   this.fs.createSong(albumName,artistName,songDescription,songName).then(
     ()=>{loading.dismiss().then(()=>
      {this.r.navigateByUrl('/home'); });  },
     error =>{
       console.error(error);
     }); 
     return await loading.present();
     }
       



  }




