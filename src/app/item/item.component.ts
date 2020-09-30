import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../classes/item';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  public item : Item;
  private editable : boolean = false;

  constructor(
    private route : ActivatedRoute,
    private router : Router,
    private itemService : ItemService
    ) 
    {
      this.item = {
        key : '',
        id : '',
        name: '',
        available : true
      }
    }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');

    //아이디가 존재하면 생성이 아니라 수정
    if(id)
    {
      this.editable = true;
      this.item = this.itemService.getItem(id);
    }
  }

  saveItem()
  {
    console.log(this.item);
    if(this.editable)
    {
      // update
      //this.itemService.saveItems();
      this.itemService.updateItem(this.item);
    }else
    {
      // create
      this.itemService.addItem(this.item);
    }

    this.router.navigateByUrl('/');
  }

  deleteItem()
  {
    this.itemService.deleteItem(this.item);
    this.router.navigateByUrl('/');
  }

}
