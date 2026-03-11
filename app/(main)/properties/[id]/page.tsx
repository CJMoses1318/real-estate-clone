import {
  Bath,
  Bed,
  ChevronRight,
  Home,
  MapPin,
  Square,
  User,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DynamicMapView } from "@/components/map/DynamicMapView";
import { ImageGallery } from "@/components/property/ImageGallery";
import { SavePropertyButton } from "@/components/property/SavePropertyButton";
import { SharePropertyButton } from "@/components/property/SharePropertyButton";
import { Button } from "@/components/ui/button";
import { sanityFetch } from "@/lib/sanity/live";
import { PROPERTY_DETAIL_QUERY } from "@/lib/sanity/queries";
import type { ResolvedSanityImage } from "@/types";

interface PropertyPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PropertyPageProps): Promise<Metadata> {
  const { id } = await params;
  const { data: property } = await sanityFetch({
    query: PROPERTY_DETAIL_QUERY,
    params: { id },
  });

  if (!property?.title) {
    return {
      title: "Property Not Found",
    };
  }

  const price = property.price
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(property.price)
    : "";

  return {
    title: `${property.title}${price ? ` | ${price}` : ""}`,
    description:
      property.description?.slice(0, 160) ||
      `${property.title} - ${property.bedrooms ?? "—"} beds, ${property.bathrooms ?? "—"} baths${property.squareFeet ? `, ${property.squareFeet.toLocaleString()} sqft` : ""}.`,
  };
}

export default async function PropertyDetailPage({
  params,
}: PropertyPageProps) {
  const { id } = await params;

  const { data: property } = await sanityFetch({
    query: PROPERTY_DETAIL_QUERY,
    params: { id },
  });

  if (!property) {
    notFound();
  }

  const priceFormatted =
    property.price != null
      ? new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 0,
        }).format(property.price)
      : "—";

  const images = (property.images ?? []) as ResolvedSanityImage[];
  const title = property.title ?? "Property";

  return (
    <div className="min-h-screen bg-accent/20">
      {/* Breadcrumb */}
      <div className="bg-background border-b border-border/50">
        <div className="container py-4">
          <nav
            className="flex items-center gap-2 text-sm text-muted-foreground"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
            <Link
              href="/properties"
              className="hover:text-foreground transition-colors"
            >
              Properties
            </Link>
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
            <span className="text-foreground font-medium truncate max-w-[200px] md:max-w-md">
              {title}
            </span>
          </nav>
        </div>
      </div>

      <div className="container py-8">
        {/* Header: title, price, actions */}
        <div className="flex flex-col gap-4 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold font-heading">
                {title}
              </h1>
              {property.address && (
                <p className="text-muted-foreground mt-1 flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {[
                    property.address.street,
                    property.address.city,
                    property.address.state,
                    property.address.zipCode,
                  ]
                    .filter(Boolean)
                    .join(", ")}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <SharePropertyButton title={title} price={priceFormatted} />
              <SavePropertyButton propertyId={property._id} />
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-lg font-semibold">
            <span className="text-primary">{priceFormatted}</span>
            <div className="flex flex-wrap items-center gap-3 text-sm font-normal text-muted-foreground">
              {property.bedrooms != null && (
                <span className="flex items-center gap-1.5">
                  <Bed className="h-4 w-4" aria-hidden="true" />
                  {property.bedrooms} beds
                </span>
              )}
              {property.bathrooms != null && (
                <span className="flex items-center gap-1.5">
                  <Bath className="h-4 w-4" aria-hidden="true" />
                  {property.bathrooms} baths
                </span>
              )}
              {property.squareFeet != null && (
                <span className="flex items-center gap-1.5">
                  <Square className="h-4 w-4" aria-hidden="true" />
                  {property.squareFeet.toLocaleString()} sqft
                </span>
              )}
              {property.yearBuilt != null && (
                <span>Built {property.yearBuilt}</span>
              )}
              {property.propertyType && (
                <span className="capitalize">{property.propertyType}</span>
              )}
            </div>
          </div>
        </div>

        {/* Gallery */}
        <section className="mb-10" aria-labelledby="gallery-heading">
          <h2 id="gallery-heading" className="sr-only">
            Property images
          </h2>
          <ImageGallery images={images} title={title} />
        </section>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {property.description && (
              <section>
                <h2 className="text-xl font-semibold font-heading mb-3">
                  Description
                </h2>
                <p className="text-muted-foreground whitespace-pre-line">
                  {property.description}
                </p>
              </section>
            )}

            {property.amenities && property.amenities.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold font-heading mb-3">
                  Amenities
                </h2>
                <ul className="flex flex-wrap gap-2">
                  {property.amenities.map((a: string) => (
                    <li key={a}>
                      <span className="inline-flex items-center rounded-lg bg-muted px-3 py-1.5 text-sm capitalize">
                        {a.replace(/-/g, " ")}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {property.location && (
              <section className="rounded-2xl overflow-hidden border border-border/50 shadow-warm h-[300px]">
                <DynamicMapView properties={[property]} />
              </section>
            )}
          </div>

          {/* Sidebar: agent only */}
          <aside className="space-y-8">
            {property.agent && (
              <section className="bg-card rounded-2xl border border-border/50 p-6 shadow-warm">
                <h2 className="text-lg font-semibold font-heading mb-4 flex items-center gap-2">
                  <User className="h-5 w-5" aria-hidden="true" />
                  Listing agent
                </h2>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  {property.agent.photo?.asset?.url && (
                    <div className="relative h-16 w-16 rounded-full overflow-hidden bg-muted shrink-0">
                      <Image
                        src={property.agent.photo.asset.url}
                        alt={property.agent.name ?? "Agent"}
                        width={64}
                        height={64}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="font-medium">
                      {property.agent.name ?? "Agent"}
                    </p>
                    {property.agent.agency && (
                      <p className="text-sm text-muted-foreground">
                        {property.agent.agency}
                      </p>
                    )}
                    {property.agent.email && (
                      <a
                        href={`mailto:${property.agent.email}`}
                        className="text-sm text-primary hover:underline block mt-1"
                      >
                        {property.agent.email}
                      </a>
                    )}
                    {property.agent.phone && (
                      <a
                        href={`tel:${property.agent.phone}`}
                        className="text-sm text-muted-foreground hover:text-foreground block"
                      >
                        {property.agent.phone}
                      </a>
                    )}
                    {property.agent.bio && (
                      <p className="text-sm text-muted-foreground mt-2">
                        {property.agent.bio}
                      </p>
                    )}
                  </div>
                </div>
                <Button asChild className="mt-4 w-full sm:w-auto">
                  <Link href="/">Contact agent</Link>
                </Button>
              </section>
            )}
          </aside>
        </div>

        <div className="mt-10 pt-8 border-t border-border/50">
          <Button variant="outline" asChild>
            <Link href="/properties" className="inline-flex items-center gap-2">
              <Home className="h-4 w-4" aria-hidden="true" />
              Back to all properties
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
