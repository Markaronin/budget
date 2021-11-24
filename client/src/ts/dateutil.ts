import { padWithZeroes } from "./common";

export class DateUtil {
    public static dateInputToJavascriptDate(dateInput: string): Date {
        const parts = dateInput.split("-");
        return new Date(Date.UTC(parseInt(parts[0]), parseInt(parts[1]), parseInt(parts[2])));
    }
    public static javascriptDateToDateInput(javascriptDate: Date): string {
        const year = javascriptDate.getUTCFullYear();
        const month = padWithZeroes(javascriptDate.getUTCMonth(), 2);
        const day = padWithZeroes(javascriptDate.getUTCDate(), 2);
        return `${year}-${month}-${day}`;
    }

    public static millisecondsSinceEpochToJavascriptDate(millisecondsSinceEpoch: number): Date {
        return new Date(millisecondsSinceEpoch);
    }
    public static javascriptDateToMillisecondsSinceEpoch(javascriptDate: Date): number {
        return javascriptDate.getTime();
    }

    public static dateInputToMillisecondsSinceEpoch(dateInput: string): number {
        return this.javascriptDateToMillisecondsSinceEpoch(this.dateInputToJavascriptDate(dateInput));
    }
    public static millisecondsSinceEpochToDateInput(millisecondsSinceEpoch: number): string {
        return this.javascriptDateToDateInput(this.millisecondsSinceEpochToJavascriptDate(millisecondsSinceEpoch));
    }

    public static getMillisecondsSinceEpoch(): number {
        return Date.now();
    }

    public static isMillisecondsSinceEpochAfterNow(millisecondsSinceEpoch: number): boolean {
        return this.getMillisecondsSinceEpoch() < millisecondsSinceEpoch;
    }
}
