import { useState, useRef } from "react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Participant } from "@shared/schema";

interface FileUploadProps {
  onUploadSuccess: (participants: Participant[]) => void;
}

export default function FileUpload({ onUploadSuccess }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileUpload = async (file: File) => {
    if (!file.name.match(/\.(xlsx|xls)$/i)) {
      toast({
        title: "Invalid file type",
        description: "Please upload an Excel file (.xlsx or .xls)",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Upload failed");
      }

      const data = await response.json();
      onUploadSuccess(data.participants);
      
      toast({
        title: "Upload successful",
        description: `Loaded ${data.participants.length} participants`,
      });
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "Failed to process file",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-lg border border-border">
      <h2 className="text-lg font-semibold mb-4 flex items-center">
        <i className="fas fa-upload text-accent mr-2" />
        Upload Spreadsheet
      </h2>
      
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all duration-300 ${
          isDragging
            ? "border-primary bg-primary/10"
            : "border-border hover:border-primary hover:bg-primary/5"
        } ${isUploading ? "opacity-50 cursor-not-allowed" : ""}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={!isUploading ? openFileDialog : undefined}
        data-testid="upload-dropzone"
      >
        <div className="space-y-3">
          {isUploading ? (
            <i className="fas fa-spinner animate-spin text-4xl text-primary" />
          ) : (
            <i className="fas fa-file-excel text-4xl text-muted-foreground" />
          )}
          <div>
            <p className="text-sm font-medium">
              {isUploading ? "Uploading..." : "Drop your Excel file here"}
            </p>
            <p className="text-xs text-muted-foreground">
              {isUploading ? "Please wait..." : "or click to browse"}
            </p>
          </div>
          <p className="text-xs text-muted-foreground">Supports .xlsx and .xls files</p>
        </div>
        
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept=".xlsx,.xls"
          onChange={handleFileSelect}
          disabled={isUploading}
          data-testid="input-file"
        />
      </div>

      <div className="mt-4 p-3 bg-muted rounded-md">
        <h4 className="text-sm font-medium mb-2">Expected Format:</h4>
        <div className="text-xs text-muted-foreground space-y-1">
          <div>Column A: Names</div>
          <div>Column B: Occurrences (1, 2, 3, etc.)</div>
        </div>
      </div>
    </div>
  );
}
