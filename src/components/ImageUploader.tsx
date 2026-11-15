
import { useState } from 'react';
import { uploadImage } from '@/utils/imageUpload';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface ImageUploaderProps {
  onUploadComplete: (url: string) => void;
}

const ImageUploader = ({ onUploadComplete }: ImageUploaderProps) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const url = await uploadImage(file);
      onUploadComplete(url);
      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        id="image-upload"
      />
      <label htmlFor="image-upload">
        <Button 
          variant="outline" 
          disabled={isUploading}
          className="cursor-pointer"
          asChild
        >
          <span>{isUploading ? 'Uploading...' : 'Upload Image'}</span>
        </Button>
      </label>
    </div>
  );
};

export default ImageUploader;
