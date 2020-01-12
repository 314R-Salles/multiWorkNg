export class Extension {

  active: boolean;
  id: string;
  version: string;
  name: string;


  constructor(active: boolean,
              id: string,
              version: string,
              name: string) {
    this.active = active;
    this.id = id;
    this.version = version;
    this.name = name;
  }

}
