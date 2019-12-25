export class Bean {

  name: string;
  scope: string;
  resource: string;
  type: string;
  aliases: string[];
  dependencies: string[];

  constructor(name?: string,
              scope?: string,
              aliases?: string[],
              dependencies?: string[],
              resource?: string,
              type?: string) {
    this.name = name;
    this.scope = scope;
    this.type = type;
    this.aliases = aliases;
    this.dependencies = dependencies;
    this.resource = resource;
  }


}
