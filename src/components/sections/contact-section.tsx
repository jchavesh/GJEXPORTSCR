"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/language-context";
import { Mail, Phone, Clock, MapPin } from 'lucide-react';
import Image from "next/image";

const productOptions = ['Coffee', 'Ornamental Plants', 'Cacao'] as const;

export default function ContactSection() {
  const { t } = useLanguage();
  const { toast } = useToast();

  const formSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    company: z.string().min(2, { message: "Company name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    country: z.string().min(2, { message: "Country is required." }),
    products: z.array(z.string()).refine(value => value.some(item => item), {
      message: 'You have to select at least one product.',
    }),
    volume: z.string().optional(),
    message: z.string().min(10, { message: "Message must be at least 10 characters." }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      country: "",
      products: [],
      volume: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real app, you'd send this to a server action or API endpoint
    console.log(values);
    toast({
      title: t.contact.form.success,
      description: "We'll be in touch with you shortly.",
    });
    form.reset();
  }

  return (
    <section id="contact" className="section-padding bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 md:grid-cols-2">
          <div className="space-y-6">
            <h2 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">
              {t.contact.title}
            </h2>
            <p className="text-lg text-foreground/80">
              Ready to source the best of Costa Rica? Fill out the form and our export specialists will prepare a custom quote for you.
            </p>
            <div className="space-y-4">
              <h3 className="font-headline text-xl font-bold">{t.contact.info.title}</h3>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary" /> <span>{t.contact.info.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary" /> <span>{t.contact.info.hours}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" /> <a href="mailto:quotes@jandgexports.com" className="hover:text-primary">quotes@jandgexports.com</a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" /> <a href="tel:+50612345678" className="hover:text-primary">+506 1234 5678</a>
              </div>
            </div>
            <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="inline-block">
              <Button variant="outline" size="lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-5 w-5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                {t.contact.info.whatsapp}
              </Button>
            </a>
          </div>
          <div className="rounded-lg bg-card p-8 shadow-lg">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem><FormLabel>{t.contact.form.name}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="company" render={({ field }) => (
                    <FormItem><FormLabel>{t.contact.form.company}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem><FormLabel>{t.contact.form.email}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="country" render={({ field }) => (
                  <FormItem><FormLabel>{t.contact.form.country}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="products" render={() => (
                  <FormItem>
                    <FormLabel>{t.contact.form.products}</FormLabel>
                     <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {productOptions.map((item) => (
                        <FormField key={item} control={form.control} name="products" render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item)}
                                onCheckedChange={(checked) => (
                                  checked
                                    ? field.onChange([...field.value, item])
                                    : field.onChange(field.value?.filter((value) => value !== item))
                                )}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">{item}</FormLabel>
                          </FormItem>
                        )} />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="volume" render={({ field }) => (
                  <FormItem><FormLabel>{t.contact.form.volume}</FormLabel><FormControl><Input placeholder="e.g., 1 container, 5 pallets" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="message" render={({ field }) => (
                  <FormItem><FormLabel>{t.contact.form.message}</FormLabel><FormControl><Textarea rows={4} {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={form.formState.isSubmitting}>
                  {t.contact.form.submit}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
