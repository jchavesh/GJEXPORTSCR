"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { suggestShippingLane, type SuggestShippingLaneOutput } from '@/ai/flows/suggest-shipping-lane';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useLanguage } from '@/contexts/language-context';
import { Loader2, Ship, FileCheck, BrainCircuit, AlertTriangle } from 'lucide-react';
import { AnimationWrapper } from '../animation-wrapper';

const productOptions = ['Coffee', 'Ornamental Plants', 'Cacao'] as const;

export default function AiToolSection() {
  const { t } = useLanguage();

  const formSchema = z.object({
    products: z.array(z.string()).refine(value => value.some(item => item), {
      message: 'You have to select at least one item.',
    }),
    destinationCountry: z.string().min(2, {
      message: "Destination must be at least 2 characters.",
    }),
    volume: z.string().min(1, {
      message: "Volume is required."
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      products: [],
      destinationCountry: "",
      volume: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SuggestShippingLaneOutput | null>(null);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await suggestShippingLane({
        ...values,
        products: values.products as ('Coffee' | 'Ornamental Plants' | 'Cacao')[],
      });
      setResult(response);
    } catch (e) {
      setError(t.aiTool.results.error);
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="ai-tool" className="section-padding bg-background/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div className="text-left">
            <h2 className="font-headline text-3xl font-bold tracking-tight md:text-4xl">{t.aiTool.title}</h2>
            <p className="mt-4 text-lg text-foreground/80">{t.aiTool.description}</p>
          </div>
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="products"
                    render={() => (
                      <FormItem>
                        <FormLabel className="text-base">{t.aiTool.form.products}</FormLabel>
                        <div className="space-y-2">
                          {productOptions.map((item) => (
                            <FormField
                              key={item}
                              control={form.control}
                              name="products"
                              render={({ field }) => {
                                return (
                                  <FormItem key={item} className="flex flex-row items-start space-x-3 space-y-0">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(item)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value, item])
                                            : field.onChange(field.value?.filter((value) => value !== item));
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">{item}</FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="destinationCountry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.aiTool.form.destination}</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Netherlands" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="volume"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.aiTool.form.volume}</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 10000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full bg-accent hover:bg-accent/90" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t.aiTool.form.loading}
                      </>
                    ) : (
                      t.aiTool.form.submit
                    )}
                  </Button>
                </form>
              </Form>
              {result && (
                <AnimationWrapper>
                  <Card className="mt-6 bg-secondary">
                    <CardHeader>
                      <CardTitle className="font-headline">{t.aiTool.results.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="flex items-center font-semibold"><Ship className="mr-2 h-4 w-4 text-primary" />{t.aiTool.results.lane}</h4>
                        <p className="pl-6 text-foreground/80">{result.shippingLane}</p>
                      </div>
                      <div>
                        <h4 className="flex items-center font-semibold"><FileCheck className="mr-2 h-4 w-4 text-primary" />{t.aiTool.results.certs}</h4>
                        <p className="pl-6 text-foreground/80">{result.necessaryCertifications}</p>
                      </div>
                      <div>
                        <h4 className="flex items-center font-semibold"><BrainCircuit className="mr-2 h-4 w-4 text-primary" />{t.aiTool.results.reasons}</h4>
                        <p className="pl-6 text-foreground/80">{result.reasons}</p>
                      </div>
                    </CardContent>
                  </Card>
                </AnimationWrapper>
              )}
               {error && (
                <AnimationWrapper>
                  <Card className="mt-6 border-destructive bg-destructive/10">
                    <CardContent className="p-4 flex items-center text-destructive">
                       <AlertTriangle className="mr-2 h-5 w-5" />
                       <p>{error}</p>
                    </CardContent>
                  </Card>
                 </AnimationWrapper>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
