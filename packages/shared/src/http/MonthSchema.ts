import { z } from "zod";
import * as dateFns from "date-fns";

export const MonthSchema = z
  .string()
  .regex(/^\d{2}\/\d{2}\/\d{4}$/)
  .transform((x) => dateFns.parse(x, "dd/MM/yyyy", new Date()));
