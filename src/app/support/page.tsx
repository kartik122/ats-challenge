"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function SupportPage() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-2xl">
      <h1 className="text-4xl font-bold mb-8">Support</h1>
      
      <div className="space-y-8">
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Contact Us</h2>
          <p className="text-muted-foreground">
            Having issues or questions? Fill out the form below and we'll get back to you as soon as possible.
          </p>
          
          <form className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium">
                Subject
              </label>
              <Input
                id="subject"
                type="text"
                placeholder="What's your issue about?"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                Message
              </label>
              <Textarea
                id="message"
                placeholder="Describe your issue or question..."
                className="min-h-[150px]"
              />
            </div>
            
            <Button className="w-full">Send Message</Button>
          </form>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Quick Help</h2>
          <div className="grid gap-4">
            <div className="border p-4 rounded-lg">
              <h3 className="font-medium mb-2">Common Issues</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>File upload problems</li>
                <li>Analysis not working</li>
                <li>Account-related questions</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}