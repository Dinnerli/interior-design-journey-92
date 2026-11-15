
import { supabase } from "@/integrations/supabase/client";

export const assets = {
  images: {
    logo: "https://usbueyoxlcbsajndxumu.supabase.co/storage/v1/object/public/images//DA-logo.png",
    hero: "/lovable-uploads/65ea5dad-8617-4875-a202-5b1297621604.png",
    process: "/lovable-uploads/fc742578-7f0a-49a6-b4f7-533d49a22a20.png",
    boxHouse: "/lovable-uploads/2c1302a3-ea6d-4bb1-ae2c-81e0afd81669.png",
  },
  projects: {
    boxHouse: {
      main: "/lovable-uploads/2c1302a3-ea6d-4bb1-ae2c-81e0afd81669.png",
      gallery: [
        "/lovable-uploads/2c1302a3-ea6d-4bb1-ae2c-81e0afd81669.png",
      ]
    },
  }
};

export type AssetKey = keyof typeof assets.images;
export type ProjectKey = keyof typeof assets.projects;

export async function getStorageUrl(path: string) {
  const { data } = supabase.storage
    .from('images')
    .getPublicUrl(path);
  return data.publicUrl;
}
