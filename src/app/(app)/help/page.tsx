import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { HelpCircle, LifeBuoy, Search, MessageSquareQuestion } from "lucide-react";

const faqs = [
  {
    question: "How do I create a post?",
    answer: "To create a post, navigate to the main Dashboard or your community feed. Look for the 'Create Post' section, type your content, add hashtags, attach files if needed, and click 'Post'.",
  },
  {
    question: "How can I find communities?",
    answer: "Click on the 'Communities' tab in the sidebar. You can browse existing communities or search for specific ones by name or interest.",
  },
  {
    question: "How does messaging work?",
    answer: "Go to the 'Messages' tab. You can see your existing conversations or search for other students in your college to start a new chat.",
  },
  {
    question: "How is my college workspace determined?",
    answer: "When you sign up, you select your college and verify with your college email address. This places you into your specific college's private Campusverse workspace.",
  },
  {
    question: "Can I change my profile information?",
    answer: "Yes, you can edit your profile information, including your avatar, bio, and other details, by going to your Profile page and clicking 'Edit Profile'.",
  },
];

export default function HelpPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <HelpCircle className="h-16 w-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl font-bold tracking-tight">Help Center</h1>
        <p className="text-muted-foreground mt-2">
          Find answers to your questions about Campusverse.
        </p>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input placeholder="Search help topics..." className="pl-10 text-base py-6" />
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquareQuestion className="h-6 w-6" /> Frequently Asked Questions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="text-left hover:no-underline text-base">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LifeBuoy className="h-6 w-6" /> Still Need Help?
          </CardTitle>
          <CardDescription>
            If you can't find what you're looking for, feel free to contact our support team.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Contact Support
          </Button>
          <p className="text-xs text-muted-foreground mt-3">
            We typically respond within 24 hours.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
