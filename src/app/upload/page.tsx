"use client"
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, ArrowRight, FileText, LineChart, Trash2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { useUserStore } from '@/store';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import Link from 'next/link';
import type { NextPage } from 'next';



const CVUpload: NextPage = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [uploading, setUploading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [uploadError, setUploadError] = useState<string | null>(null);
  
  const { cvFiles, addCV, removeCV } = useUserStore();

  const onDrop = async (acceptedFiles: File[]) => {
    setUploading(true);
    setUploadError(null);
    
    try {
      const totalFiles = acceptedFiles.length;
      let processedFiles = 0;
      
      for (const file of acceptedFiles) {
        if (!/\.(pdf|docx|txt)$/i.test(file.name)) {
          throw new Error(`Invalid file type: ${file.name}. Only PDF, DOCX, and TXT files are allowed.`);
        }
        const formData = new FormData();
        formData.append("file", file);
        const data = await fetch(`/api/extract-text`,
          {
            method: 'POST',
            body: formData
        })
        const parsedContent = await data.text();
        
        addCV({
          id: Date.now() + Math.random().toString(36).substring(2),
          name: file.name,
          size: file.size,
          type: file.type,
          lastModified: file.lastModified,
          content: parsedContent,
          uploadDate: new Date().toISOString()
        });
        
        processedFiles++;
        setProgress(Math.round((processedFiles / totalFiles) * 100));
      }
      
      toast({
        title: "Upload Successful",
        description: `${acceptedFiles.length} CV${acceptedFiles.length > 1 ? 's' : ''} uploaded successfully.`,
      });
    } catch (error) {
      setUploadError((error as Error).message);
      toast({
        variant: "destructive",
        title: "Upload Failed",
        description: (error as Error).message,
      });
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt']
    },
    disabled: uploading,
    multiple: true
  });
  
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };
  
  const getFileIcon = (fileType: string): string => {
    if (fileType.includes('pdf')) return '📄';
    if (fileType.includes('docx')) return '📝';
    if (fileType.includes('text')) return '📃';
    return '📑';
  };

  return (
    <>
      <Header />
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-6">CV Manager</h1>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Upload CVs</CardTitle>
              <CardDescription>
                Upload your CV files (PDF, DOCX, or TXT)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div 
                {...getRootProps()} 
                className={`border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition-colors ${
                  isDragActive ? 'border-primary bg-primary/10' : 'border-gray-300 hover:border-primary'
                }`}
              >
                <input {...getInputProps()} />
                <FileText className="h-10 w-10 mb-4 mx-auto text-gray-400" />
                {isDragActive ? (
                  <p>Drop the CV files here...</p>
                ) : (
                  <div>
                    <p className="mb-2">Drag and drop CV files here, or click to select files</p>
                    <p className="text-sm text-gray-500">Supported formats: PDF, DOCX, TXT</p>
                  </div>
                )}
              </div>
              {uploading && (
                <div className="mt-4">
                  <p className="text-sm mb-2">Uploading... {progress}%</p>
                  <Progress value={progress} className="h-2" />
                </div>
              )}
              
              {uploadError && (
                <Alert variant="destructive" className="mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{uploadError}</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>My CVs</CardTitle>
              <CardDescription>
                {cvFiles.length === 0 
                  ? "No CVs uploaded yet" 
                  : `${cvFiles.length} CV${cvFiles.length > 1 ? 's' : ''} uploaded`}
              </CardDescription>
            </CardHeader>
            <CardContent className={cvFiles.length > 3 ? "max-h-[400px] overflow-y-auto" : ""}>
              {cvFiles.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <FileText className="h-10 w-10 mx-auto mb-2" />
                  <p>Upload your first CV to get started</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {cvFiles.map((file) => (
                    <div key={file.id} className="flex items-center p-3 border rounded-lg hover:bg-gray-50">
                      <div className="text-xl mr-3">{getFileIcon(file.type)}</div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{file.name}</p>
                        <div className="flex items-center text-xs text-gray-500 space-x-2">
                          <span>{formatFileSize(file.size)}</span>
                          <span>•</span>
                          <span>{new Date(file.uploadDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                      {/* <Badge variant="outline" className="ml-2">
                        {file.contentType.toUpperCase()}
                      </Badge> */}
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="ml-2 text-gray-500 hover:text-red-500"
                        onClick={() => {
                          removeCV(file.id);
                          toast({
                            title: "CV Removed",
                            description: `${file.name} has been removed.`,
                          });
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Link href={`/job-board`} className="ml-2">
                        <Button variant="outline" size="icon">
                          <LineChart className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
            <CardFooter className="justify-between">
              <div className="text-sm text-gray-500">
                {cvFiles.length > 0 && `Last updated: ${new Date(cvFiles[cvFiles.length - 1].uploadDate).toLocaleString()}`}
              </div>
            </CardFooter>
          </Card>
        </div>
        <div className='flex items-center justify-center m-5'>
        <Button 
          variant="ghost" 
          size="lg"
          onClick={() => {
            router.push('/job-board')
          }}
      >
        <ArrowRight />
        Go to Job Board
      </Button>
      </div>
      </div>
      <Footer />
    </>
  );
};

export default CVUpload;