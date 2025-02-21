export interface Temperature {
  current: {
    temp_c: number;
    temp_f: number;
    wind_kph: number;
    wind_mph: number;
    humidity:number;
    condition:{
      text: string;
      icon:string;
    },
  },
  location:{
    localtime: string
  }

}
