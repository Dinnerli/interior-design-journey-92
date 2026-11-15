
import { supabase } from "@/integrations/supabase/client";

export async function uploadImage(file: File) {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { data, error } = await supabase.storage
    .from('images')
    .upload(filePath, file);

  if (error) {
    throw error;
  }

  const { data: publicUrl } = supabase.storage
    .from('images')
    .getPublicUrl(filePath);

  return publicUrl.publicUrl;
}
