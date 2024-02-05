import {string} from "joi";

export interface ReturnWithData {
  error: boolean;
  message: string;
  data: any[];
}
