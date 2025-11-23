/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'ical.js' {
  export function parse(input: string): any;
  
  export class Component {
    constructor(jcal: any | string);
    getAllSubcomponents(name: string): any[];
    getFirstSubcomponent(name: string): any;
  }
  
  export class Event {
    constructor(component: any);
    summary: string;
    description: string;
    location: string;
    startDate: Time;
    endDate: Time;
    uid: string;
  }

  export class Time {
    toJSDate(): Date;
    isDate: boolean;
  }
}
