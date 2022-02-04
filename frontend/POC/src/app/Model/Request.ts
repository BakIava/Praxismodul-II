
export class Request {
    constructor(
      public id: string = '',
      public budget: number = 110000,
      public manufacturer: string = '',
      public fuel: number = 0,
      public cubicCapacity: number = 0,
      public carmodel: string = '',
      public carState: number = 0,
      public message: string = '',
      public date: Date = new Date(),
      public fuelCard: boolean = false,
      public grossPrice: number = 100,
      public employee: string = 'Mustermann') { }
  }