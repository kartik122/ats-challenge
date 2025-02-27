"use client"

export default function DocumentationPage() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Documentation</h1>
      
      <div className="space-y-8">
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Getting Started</h2>
          <p className="text-muted-foreground">
            Learn how to use CVParser to analyze and optimize your resume for job applications.
          </p>
          <div className="bg-muted p-4 rounded-lg space-y-2">
            <h3 className="font-medium">Quick Start Guide</h3>
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
              <li>Upload your CV in PDF, DOCX, or TXT format</li>
              <li>Browse available job positions</li>
              <li>Analyze your CV against specific job requirements</li>
              <li>Review detailed match analysis and suggestions</li>
            </ol>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Features</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="border p-4 rounded-lg">
              <h3 className="font-medium mb-2">CV Analysis</h3>
              <p className="text-muted-foreground">
                Detailed breakdown of your CV&apos;s strengths and areas for improvement.
              </p>
            </div>
            <div className="border p-4 rounded-lg">
              <h3 className="font-medium mb-2">Job Matching</h3>
              <p className="text-muted-foreground">
                AI-powered comparison of your CV against job requirements.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">FAQ</h2>
          <div className="space-y-4">
            <div className="border p-4 rounded-lg">
              <h3 className="font-medium mb-2">Supported File Formats</h3>
              <p className="text-muted-foreground">
                We currently support PDF, DOCX, and TXT file formats for CV uploads.
              </p>
            </div>
            <div className="border p-4 rounded-lg">
              <h3 className="font-medium mb-2">Analysis Process</h3>
              <p className="text-muted-foreground">
                Our AI analyzes your CV using advanced natural language processing to match it against job requirements.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}