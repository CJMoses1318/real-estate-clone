"use client";

import { Show } from "@clerk/nextjs";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function AgentCTA() {
  return (
    <section className="py-20 md:py-28 bg-accent/30">
      <div className="container">
        <div className="bg-gradient-to-r from-secondary/90 to-secondary rounded-3xl p-8 md:p-12 lg:p-16">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 text-secondary-foreground">
              Are You a Real Estate Agent?
            </h2>
            <p className="text-lg text-secondary-foreground/80 mb-8">
              Join our platform to list properties, connect with motivated
              buyers, and grow your business. Get started with our agent
              subscription today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Show when="signed-out">
                <Button size="lg" asChild>
                  <Link href="/pricing">
                    View Pricing Plans
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="bg-background/10 border-secondary-foreground/20 text-secondary-foreground hover:bg-background/20"
                >
                  <Link href="/sign-in">Get Started</Link>
                </Button>
              </Show>
              <Show when="signed-in" fallback={null}>
                <Show
                  when={{ plan: "agent" }}
                  fallback={
                    <Button size="lg" asChild>
                      <Link href="/pricing">
                        View Pricing Plans
                        <ArrowRight
                          className="ml-2 h-4 w-4"
                          aria-hidden="true"
                        />
                      </Link>
                    </Button>
                  }
                >
                  <Button size="lg" asChild>
                    <Link href="/dashboard">
                      Go to Agent Dashboard
                      <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    asChild
                    className="bg-background/10 border-secondary-foreground/20 text-secondary-foreground hover:bg-background/20"
                  >
                    <Link href="/dashboard/billing">Manage Billing</Link>
                  </Button>
                </Show>
              </Show>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
