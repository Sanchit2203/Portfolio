
'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { generateResumeSummaryAction } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Bot, Clipboard, Loader2 } from 'lucide-react';

const formSchema = z.object({
  resumeText: z.string().min(100, {
    message: 'Resume text must be at least 100 characters.',
  }),
});

export default function ResumeEnhancer() {
  const [isPending, startTransition] = useTransition();
  const [summary, setSummary] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      resumeText: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setSummary(null);
    startTransition(async () => {
      const result = await generateResumeSummaryAction(values);
      if (result.success && result.data) {
        setSummary(result.data.summary);
        toast({
          title: 'Summary Generated!',
          description: 'Your personalized resume summary is ready.',
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: result.error || 'Failed to generate summary.',
        });
      }
    });
  }

  const copyToClipboard = () => {
    if (summary) {
      navigator.clipboard.writeText(summary);
      toast({
        title: "Copied to clipboard!",
      });
    }
  };


  return (
    <Card className="max-w-4xl mx-auto bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline text-accent">
          <Bot /> AI-Powered Summary
        </CardTitle>
        <CardDescription>
          Paste your resume content below to generate a powerful, personalized summary that catches attention.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="resumeText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Resume Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Paste the full text of your resume here..."
                      className="min-h-[200px] bg-background"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Generate Summary
            </Button>
          </form>
        </Form>
        
        {isPending && (
            <div className="mt-8 text-center">
                <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
                <p className="mt-2 text-foreground/70">Our AI is crafting your summary...</p>
            </div>
        )}

        {summary && (
          <div className="mt-8">
            <h3 className="text-xl font-bold font-headline mb-4 text-accent">Generated Summary</h3>
            <Card className="bg-secondary p-4 relative">
              <p className="text-foreground/80">{summary}</p>
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute top-2 right-2 text-foreground/50 hover:text-primary"
                onClick={copyToClipboard}
              >
                <Clipboard className="h-4 w-4" />
              </Button>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
