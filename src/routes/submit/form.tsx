import { type QRL, component$, $ } from "@builder.io/qwik";
import { useForm, valiForm$, type SubmitHandler } from "@modular-forms/qwik";
import * as v from "valibot";
import { type SubmitForm, SubmitSchema } from "./modular-forms";
import TextInput from "./text-input";
import TextareaInput from "./textarea-input";

export default component$(() => {
  const targetEmail = "demo@demo.com";
  const n = "%0D%0A"; // new line for mailto

  const [sumbitStore, { Form, Field }] = useForm<SubmitForm>({
    loader: {
      value: {
        projectName: "",
        projectDescription: "",
        projectUrl: "",
        demoUrl: "",
        provider: "",
        contactName: "",
        contactPhone: "",
        contactEmail: "",
      },
    },
    validate: valiForm$(SubmitSchema),
  });

  const handleSubmit: QRL<SubmitHandler<SubmitForm>> = $((values) => {
    if (sumbitStore.invalid) return;
    try {
      const UrlSchema = v.string([v.url("無效的 Demo 網址")]);
      if (values.demoUrl) {
        v.parse(UrlSchema, values.demoUrl);
      }
      const now = new Date();
      const timestamp = new Intl.DateTimeFormat("zh-TW", {
        dateStyle: "short",
        timeStyle: "short",
        hourCycle: "h24",
      }).format(now);
      const bodyArray = [
        `${values.provider}於${timestamp}填寫了提供公共程式之表單，內容如下：`,
        `公共程式名稱：${n}${values.projectName}`,
        `公共程式描述：${n}${values.projectDescription}`,
        `程式碼保存網址：${n}${values.projectUrl}`,
        values.demoUrl
          ? `Demo 網址：${n}${values.demoUrl}`
          : `Demo 網址：${n}無 Demo 網址`,
        `提供單位：${n}${values.provider}`,
        `聯絡窗口：${n}${values.contactName}${n}${values.contactPhone}${n}${values.contactEmail}`,
      ];
      const mailto = `mailto:${targetEmail}?subject=提供公共程式｜${values.provider}&body=${bodyArray.join(`${n}${n}`)}`;
      const a = document.createElement("a");
      a.target = "_blank";
      a.href = mailto;
      a.click();
    } catch (e) {
      alert((e as Error).message);
    }
  });

  return (
    <Form class="flex flex-col gap-4 bg-gray-100 p-8" onSubmit$={handleSubmit}>
      <input type="hidden" name="_csrf" />
      <Field name="projectName">
        {(field, props) => (
          <TextInput
            label={$localize`請輸入公共程式名稱`}
            placeholder={$localize`請輸入公共程式名稱`}
            type="text"
            value={field.value}
            error={field.error}
            required={true}
            {...props}
          />
        )}
      </Field>
      <Field name="projectDescription">
        {(field, props) => (
          <TextareaInput
            label={$localize`公共程式描述`}
            placeholder={$localize`請描述公共程式的主要內容及目的，100 - 150字。`}
            value={field.value}
            error={field.error}
            required={true}
            {...props}
          />
        )}
      </Field>
      <Field name="projectUrl">
        {(field, props) => (
          <TextInput
            label={$localize`請輸入程式碼保存網址`}
            placeholder={$localize`請輸入程式碼保存網址`}
            type="url"
            value={field.value}
            error={field.error}
            required={true}
            {...props}
            tooltips="請提供程式碼保存的公開網址，例如 Github、Gitlab、Bitbucket 等。"
          />
        )}
      </Field>
      <Field name="demoUrl">
        {(field, props) => (
          <TextInput
            label={$localize`Demo 網址`}
            placeholder={$localize`請輸入 Demo 網址`}
            type="url"
            value={field.value}
            error={field.error}
            {...props}
            tooltips="已經建立起來的網頁或服務, 用來展示您的程式碼如何運作。若無 Demo 網址，請留空"
          />
        )}
      </Field>
      <Field name="provider">
        {(field, props) => (
          <TextInput
            label={$localize`提供單位`}
            placeholder={$localize`請輸入您的單位名稱`}
            type="text"
            value={field.value}
            error={field.error}
            required={true}
            {...props}
          />
        )}
      </Field>
      <Field name="contactName">
        {(field, props) => (
          <TextInput
            label={$localize`聯絡窗口`}
            placeholder={$localize`請提供聯絡窗口稱呼`}
            type="text"
            value={field.value}
            error={field.error}
            required={true}
            {...props}
          />
        )}
      </Field>
      <Field name="contactPhone">
        {(field, props) => (
          <TextInput
            label={$localize`聯絡電話`}
            placeholder={$localize`請提供窗口聯絡電話`}
            type="tel"
            value={field.value}
            error={field.error}
            required={true}
            {...props}
          />
        )}
      </Field>
      <Field name="contactEmail">
        {(field, props) => (
          <TextInput
            label={$localize`聯絡 email`}
            placeholder={$localize`請提供聯絡窗口電子信箱`}
            type="email"
            value={field.value}
            error={field.error}
            required={true}
            {...props}
          />
        )}
      </Field>
      <button type="submit" class="w-24 rounded-md bg-primary-700 px-6 py-3">
        <div class="text-base text-white">{$localize`送出`}</div>
      </button>
    </Form>
  );
});
