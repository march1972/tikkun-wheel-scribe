import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { lookupSignByDob, signById, randomTikkunSign, type TikkunSign } from "./tikkun-data";

const dobSchema = z.object({
  dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "DOB must be YYYY-MM-DD"),
});

/** Internal API: POST /api/tikkun — date-range lookup, returns the matched sign row. */
export const tikkunFromDob = createServerFn({ method: "POST" })
  .inputValidator((input) => dobSchema.parse(input))
  .handler(async ({ data }): Promise<{ sign: TikkunSign | null; error: string | null }> => {
    const today = new Date().toISOString().slice(0, 10);
    if (data.dob > today) return { sign: null, error: "Date of birth cannot be in the future." };
    const sign = lookupSignByDob(data.dob);
    if (!sign) {
      return {
        sign: null,
        error:
          "That date is outside the lunar-node ranges in this reading (covers 1901-01-22 to 2051-06-28).",
      };
    }
    return { sign, error: null };
  });

export const randomTikkun = createServerFn({ method: "GET" }).handler(async (): Promise<TikkunSign> => {
  return randomTikkunSign();
});

export const getTikkunById = createServerFn({ method: "GET" })
  .inputValidator((input: { id: string }) => z.object({ id: z.string() }).parse(input))
  .handler(async ({ data }): Promise<TikkunSign | null> => signById(data.id));
