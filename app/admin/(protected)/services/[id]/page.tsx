import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { updateService } from "@/app/actions/services";
import { formatFaq } from "@/lib/data/services";
import type { FaqItem } from "@/lib/types";
import ServiceForm from "../ServiceForm";

export const metadata = { title: "Edit Service — Nexquora Admin" };

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const service = await db.service.findUnique({ where: { id } });
  if (!service) notFound();

  const action = updateService.bind(null, id);

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="font-syne text-2xl font-bold text-white">
          Edit Service
        </h1>
        <p className="mt-1 text-sm text-muted">{service.title}</p>
      </div>

      <div className="rounded-xl border border-white/8 bg-bg-card p-6">
        <ServiceForm
          action={action}
          defaultValues={{
            slug: service.slug,
            title: service.title,
            tagline: service.tagline,
            description: service.description,
            longDescription: service.longDescription,
            icon: service.icon,
            accentHex: service.accentHex,
            features: service.features,
            tools: service.tools,
            faqRaw: formatFaq(service.faq as unknown as FaqItem[]),
            caseStudyTeaser: service.caseStudyTeaser ?? undefined,
            published: service.published,
            order: service.order,
          }}
          submitLabel="Save Changes"
        />
      </div>
    </div>
  );
}
