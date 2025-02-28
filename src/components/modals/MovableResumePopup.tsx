import React, { useState, useRef, useEffect } from 'react';
import { X, FileText, Move } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useUserStore } from '@/store'; // Update this import path as needed

export const MovableResumePopup = ({ onClose }) => {
  const { cvFiles, currentCv, setCurrentCv } = useUserStore();
  const [position, setPosition] = useState({ x: 0, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  
  // Initialize position after mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPosition({ 
        x: window.innerWidth - 400, 
        y: 100 
      });

      const handleResize = () => {
        setPosition(prev => ({
          ...prev,
          x: Math.min(prev.x, window.innerWidth - 400)
        }));
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const popupRef = useRef(null);

  // Handle drag start
  const handleMouseDown = (e) => {
    if (e.target.closest('.drag-handle')) {
      setIsDragging(true);
      const rect = popupRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleResumeChange = (value) => {
    const cv = cvFiles.find(cv => cv.id === value) ?? null;
    setCurrentCv(cv);
  };

  useEffect(() => {
    if(cvFiles.length > 0) {
      setCurrentCv(cvFiles[0]);
    }
  }, [cvFiles]);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  return (
    <div
      ref={popupRef}
      className="fixed shadow-xl rounded-lg z-50 w-96 max-h-[80vh] bg-background border"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: isDragging ? 'grabbing' : 'default'
      }}
      onMouseDown={handleMouseDown}
    >
      <Card className="border-0 shadow-none">
        <CardHeader className="flex flex-row items-center justify-between p-4 drag-handle cursor-grab">
          <div className="flex items-center space-x-2">
            <Move className="h-5 w-5 text-muted-foreground" />
            <CardTitle className="text-lg">Resume Viewer</CardTitle>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <div className="p-4 pt-0 border-t">
          <Select value={currentCv?.id} onValueChange={handleResumeChange}>
            <SelectTrigger className="w-full mb-4">
              <SelectValue placeholder="Select Resume" />
            </SelectTrigger>
            <SelectContent>
              {cvFiles.map(resume => (
                <SelectItem key={resume.id} value={resume.id}>
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    {resume.name || `Resume ${resume.id}`}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <CardContent className="p-4 pt-0 max-h-[60vh] overflow-y-auto">
          {currentCv ? (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">{currentCv.name || 'Resume'}</h3>
            </div>
          ) : (
            <div className="p-8 text-center text-muted-foreground">
              <p>No resume selected</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MovableResumePopup;