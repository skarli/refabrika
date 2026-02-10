import { defineType, defineField } from "sanity";

export default defineType({
  name: "contactSubmission",
  title: "Form Gönderileri",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "İsim",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "email",
      title: "E-posta",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "phone",
      title: "Telefon",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "company",
      title: "Şirket",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "budget",
      title: "Bütçe",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "solution",
      title: "İstenen Çözüm",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "message",
      title: "Mesaj",
      type: "text",
      readOnly: true,
    }),
    defineField({
      name: "submittedAt",
      title: "Gönderim Tarihi",
      type: "datetime",
      readOnly: true,
    }),
    defineField({
      name: "read",
      title: "Okundu",
      type: "boolean",
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: "Tarih (Yeni)",
      name: "submittedAtDesc",
      by: [{ field: "submittedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "email",
      date: "submittedAt",
      read: "read",
    },
    prepare({ title, subtitle, date, read }) {
      return {
        title: `${read ? "" : "🔴 "}${title}`,
        subtitle: `${subtitle} - ${date ? new Date(date).toLocaleDateString("tr-TR") : ""}`,
      };
    },
  },
});
