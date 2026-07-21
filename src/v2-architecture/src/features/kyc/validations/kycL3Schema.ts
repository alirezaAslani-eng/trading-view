import { Dayjs } from "dayjs";
import { z } from "zod";
import { type infer as Infer, input, output, object, custom, file } from "zod";

const MAX_VIDEO_SIZE = 100 * 1024 * 1024; // 100 MB

const ACCEPTED_VIDEO_TYPES = [
  "video/mp4",
  //   "video/webm",
  //   "video/ogg",
  //   "video/quicktime", // .mov
  //   "video/x-msvideo", // .avi
] as const;

const videoValidation = z
  .instanceof(FileList)
  .transform((files) => files.item(0))
  .pipe(
    z
      .instanceof(File)
      .refine((file) => file.size <= MAX_VIDEO_SIZE)
      .refine((file) =>
        ACCEPTED_VIDEO_TYPES.includes(
          file.type as (typeof ACCEPTED_VIDEO_TYPES)[number]
        )
      )
  );

export const kycL3Schema = object({
  birthDateShamsi: custom<Dayjs>((value) => value instanceof Dayjs),
  video: videoValidation,
});

export type kycL3Schema = Infer<typeof kycL3Schema>;
export type kycL3SchemaInput = input<typeof kycL3Schema>;
export type kycL3SchemaOutput = output<typeof kycL3Schema>;
