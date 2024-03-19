import {
  email,
  type Input,
  maxLength,
  minLength,
  object,
  string,
  url,
  optional,
} from "valibot";
import "@angular/localize/init";

export const SubmitSchema = object({
  projectName: string([minLength(1, $localize`需要填寫公共程式名稱`)]),
  projectDescription: string([
    minLength(1, $localize`需要填寫公共程式描述`),
    maxLength(150, $localize`描述須小於 150 字`),
  ]),
  projectUrl: string([
    minLength(1, $localize`專案網址是必填欄位`),
    url($localize`無效的網址`),
  ]),
  demoUrl: optional(string()),
  provider: string([minLength(1, $localize`提供單位是必填欄位`)]),
  contactName: string([minLength(1, $localize`聯絡窗口是必填欄位`)]),
  contactPhone: string([minLength(1, $localize`聯絡電話是必填欄位`)]),
  contactEmail: string([
    minLength(1, $localize`聯絡 email 是必填欄位`),
    email($localize`無效的 email`),
  ]),
});

export type SubmitForm = Input<typeof SubmitSchema>;
