export class Item {

  name: string;
  isActive: boolean;
  pictureUrl: string;
  id: number;

  constructor(name: string, isActive: boolean, pictureUrl: string, id: number) {
    this.name = name;
    this.isActive = isActive;
    this.pictureUrl = pictureUrl;
    this.id = id;
  }

}
